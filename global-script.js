// ============================================
// UIENC 2.0 - Global JavaScript
// Education 5.0 for Civilization 3.0
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initializeHeader();
    initializeScrollEffects();
    initializeAuthModal();
    initializeSmoothScroll();
    initializePerformanceOptimization();
    initializeBackToTop();
    initializeScrollProgress();
}

// Header Functionality
function initializeHeader() {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for header
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navHeight = header.offsetHeight;
    
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking nav links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.getElementById('mainNav');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Smooth Scroll Functionality
function initializeSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#auth-modal') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    scrollToSection(href.substring(1));
                }
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.getElementById('mainNav');
        if (nav && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Auth Modal Functionality
function initializeAuthModal() {
    const modal = document.getElementById('auth-modal');
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAuthModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeAuthModal();
        }
    });
    
    // Handle form submission
    const emailForm = modal?.querySelector('.email-login');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailLogin(e.target);
        });
    }
}

// Open Auth Modal
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Email Login
function handleEmailLogin(form) {
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('.login-btn');
    setLoadingState(submitBtn, true);
    
    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
        setLoadingState(submitBtn, false);
        showToast('Login functionality coming soon!', 'info');
        closeAuthModal();
    }, 1500);
}

// Google Authentication
function googleAuth() {
    // Replace with your actual Google OAuth URL
    showToast('Redirecting to Google Sign-In...', 'info');
    // Uncomment when you have your OAuth credentials
    // window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile';
}

// DigiLocker Authentication
function digilockerAuth() {
    // Replace with your actual DigiLocker OAuth URL
    showToast('Redirecting to DigiLocker...', 'info');
    // Uncomment when you have your OAuth credentials
    // window.location.href = 'https://digilocker.gov.in/';
}

// Scroll Effects for Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .vision-card, .light-card, .pillar-card, ' +
        '.project-card, .modern-card, .step-card, .modern-step, ' +
        '.involvement-card, .dashboard-card, .registration-card, ' +
        '.community-stat-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));
    }
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', throttle(function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, 50));
    }
}

// Performance Optimization
function initializePerformanceOptimization() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add device classes
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }
    if (isTouchDevice) {
        document.body.classList.add('is-touch');
    }
    
    // Optimize animations for mobile
    if (isMobile || isTouchDevice) {
        optimizeForMobile();
    }
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
    
    // Defer non-critical scripts
    deferNonCriticalResources();
}

// Optimize for Mobile Devices
function optimizeForMobile() {
    // Reduce animation complexity
    const complexAnimations = document.querySelectorAll('.shape, .particle-field, .cosmic-waves');
    complexAnimations.forEach(el => {
        el.style.animationDuration = '30s';
    });
    
    // Disable parallax on mobile for better performance
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
        el.removeAttribute('data-parallax');
    });
    
    // Use passive event listeners for better scroll performance
    const scrollableElements = document.querySelectorAll('[data-scroll]');
    scrollableElements.forEach(el => {
        el.addEventListener('scroll', handleScroll, { passive: true });
        el.addEventListener('touchstart', handleTouch, { passive: true });
    });
}

// Optimize Scroll Performance
function optimizeScrollPerformance() {
    let ticking = false;
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Batch scroll-related operations
                updateScrollProgress();
                updateBackToTop();
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// Update Back to Top Button
function updateBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

// Update Scroll Progress
function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

// Preload Critical Resources
function preloadCriticalResources() {
    // Preload critical fonts
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        link.onload = function() {
            this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
    
    // Preconnect to external domains
    const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Defer Non-Critical Resources
function deferNonCriticalResources() {
    // Defer loading of non-critical CSS
    const deferredStyles = document.querySelectorAll('link[rel="preload"][as="style"]');
    deferredStyles.forEach(link => {
        link.onload = function() {
            this.rel = 'stylesheet';
        };
    });
    
    // Load non-critical scripts after page load
    if (document.readyState === 'complete') {
        loadNonCriticalScripts();
    } else {
        window.addEventListener('load', loadNonCriticalScripts);
    }
}

// Load Non-Critical Scripts
function loadNonCriticalScripts() {
    // Add analytics or other non-critical scripts here
    console.log('Page fully loaded - ready for non-critical scripts');
}

// Handle Scroll Events
function handleScroll(e) {
    // Scroll handling with passive listener
}

// Handle Touch Events
function handleTouch(e) {
    // Touch handling with passive listener
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Loading State
function setLoadingState(element, isLoading) {
    if (!element) return;
    
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
        const originalText = element.innerHTML;
        element.setAttribute('data-original-text', originalText);
        element.innerHTML = '<span>Loading...</span>';
    } else {
        element.classList.remove('loading');
        element.disabled = false;
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.innerHTML = originalText;
        }
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    }[type] || 'ℹ';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 24px;
        background: var(--bg-light);
        border: 2px solid var(--border-light);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-large);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: var(--font-body);
    `;
    
    // Type-specific styling
    const colors = {
        success: 'var(--cyan-neon)',
        error: '#ef4444',
        warning: '#f59e0b',
        info: 'var(--cosmic-purple)'
    };
    
    toast.querySelector('.toast-icon').style.cssText = `
        font-size: 1.25rem;
        font-weight: 700;
        color: ${colors[type]};
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Local Storage Helper (Note: Use with caution in artifacts)
const storage = {
    set: (key, value) => {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            }
            return false;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    get: (key) => {
        try {
            if (typeof localStorage !== 'undefined') {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            }
            return null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    remove: (key) => {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
                return true;
            }
            return false;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Error Handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions for use in other scripts
window.UIENC = {
    scrollToSection,
    openAuthModal,
    closeAuthModal,
    toggleMobileMenu,
    googleAuth,
    digilockerAuth,
    showToast,
    storage,
    validateEmail,
    setLoadingState,
    debounce,
    throttle
};
