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
    // Get total facilities owned by user
    $facilitiesQuery = "SELECT COUNT(*) as total_facilities, 
                               SUM(CASE WHEN availability = 1 THEN 1 ELSE 0 END) as available_facilities 
                        FROM facilities WHERE owner_id = ?";
    $stmt = $conn->prepare($facilitiesQuery);
    $stmt->bind_param("i", $owner_id);
    $stmt->execute();
    $facilitiesResult = $stmt->get_result()->fetch_assoc();
    
    // Get total bookings and profit for user's facilities
    $bookingsQuery = "SELECT COUNT(*) as total_bookings,
                             SUM(CASE WHEN b.status = 'confirmed' THEN f.price * b.duration ELSE 0 END) as total_profit
                      FROM bookings b 
                      JOIN facilities f ON b.facility_id = f.id 
                      WHERE f.owner_id = ?";
    $stmt = $conn->prepare($bookingsQuery);
    $stmt->bind_param("i", $owner_id);
    $stmt->execute();
    $bookingsResult = $stmt->get_result()->fetch_assoc();
    
    $stats = [
        'totalFacilities' => (int)$facilitiesResult['total_facilities'],
        'availableFacilities' => (int)$facilitiesResult['available_facilities'],
        'totalBookings' => (int)$bookingsResult['total_bookings'],
        'totalProfit' => number_format((float)$bookingsResult['total_profit'], 2)
    ];
    
    echo json_encode(['success' => true, 'data' => $stats]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching statistics: ' . $e->getMessage()]);
}

$conn->close();
?>
