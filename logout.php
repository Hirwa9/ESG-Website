<?php
// Start session
session_start();
// Unset all of the session variables
$_SESSION = array();
// Destroy the session
session_destroy();
// Get the redirect URL
// $redirect = isset($_GET['redirect']) ? $_GET['redirect'] : 'index.html';
// Redirect to the original page or home page
// header("Location: $redirect");
header("Location: login_page.php");
exit();