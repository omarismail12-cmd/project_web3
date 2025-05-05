<?php
/**
 * Main index file for the fitness website
 * This file includes all necessary components to display the complete site
 */

// Include configuration
require_once 'includes/config.php';

// Start the page with header
include_once 'includes/header.php';

// Include the navigation
include_once 'includes/navbar.php';

// Include the hero banner section for homepage
include_once 'includes/hero.php';

// Main content area - conditionally include page content based on URL
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Sanitize the page parameter to prevent directory traversal
$page = preg_replace('/[^a-zA-Z0-9_-]/', '', $page);

// Define allowed pages
$allowed_pages = ['home', 'contact', 'about', 'services', 'classes', 'trainers', 'membership'];

// Check if page exists and is allowed
if (in_array($page, $allowed_pages) && file_exists("pages/{$page}.php")) {
    include_once "pages/{$page}.php";
} else {
    // Default to home page if page not found
    include_once "pages/home.php";
}

// Include footer
include_once 'includes/footer.php';
?>