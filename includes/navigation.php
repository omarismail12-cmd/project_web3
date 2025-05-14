<header class="header">
    <div class="header-container">
        <div>
            <h1 class="logo">Mala3b</h1>
        </div>

        <div class="nav-container">
            <nav class="nav">
                <a href="index.php?page=home" class="<?php echo ($page == 'home') ? 'active' : ''; ?>">Home</a>
                <a href="index.php?page=about" class="<?php echo ($page == 'about') ? 'active' : ''; ?>">About</a>
                <a href="index.php?page=programs" class="<?php echo ($page == 'programs') ? 'active' : ''; ?>">Programs</a>
                <a href="index.php?page=events" class="<?php echo ($page == 'events') ? 'active' : ''; ?>">Events</a>
                <a href="index.php?page=contact" class="<?php echo ($page == 'contact') ? 'active' : ''; ?>">Contact</a>
            </nav>

            <div class="right">
                <div class="icon-group">
                    <div class="icon">
                        <i class="search-icon"></i>
                    </div>
                    <div class="icon">
                        <i class="user-icon"></i>
                    </div>
                    <div class="icon">
                        <i class="chevron-icon"></i>
                    </div>
                </div>
                <a href="index.php?page=contact" class="contact-btn">Contact Us</a>
            </div>
        </div>

        <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    </div>
</header>