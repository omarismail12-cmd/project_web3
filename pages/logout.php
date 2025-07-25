<?php
session_start();
session_unset();
session_destroy();

// Get the user ID from the session (if it exists)
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// Redirect to home page with cache busting
header("Location: ../pages/home.html?logout=1&t=" . time());
exit();
