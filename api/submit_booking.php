<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$host = 'localhost';
$db = 'mala3b';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'DB Connection Failed']));
}

// استلام البيانات
$facility_id = $_POST['facility_id'];
$user_id = $_POST['user_id'];
$booking_date = $_POST['booking_date'];
$start_time = $_POST['start_time'];
$duration = (int)$_POST['duration']; 
$players = $_POST['players'];

// Server-side validation
if ($players > 26) {
    echo json_encode(['status' => 'error', 'message' => 'Number of players cannot exceed 26.']);
    $conn->close();
    exit;
}
$today = date('Y-m-d');
if ($booking_date < $today) {
    echo json_encode(['status' => 'error', 'message' => 'Booking date cannot be in the past.']);
    $conn->close();
    exit;
}

$start = new DateTime($start_time);
$end = clone $start;
$end->modify("+{$duration} hours");
$new_start_time = $start->format('H:i:s');
$new_end_time = $end->format('H:i:s');

 
$query = "SELECT * FROM bookings 
          WHERE facility_id = ? AND booking_date = ? 
          AND (
                (? < ADDTIME(start_time, SEC_TO_TIME(duration * 3600))) 
                AND 
                (? > start_time)
              )";

$stmt = $conn->prepare($query);
$stmt->bind_param("isss", $facility_id, $booking_date, $new_start_time, $new_end_time);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Time overlaps with another booking. Choose a different time.']);
    exit;
}

$booking_id = 'BK' . time();
$status = 'pending';
$created_at = date('Y-m-d H:i:s');

$insert = $conn->prepare("INSERT INTO bookings 
    (id, facility_id, user_id, booking_date, start_time, duration, players, status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$insert->bind_param("siissiiss", $booking_id, $facility_id, $user_id, $booking_date, $start_time, $duration, $players, $status, $created_at);

if ($insert->execute()) {
    echo json_encode(['status' => 'success', 'booking_id' => $booking_id]);
} else {
    echo json_encode(['status' => 'error', 'message' => $insert->error]);
}

$conn->close();
?>
