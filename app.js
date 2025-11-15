/* ===============================================
   PROFESSIONAL PORTFOLIO - FINAL JAVASCRIPT
   Complete Interactivity & Performance Optimized
   =============================================== */

// Global state management
const appState = {
    theme: localStorage.getItem('theme') || 'light',
    mobileMenuOpen: false,
    currentPage: window.location.pathname.split('/').pop() || 'index.html'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Core initializations
    applyTheme(appState.theme);
    initNavigation();
    updateActiveNavLink();
    
    // Page-specific initializations
    if (document.querySelector('.project-card')) initProjectFilters();
    if (document.querySelector('.publication-item')) initPublicationFilters();
    if (document.querySelector('.course-card')) initCourseExpanders();
    if (document.querySelector('.testimonial-card')) initTestimonialCarousel();
    if (document.getElementById('contactForm')) initContactForm();
    if (document.querySelector('.stat-number')) initCounterAnimation();
    
    // Global features
    initScrollAnimations();
    initParallaxEffect();
    initThemeToggle();
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const newTheme = appState.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    appState.theme = newTheme;
    localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    appState.theme = theme;
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (appState.mobileMenuOpen) {
                closeMobileMenu();
            }
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && appState.mobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (appState.mobileMenuOpen) {
        closeMobileMenu();
    } else {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        appState.mobileMenuOpen = true;
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    appState.mobileMenuOpen = false;
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        }
    }, { passive: true });
}

// ============================================
// PROJECT FILTERING
// ============================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-section .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const cardYear = card.getAttribute('data-year');
                if (filterValue === 'all' || cardYear === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Expand project details
    document.querySelectorAll('.project-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            content.classList.toggle('active');
            btn.textContent = content.classList.contains('active') ? 'Hide Details' : 'View Details';
        });
    });
}

// ============================================
// PUBLICATION FILTERING & SEARCH
// ============================================

function initPublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons .filter-btn');
    const searchInput = document.getElementById('pubSearch');
    const pubItems = document.querySelectorAll('.publication-item');

    // Filter by type
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            pubItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                if (filterValue === 'all' || itemType === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search publications
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            pubItems.forEach(item => {
                const title = item.querySelector('.pub-title')?.textContent.toLowerCase() || '';
                const authors = item.querySelector('.pub-authors')?.textContent.toLowerCase() || '';

                if (title.includes(searchTerm) || authors.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Copy citation
    document.querySelectorAll('.copy-citation-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pubItem = btn.closest('.publication-item');
            const title = pubItem.querySelector('.pub-title')?.textContent || '';
            const authors = pubItem.querySelector('.pub-authors')?.textContent || '';
            const venue = pubItem.querySelector('.pub-venue')?.textContent || '';

            const citation = `${authors}. "${title}". ${venue}`;

            navigator.clipboard.writeText(citation).then(() => {
                const originalText = btn.textContent;
                btn.textContent = '✓ Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }).catch(err => console.error('Copy failed:', err));
        });
    });

    // Expand abstracts
    document.querySelectorAll('.pub-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const abstract = btn.closest('.publication-item').querySelector('.pub-abstract');
            abstract.classList.toggle('active');
            btn.textContent = abstract.classList.contains('active') ? 'Hide Abstract' : 'View Abstract';
        });
    });
}

// ============================================
// COURSE EXPANDERS
// ============================================

function initCourseExpanders() {
    document.querySelectorAll('.course-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            details.classList.toggle('active');
            btn.textContent = details.classList.contains('active') ? 'Hide Details' : 'View Details';
        });
    });
}

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================

function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    if (testimonialCards.length === 0) return;

    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Dot click navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Auto-rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 6000);

    showTestimonial(0);
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const errorSpan = input.closest('.form-group').querySelector('.form-error');
            if (errorSpan?.classList.contains('show')) {
                validateField(input);
            }
        });
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm(e.target)) return;

    const submitBtn = e.target.querySelector('.btn-submit');
    const formSuccess = document.getElementById('formSuccess');

    try {
        submitBtn.classList.add('loading');

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success
        e.target.style.display = 'none';
        if (formSuccess) {
            formSuccess.classList.add('show');
        }

        // Reset after 5 seconds
        setTimeout(() => {
            e.target.reset();
            e.target.style.display = 'block';
            if (formSuccess) {
                formSuccess.classList.remove('show');
            }
            submitBtn.classList.remove('loading');
            clearFormErrors(e.target);
        }, 5000);
    } catch (error) {
        console.error('Form submission error:', error);
        submitBtn.classList.remove('loading');
    }
}

function validateForm(form) {
    let isValid = true;

    form.querySelectorAll('.form-input').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(input) {
    const errorSpan = input.closest('.form-group')?.querySelector('.form-error');
    if (!errorSpan) return true;

    let error = '';

    if (input.value.trim() === '') {
        error = 'This field is required';
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
        error = 'Please enter a valid email address';
    } else if (input.id === 'message' && input.value.trim().length < 10) {
        error = 'Message must be at least 10 characters';
    }

    if (error) {
        errorSpan.textContent = error;
        errorSpan.classList.add('show');
        input.style.borderBottomColor = 'var(--color-error)';
        return false;
    } else {
        errorSpan.classList.remove('show');
        input.style.borderBottomColor = '';
        return true;
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const stepDuration = (1000 / 30);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && !href.includes('.html')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Prevent form submission on enter in search
const searchInput = document.getElementById('pubSearch');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}