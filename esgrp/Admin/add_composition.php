<?php
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    include '../../connect.php';

    // Retrieve form data
    $compositionName = $_POST['song_name'];
    $compositionDate = $_POST['composition_date'];
    $compositionFileLink = $_POST['song_file_link'];
    $compositionKey = $_POST['composition_key'];
    $compositionTempo = $_POST['composition_tempo'];
    $compositionFileSize = $_POST['composition_file_size'];
    $songComposer = $_POST['song_composer'];
    $songAbout = $_POST['song_about'];
    $songVideoName = $_POST['song_video_name'];
    $songVideoLink = $_POST['song_video_link'];
    $videoDate = $_POST['video_date'];
    
    // Handle audio file upload
    $compositionAudioLink = '';
    if (isset($_FILES['song_audio']) && $_FILES['song_audio']['error'] == 0) {
        $target_dir = "esgSongsFiles/";
        $target_file = $target_dir . basename($_FILES["song_audio"]["name"]);
        if (move_uploaded_file($_FILES["song_audio"]["tmp_name"], $target_file)) {
            $compositionAudioLink = $target_file;
        } else {
            $response = array("success" => false, "message" => "❌ Sorry, there was an error uploading your file.");
            echo json_encode($response);
            exit();
        }
    }
    
    // Prepare JSON data
    $compositionVideoDetails = null;
    if (!empty($songVideoName) && !empty($songVideoLink) && !empty($videoDate)) {
        $compositionVideoDetails = json_encode([
            'videoName' => $songVideoName,
            'videoLink' => $songVideoLink,
            'videoDate' => $videoDate
        ]);
    }

    $compositionAbout = json_encode([
        'composer' => $songComposer,
        'aboutText' => $songAbout
    ]);

    $compositionFileDetails = json_encode([
        'fileSize' => $compositionFileSize,
        'compositionKey' => $compositionKey,
        'compositionTempo' => $compositionTempo,
        'fileLink' => $compositionFileLink
    ]);

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO esg_compositions (compositionName, compositionDate, compositionVideoDetails, compositionAbout, compositionAudioLink, compositionFileDetails) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $compositionName, $compositionDate, $compositionVideoDetails, $compositionAbout, $compositionAudioLink, $compositionFileDetails);

    if ($stmt->execute()) {
        $response = array("success" => true, "message" => "✔️ New composition <b>$compositionName</b> added successfully!.");
    } else {
        $response = array("success" => false, "message" => "❌ Error: " . $stmt->error);
    }

    echo json_encode($response);
    $stmt->close();
    $conn->close();
    exit();
}
