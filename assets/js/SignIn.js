document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signin-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    const signinBtn = document.getElementById('signin-btn');
    const btnText = signinBtn.querySelector('.btn-text');
    const loadingSpinner = signinBtn.querySelector('.loading-spinner');

    // Password toggle functionality
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const svg = togglePassword.querySelector('svg');
        if (type === 'text') {
            svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        } else {
            svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
    });

    // Validation helpers
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 6) {
            showError('password', 'Password must be at least 6 characters');
        } else {
            clearError('password');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        if (!emailInput.value) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (!passwordInput.value) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError('password');
        }
        
        if (isValid) {
            signinBtn.disabled = true;
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'block';

            setTimeout(() => {
                signinBtn.disabled = false;
                btnText.style.display = 'block';
                loadingSpinner.style.display = 'none';

                let role = 'client';
                if (emailInput.value.trim().toLowerCase() === 'admin@sportbook.com') {
                    role = 'admin';
                }

                localStorage.setItem('userRole', role);
                localStorage.setItem('userEmail', emailInput.value);

                alert(`Sign in successful! You are logged in as ${role}.`);
                if (role === 'admin') {
                    // Redirect to admin dashboard
                    window.location.href = 'dashboard.html';
                }
                else{
                    window.location.href ='home.html'
                }
            }, 1000);
        }
    });

    // Social auth demo
    document.querySelector('.btn-social.google').addEventListener('click', function() {
        alert('Google sign-in would be implemented here');
    });

    document.querySelector('.btn-social.facebook').addEventListener('click', function() {
        alert('Facebook sign-in would be implemented here');
    });

    // Animation
    const formElements = form.querySelectorAll('input, button');
    formElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('slide-in');
    });
});

// CSS for slide-in
const style = document.createElement('style');
style.textContent = `
.slide-in {
    animation: slideInElement 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}
@keyframes slideInElement {
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
