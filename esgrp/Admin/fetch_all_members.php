<?php
include '../../connect.php';

// Query to fetch all compositions
$query = "SELECT * FROM esg_members ORDER BY lastName";
$queryResult = mysqli_query($conn, $query);

$esgMembers = [];

if (mysqli_num_rows($queryResult) > 0) {
    // Store all members data
    while ($row = mysqli_fetch_assoc($queryResult)) {
        $esgMembers[] = $row;
    }
}

// Convert the data (PHP array) to JSON
echo json_encode($esgMembers);

// Close the connection
mysqli_close($conn);