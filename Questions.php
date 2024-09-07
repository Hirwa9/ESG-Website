<?php

$question = $_POST['question'];
$sub = "Question from ESG friend";
$mailheader = "Question asked from ESG\r\n";

$recipient = "easternsingersg@gmail.com";

$bodi = "<html><body>";
$bodi .= "<h2 style='background-color: brown; padding: 1rem; border-radius: 10px; border-bottom: 4px solid white; color: white'>From FAQs</h2>";
$bodi .= "<div style='background-color: #0e407c; color: whitesmoke; font-weight: 600; padding: .5rem; border-radius: 5px'><h3 style='border-bottom: 2px solid white; color: goldenrod; display: inline; padding-bottom:p 5px'>Question</h3>";
$bodi .= "<p style='border: 1px solid brown; border-left: 8px solid brown; border-top-right-radius: 10px; padding: 10px; padding-left: 1.5rem'>".$question."</p>";
$bodi .= "<p style='padding-top: 1.5rem'>Counting down 24 hrs to upload appropriate answer.</p></div>";
$bodi .= "</body></html>";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
mail($recipient, $mailheader, $bodi, $headers) or die();

echo '<!DOCTYPE html>
<html>
<head>
    <title>Question submitted</title>
    
    <link rel="icon" type="image/x-icon" href="Pics/ESG_favicon.ico">
    <link rel="stylesheet" type="text/css" href="ESG.css">
    <meta charset="utf-8">
    <meta name="viewport" content="width= device-width, initial-scale=1.0">
    <meta name="author" content="Hirwa Willy">
    <meta name="keywords" content="HTML , CSS">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
	
	<!-- <script src="bootstrap/js/jquery-3.6.1.js"></script> -->
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="bootstrap/fontawesome/js/all.min.js">

	<link rel="stylesheet" href="bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="bootstrap/bootstrap.min.css.map">
	<link rel="stylesheet" href="bootstrap/fontawesome/css/all.min.css">
	<!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"> -->


</head>
<body class="bg-myBlue text-left">
        <div class="offset-sm-1 col-sm-10 offset-md-3 col-md-6 p-3" id="Thankcmnt">
            <h2>Sent <span class="fa fa-check"></span></h2>
            <p class="pt-4">
                Thank you for asking ! Your question and the answer will be posted in the list of <span title="Frequently Asked Questions">FAQ</span> before 24 hours. <u>Please, come again to check</u>.
            </p><br><br>
            <h4>God be with you!!</h4><br><br>
            <p class="back text-center">Back to <a href="Eastern Singers_FAQs">questions.</a></p>
            <p class="back text-center">Back to <a href="About">homepage.</a></p>
        </div>
        <div class="container-fluid text-center" id="BRAND-e3">ESG</div>
</body>
</html>';
?>