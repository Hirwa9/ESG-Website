<?php
include '../../connect.php';

// Query to fetch all compositions
$query = "SELECT * FROM esg_compositions ORDER BY compositionDate";
$queryResult = mysqli_query($conn, $query);

$esgCompositions = [];

if (mysqli_num_rows($queryResult) > 0) {
    // Store all compositions data
    while ($row = mysqli_fetch_assoc($queryResult)) {
        $esgCompositions[] = $row;
    }
}

// Convert the data (PHP array) to JSON
echo json_encode($esgCompositions);

// Close the connection
mysqli_close($conn);