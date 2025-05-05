<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Header</title>
  <link rel="stylesheet" href="home.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>

<header class="main-header">
  <div class="container">
    <!-- Logo -->
    <a href="/" class="logo">
      <img src="/web/image/website/1/logo/mala3b?unique=4adc91a" alt="mala3b">
    </a>

    <!-- Mobile Menu Toggle -->
    <button class="menu-toggle" onclick="toggleMobileMenu()">
      <i class="fas fa-bars"></i>
    </button>
  </div>

  <!-- Include Navbar -->
  <?php include 'navbar.php'; ?>
</header>

<script src="header.js"></script>
</body>
</html>
