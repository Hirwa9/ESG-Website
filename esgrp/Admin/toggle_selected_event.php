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
        // Fetch the member's status
        $event = $checkStmtResult->fetch_assoc();
        // Adjust visibility status
        $visibilityStatus = $event['visible'];
        $visibilityStatus == true ? $visibilityStatus = false : $visibilityStatus = true;

        // Update the DB
        $updateStmt = $conn->prepare("UPDATE esg_events SET visible = ? WHERE id = ?");
        $updateStmt->bind_param("si", $visibilityStatus, $event['id']);
        if ($updateStmt->execute()) {
            $response['success'] = true;
            $visibilityStatus == true
                ? $response['message'] = "🎉🎉 Success<br>Now the event is visible again to your site visitors"
                : $response['message'] = "✅ Success<br>The event is hidden from site visitors";
        } else {
            $response['message'] = "❌ Error toggling the event's visibility. Please try again";
        }
    } else {
        $response['message'] = "Event not found";
    }
    echo json_encode($response);

    $checkStmt->close();
    $updateStmt->close();
    $conn->close();
    exit();
}