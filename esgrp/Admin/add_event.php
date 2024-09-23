<?php
// Include your database connection
include '../../connect.php';
require '../../mailer.php';

// Function to fetch emails from a specific table
function fetchEmails($conn, $table)
{
    $emails = [];
    $query = "SELECT email FROM $table";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $emails[] = $row['email'];
        }
    }
    return $emails;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = $_POST['email'];
    $newEventType = $_POST['new_event_type'];
    $newEventYear = $_POST['new_event_year'];
    $newEventMonth = $_POST['new_event_month'];
    $newEventDay = $_POST['new_event_day'];
    $newEventLocation = $_POST['new_event_location'];
    $notifyEventTo = $_POST['notify_event_to'];
    $newEventBody = $_POST['new_event_body'];
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
    if (isset($_FILES['new_event_image1']) && $_FILES['new_event_image1']['error'] == 0) {
        $target_file1 = $target_dir . basename($_FILES["new_event_image1"]["name"]);
        if (move_uploaded_file($_FILES["new_event_image1"]["tmp_name"], $target_file1)) {
            $eventImages[] = $target_file1;
            $uploadedImagesNum += 1;
        } else {
            $response['message'] .= "⚠️ There was an error uploading the first image <b>'{$target_file1}'</b>.<br>";
        }
    }

    // Handle second image upload
    if (isset($_FILES['new_event_image2']) && $_FILES['new_event_image2']['error'] == 0) {
        $target_file2 = $target_dir . basename($_FILES["new_event_image2"]["name"]);
        if (move_uploaded_file($_FILES["new_event_image2"]["tmp_name"], $target_file2)) {
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

    // Get the first uploaded image and construct its URL
    $eventMainImage = basename($eventImages[0]);
    $eventMainImageUrl = "https://esgrprwanda.rf.gd/Pics/events/{$eventMainImage}";

    // Construct event date
    $newEventDate = "{$newEventYear}-{$newEventMonth}-{$newEventDay}";

    // Prepare recipients list
    $recipients = ['easternsingersg@gmail.com'];
    $recipients[] = $email; // Add sender email

    // Insert a record into the database
    $newEventImagesPaths = json_encode($eventImages);
    $stmt = $conn->prepare("INSERT INTO esg_events (eventType, eventDate, eventLocation, notifyTo, eventAbout, eventPics) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $newEventType, $newEventDate, $newEventLocation, $notifyEventTo, $newEventBody, $newEventImagesPaths);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] .= "<h6>🎉🎉 Event added successfully</h6>";

        // Additional emails according to $notifyEventTo
        if ($notifyEventTo !== "none") {
            if ($notifyEventTo === "esg" || $notifyEventTo === "all") {
                $recipients = array_merge($recipients, fetchEmails($conn, "esg_members"));
            }
            if ($notifyEventTo === "all") {
                $recipients = array_merge($recipients, fetchEmails($conn, "esg_subscribers"));
            }
        }

        $recipients = array_unique($recipients); // Remove duplicate emails

        // Send emails
        $subject = 'ESG event';
        $currentDate = date("Y-m-d");
        $eventStatusMessage = $newEventDate > $currentDate
            ? 'We are so excited to announce an upcoming event to be hosted. Below are the details:'
            : 'We are so pleased to share details from a recent event that we hosted. Below are the highlights:';

        $body = <<<HTML
        <html>
            <head>
                <title>ESG Dashboard</title>
                <link rel="icon" type="image/x-icon" href="https://esgrprwanda.rf.gd/Pics/EasternSingersLogo.png">
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="author" content="Eastern Singers Group">
                <meta name="keywords" content="ESG new event">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-sanitize.js"></script>
                <link rel="icon" type="image/x-icon" href="https://esgrprwanda.rf.gd/Pics/ESG_favicon1.ico">
                <link rel="stylesheet" type="text/css" href="https://esgrprwanda.rf.gd/styles/dashboard.css?v=1.1206">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                <style>
                    body * {
                        font-family: "Raleway", sans-serif;
                        font-optical-sizing: auto;
                    }
                </style>
            </head>
            <body>
                <h1 class="fs-3 text-myBlue">Helloo, Greetings from ESG 💓💝💝</h1>
                <p>$eventStatusMessage</p>
                <div class="p-3">
                    <!-- <h2 class="mb-3 text-primary fs-4">{$newEventType}</h2> -->
                    <p><strong>Event time:</strong> {$newEventDate}</p>
                    <div clamp="my-4 p-3 rad-15 overflow-hidden">
                        <img src="{eventMainImageUrl}" alt="Event image" class="dim-100 object-fit-cover">
                    </div>
                    <hr>
                    <p class="p-2 text-muted small">{$newEventBody}</p>
                    <hr>
                    <p class="fst-italic text-muted" style="font-size: smaller;">_______<br>{$senderLastName}, from ESG</p>
                </div>
            </body>
        </html>
        HTML;

        $response['message'] .= '<br><div class="mb-3 fw-bold fs-6">Notification status</div><hr class="my-2">';
        foreach ($recipients as $recipient) {
            if (!sendMail($recipient, $subject, $body)) {
                $response['message'] .= "<i class='fa fa-warning me-2'></i> <span class='text-danger'>Could not send email to <u>{$recipient}</u></span><br>";
            } else {
                $response['message'] .= "Email sent to <u>{$recipient}</u><br>";
            }
        }
    } else {
        $response['message'] .= "Could not add record<br><br>Error: {$stmt->error}";
    }

    echo json_encode($response);
    $conn->close();
}