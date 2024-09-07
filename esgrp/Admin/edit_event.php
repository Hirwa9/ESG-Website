<?php
// Include your database connection
include '../../connect.php';
require '../../mailer.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = $_POST['email'];
    $editedEventID = $_POST['edited_event_id'];
    $editedEventType = $_POST['edited_event_type'];
    $editedEventDate = $_POST['edited_event_date'];
    $editedEventLocation = $_POST['edited_event_location'];
    $editedEventBody = $_POST['edited_event_body'];
    $target_dir = "../../Pics/events/";

    $response['success'] = false;
    $response['message'] = '';

    // Fetch sender details from database to check admin privileges
    $fetchSender = $conn->prepare("SELECT * FROM admin_users WHERE email = ?");
    $fetchSender->bind_param("s", $email);
    $fetchSender->execute();
    $fetchSenderResult = $fetchSender->get_result();

    if ($fetchSenderResult->num_rows > 0) {
        $sender = $fetchSenderResult->fetch_assoc();
        $senderLastName = $sender['last_name'];
    } else {
        $response['message'] .= "❌ Sorry! Could not add the event because sender is not admin";
        echo json_encode($response);
        exit();
    }

    $eventImages = [];
    $uploadedImagesNum = 0;
    $uploadOk = true;

    // Handle first image upload
    if (isset($_FILES['edited_event_image1']) && $_FILES['edited_event_image1']['error'] == 0) {
        $target_file1 = $target_dir . basename($_FILES["edited_event_image1"]["name"]);
        if (move_uploaded_file($_FILES["edited_event_image1"]["tmp_name"], $target_file1)) {
            $eventImages[] = $target_file1;
            $uploadedImagesNum += 1;
        } else {
            $response['message'] .= "⚠️ There was an error uploading the first image <b>'{$target_file1}'</b>.<br>";
        }
    }

    // Handle second image upload
    if (isset($_FILES['edited_event_image2']) && $_FILES['edited_event_image2']['error'] == 0) {
        $target_file2 = $target_dir . basename($_FILES["edited_event_image2"]["name"]);
        if (move_uploaded_file($_FILES["edited_event_image2"]["tmp_name"], $target_file2)) {
            $eventImages[] = $target_file2;
            $uploadedImagesNum += 1;
        } else {
            $response['message'] .= "⚠️ There was an error uploading the second image <b>'{$target_file2}'</b>.<br>";
        }
    }

    if ($uploadedImagesNum < 1) {
        $response['message'] .= "<br>❌ Sorry! Both images failed to upload. Please try again";
        echo json_encode($response);
        exit();
    }

    // Update a record into the database
    $editedEventImagesPaths = json_encode($eventImages);
    $stmt = $conn->prepare("UPDATE esg_events SET eventType = ?, eventDate = ?, eventLocation = ?, eventAbout = ?, eventPics = ? WHERE id = ?");
    $stmt->bind_param("sssssi", $editedEventType, $editedEventDate, $editedEventLocation, $editedEventBody, $editedEventImagesPaths, $editedEventID);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] .= "<h6>🎉🎉 Event edit was successful</h6>";
    } else {
        $response['message'] .= "Could not edit the event<br><br>Error: {$stmt->error}";
    }

    echo json_encode($response);
    $conn->close();
}