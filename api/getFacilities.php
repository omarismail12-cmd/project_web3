<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
require_once '../db.php';

// Query to get all facilities
$query = "SELECT id, name, sport, location, price_per_hour, image_url, features, description FROM facilities ORDER BY name";
$result = $conn->query($query);

if ($result) {
    $facilities = [];
    while ($row = $result->fetch_assoc()) {
        $facilities[] = $row;
    }
    
    // Return facilities as JSON
    echo json_encode($facilities);
} else {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => 'Failed to fetch facilities: ' . $conn->error
    ]);
}

$conn->close();
?>
