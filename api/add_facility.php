<?php
session_start();
require_once '../db.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$owner_id = $_SESSION['user_id'];

// Verify that the user exists in the users table
$userCheckQuery = "SELECT id FROM users WHERE id = ?";
$stmt = $conn->prepare($userCheckQuery);
$stmt->bind_param("i", $owner_id);
$stmt->execute();
$userResult = $stmt->get_result();

if ($userResult->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid user session']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'sport', 'price', 'capacity'];
foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit;
    }
}

$name = trim($_POST['name']);
$sport = trim($_POST['sport']);
$description = trim($_POST['description'] ?? '');
$features = isset($_POST['features']) && trim($_POST['features']) !== ''
    ? json_encode(array_map('trim', explode(',', $_POST['features'])))
    : '[]';
$price = floatval($_POST['price']);
$image_url = trim($_POST['image_url'] ?? '');
$capacity = intval($_POST['capacity']);
$availability = 1; // Default to available

// Validate price and capacity
if ($price <= 0) {
    echo json_encode(['success' => false, 'message' => 'Price must be greater than 0']);
    exit;
}

if ($capacity <= 0) {
    echo json_encode(['success' => false, 'message' => 'Capacity must be greater than 0']);
    exit;
}

try {
    // Check if facility name already exists for this owner
    $checkQuery = "SELECT id FROM facilities WHERE name = ? AND owner_id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("si", $name, $owner_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'A facility with this name already exists']);
        exit;
    }
    
    // Insert new facility
    $insertQuery = "INSERT INTO facilities (name, sport, description, features, price, image_url, capacity, availability, owner_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("ssssdsiis", $name, $sport, $description, $features, $price, $image_url, $capacity, $availability, $owner_id);
    
    if ($stmt->execute()) {
        $facility_id = $conn->insert_id;
        echo json_encode([
            'success' => true, 
            'message' => 'Facility added successfully',
            'facility_id' => $facility_id
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding facility: ' . $stmt->error]);
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error adding facility: ' . $e->getMessage()]);
}

$conn->close();
?>
