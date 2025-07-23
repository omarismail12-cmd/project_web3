document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reservationForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToast = document.getElementById('successToast');

    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    };

    const emailJSConfig = {
        serviceID: 'service_z5su6mh',
        templateID: 'template_ezsew2r',
        publicKey: 'dLZTj0d5O9tacoaWO'
    };

    // Initialize EmailJS with your public key
    emailjs.init(emailJSConfig.publicKey);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        setLoadingState(true);

        // Debug form data
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }

        emailjs.sendForm(emailJSConfig.serviceID, emailJSConfig.templateID, form)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                setLoadingState(false);
                showSuccessToast();
                form.reset();
                clearAllErrors();
            }, error => {
                console.error('FAILED...', error);
                alert('Something went wrong while sending your message. Please try again later.\n' + JSON.stringify(error));
                setLoadingState(false);
            });
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'phone'];
        clearAllErrors();

        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const value = field.value.trim();

            if (!value) {
                showFieldError(field, 'This field is required');
                isValid = false;
                return;
            }

            if (fieldName === 'email' && !patterns.email.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
                return;
            }

            if (fieldName === 'phone' && !patterns.phone.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
                return;
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function clearAllErrors() {
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        const errorMessages = form.querySelectorAll('.error-message');
        inputs.forEach(input => input.classList.remove('error'));
        errorMessages.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    function showSuccessToast() {
        successToast.classList.add('show');
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 5000);
    }

    // Remove error styles on input change
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.name + '-error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                    errorElement.textContent = '';
                }
            }
        });
    });

    // Allow dismissing the success toast on click
    successToast.addEventListener('click', function () {
        this.classList.remove('show');
    });

    console.log('Stadium reservation form initialized successfully!');
});
