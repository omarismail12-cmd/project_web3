<?php
header('Content-Type: application/json');
require_once '../db.php';

$sql = "SELECT * FROM facilities";  
$result = $conn->query($sql);

$facilities = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Ensure image field is properly set
        if (empty($row['image']) || $row['image'] === 'undefined') {
            $row['image'] = null;
        } else {
            $row['image'] = '/facilities/' . $row['image'];
        }
        $facilities[] = $row;
    }
}

echo json_encode($facilities);
?>