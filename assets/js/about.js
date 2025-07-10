// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
});

// Navigation functionality
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = menuToggle.querySelector('.menu-icon');
const closeIcon = menuToggle.querySelector('.close-icon');

// Handle navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on nav links
mobileMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('mobile-nav-link')) {
    mobileMenu.classList.remove('active');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('reveal-active');
    }
  });
};

// Throttle scroll events for better performance
let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', handleScroll);
revealOnScroll(); // Initial check

// Enhanced reveal animations with delays
const revealWithDelay = () => {
  const delayElements = document.querySelectorAll('[data-delay]');
  
  delayElements.forEach(element => {
    const delay = element.getAttribute('data-delay');
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 150) {
      setTimeout(() => {
        element.classList.add('reveal-active');
      }, parseInt(delay) * 200);
    }
  });
};

window.addEventListener('scroll', revealWithDelay);
revealWithDelay(); // Initial check

// Animate stats numbers
const animateStats = () => {
  const statCards = document.querySelectorAll('.stat-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const target = parseInt(card.getAttribute('data-target'));
        const numberElement = card.querySelector('.stat-number');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          numberElement.textContent = Math.floor(current);
        }, 20);
        
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });
  
  statCards.forEach(card => observer.observe(card));
};

// Initialize stats animation
animateStats();

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[name="email"]').value;
    const submitBtn = this.querySelector('.newsletter-submit');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoading = submitBtn.querySelector('.submit-loading');
    const submitIcon = submitBtn.querySelector('.submit-icon');
    const submitSpinner = submitBtn.querySelector('.submit-spinner');
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoading.classList.remove('hidden');
    submitIcon.classList.add('hidden');
    submitSpinner.classList.remove('hidden');
    
    // Submit to PHP
    fetch('newsletter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: 'email=' + encodeURIComponent(email)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
      } else {
        showNotification(data.message || 'An error occurred. Please try again.', 'error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('An error occurred. Please try again.', 'error');
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');
      submitIcon.classList.remove('hidden');
      submitSpinner.classList.add('hidden');
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i data-lucide="x"></i>
      </button>
    </div>
  `;
  
  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 9999;
      max-width: 400px;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: var(--shadow-xl);
      animation: slideInRight 0.3s ease-out;
    }
    
    .notification-success {
      background: var(--sport-green-50);
      color: var(--sport-green-800);
      border: 1px solid var(--sport-green-200);
    }
    
    .notification-error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Re-initialize Lucide icons for the close button
  lucide.createIcons();
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 120;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
  });
});

// Enhanced hover effects for team members
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
  member.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-1.25rem) scale(1.02)';
  });
  
  member.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Update copyright year
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Don't add loading effect for anchor links
    if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
      return;
    }
    
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    const rate = (scrolled * 0.1) * (index + 1);
    element.style.transform = `translateY(${rate}px) rotate(${12 + rate * 0.1}deg)`;
  });
});

// Enhanced intersection observer for better performance
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-active');
      
      // Add stagger effect for child elements
      const children = entry.target.querySelectorAll('.reveal-up');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('reveal-active');
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
  animationObserver.observe(el);
});

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 100);
});

console.log('🏆 Mala3b Sport Club - Premium Sports Booking Experience Loaded!');