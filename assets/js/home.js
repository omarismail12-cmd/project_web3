document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeHeader();
    initializeHero();
    initializeFeatures();
    initializeFacilities();
    initializeContactInfo();
    initializeFooter();
    initializeForms();
    initializeAnimations();
});

// Header functionality
function initializeHeader() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu toggle clicked');
        });
    }
    
    // Smooth scrolling for navigation links
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
}

// Hero section functionality
function initializeHero() {
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                // Handle booking button click
                console.log('Start Booking clicked');
                // Redirect to booking page or open booking modal
            } else if (this.classList.contains('btn-secondary')) {
                // Scroll to facilities section
                const facilitiesSection = document.getElementById('facilities');
                if (facilitiesSection) {
                    facilitiesSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Features section
function initializeFeatures() {
    const featuresGrid = document.getElementById('featuresGrid');
    
    const features = [
        {
            icon: '📅',
            title: 'Easy Booking System',
            description: 'Reserve your perfect venue in just a few clicks with our intuitive booking platform'
        },
        {
            icon: '🏆',
            title: 'World-Class Facilities',
            description: 'Premium sports infrastructure meeting international standards for all sports'
        },
        {
            icon: '👥',
            title: 'Professional Support',
            description: 'Expert staff to help with your sporting events and reservations'
        }
    ];
    
    if (featuresGrid) {
        featuresGrid.innerHTML = features.map(feature => `
            <div class="feature-card">
                <span class="feature-icon">${feature.icon}</span>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }
}

// Facilities section
function initializeFacilities() {
    const facilitiesGrid = document.getElementById('facilitiesGrid');
    
    const facilities = [
        {
            name: "Football Stadium",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
            description: "Professional-grade football pitch with modern facilities",
            status: "Available"
        },
        {
            name: "Basketball Court",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
            description: "Indoor courts with professional lighting and surfaces",
            status: "Available"
        },
        {
            name: "Tennis Courts",
            image: "https://images.unsplash.com/photo-1544717684-e4d01d609927?w=400&h=300&fit=crop",
            description: "Multiple courts available for tournaments and training",
            status: "Available"
        },
        {
            name: "Swimming Pool",
            image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
            description: "Olympic-standard pools for competitive swimming",
            status: "Available"
        },
        {
            name: "Athletics Track",
            image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop",
            description: "400m track with field event facilities",
            status: "Available"
        },
        {
            name: "Gym & Fitness",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
            description: "State-of-the-art equipment and training areas",
            status: "Available"
        }
    ];
    
    if (facilitiesGrid) {
        facilitiesGrid.innerHTML = facilities.map(facility => `
            <div class="facility-card">
                <div class="facility-image">
                    <img src="${facility.image}" alt="${facility.name}">
                    <div class="facility-status">${facility.status}</div>
                </div>
                <div class="facility-content">
                    <h3>${facility.name}</h3>
                    <p>${facility.description}</p>
                    <a href="../pages/booking.html" class="facility-link">Book Now →</a>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for facility cards
        const facilityCards = facilitiesGrid.querySelectorAll('.facility-card');
        facilityCards.forEach(card => {
            card.addEventListener('click', function() {
                const facilityName = this.querySelector('h3').textContent;
                console.log(`Facility clicked: ${facilityName}`);
                // Handle facility booking
            });
        });
    }
}

// Contact information
function initializeContactInfo() {
    const contactInfo = document.getElementById('contactInfo');
    
    const contactData = [
        {
            icon: '📞',
            title: 'Phone',
            info: '+1 (555) 123-4567'
        },
        {
            icon: '✉️',
            title: 'Email',
            info: 'info@stadiumbook.com'
        },
        {
            icon: '📍',
            title: 'Address',
            info: '123 Stadium Avenue, Sports City, SC 12345'
        },
        {
            icon: '🕒',
            title: 'Business Hours',
            info: 'Mon - Fri: 9AM - 6PM'
        }
    ];
    
    if (contactInfo) {
        contactInfo.innerHTML = `
            <h3>Contact Information</h3>
            ${contactData.map(item => `
                <div class="contact-item">
                    <div class="contact-icon">${item.icon}</div>
                    <div class="contact-details">
                        <h4>${item.title}</h4>
                        <p>${item.info}</p>
                    </div>
                </div>
            `).join('')}
        `;
    }
}

// Footer initialization
function initializeFooter() {
    const footerLinks = document.getElementById('footerLinks');
    const footerFacilitiesList = document.getElementById('footerFacilitiesList');
    
    const quickLinks = [
        { name: 'Home', href: '#' },
        { name: 'Facilities', href: '#facilities' },
        { name: 'Contact', href: '#contact' },
        { name: 'About Us', href: '#' }
    ];
    
    const facilitiesLinks = [
        { name: 'Football Stadium', href: '#' },
        { name: 'Basketball Court', href: '#' },
        { name: 'Tennis Courts', href: '#' },
        { name: 'Swimming Pool', href: '#' }
    ];
    
    if (footerLinks) {
        footerLinks.innerHTML = quickLinks.map(link => 
            `<li><a href="${link.href}">${link.name}</a></li>`
        ).join('');
    }
    
    if (footerFacilitiesList) {
        footerFacilitiesList.innerHTML = facilitiesLinks.map(link => 
            `<li><a href="${link.href}">${link.name}</a></li>`
        ).join('');
    }
}

// Form handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }
}

// Contact form submission
function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = 'Send Reservation Request';
        submitBtn.disabled = false;
    }, 2000);
}

// Newsletter submission
function handleNewsletterSubmit(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        form.reset();
        button.textContent = 'Subscribe';
        button.disabled = false;
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Animations and scroll effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .facility-card, .about-content, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Debounce function for performance
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

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading on page load
window.addEventListener('load', initializeLazyLoading);

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Add any resize-specific functionality here
    console.log('Window resized');
}, 250));

// Export functions for global access
window.StadiumBook = {
    scrollToSection,
    showNotification,
    handleContactFormSubmit,
    handleNewsletterSubmit
};
