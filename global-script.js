// Global JavaScript for UIENC 2.0

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize hamburger menu
    initHamburgerMenu();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize form submission handling
    initFormSubmission();
    
    // Close mobile menu when clicking outside
    initClickOutsideMenu();
});

// Header scroll effect - Updated for sticky header
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Hamburger menu functionality - Updated for all devices
function initHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking on auth buttons
        const authButtons = document.querySelectorAll('.btn-login, .btn-register');
        authButtons.forEach(button => {
            button.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Close mobile menu when clicking outside
function initClickOutsideMenu() {
    document.addEventListener('click', function(e) {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mainNav = document.getElementById('main-nav');
        
        if (mainNav && mainNav.classList.contains('active')) {
            const isClickInsideNav = mainNav.contains(e.target);
            const isClickOnHamburger = hamburgerMenu.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-secondary');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = document.getElementById('main-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll to section function (for external calls)
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Auth modal functionality
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('auth-modal');
    if (e.target === modal) {
        closeAuthModal();
    }
});

// Google and DigiLocker auth functions
function googleAuth() {
    // In a real implementation, this would redirect to Google OAuth
    window.open('https://accounts.google.com/', '_blank');
}

function digilockerAuth() {
    // In a real implementation, this would redirect to DigiLocker OAuth
    window.open('https://digilocker.gov.in/', '_blank');
}

// Form submission handling
function initFormSubmission() {
    const forms = document.querySelectorAll('.registration-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would submit to Google Forms
            // For demo purposes, we'll simulate a successful submission
            
            // Show success message
            document.getElementById('form-success').style.display = 'block';
            form.style.display = 'none';
            
            // Reset form
            form.reset();
            
            // In a real implementation, you would submit to Google Forms
            // and handle the response accordingly
        });
    });
}

// Close success message
function closeSuccessMessage() {
    document.getElementById('form-success').style.display = 'none';
    
    // Show the form again
    const activeForm = document.querySelector('.registration-form.active');
    if (activeForm) {
        activeForm.style.display = 'block';
    }
}

// Generate portfolio PDF (simulated)
function generatePortfolioPDF() {
    // In a real implementation, this would generate a PDF from the user's portfolio data
    alert('Portfolio PDF generation would be implemented here. In a real system, this would create a downloadable PDF with all your projects, skills, and achievements.');
    
    // For demo purposes, create a simulated download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'UIENC_Portfolio.pdf';
    link.click();
}

// Update active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.getElementById('main-header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 50)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll-based active link updating
window.addEventListener('scroll', updateActiveNavLink);
