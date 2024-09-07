<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include '../../connect.php'; // Connect

    // Retrieve form data
    $first_name = isset($_POST['first_name']) ? $_POST['first_name'] : null;
    $last_name = isset($_POST['last_name']) ? $_POST['last_name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : null;
    $status = isset($_POST['status']) ? $_POST['status'] : null;
    $otherChoirsDetails = isset($_POST['otherChoirsDetails']) ? $_POST['otherChoirsDetails'] : null;

    if (!$first_name || !$last_name || !$email || !$status || !$otherChoirsDetails) {
        echo json_encode(['response' => '⚠️ Missing required fields', 'success' => false]);
        exit();
    }

    // Check if the user/member already exists in the members table
    $checkStmtMembers = $conn->prepare("SELECT COUNT(*) FROM esg_members WHERE email = ?");
    $checkStmtMembers->bind_param("s", $email);
    $checkStmtMembers->execute();
    $checkStmtMembers->bind_result($countMembers);
    $checkStmtMembers->fetch();
    $checkStmtMembers->close();

    if ($countMembers > 0) {
        // Email already exists
        echo json_encode(['response' => '⚠️ This user is already registered', 'success' => false]);
        $conn->close();
        exit();
    }

    // Handle file upload
    if ($_POST['image'] === 'No image provided') {
        $image_url = '../../Pics/person_holder_image.png';
    } else {
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['image']['tmp_name'];
            $fileName = $_FILES['image']['name'];
            $fileSize = $_FILES['image']['size'];
            $fileType = $_FILES['image']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            $allowedfileExtensions = ['jpg', 'gif', 'png', 'jpeg'];
            if (in_array($fileExtension, $allowedfileExtensions) && $fileSize <= 2 * 1024 * 1024) {
                $uploadFileDir = '../../Pics/';
                $dest_path = $uploadFileDir . $fileName;

                if (!file_exists($dest_path)) {
                    if (move_uploaded_file($fileTmpPath, $dest_path)) {
                        $image_url = $dest_path;
                    } else {
                        echo json_encode(['response' => 'Error moving the uploaded file', 'success' => false]);
                        $conn->close();
                        exit();
                    }
                } else {
                    $image_url = $dest_path;
                }
            } else {
                echo json_encode(['response' => 'Invalid file type or size exceeds 2MB', 'success' => false]);
                $conn->close();
                exit();
            }
        }
    }

    // Default hashed password
    $default_password = password_hash("password123", PASSWORD_DEFAULT);

    // Insert the user with the default hashed password
    $stmt = $conn->prepare("INSERT INTO esg_members (firstName, lastName, imageURL, status, otherChoirsDetails, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $first_name, $last_name, $image_url, $status, $otherChoirsDetails, $email, $default_password, $phone_number);

    if ($stmt->execute()) {
        // Success
        echo json_encode(['response' => '✔️ Member added successfully', 'success' => true]);
    } else {
        // Error
        echo json_encode(['response' => '❌ Error: ' . $conn->error, 'success' => false]);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(['response' => '❌ Method Not Allowed', 'success' => false]);
}
