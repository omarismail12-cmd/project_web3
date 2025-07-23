<?php
session_start();
require '../db.php'; // تأكد من أن هذا الملف يحتوي على الاتصال الصحيح بـ MySQL

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'owner') {
    echo json_encode(['error' => 'Access denied']);
    exit;
}

$owner_id = $_SESSION['user_id'];

$sql = "SELECT id, name, sport, price, capacity, availability FROM facilities WHERE owner_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $owner_id);
$stmt->execute();
$result = $stmt->get_result();

$sports = [];

while ($row = $result->fetch_assoc()) {
    $sports[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'icon' => '⚽', // يمكن تخصيصها حسب الرياضة لاحقًا
        'price' => '$' . $row['price'],
        'courts' => 1, // إن كان ملعبًا واحدًا فقط، عدل لاحقًا إذا عندك جدول عدد الملاعب
        'available' => $row['availability']
    ];
}

echo json_encode($sports);