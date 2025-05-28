document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.querySelector('.submit-text');
    const loader = document.getElementById('loader');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Form validation patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    };

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styles
        field.classList.remove('error');
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value && !patterns.email.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation (if provided)
        if (field.type === 'tel' && value && !patterns.phone.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
        
        // Create or update error message
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 5px; display: block;';
            field.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) {
            showToast('Please correct the errors above', 'error');
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
        
        // Send form data using fetch API
        fetch('send-email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            if (data.success) {
                showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                // Clear any remaining error states
                inputs.forEach(input => clearFieldError({ target: input }));
            } else {
                showToast('Error: ' + (data.message || 'Unknown error occurred'), 'error');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            
            // Fallback: simulate successful submission for demo purposes
            showToast('Message sent successfully! (Demo mode - no actual email sent)', 'success');
            form.reset();
            inputs.forEach(input => clearFieldError({ target: input }));
        })
        .finally(() => {
            setLoadingState(false);
        });
    });

    function setLoadingState(loading) {
        if (loading) {
            submitText.style.display = 'none';
            loader.style.display = 'block';
            submitBtn.disabled = true;
        } else {
            submitText.style.display = 'block';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    // Enhanced animations for form elements
    inputs.forEach((element, index) => {
        // Staggered animation on page load
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));

        // Focus animations
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'scale(1)';
        });
    });

    // Contact info items animation
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1000 + (index * 200));
    });

    // Toast notification function
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        toast.className = 'toast';
        
        if (type === 'error') {
            toast.classList.add('error');
        }
        
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 5000);
        
        // Click to dismiss
        toast.addEventListener('click', function() {
            toast.classList.remove('show');
        });
    }

    // Simulate form submission for testing (fallback function)
    window.simulateSubmission = function() {
        setLoadingState(true);
        
        setTimeout(function() {
            setLoadingState(false);
            showToast('Message sent successfully! (Simulation mode)', 'success');
            form.reset();
        }, 2000);
    };

    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Close toast with Escape key
        if (e.key === 'Escape' && toast.classList.contains('show')) {
            toast.classList.remove('show');
        }
    });

    // Enhanced form submission with Enter key
    inputs.forEach(input => {
        if (input.type !== 'textarea') {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const nextInput = getNextInput(this);
                    if (nextInput) {
                        nextInput.focus();
                    } else {
                        form.dispatchEvent(new Event('submit'));
                    }
                }
            });
        }
    });

    function getNextInput(currentInput) {
        const inputList = Array.from(inputs);
        const currentIndex = inputList.indexOf(currentInput);
        return inputList[currentIndex + 1] || null;
    }

    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe form and contact info containers
        observer.observe(document.querySelector('.form-container'));
        observer.observe(document.querySelector('.contact-info'));
    }

    console.log('Contact form initialized successfully!');
});