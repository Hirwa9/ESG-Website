<?php
// Database configuration
// Local
$servername = "localhost";
$username = "root";
$password = "";
$database = "esgdb";
// $port = 3306; // MySQL port provided

try {
    // Create connection with port
    // $conn = new mysqli($servername, $username, $password, $database, $port);
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    error_log($e->getMessage()); // Log the error
    die("Database connection error. Please try again."); // User-friendly message
}
