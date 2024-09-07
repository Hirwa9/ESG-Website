<?php
// Start session
session_start();
include 'connect.php'; // Connect

// Prepare response array
$response = array("success" => false, "message" => "");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    // Prepare SQL statement to check if the email exists in the admin_users table
    $stmt = $conn->prepare("SELECT * FROM admin_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Email found in admin_users
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['first_name'];
            $_SESSION['user_role'] = 'admin';
            
            // Return success response
            $response["success"] = true;
            $response["message"] = "Login successful.";
        } else {
            // Wrong credentials
            $response["message"] = "<span class='fa fa-fingerprint me-2'></span> Invalid username or password. Please check your credentials and try again.";
        }
    } else {
        // User not found
        $response["message"] = "<span class='fa fa-user-times me-2'></span> No admin account associated with this email. Check the email and try again.";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit();