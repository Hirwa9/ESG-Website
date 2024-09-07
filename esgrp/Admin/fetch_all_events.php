<?php
include '../../connect.php';

// Query to fetch all compositions
$query = "SELECT * FROM esg_events ORDER BY eventDate DESC";
$queryResult = mysqli_query($conn, $query);

$esgEvents = [];

if (mysqli_num_rows($queryResult) > 0) {
    // Store all events data
    while ($row = mysqli_fetch_assoc($queryResult)) {
        $esgEvents[] = $row;
    }
}

// Convert the data (PHP array) to JSON
echo json_encode($esgEvents);

// Close the connection
mysqli_close($conn);