// Simple authentication utility for StadiumBook
// Checks if user is logged in based on localStorage user_id

function isLoggedIn() {
    return !!localStorage.getItem('user_id');
}

function requireAuth(redirectUrl = 'login.html', message = null) {
    if (!isLoggedIn()) {
        if (message) {
            alert(message);
        }
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

// Optionally, export for modules
// export { isLoggedIn, requireAuth };
