<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve passed data
    $fName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $response['success'] = false;

    // Check and update data from the database
    $checkStmt = $conn->prepare("SELECT * FROM esg_members WHERE firstName = ? AND lastName = ?");
    $checkStmt->bind_param("ss", $fName, $lName);
    $checkStmt->execute();
    $checkStmtResult = $checkStmt->get_result();

    if ($checkStmtResult->num_rows > 0) {
        // Fetch the member's status
        $member = $checkStmtResult->fetch_assoc();
        $currentStatus = json_decode($member['status'], true);
        // Check if the status was successfully decoded
        if ($currentStatus) {
            // Update the 'active' key to false
            $currentStatus['active'] = false;
            $updatedStatus = json_encode($currentStatus);
            // Update the DB
            $updateStmt = $conn->prepare("UPDATE esg_members SET status = ? WHERE id = ?");
            $updateStmt->bind_param("si", $updatedStatus, $member['id']);

            if ($updateStmt->execute()) {
                $response['success'] = true;
                $response['message'] = "✔️ The member <b>'{$lName} {$fName}'</b> is now inactive.<br><br>
                Inactive members are not listed in group members, and will not be notified about the ongoing group activities";
            } else {
                $response['message'] = "❌ Error deactivating the member. Please try again";
            }
        } else {
            $response['message'] = "❌ Sorry, something went wrong. Please try again.";
        }
    } else {
        $response['message'] = "❌ User names do not match any member.";
    }

    echo json_encode($response);

    $checkStmt->close();
    $updateStmt->close();
    $conn->close();
    exit();
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(['response' => '❌ Method Not Allowed']);
}
