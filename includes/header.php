<?php
if (session_status() === PHP_SESSION_NONE) session_start();
$isLoggedIn = isset($_SESSION['user_id']);
$userRole = $_SESSION['user_role'] ?? null;
$userName = $_SESSION['user_name'] ?? '';
?>
<header class="main-header">
  <nav class="navbar">
    <a href="home.html" class="logo">mala3b</a>
    <ul class="nav-links">
      <li><a href="home.html">Home</a></li>
      <li><a href="about.php">About</a></li>
      <li><a href="booking.php">Booking</a></li>
      <li><a href="business.php">Business</a></li>
      <li><a href="contact.php">Contact</a></li>
      <?php if ($isLoggedIn): ?>
        <?php if ($userRole === 'owner' || $userRole === 'admin'): ?>
          <li><a href="dashboard.html">Dashboard</a></li>
        <?php else: ?>
          <li><a href="profile.php">Profile</a></li>
        <?php endif; ?>
        <li><form action="../api/signout.php" method="post" style="display:inline;"><button type="submit" class="logout-btn">Logout</button></form></li>
      <?php else: ?>
        <li><a href="SignIn.html" class="btn btn-signin">Sign In</a></li>
        <li><a href="SignUp.html" class="btn btn-signup">Sign Up</a></li>
      <?php endif; ?>
    </ul>
    <?php if ($isLoggedIn): ?>
      <span class="welcome-msg">Welcome, <?php echo htmlspecialchars($userName); ?>!</span>
    <?php endif; ?>
  </nav>
</header>
<style>
.main-header {background: #fff; box-shadow: 0 2px 8px 0 rgba(34,197,94,0.06); padding: 0.5rem 0;}
.navbar {display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; padding: 0 2rem;}
.logo {font-weight: bold; font-size: 1.5rem; color: #22c55e; text-decoration: none; letter-spacing: 1px;}
.nav-links {list-style: none; display: flex; gap: 1.2rem; align-items: center;}
.nav-links li {display: inline;}
.nav-links a {text-decoration: none; color: #1e293b; font-weight: 500; transition: color 0.2s;}
.nav-links a:hover {color: #22c55e;}
.btn-signin, .btn-signup, .logout-btn {padding: 0.5rem 1.1rem; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s;}
.btn-signin {background: #fff; color: #22c55e; border: 2px solid #22c55e;}
.btn-signin:hover {background: #22c55e; color: #fff;}
.btn-signup {background: #22c55e; color: #fff;}
.btn-signup:hover {background: #16a34a;}
.logout-btn {background: #ef4444; color: #fff; margin-left: 0.5rem;}
.logout-btn:hover {background: #b91c1c;}
.welcome-msg {margin-left: 1.5rem; color: #334155; font-size: 1rem; font-weight: 500;}
@media (max-width: 700px) {.navbar {flex-direction: column; padding: 0 0.5rem;} .nav-links {flex-direction: column; gap: 0.5rem;} .welcome-msg {margin-left: 0; margin-top: 0.5rem;}}
</style>
