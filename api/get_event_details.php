<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection
require_once '../db.php';

// Get event ID from query parameter
$eventId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($eventId <= 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid event ID'
    ]);
    exit;
}

// Prepare SQL statement to get event details
$sql = "SELECT * FROM events WHERE id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $eventId);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $event = $result->fetch_assoc();
    
    // Decode JSON fields if they exist
    if (isset($event['requirements']) && !empty($event['requirements'])) {
        $event['requirements'] = json_decode($event['requirements'], true) ?? [];
    } else {
        $event['requirements'] = [];
    }
    
    if (isset($event['prizes']) && !empty($event['prizes'])) {
        $event['prizes'] = json_decode($event['prizes'], true) ?? [];
    } else {
        $event['prizes'] = [];
    }
    
    // Return success response with event data
    echo json_encode([
        'success' => true,
        'event' => $event
    ]);
} else {
    // Event not found
    echo json_encode([
        'success' => false,
        'message' => 'Event not found'
    ]);
}

$stmt->close();
$conn->close();
?>
