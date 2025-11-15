// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
let currentTheme = 'light';

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', currentTheme);
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Function to show a specific page
function showPage(pageId) {
  pages.forEach(page => {
    page.classList.remove('active-page');
    if (page.id === pageId) {
      page.classList.add('active-page');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${pageId}`) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  navMenu.classList.remove('active');

  // Trigger animations for the new page
  setTimeout(() => {
    observeElements();
  }, 100);
}

// Navigation link clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('href').substring(1);
    showPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

function observeElements() {
  const elements = document.querySelectorAll('.fade-up');
  elements.forEach(el => observer.observe(el));
}

// Initialize observations
observeElements();

// Counter Animation for Stats
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Research Project Details Toggle
const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
projectDetailsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const details = card.querySelector('.project-details-content');
    details.classList.toggle('expanded');
    btn.textContent = details.classList.contains('expanded') ? 'Hide Details' : 'View Details';
  });
});

// Research Filter
const researchFilterBtns = document.querySelectorAll('#research .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

researchFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    researchFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        const year = card.getAttribute('data-year');
        card.style.display = year === filter ? 'block' : 'none';
      }
    });
  });
});

// Publications Search and Filter
const pubSearch = document.getElementById('pubSearch');
const pubFilterBtns = document.querySelectorAll('#publications .filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

let currentPubFilter = 'all';

if (pubSearch) {
  pubSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterPublications(searchTerm, currentPubFilter);
  });
}

pubFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentPubFilter = btn.getAttribute('data-filter');
    
    pubFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const searchTerm = pubSearch ? pubSearch.value.toLowerCase() : '';
    filterPublications(searchTerm, currentPubFilter);
  });
});

function filterPublications(searchTerm, typeFilter) {
  publicationItems.forEach(item => {
    const title = item.querySelector('.pub-title').textContent.toLowerCase();
    const type = item.getAttribute('data-type');
    
    const matchesSearch = title.includes(searchTerm);
    const matchesType = typeFilter === 'all' || type === typeFilter;
    
    item.style.display = matchesSearch && matchesType ? 'block' : 'none';
  });
}

// Publication Abstract Toggle
const pubExpandBtns = document.querySelectorAll('.pub-expand-btn');
pubExpandBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.publication-item');
    const abstract = item.querySelector('.pub-abstract');
    abstract.classList.toggle('expanded');
    btn.textContent = abstract.classList.contains('expanded') ? 'Hide Abstract' : 'View Abstract';
  });
});

// Copy Citation
const copyCitationBtns = document.querySelectorAll('.copy-citation-btn');
copyCitationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.publication-item');
    const title = item.querySelector('.pub-title').textContent;
    const authors = item.querySelector('.pub-authors').textContent;
    const venue = item.querySelector('.pub-venue').textContent;
    
    const citation = `${authors}. "${title}". ${venue}`;
    
    // Create temporary textarea to copy text
    const textarea = document.createElement('textarea');
    textarea.value = citation;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Visual feedback
    const originalText = btn.textContent;
    btn.textContent = '✓';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 1500);
  });
});

// Course Details Toggle
const courseExpandBtns = document.querySelectorAll('.course-expand-btn');
courseExpandBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.course-card');
    const details = card.querySelector('.course-details');
    details.classList.toggle('expanded');
    btn.textContent = details.classList.contains('expanded') ? 'Hide Details' : 'View Details';
  });
});

// Testimonial Carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === index) {
      card.classList.add('active');
    }
  });
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Manual testimonial navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  const inputs = contactForm.querySelectorAll('.form-input');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.classList.add('loading');
      
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          formSuccess.classList.remove('show');
        }, 5000);
      }, 2000);
    }
  });
}

function validateField(input) {
  const value = input.value.trim();
  const type = input.type;
  const formGroup = input.closest('.form-group');
  const errorSpan = formGroup.querySelector('.form-error');
  
  let isValid = true;
  let errorMessage = '';
  
  if (value === '') {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (type === 'email' && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  }
  
  if (!isValid) {
    input.classList.add('error');
    errorSpan.textContent = errorMessage;
    errorSpan.style.display = 'block';
  } else {
    input.classList.remove('error');
    errorSpan.style.display = 'none';
  }
  
  return isValid;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    const scrolled = window.pageYOffset;
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && !this.classList.contains('nav-link')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add subtle animation on button clicks
const allButtons = document.querySelectorAll('.btn, button');
allButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-effect 0.6s ease-out';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    if (button.style.position !== 'absolute' && button.style.position !== 'relative') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .form-input.error {
    border-color: var(--color-red-500);
  }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully!');