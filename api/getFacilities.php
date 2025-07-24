<?php
header('Content-Type: application/json');
require_once '../db.php';

$sql = "SELECT * FROM facilities";  
$result = $conn->query($sql);

$facilities = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Handle image URLs properly
        if (empty($row['image']) || $row['image'] === 'undefined' || $row['image'] === 'null') {
            $row['image'] = null;
        } else {
            // If it's already a full URL (starts with http/https), keep it as is
            if (strpos($row['image'], 'http://') === 0 || strpos($row['image'], 'https://') === 0) {
                // Keep the full URL as is
                $row['image'] = $row['image'];
            } else {
                // If it's a local filename, add the local path prefix
                $row['image'] = 'http://localhost/project_web3/images/' . $row['image'];
            }
        }
        $facilities[] = $row;
    }
}

echo json_encode($facilities);
?>