<?php
/**
 * Configuration file for the fitness website
 */

// Error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection parameters
define('DB_HOST', 'localhost');
define('DB_USER', 'fitness_user');
define('DB_PASS', 'your_password_here');
define('DB_NAME', 'fitness_db');

// Site configuration
define('SITE_NAME', 'A Little Place of Fitness');
define('SITE_URL', 'http://localhost/fitness'); // Change for production
define('ADMIN_EMAIL', 'info@fitnessplace.com');

// Social media links
$social_links = [
    'facebook' => 'https://facebook.com/fitnessplace',
    'instagram' => 'https://instagram.com/fitnessplace',
    'twitter' => 'https://twitter.com/fitnessplace',
    'youtube' => 'https://youtube.com/channel/fitnessplace'
];

// Load CSS files
$css_files = [
    'components/navbar.css',
    'components/header.css',
    'components/footer.css',
    'pages/home.css',
    'pages/contact.css',
    'pages/main.css',
    'pages/variable.css'
];

// Load JS files
$js_files = [
    'js/main.js',
    'js/header.js',
    'js/contact.js'
];

// Custom function to get assets with version
function get_asset_url($path) {
    return SITE_URL . '/' . $path . '?v=' . filemtime($_SERVER['DOCUMENT_ROOT'] . '/' . $path);
}

// Connect to database (optional, uncomment if needed)
/*
try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
*/

// Session start
session_start();