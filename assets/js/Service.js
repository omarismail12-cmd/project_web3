// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initBookingForm();
    initScrollAnimations();
    initCourtFavorites();
    initSmoothScrolling();
    initFormValidation();
    
    console.log('Mala3b website initialized successfully!');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !mobileNav) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileNav.style.display === 'flex';
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && 
            !mobileNav.contains(event.target) && 
            mobileNav.style.display === 'flex') {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileNav.style.display = 'flex';
        mobileMenuBtn.classList.add('active');
        
        // Animate menu button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // Add animation to menu items
        const menuItems = mobileNav.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    function closeMobileMenu() {
        mobileNav.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
        
        // Reset menu button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Booking Form Functionality
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            province: document.getElementById('province').value,
            sport: document.getElementById('sport').value,
            court: document.getElementById('court').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };
        
        // Validate required fields
        if (!formData.province || !formData.sport || !formData.date || !formData.time) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate booking search
        showLoadingState();
        
        setTimeout(() => {
            hideLoadingState();
            showNotification('Searching for available courts...', 'success');
            console.log('Booking search:', formData);
            
            // In a real application, this would redirect to results page
            setTimeout(() => {
                showNotification('Found 12 available courts! Redirecting...', 'success');
            }, 2000);
        }, 1500);
    });
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .court-card, .testimonial-card, .hero-title, .hero-description, .booking-card'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add stagger animation delay
    document.querySelectorAll('.features-grid .feature-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });
    
    document.querySelectorAll('.courts-container .court-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
    });
    
    document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.15) + 's';
    });
}

// Court Favorites Functionality
function initCourtFavorites() {
    const favoriteButtons = document.querySelectorAll('.court-favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            const isFavorited = icon.classList.contains('fas');
            
            if (isFavorited) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from favorites', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to favorites', 'success');
            }
            
            // Add animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLinkOnScroll, 100));
}

// Form Validation
function initFormValidation() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        field.classList.add('error');
        return false;
    } else {
        field.classList.remove('error');
        return true;
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    const autoRemoveTimer = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual remove
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemoveTimer);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#22c55e';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#6366f1';
    }
}

function showLoadingState() {
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        submitButton.disabled = true;
    }
}

function hideLoadingState() {
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-search"></i> Find Available Courts';
        submitButton.disabled = false;
    }
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Court Booking Functionality (simulate backend)
function simulateCourtBooking(courtName) {
    showNotification(`Initiating booking for ${courtName}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Successfully booked ${courtName}!`, 'success');
    }, 2000);
}

// Add click handlers for court booking buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookButtons = document.querySelectorAll('.court-card .btn-secondary');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courtCard = this.closest('.court-card');
            const courtName = courtCard.querySelector('h3').textContent;
            simulateCourtBooking(courtName);
        });
    });
});

// Enhanced scroll effects for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-bg');
    
    if (heroSection && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing animation to hero title
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const words = originalText.split(' ');
    titleElement.innerHTML = '';
    
    words.forEach((word, index) => {
        setTimeout(() => {
            titleElement.innerHTML += word + ' ';
        }, index * 200);
    });
}

// Initialize typing animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initTypingAnimation();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}