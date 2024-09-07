<?php
include '../../connect.php';

// Query to fetch existing admin users
$query = "SELECT * FROM songs_to_upload ORDER BY id DESC";
$queryResult = mysqli_query($conn, $query);

$songs = [];

if (mysqli_num_rows($queryResult) > 0) {
    while ($row = mysqli_fetch_assoc($queryResult)) {
        $songs[] = $row;
    }
}

echo json_encode($songs);

// Close the connection
mysqli_close($conn);
