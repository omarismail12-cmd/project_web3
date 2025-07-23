document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const btnText = signupBtn.querySelector('.btn-text');
    const loadingSpinner = signupBtn.querySelector('.loading-spinner');

    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const strengthLevel = document.getElementById('strength-level');
    const strengthBar = document.querySelector('.strength-bar');

    // Toggle password visibility
    setupPasswordToggle('toggle-password', 'password');
    setupPasswordToggle('toggle-confirm-password', 'confirm-password');

    // Show password strength as user types
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });

    // When "Create Account" button is clicked
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault(); // prevent form submission

        clearAllErrors();

        const isValid = validateForm();
        if (isValid) {
            signupBtn.disabled = true;
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'block';

            // Simulate API / saving delay
            setTimeout(() => {
                // Save user data in localStorage
                const user = {
                    firstName: firstNameInput.value.trim(),
                    lastName: lastNameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value // Note: NEVER store plain passwords in real apps
                };
                localStorage.setItem('mala3bUser', JSON.stringify(user));
                localStorage.setItem('userRole', 'client'); // example extra info

                signupBtn.disabled = false;
                btnText.style.display = 'block';
                loadingSpinner.style.display = 'none';

                alert('✅ Account created successfully! (saved to localStorage)');
                form.reset();
                strengthBar.className = 'strength-bar'; // reset strength
                strengthLevel.textContent = 'Weak';

                // Optional redirect:
                // window.location.href = 'dashboard.html';
            }, 1000);
        }
    });

    // === Functions ===
    function setupPasswordToggle(toggleId, passwordId) {
        const toggle = document.getElementById(toggleId);
        const password = document.getElementById(passwordId);

        toggle.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
        });
    }

    function updatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let level = 'weak';
        if (score >= 4) level = 'strong';
        else if (score === 3) level = 'good';
        else if (score === 2) level = 'fair';

        strengthBar.className = 'strength-bar ' + level;
        strengthLevel.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    }

    function validateForm() {
        let isValid = true;

        if (!firstNameInput.value.trim()) {
            showError('first-name', 'First name is required');
            isValid = false;
        }
        if (!lastNameInput.value.trim()) {
            showError('last-name', 'Last name is required');
            isValid = false;
        }
        if (!emailInput.value.trim()) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError('email', 'Enter a valid email');
            isValid = false;
        }
        if (!passwordInput.value) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        }
        if (!confirmPasswordInput.value) {
            showError('confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError('confirm-password', 'Passwords do not match');
            isValid = false;
        }
        if (!termsCheckbox.checked) {
            showError('terms', 'You must agree to terms');
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(inputId, message) {
        const errorEl = document.getElementById(inputId + '-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.opacity = '1';
        }
    }

    function clearAllErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(el => {
            el.textContent = '';
            el.style.opacity = '0';
        });
    }
});
