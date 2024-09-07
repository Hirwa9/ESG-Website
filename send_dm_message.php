<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit(0);
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require 'mailed.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['Person_Email'];
    $message = $_POST['Direct_Message'];
    $subject = $_POST['_subject'];

    $response = ['success' => false, 'message' => ''];

    // Prepare recipients list
    $recipients = ['easternsingersg@gmail.com'];

    $body = <<<HTML
        <html>
        <head>
            <title>ESG Direct message</title>
        </head>
        <body>
            <h1 style="font-size: small">Here is what they had to say ✉️</h1>
            <div>{$message}</div>
            <hr>
            <p>{$email}, from ESG website</p>
        </body>
        </html>
    HTML;

    foreach ($recipients as $recipient) {
        if (!sendMail($email, $recipient, $subject, $body)) {
            $response['message'] .= "Could not send your message<br>";
        } else {
            $response['success'] = true;
            $response['message'] .= "Message sent successfully<br>";
        }
    }

    echo json_encode($response);
    exit(); // Ensure no further output is sent
}