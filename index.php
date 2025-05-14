<?php
require_once 'includes/config.php';
require_once 'includes/header.php';
require_once 'includes/navigation.php';

// Load the appropriate page content
$page = isset($_GET['page']) ? $_GET['page'] : 'home';
$validPages = ['home', 'about', 'programs', 'events', 'contact', 'facilities'];

if (in_array($page, $validPages)) {
    require_once "pages/$page.php";
} else {
    require_once 'pages/home.php';
}

require_once 'includes/footer.php';
?>