// Enhanced JavaScript for Mala3b Pricing Page

// State Management
const AppState = {
  isYearly: false,
  mobileMenuOpen: false,
  openFaqIndex: null
};

// Utility Functions
const Utils = {
  // Debounce function for performance optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Smooth scroll to element
  smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  // Add animation classes with intersection observer
  observeElements(selector, animationClass = 'animate-fade-in-up') {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elements.forEach(el => observer.observe(el));
  }
};

// Mobile Menu Controller
class MobileMenuController {
  constructor() {
    this.toggleBtn = document.getElementById('mobile-toggle');
    this.mobileNav = document.getElementById('mobile-nav');
    this.hamburgerLines = this.toggleBtn?.querySelectorAll('.hamburger-line');
    
    this.init();
  }

  init() {
    if (!this.toggleBtn || !this.mobileNav) return;
    
    this.toggleBtn.addEventListener('click', () => this.toggle());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.toggleBtn.contains(e.target) && !this.mobileNav.contains(e.target)) {
        this.close();
      }
    });

    // Close menu when pressing escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && AppState.mobileMenuOpen) {
        this.close();
      }
    });

    // Close menu on mobile nav link click
    this.mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });
  }

  toggle() {
    if (AppState.mobileMenuOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    AppState.mobileMenuOpen = true;
    this.mobileNav.classList.add('active');
    this.mobileNav.style.display = 'block';
    this.mobileNav.setAttribute('aria-hidden', 'false');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    
    this.animateHamburger(true);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  close() {
    AppState.mobileMenuOpen = false;
    this.mobileNav.classList.remove('active');
    this.mobileNav.style.display = 'none';
    this.mobileNav.setAttribute('aria-hidden', 'true');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    
    this.animateHamburger(false);
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  animateHamburger(isOpen) {
    if (!this.hamburgerLines || this.hamburgerLines.length < 3) return;
    
    if (isOpen) {
      this.hamburgerLines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      this.hamburgerLines[1].style.opacity = '0';
      this.hamburgerLines[1].style.transform = 'scale(0)';
      this.hamburgerLines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      this.hamburgerLines[0].style.transform = 'none';
      this.hamburgerLines[1].style.opacity = '1';
      this.hamburgerLines[1].style.transform = 'scale(1)';
      this.hamburgerLines[2].style.transform = 'none';
    }
  }
}

// Pricing Toggle Controller
class PricingToggleController {
  constructor() {
    this.billingToggle = document.getElementById('billing-toggle');
    this.toggleOptions = document.querySelectorAll('.toggle-option');
    this.priceAmounts = document.querySelectorAll('.amount');
    
    this.init();
  }

  init() {
    if (!this.billingToggle) return;

    // Toggle switch event listener
    this.billingToggle.addEventListener('change', (e) => {
      this.updateBilling(e.target.checked);
    });

    // Toggle option buttons event listeners
    this.toggleOptions.forEach(option => {
      option.addEventListener('click', () => {
        const isYearly = option.dataset.period === 'yearly';
        this.updateBilling(isYearly);
        this.billingToggle.checked = isYearly;
      });
    });
  }

  updateBilling(isYearly) {
    AppState.isYearly = isYearly;
    this.updateToggleAppearance(isYearly);
    this.updatePrices(isYearly);
    this.trackPricingToggle(isYearly);
  }

  updateToggleAppearance(isYearly) {
    this.toggleOptions.forEach(option => {
      const isActive = (isYearly && option.dataset.period === 'yearly') || 
                      (!isYearly && option.dataset.period === 'monthly');
      
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-pressed', isActive.toString());
    });
  }

  updatePrices(isYearly) {
    this.priceAmounts.forEach(amount => {
      const monthlyPrice = amount.dataset.monthly;
      const yearlyPrice = amount.dataset.yearly;
      const newPrice = isYearly ? yearlyPrice : monthlyPrice;
      
      // Add smooth transition effect
      amount.style.transform = 'scale(0.8)';
      amount.style.opacity = '0.5';
      
      setTimeout(() => {
        amount.textContent = newPrice;
        amount.style.transform = 'scale(1)';
        amount.style.opacity = '1';
      }, 150);
    });

    // Update period text
    const periods = document.querySelectorAll('.period');
    periods.forEach(period => {
      period.textContent = isYearly ? '/year' : '/month';
    });
  }

  trackPricingToggle(isYearly) {
    // Analytics tracking (replace with your analytics service)
    console.log(`Pricing toggle switched to: ${isYearly ? 'yearly' : 'monthly'}`);
  }
}

// FAQ Controller
class FAQController {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => this.toggleFAQ(index));
      
      // Add keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleFAQ(index);
        }
      });
    });
  }

  toggleFAQ(index) {
    const item = this.faqItems[index];
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (!item || !question || !answer) return;

    const isCurrentlyOpen = AppState.openFaqIndex === index;
    
    // Close all FAQ items
    this.closeAllFAQs();
    
    // Open the clicked item if it wasn't already open
    if (!isCurrentlyOpen) {
      this.openFAQ(index, item, question, answer);
    }
  }

  openFAQ(index, item, question, answer) {
    AppState.openFaqIndex = index;
    item.classList.add('open');
    question.setAttribute('aria-expanded', 'true');
    
    // Calculate the height for smooth animation
    const scrollHeight = answer.scrollHeight;
    answer.style.maxHeight = `${scrollHeight}px`;
    
    // Track FAQ interaction
    this.trackFAQInteraction(question.textContent.trim(), 'opened');
  }

  closeAllFAQs() {
    this.faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        question?.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      }
    });
    
    AppState.openFaqIndex = null;
  }

  trackFAQInteraction(questionText, action) {
    // Analytics tracking (replace with your analytics service)
    console.log(`FAQ ${action}: ${questionText}`);
  }
}

// Scroll Effects Controller
class ScrollEffectsController {
  constructor() {
    this.header = document.querySelector('.main-header');
    this.lastScrollTop = 0;
    this.scrollThreshold = 100;
    
    this.init();
  }

  init() {
    if (!this.header) return;

    const handleScroll = Utils.debounce(() => {
      this.handleHeaderScroll();
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.scrollThreshold) {
      if (scrollTop > this.lastScrollTop) {
        // Scrolling down - hide header
        this.header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show header
        this.header.style.transform = 'translateY(0)';
      }
    } else {
      // At top - always show header
      this.header.style.transform = 'translateY(0)';
    }
    
    this.lastScrollTop = scrollTop;
  }
}

// Button Effects Controller
class ButtonEffectsController {
  constructor() {
    this.init();
  }

  init() {
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => this.createRipple(e));
    });

    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        this.trackButtonClick(buttonText, e.target.className);
      });
    });
  }

  createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add('ripple');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    `;

    // Ensure button has relative positioning
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  trackButtonClick(buttonText, buttonClass) {
    // Analytics tracking (replace with your analytics service)
    console.log(`Button clicked: ${buttonText} (${buttonClass})`);
  }
}

// Smooth Scrolling Controller
class SmoothScrollController {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          Utils.smoothScrollTo(target, 80); // 80px offset for fixed header
        }
      });
    });
  }
}

// Accessibility Enhancements
class AccessibilityController {
  constructor() {
    this.init();
  }

  init() {
    // Focus management for mobile menu
    this.setupFocusManagement();
    
    // Keyboard navigation enhancements
    this.setupKeyboardNavigation();
    
    // Screen reader announcements
    this.setupScreenReaderSupport();
  }

  setupFocusManagement() {
    const mobileNav = document.getElementById('mobile-nav');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    if (mobileNav) {
      const focusableContent = mobileNav.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement = focusableContent[focusableContent.length - 1];

      document.addEventListener('keydown', (e) => {
        if (!AppState.mobileMenuOpen) return;
        
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
  }

  setupKeyboardNavigation() {
    // Allow Enter key to activate buttons with role="button"
    document.querySelectorAll('[role="button"]').forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  setupScreenReaderSupport() {
    // Create a live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);

    // Announce pricing changes
    const originalUpdatePrices = PricingToggleController.prototype.updatePrices;
    PricingToggleController.prototype.updatePrices = function(isYearly) {
      originalUpdatePrices.call(this, isYearly);
      liveRegion.textContent = `Pricing updated to ${isYearly ? 'yearly' : 'monthly'} billing`;
    };
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.reportLoadMetrics();
      }, 100);
    });
  }

  reportLoadMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      console.log('Page Load Metrics:', {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    }
  }
}

// Main Application Initialization
class PricingPageApp {
  constructor() {
    this.controllers = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      // Initialize all controllers
      this.controllers.mobileMenu = new MobileMenuController();
      this.controllers.pricingToggle = new PricingToggleController();
      this.controllers.faq = new FAQController();
      this.controllers.scrollEffects = new ScrollEffectsController();
      this.controllers.buttonEffects = new ButtonEffectsController();
      this.controllers.smoothScroll = new SmoothScrollController();
      this.controllers.accessibility = new AccessibilityController();
      this.controllers.performance = new PerformanceMonitor();

      // Initialize animations
      this.initializeAnimations();

      // Add global styles for animations
      this.addGlobalStyles();

      console.log('🏐 Mala3b Pricing Page Loaded Successfully! ⚽🏀');
      
    } catch (error) {
      console.error('Error initializing Pricing Page App:', error);
    }
  }

  initializeAnimations() {
    // Observe elements for scroll animations
    Utils.observeElements('.pricing-card, .faq-item, .section-header');
  }

  addGlobalStyles() {
    // Add CSS for ripple animation and other effects
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      .ripple {
        z-index: 0;
      }
      
      /* Smooth transitions for all interactive elements */
      .btn, .pricing-card, .faq-item, .toggle-option {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Focus styles for better accessibility */
      .btn:focus-visible,
      .faq-question:focus-visible,
      .toggle-option:focus-visible {
        outline: 2px solid var(--emerald-500);
        outline-offset: 2px;
      }
      
      /* Reduced motion preferences */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize the application
const app = new PricingPageApp();

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PricingPageApp,
    Utils,
    AppState
  };
}
