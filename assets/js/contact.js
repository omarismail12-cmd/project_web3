
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToast = document.getElementById('successToast');

    // Form validation patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    };

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Get form data
        const formData = new FormData(form);
        
        // Log form data for debugging
        console.log('Form submission data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // Simulate form submission
        setTimeout(() => {
            setLoadingState(false);
            showSuccessToast();
            form.reset();
            clearAllErrors();
        }, 2000);
    });

    // Validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'phone'];
        
        // Clear all previous errors
        clearAllErrors();
        
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const value = field.value.trim();
            
            if (!value) {
                showFieldError(field, 'This field is required');
                isValid = false;
                return;
            }
            
            // Email validation
            if (fieldName === 'email' && !patterns.email.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
                return;
            }
            
            // Phone validation
            if (fieldName === 'phone' && !patterns.phone.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
                return;
            }
        });
        
        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // Clear all errors
    function clearAllErrors() {
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        const errorMessages = form.querySelectorAll('.error-message');
        
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        
        errorMessages.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
    }

    // Set loading state
    function setLoadingState(loading) {
        const submitText = submitBtn.querySelector('.submit-text');
        const loader = submitBtn.querySelector('.loader');
        
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Show success toast
    function showSuccessToast() {
        successToast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 5000);
    }

    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.name + '-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });

    // Click toast to dismiss
    successToast.addEventListener('click', function() {
        this.classList.remove('show');
    });

    console.log('Stadium reservation form initialized successfully!');
});
