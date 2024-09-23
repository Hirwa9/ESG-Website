<?php
require '../../mailer.php';

$response = array('success' => false, 'message' => '');

if ($_POST && isset($_FILES["song_file"])) {
    $target_dir = "../../Songs/NewUploads/";
    $target_file = $target_dir . basename($_FILES["song_file"]["name"]);
    $uploadOk = 1;
    $fileExtension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        $response['message'] .= "File already exists.<br>";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["song_file"]["size"] > 10000000) {
        $response['message'] .= "Your file is too large (maximum size is 10 MB).<br>";
        $uploadOk = 0;
    }

    // Allow only pdf files
    if ($fileExtension != "pdf") {
        $response['message'] .= "Only PDF files are allowed.<br>";
        $uploadOk = 0;
    }

    // Capture additional form data
    $uploaderEmail = $_POST['Uploader_Email'];
    $uploaderName = $_POST['Uploader_Name'];
    $songName = basename($_FILES["song_file"]["name"]);
    $songCategory = $_POST['Song_Category'];
    $otherSongCategory = $_POST['Other_Song_Category'];
    $ownershipChoice = $_POST['Ownership_Choice'];
    $triggeredTime = $_POST['Triggered_Time'];

    // If all checks pass, move the uploaded file to the target directory
    if ($uploadOk == 1 && move_uploaded_file($_FILES["song_file"]["tmp_name"], $target_file)) {
        $response['message'] = 'Thank you for the contribution!<br><br> The file <b>' . basename($_FILES["song_file"]["name"]) . '</b> has been uploaded and is currently being processed for inclusion in our collection.';
        $response['success'] = true;

        // Update database
        include '../../connect.php';
        $stmt = $conn->prepare("INSERT INTO songs_to_upload (songName, songCategory, otherSongCategory, uploaderName, uploaderEmail, ownershipChoice, triggeredTime) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('sssssss', $songName, $songCategory, $otherSongCategory, $uploaderName, $uploaderEmail, $ownershipChoice, $triggeredTime);
        $stmt->execute();

        // Notify the upload
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
                <div class="p-3">
                    <h1 class="fs-4">A song was uploaded on your site</h1>
                    <ul class="p-3 list-unstyled">
                        <li class="d-grid p-2">
                            <span class="fw-bold">Uploader's email</span><br>
                            <span class="ms-2 small">{$uploaderEmail}</span>
                        </li>
                        <li class="d-grid p-2">
                            <span class="fw-bold">Uploader's name</span><br>
                            <span class="ms-2 small">{$uploaderName}</span>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="d-grid p-2">
                            <span class="fw-bold">Song name</span><br>
                            <span class="ms-2 small">{$songName}</span>
                        </li>
                        <li class="d-grid p-2">
                            <span class="fw-bold">Song category</span><br>
                            <span class="ms-2 small">{$songCategory}</span>
                        </li>
                        <li class="d-grid p-2">
                            <span class="fw-bold">Other category</span><br>
                            <span class="ms-2 small">{$otherSongCategory}</span>
                        </li>
                        <li class="d-grid p-2">
                            <span class="fw-bold">Owns the composition</span><br>
                            <span class="ms-2 small">{$ownershipChoice}</span>
                        </li>
                        <hr>
                        <hr>
                        <p class="fst-italic text-muted" style="font-size: smaller;">ESG platform</p>
                    </ul>
                </div>
            </body>
        </html>
        HTML;

        // Function to send mail with a retry mechanism
        function sendMailWithRetry($to, $subject, $body, $maxRetries = 3, $delayBetweenRetries = 5)
        {
            $attempt = 0;
            $success = false;

            while (!$success && $attempt < $maxRetries) {
                $attempt++;
                $success = sendMail($to, $subject, $body);

                if (!$success) {
                    if ($attempt < $maxRetries) {
                        // Delay before retrying
                        sleep($delayBetweenRetries);
                    }
                    // else {
                    //     // Log or handle failure after final attempt
                    //     error_log("Failed to send email after $attempt attempts.");
                    // }
                }
            }
            return $success;
        }

        // Set the recipient, subject, and body
        $to = "easternsingersg@gmail.com";
        $subject = "ESG _ New song upload";
        // Attempt to send the email with retries
        sendMailWithRetry("easternsingersg@gmail.com", "ESG _ New song upload", $body);

    } else {
        $response['message'] .= ' Sorry, there was an error uploading your file. Please try again.';
    }
} else {
    $response['message'] = 'No file uploaded or POST data missing.';
}

echo json_encode($response);