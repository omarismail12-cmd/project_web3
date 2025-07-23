<?php

$host = 'localhost';
$db = 'mala3b';
$user = 'root@localhost';
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

$insert = $conn->prepare("INSERT INTO bookings 
    (id, facility_id, user_id, booking_date, start_time, duration, players) 
    VALUES (?, ?, ?, ?, ?, ?, ?)");
$insert->bind_param("siissii", $booking_id, $facility_id, $user_id, $booking_date, $start_time, $duration, $players);

if ($insert->execute()) {
    echo json_encode(['status' => 'success', 'booking_id' => $booking_id]);
} else {
    echo json_encode(['status' => 'error', 'message' => $insert->error]);
}

$conn->close();
?>
