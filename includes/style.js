document.addEventListener('DOMContentLoaded', function () {
     console.log("DOM fully loaded");
    setupMobileMenu();
    updateFooterYear();
    enableSmoothScroll();
    setupContactForm();
});

// === Mobile Menu ===
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (!mobileMenuBtn || !mobileNav) {
        console.warn('🚫');
        return;
    }


    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });


    mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            setTimeout(() => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }, 100); // سرعة الإغلاق بعد الضغط
        });
    });


    document.addEventListener('click', (event) => {
        if (
            !mobileMenuBtn.contains(event.target) &&
            !mobileNav.contains(event.target)
        ) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
}


// === Footer Year ===
function updateFooterYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// === Smooth Scroll ===
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile nav if open
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                const mobileNav = document.getElementById('mobileNav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

// === Contact Form ===
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    if (!form || !submitBtn) return;

    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    };

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorMsg = formGroup?.querySelector('.error-message');

        if (!formGroup || !errorMsg) return true;

        formGroup.classList.remove('error');
        errorMsg.textContent = '';

        if (field.hasAttribute('required') && !value) {
            showFieldError(formGroup, 'This field is required');
            return false;
        }

        if (field.type === 'email' && value && !patterns.email.test(value)) {
            showFieldError(formGroup, 'Please enter a valid email address');
            return false;
        }

        if (field.type === 'tel' && value && !patterns.phone.test(value)) {
            showFieldError(formGroup, 'Please enter a valid phone number');
            return false;
        }

        return true;
    }

    function showFieldError(formGroup, message) {
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) errorMsg.textContent = message;
    }

    function clearFieldError(e) {
        const formGroup = e.target.closest('.form-group');
        const errorMsg = formGroup?.querySelector('.error-message');
        if (formGroup && errorMsg) {
            formGroup.classList.remove('error');
            errorMsg.textContent = '';
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

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

        setLoadingState(true);
        const formData = new FormData(form);

        console.log('Form submission data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        setTimeout(() => {
            setLoadingState(false);
            showToast('Message sent successfully! We\'ll get back to you soon.');
            form.reset();
            inputs.forEach(input => clearFieldError({ target: input }));
        }, 2000);
    });

    function setLoadingState(loading) {
        submitBtn.disabled = loading;
        submitBtn.classList.toggle('loading', loading);
    }
}

// === Toast Notification ===
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.className = 'toast';
    if (type === 'error') toast.classList.add('error');

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
}

function closeToast() {
    const toast = document.getElementById('toast');
    if (toast) toast.classList.remove('show');
}
