<?php
session_start();
require '../db.php'; // تأكد من وجود الاتصال بقاعدة البيانات

// تأكد أن المستخدم مسجّل دخول ومالك
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'owner') {
    echo json_encode(['error' => 'Access denied']);
    exit;
}

$owner_id = $_SESSION['user_id'];

// إجمالي الحجوزات
$q1 = $conn->prepare("SELECT COUNT(*) FROM bookings b INNER JOIN facilities f ON b.facility_id = f.id WHERE f.owner_id = ?");
$q1->bind_param("i", $owner_id);
$q1->execute();
$q1->bind_result($totalBookings);
$q1->fetch();
$q1->close();

// عدد الملاعب النشطة
$q2 = $conn->prepare("SELECT COUNT(*) FROM facilities WHERE owner_id = ?");
$q2->bind_param("i", $owner_id);
$q2->execute();
$q2->bind_result($activeCourts);
$q2->fetch();
$q2->close();

// إجمالي الإيرادات (نفترض أن الإيراد = السعر × عدد الساعات)
$q3 = $conn->prepare("
    SELECT SUM(f.price * b.duration) FROM bookings b
    INNER JOIN facilities f ON b.facility_id = f.id
    WHERE f.owner_id = ? AND b.status = 'confirmed'
");
$q3->bind_param("i", $owner_id);
$q3->execute();
$q3->bind_result($revenue);
$q3->fetch();
$q3->close();
$revenue = $revenue ?? 0; // منع null

// عدد الأعضاء الذين حجزوا من ملاعبه
$q4 = $conn->prepare("
    SELECT COUNT(DISTINCT b.user_id) FROM bookings b
    INNER JOIN facilities f ON b.facility_id = f.id
    WHERE f.owner_id = ?
");
$q4->bind_param("i", $owner_id);
$q4->execute();
$q4->bind_result($members);
$q4->fetch();
$q4->close();

echo json_encode([
    'totalBookings' => $totalBookings,
    'activeCourts' => $activeCourts,
    'revenue' => number_format($revenue, 2),
    'members' => $members
]);
