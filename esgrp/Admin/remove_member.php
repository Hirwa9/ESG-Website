<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve passed data
    $fName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
    $response['success'] = false;

    // Check and update data from the database
    $checkStmt = $conn->prepare("SELECT * FROM esg_members WHERE firstName = ? AND lastName = ? AND email = ?");
    $checkStmt->bind_param("sss", $fName, $lName, $email);
    $checkStmt->execute();
    $checkStmtResult = $checkStmt->get_result();

    if ($checkStmtResult->num_rows > 0) {
        $member = $checkStmtResult->fetch_assoc(); // Corresponding member
        // Update the DB
        $removeStmt = $conn->prepare("DELETE FROM esg_members WHERE id = ?");
        $removeStmt->bind_param("i", $member['id']);

        if ($removeStmt->execute()) {
            $response['success'] = true;
            $response['message'] = "✔️ Success<br>The member <b>'{$lName} {$fName}'</b> was successfully removed from ESG.<br><br>
                Removed members are unlisted from the group, and will no longer be notified about the ongoing group activities";
        } else {
            $response['message'] = "❌ Error removing the member. Please try again";
        }
    } else {
        $response['message'] = "❌ User names do not match any member.";
    }

    echo json_encode($response);

    $checkStmt->close();
    $removeStmt->close();
    $conn->close();
    exit();
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(['response' => '❌ Method Not Allowed']);
}
