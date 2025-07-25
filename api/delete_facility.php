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

// Validate required fields
if (!isset($_POST['facility_id']) || empty($_POST['facility_id'])) {
    echo json_encode(['success' => false, 'message' => 'Facility ID is required']);
    exit;
}

$facility_id = intval($_POST['facility_id']);

try {
    // Check if facility exists and belongs to the user
    $checkQuery = "SELECT id, name FROM facilities WHERE id = ? AND owner_id = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("ii", $facility_id, $owner_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Facility not found or you do not have permission to delete it']);
        exit;
    }
    
    $facility = $result->fetch_assoc();
    
    // Check if there are any active bookings for this facility
    $bookingCheckQuery = "SELECT COUNT(*) as active_bookings FROM bookings 
                          WHERE facility_id = ? AND status = 'confirmed' 
                          AND booking_date >= CURDATE()";
    $stmt = $conn->prepare($bookingCheckQuery);
    $stmt->bind_param("i", $facility_id);
    $stmt->execute();
    $bookingResult = $stmt->get_result()->fetch_assoc();
    
    if ($bookingResult['active_bookings'] > 0) {
        echo json_encode([
            'success' => false, 
            'message' => 'Cannot delete facility with active bookings. Please cancel or complete all bookings first.'
        ]);
        exit;
    }
    
    // Delete the facility
    $deleteQuery = "DELETE FROM facilities WHERE id = ? AND owner_id = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param("ii", $facility_id, $owner_id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Facility "' . $facility['name'] . '" deleted successfully'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No facility was deleted']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting facility: ' . $stmt->error]);
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error deleting facility: ' . $e->getMessage()]);
}

$conn->close();
?>
