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
    // Get all bookings for facilities owned by the user
    $query = "SELECT b.id, b.facility_id, b.booking_date, b.start_time, b.duration, 
                     b.players, b.status, b.created_at, f.name as facility_name, f.price
              FROM bookings b 
              JOIN facilities f ON b.facility_id = f.id 
              WHERE f.owner_id = ? 
              ORDER BY b.booking_date DESC, b.start_time DESC";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $owner_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = [
            'id' => (int)$row['id'],
            'facility_id' => (int)$row['facility_id'],
            'facility_name' => $row['facility_name'],
            'booking_date' => $row['booking_date'],
            'start_time' => $row['start_time'],
            'duration' => (float)$row['duration'],
            'players' => (int)$row['players'],
            'status' => $row['status'],
            'price' => (float)$row['price'],
            'created_at' => $row['created_at']
        ];
    }
    
    echo json_encode(['success' => true, 'data' => $bookings]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching bookings: ' . $e->getMessage()]);
}

$conn->close();
?>
