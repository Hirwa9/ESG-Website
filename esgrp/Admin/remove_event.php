<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve passed data
    $eventId = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
    $response['success'] = false;

    // Check and remove data from the database
    $checkStmt = $conn->prepare("SELECT * FROM esg_events WHERE id = ?");
    $checkStmt->bind_param("i", $eventId);
    $checkStmt->execute();
    $checkStmtResult = $checkStmt->get_result();

    if ($checkStmtResult->num_rows > 0) {
        $removeStmt = $conn->prepare("DELETE FROM esg_events WHERE id = ?");
        $removeStmt->bind_param("i", $eventId);
        if ($removeStmt->execute()) {
            $response['success'] = true;
            $response['message'] = "🗑️ Event was removed successfully.";
        } else {
            $response['message'] = "❌ Error: {$stmt->error}";
        }
    } else {
        $response['message'] = "Event not found";
    }
    echo json_encode($response);

    $checkStmt->close();
    $removeStmt->close();
    $conn->close();
    exit();
}
