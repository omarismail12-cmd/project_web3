<?php
header('Content-Type: application/json');
require_once 'db.php'; // الاتصال بقاعدة البيانات

$sql = "SELECT * FROM facilities WHERE country = 'Lebanon'";
$result = $conn->query($sql);

$facilities = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $facilities[] = $row;
    }
}

echo json_encode($facilities);
?>
