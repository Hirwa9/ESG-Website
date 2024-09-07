<?php
function php_console_log($param) {
    $encodedParam = json_encode($param);
    echo "<script>console.log({$param})</script>";
    echo "<script>console.log({$encodedParam})</script>";
};