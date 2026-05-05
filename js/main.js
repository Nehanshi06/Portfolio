// =====================================================
// THEME MANAGEMENT
// =====================================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const THEME_KEY = 'portfolio-theme';

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  
  if (savedTheme) {
    // Use saved theme
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Use system preference
    setTheme('dark');
  } else {
    // Default to light
    setTheme('light');
  }
}

function setTheme(theme) {
  if (theme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem(THEME_KEY, 'dark');
  } else {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, 'light');
  }
}

function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Theme toggle button listener
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light');
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// =====================================================
// NAVIGATION SCROLL BEHAVIOR
// =====================================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// =====================================================
// PARALLAX EFFECT FOR HERO BLOB
// =====================================================

const heroBlob = document.querySelector('.hero-blob-2');

window.addEventListener('scroll', () => {
  if (window.scrollY < 800) {
    const offset = window.scrollY * 0.3;
    heroBlob.style.transform = `translateY(${offset}px)`;
  }
});

// =====================================================
// FADE-IN ANIMATIONS ON SCROLL
// =====================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// =====================================================
// SMOOTH SCROLL BEHAVIOR
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// =====================================================
// FORM SUBMISSION HANDLER
// =====================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Show success message
    const originalButton = contactForm.querySelector('button[type="submit"]');
    const originalText = originalButton.textContent;
    originalButton.textContent = '✓ Message Sent!';
    originalButton.style.opacity = '0.8';
    
    // Reset form
    contactForm.reset();
    
    // Restore button after 2 seconds
    setTimeout(() => {
      originalButton.textContent = originalText;
      originalButton.style.opacity = '1';
    }, 2000);
    
    // In production, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
  });
}

// =====================================================
// HOVER EFFECTS FOR PROJECT CARDS
// =====================================================

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// =====================================================
// HOBBY ITEM ANIMATIONS
// =====================================================

document.querySelectorAll('.hobby-item').forEach((item, index) => {
  item.style.animation = `fadeInUp 0.6s ease-out forwards`;
  item.style.animationDelay = `${200 + index * 100}ms`;
});

// =====================================================
// LAZY LOADING FOR IMAGES
// =====================================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// =====================================================
// KEYBOARD ACCESSIBILITY
// ===================================================== 

document.addEventListener('keydown', (e) => {
  // Toggle theme with Alt+T
  if (e.altKey && e.key === 't') {
    e.preventDefault();
    toggleTheme();
  }
  
  // Close menus with Escape
  if (e.key === 'Escape') {
    // Add any open menu closing logic here
  }
});

// =====================================================
// PRELOAD CRITICAL IMAGES
// ===================================================== 

const criticalImages = [
  'images/profile.jpg',
  'images/hero-bg.jpg'
];

criticalImages.forEach(src => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
});

// =====================================================
// INITIALIZATION
// ===================================================== 

console.log('Portfolio v2 loaded successfully! 🎉');
console.log('Tip: Press Alt+T to toggle dark mode');