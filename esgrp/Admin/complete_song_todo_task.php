<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve and sanitize the input data
    $todoType = filter_input(INPUT_POST, 'todoType', FILTER_SANITIZE_STRING);
    $songId = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);

    if ($songId && $todoType) {
        // Determine the database
        switch ($todoType) {
            case 'organize':
                $databaseName = 'songs_to_organize';
                break;
            case 'upload':
                $databaseName = 'songs_to_upload';
                break;

            default:
                $response = ["success" => false, "message" => "Invalid task type."];
                echo json_encode($response);
                exit;
        }
        // Prepare and execute the delete statement
        $stmt = $conn->prepare("DELETE FROM $databaseName WHERE id = ?");
        $stmt->bind_param("i", $songId);

        if ($stmt->execute()) {
            $response = ["success" => true, "message" => "✔️ Task completed."];
        } else {
            $response = ["success" => false, "message" => "Error: " . $stmt->error];
        }

        $stmt->close();
    } else {
        $response = ["success" => false, "message" => "Invalid input data."];
    }

    $conn->close();
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
}