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
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.opacity = '1';
    }
  }

  function clearError(inputId) {
    const errorElement = document.getElementById(inputId + '-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.opacity = '0';
    }
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

  // Form submission: let the form submit normally to backend
  form.addEventListener('submit', function(e) {
    // Validate first to prevent unnecessary requests
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

    if (!isValid) {
      e.preventDefault(); // stop submission if invalid
    } else {
      // Show loading spinner on submit button (optional)
      signinBtn.disabled = true;
      btnText.style.display = 'none';
      loadingSpinner.style.display = 'block';
    }
  });

  // Display server-side error messages from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  if (error) {
    let message = '';
    switch (error) {
      case 'missing_fields':
        message = 'Please fill in all required fields.';
        break;
      case 'invalid_credentials':
        message = 'Invalid email or password.';
        break;
      default:
        message = 'An error occurred. Please try again.';
    }
    alert(message);
  }
});
