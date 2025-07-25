<?php
session_start();
require_once '../db.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$owner_id = $_SESSION['user_id'];

try {
    // Get all facilities owned by the user
    $query = "SELECT id, name, sport, description, features, price, image_url, capacity, availability 
              FROM facilities 
              WHERE owner_id = ? 
              ORDER BY name ASC";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $owner_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $facilities = [];
    while ($row = $result->fetch_assoc()) {
        $facilities[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'sport' => $row['sport'],
            'description' => $row['description'],
            'features' => $row['features'],
            'price' => number_format((float)$row['price'], 2),
            'image_url' => $row['image_url'],
            'capacity' => (int)$row['capacity'],
            'availability' => $row['availability']
        ];
    }
    
    echo json_encode(['success' => true, 'data' => $facilities]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching facilities: ' . $e->getMessage()]);
}

$conn->close();
?>
