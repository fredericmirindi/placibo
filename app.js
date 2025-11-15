/* ============================================
   JAVASCRIPT APPLICATION - MULTI-PAGE PORTFOLIO
   ============================================ */

// ==========================================
// PAGE INITIALIZATION & DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initProjectFilters();
    initPublicationFilters();
    initCourseExpanders();
    initPublicationExpanders();
    initTestimonialCarousel();
    initContactForm();
    initCounterAnimation();
});

// ==========================================
// THEME TOGGLE (Dark/Light Mode)
// ==========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Animate icon rotation
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 600);
        });
    }
}

// ==========================================
// NAVIGATION & MOBILE MENU
// ==========================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Update active nav link based on current page
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ==========================================

function initScrollAnimations() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// PROJECT FILTERING
// ==========================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
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

// ==========================================
// PUBLICATION FILTERING & SEARCH
// ==========================================

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
                const title = item.querySelector('.pub-title').textContent.toLowerCase();
                const authors = item.querySelector('.pub-authors').textContent.toLowerCase();

                if (title.includes(searchTerm) || authors.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Copy citation functionality
    document.querySelectorAll('.copy-citation-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pubItem = btn.closest('.publication-item');
            const title = pubItem.querySelector('.pub-title').textContent;
            const authors = pubItem.querySelector('.pub-authors').textContent;
            const venue = pubItem.querySelector('.pub-venue').textContent;

            const citation = `${authors}. "${title}". ${venue}`;

            navigator.clipboard.writeText(citation).then(() => {
                // Visual feedback
                const originalText = btn.textContent;
                btn.textContent = '✓ Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// ==========================================
// COURSE EXPANDERS
// ==========================================

function initCourseExpanders() {
    document.querySelectorAll('.course-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            details.classList.toggle('active');
            btn.textContent = details.classList.contains('active') ? 'Hide Details' : 'View Details';
        });
    });
}

// ==========================================
// PUBLICATION EXPANDERS
// ============================================

function initPublicationExpanders() {
    document.querySelectorAll('.pub-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const abstract = btn.closest('.publication-item').querySelector('.pub-abstract');
            abstract.classList.toggle('active');
            btn.textContent = abstract.classList.contains('active') ? 'Hide Abstract' : 'View Abstract';
        });
    });
}

// ==========================================
// TESTIMONIAL CAROUSEL
// ==========================================

function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 6000);

    // Initialize first testimonial
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }
}

// ==========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ==========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm(form)) return;

        const submitBtn = form.querySelector('.btn-submit');
        const formSuccess = document.getElementById('formSuccess');

        try {
            // Show loading state
            submitBtn.classList.add('loading');

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.classList.add('show');

            // Reset after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.classList.remove('show');
                submitBtn.classList.remove('loading');
                clearFormErrors(form);
            }, 5000);
        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.classList.remove('loading');
        }
    });

    // Real-time validation
    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            const errorSpan = input.closest('.form-group').querySelector('.form-error');
            if (errorSpan.classList.contains('show')) {
                validateField(input);
            }
        });
    });
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
    const errorSpan = input.closest('.form-group').querySelector('.form-error');
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
        input.style.borderBottomColor = '#ef4444';
        return false;
    } else {
        errorSpan.classList.remove('show');
        input.style.borderBottomColor = '';
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, options);

    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30; // Divide animation into 30 steps
    const duration = 1000; // 1 second animation
    const stepDuration = duration / 30;

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

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Smooth scroll to sections (if needed for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for same-page anchors
        if (href.startsWith('#') && !href.includes('.html')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && window.scrollY < window.innerHeight) {
        heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('hamburger')?.classList.remove('active');
        document.getElementById('navMenu')?.classList.remove('active');
    }
});

// Prevent form submission on Enter in search input
const searchInput = document.getElementById('pubSearch');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}