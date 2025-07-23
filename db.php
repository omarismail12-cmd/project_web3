<?php
$host = 'localhost';
$db = 'mala3b';
$user = 'root';
$pass = ''; // إذا لم تضع كلمة مرور في MySQL

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'DB connection failed']));
}
?>
