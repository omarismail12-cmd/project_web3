document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.getElementById('signup-btn');
    const btnText = signupBtn.querySelector('.btn-text');
    const loadingSpinner = signupBtn.querySelector('.loading-spinner');
    
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strength-level');

    // Password toggle functionality
    function setupPasswordToggle(toggleId, passwordId) {
        const toggle = document.getElementById(toggleId);
        const password = document.getElementById(passwordId);
        
        toggle.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            const svg = toggle.querySelector('svg');
            if (type === 'text') {
                svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }

    setupPasswordToggle('toggle-password', 'password');
    setupPasswordToggle('toggle-confirm-password', 'confirm-password');

    // Password strength checker
    function checkPasswordStrength(password) {
        let score = 0;
        let strength = 'weak';
        
        if (password.length >= 8) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score >= 4) {
            strength = 'strong';
        } else if (score >= 3) {
            strength = 'good';
        } else if (score >= 2) {
            strength = 'fair';
        }

        return {
            score: score,
            strength: strength,
            percentage: Math.min((score / 5) * 100, 100)
        };
    }

    // Update password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const result = checkPasswordStrength(password);
        
        strengthBar.className = 'strength-bar ' + result.strength;
        strengthLevel.textContent = result.strength.charAt(0).toUpperCase() + result.strength.slice(1);
        
        // Update strength level color
        const colors = {
            weak: '#ef4444',
            fair: '#f59e0b',
            good: '#3b82f6',
            strong: '#10b981'
        };
        
        strengthLevel.style.color = colors[result.strength];
    });

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validatePassword(password) {
        return password.length >= 8;
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
    firstNameInput.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError('first-name', 'First name must be at least 2 characters');
        } else if (this.value) {
            clearError('first-name');
        }
    });

    lastNameInput.addEventListener('blur', function() {
        if (this.value && !validateName(this.value)) {
            showError('last-name', 'Last name must be at least 2 characters');
        } else if (this.value) {
            clearError('last-name');
        }
    });

    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        } else if (this.value) {
            clearError('email');
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && !validatePassword(this.value)) {
            showError('password', 'Password must be at least 8 characters');
        } else if (this.value) {
            clearError('password');
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        if (this.value && this.value !== passwordInput.value) {
            showError('confirm-password', 'Passwords do not match');
        } else if (this.value) {
            clearError('confirm-password');
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.value && this.value === passwordInput.value) {
            clearError('confirm-password');
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate first name
        if (!firstNameInput.value) {
            showError('first-name', 'First name is required');
            isValid = false;
        } else if (!validateName(firstNameInput.value)) {
            showError('first-name', 'First name must be at least 2 characters');
            isValid = false;
        } else {
            clearError('first-name');
        }
        
        // Validate last name
        if (!lastNameInput.value) {
            showError('last-name', 'Last name is required');
            isValid = false;
        } else if (!validateName(lastNameInput.value)) {
            showError('last-name', 'Last name must be at least 2 characters');
            isValid = false;
        } else {
            clearError('last-name');
        }
        
        // Validate email
        if (!emailInput.value) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        } else {
            clearError('password');
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value) {
            showError('confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError('confirm-password', 'Passwords do not match');
            isValid = false;
        } else {
            clearError('confirm-password');
        }
        
        // Validate terms
        if (!termsCheckbox.checked) {
            showError('terms', 'You must agree to the Terms of Service and Privacy Policy');
            isValid = false;
        } else {
            clearError('terms');
        }
        
        if (isValid) {
            // Show loading state
            signupBtn.disabled = true;
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'block';
            
            // Simulate form submission (remove this in production)
            setTimeout(() => {
                // Reset button state
                signupBtn.disabled = false;
                btnText.style.display = 'block';
                loadingSpinner.style.display = 'none';
                
                // In production, submit the form
                // form.submit();
                alert('Account created successfully! (This is a demo)');
            }, 2000);
        }
    });

    // Social auth buttons
    document.querySelector('.btn-social.google').addEventListener('click', function() {
        alert('Google sign-up would be implemented here');
    });

    document.querySelector('.btn-social.facebook').addEventListener('click', function() {
        alert('Facebook sign-up would be implemented here');
    });

    // Add smooth animations to form elements
    const formElements = form.querySelectorAll('input, button, label');
    formElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.05}s`;
        element.classList.add('slide-in');
    });
});

// Add CSS for slide-in animation
const style = document.createElement('style');
style.textContent = `
    .slide-in {
        animation: slideInElement 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes slideInElement {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);