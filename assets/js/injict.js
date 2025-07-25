document.addEventListener("DOMContentLoaded", () => {
  // Inject header first, then initialize mobile menu
  injectHTML("/project_web3/includes/header.php", ".header", "Header")
    .then(() => {
      // Initialize mobile menu after header is loaded
      initializeMobileMenu();
    });

  // Inject footer
  injectHTML("/project_web3/includes/footer.html", ".footer", "Footer");
});

/**
 * 
 * @param {string} path 
 * @param {string} selector 
 * @param {string} label 
 * @returns {Promise}
 */
function injectHTML(path, selector, label) {
  return fetch(path)
    .then(response => {
      if (!response.ok) throw new Error(`${label} لم يتم تحميله (${response.status})`);
      return response.text();
    })
    .then(data => {
      const container = document.querySelector(selector);
      if (container) {
        container.innerHTML = data;
        console.log(`${label} ✅`);
        return true;
      } else {
        console.warn(`⚠️  ${selector} `);
        return false;
      }
    })
    .catch(error => {
      console.error(`❌ ${label}:`, error);
      return false;
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const showPagesBtn = document.getElementById('showPagesBtn');

  if (!mobileMenuBtn || !mobileNav) {
    console.warn('Mobile menu elements not found');
    return;
  }

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Show All Pages button functionality
  if (showPagesBtn) {
    showPagesBtn.addEventListener('click', () => {
      const navSections = mobileNav.querySelectorAll('.mobile-nav-section');
      const chevronIcon = showPagesBtn.querySelector('.fa-chevron-down');
      
      navSections.forEach(section => {
        section.classList.toggle('expanded');
      });
      
      // Rotate chevron icon
      if (chevronIcon) {
        chevronIcon.style.transform = chevronIcon.style.transform === 'rotate(180deg)' 
          ? 'rotate(0deg)' 
          : 'rotate(180deg)';
      }
      
      // Update button text
      const buttonText = showPagesBtn.querySelector('span');
      if (buttonText) {
        const isExpanded = navSections[0]?.classList.contains('expanded');
        buttonText.textContent = isExpanded ? 'Hide Pages' : 'Show All Pages';
      }
    });
  }

  // Close menu on link click
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (event) => {
    if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });

  console.log('Mobile menu initialized ✅');
}
