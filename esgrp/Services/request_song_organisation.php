<?php
include '../../connect.php';
// Assuming you have a database connection established already

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['selectedValues']) && isset($_POST['songName']) && isset($_POST['fromCategory'])) {
        $songName = $_POST['songName'];
        $fromCategory = $_POST['fromCategory'];
        $selectedValues = $_POST['selectedValues']; // JSON string

        // Prepare an SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO songs_to_organize (songName, fromCategory, toCategory) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $songName, $fromCategory, $selectedValues);

        if ($stmt->execute()) {
            $response = array("success" => true, "message" => "✔️ Thank you! We will look into this");
        } else {
            $response = array("success" => false, "message" => "❌ Sorry! Something went wrong, please try again");
        }
    } else {
        $response = array("success" => false, "message" => "Invalid request. Missing parameters");
    }
    $conn->close();
    echo json_encode($response);
} else {
    http_response_code(405);
    $response = array("success" => false, "message" => "Error: Method Not Allowed");
    echo json_encode($response);
}