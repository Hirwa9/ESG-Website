<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve passed data
    $compName = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $response['success'] = false;

    // Check and remove data from the database
    $checkStmt = $conn->prepare("SELECT * FROM esg_compositions WHERE compositionName = ?");
    $checkStmt->bind_param("s", $compName);
    $checkStmt->execute();
    $checkStmtResult = $checkStmt->get_result();

    if ($checkStmtResult->num_rows > 0) {
        $removeStmt = $conn->prepare("DELETE FROM esg_compositions WHERE compositionName = ?");
        $removeStmt->bind_param("s", $compName);
        if ($removeStmt->execute()) {
            $response['success'] = true;
            $response['message'] = "🗑️ Composition <b>$compName</b> was removed successfully.";
        } else {
            $response['message'] = "❌ Error: {$stmt->error}";
        }
    } else {
        $response['message'] = "Composition not found";
    }
    echo json_encode($response);

    $checkStmt->close();
    $removeStmt->close();
    $conn->close();
    exit();
}
