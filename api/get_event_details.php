<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection
require_once '../db.php';

// Get event ID from query parameter
$event_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($event_id <= 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid event ID'
    ]);
    exit;
}

try {
    // Prepare and execute query to get specific event
    $sql = "SELECT * FROM events WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $event = $result->fetch_assoc();
        
        // Parse JSON fields
        $event['requirements'] = json_decode($event['requirements'], true) ?? [];
        $event['prizes'] = json_decode($event['prizes'], true) ?? [];
        
        // Ensure numeric fields are properly typed
        $event['price'] = floatval($event['price']);
        $event['maxParticipants'] = intval($event['maxParticipants']);
        $event['currentParticipants'] = intval($event['currentParticipants']);
        
        echo json_encode([
            'success' => true,
            'event' => $event
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Event not found'
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

// Close connection
$conn->close();
?>
