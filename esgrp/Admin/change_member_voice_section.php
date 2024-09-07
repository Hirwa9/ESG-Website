<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include '../../connect.php'; // Connect

    // Retrieve form data
    $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : null;
    $lastName = isset($_POST['lastName']) ? $_POST['lastName'] : null;
    $newVoiceSection = isset($_POST['newVoiceSection']) ? $_POST['newVoiceSection'] : null;
    $response['success'] = false;

    if (!$newVoiceSection || !$firstName || !$lastName) {
        echo json_encode(['success' => false, 'response' => '⚠️ Missing required fields']);
        exit();
    }

    // Check and update data from the database
    $checkStmt = $conn->prepare("SELECT * FROM esg_members WHERE firstName = ? AND lastName = ?");
    $checkStmt->bind_param("ss", $firstName, $lastName);
    $checkStmt->execute();
    $checkStmtResult = $checkStmt->get_result();

    if ($checkStmtResult->num_rows > 0) {
        // Fetch the member's status
        $member = $checkStmtResult->fetch_assoc();
        $currentStatus = json_decode($member['status'], true);
        // Check if the status was successfully decoded
        if ($currentStatus) {
            // Update the 'voice' key to newVoiceSection
            $currentStatus['voice'] = $newVoiceSection;
            $updatedStatus = json_encode($currentStatus);
            // Update the DB
            $updateStmt = $conn->prepare("UPDATE esg_members SET status = ? WHERE id = ?");
            $updateStmt->bind_param("si", $updatedStatus, $member['id']);

            if ($updateStmt->execute()) {
                $response['success'] = true;
                $response['message'] = "✔️ Success<br>The member '{$lastName} {$firstName}' is now registered in <b>{$newVoiceSection}</b> voice section";
            } else {
                $response['message'] = "❌ Error changing the member's voice section. Please try again";
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