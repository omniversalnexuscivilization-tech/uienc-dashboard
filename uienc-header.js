// Header JavaScript
class HeaderManager {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.isMobileMenuOpen = false;
        this.init();
    }

    init() {
        this.renderHeader();
        this.attachEventListeners();
        this.checkAuthStatus();
    }

    renderHeader() {
        const header = document.getElementById('main-header');
        header.innerHTML = this.getHeaderHTML();
    }

    getHeaderHTML() {
        return `
            <nav class="navbar">
                <div class="logo">
                    <span>🌐</span>
                    <span>UIENC 2.0</span>
                </div>
                
                <ul class="nav-menu">
                    <li><a href="#home" onclick="scrollToSection('home')">Home</a></li>
                    <li><a href="#about" onclick="scrollToSection('about')">About</a></li>
                    <li><a href="#vision" onclick="scrollToSection('vision')">Vision</a></li>
                    <li><a href="#mission" onclick="scrollToSection('mission')">Mission</a></li>
                    <li><a href="#dashboard" onclick="scrollToSection('dashboard')">Dashboard</a></li>
                    <li><a href="#portfolio" onclick="scrollToSection('portfolio')">Portfolio</a></li>
                    <li><a href="#get-involved" onclick="scrollToSection('get-involved')">Get Involved</a></li>
                </ul>
                
                <div class="user-auth">
                    ${this.isLoggedIn ? this.getUserProfileHTML() : this.getAuthButtonsHTML()}
                </div>
                
                <button class="mobile-menu-btn" onclick="headerManager.toggleMobileMenu()">☰</button>
            </nav>
        `;
    }

    getAuthButtonsHTML() {
        return `
            <button class="login-btn" onclick="openAuthModal()">Sign In</button>
            <button class="register-btn" onclick="openAuthModal()">Join Now</button>
        `;
    }

    getUserProfileHTML() {
        return `
            <div class="user-profile">
                <span>👤</span>
                <span>Welcome, ${this.currentUser?.name || 'User'}!</span>
            </div>
        `;
    }

    attachEventListeners() {
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

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && 
                !e.target.closest('.mobile-menu-btn') &&
                this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll events for header
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    handleScroll() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--background)';
            header.style.backdropFilter = 'blur(0px)';
        }
    }

    checkAuthStatus() {
        // Check if user is logged in (this would typically check cookies/localStorage)
        const userData = localStorage.getItem('uienc_user');
        if (userData) {
            this.isLoggedIn = true;
            this.currentUser = JSON.parse(userData);
            this.renderHeader();
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.add('active');
        this.isMobileMenuOpen = true;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
        this.isMobileMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    login(userData) {
        this.isLoggedIn = true;
        this.currentUser = userData;
        localStorage.setItem('uienc_user', JSON.stringify(userData));
        this.renderHeader();
        this.closeAuthModal();
        this.closeMobileMenu();
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('uienc_user');
        this.renderHeader();
        this.closeMobileMenu();
    }
}

// Auth Modal Functions
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    headerManager.closeMobileMenu(); // Close mobile menu when auth modal opens
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Direct Authentication Links - Replace with your actual URLs
function googleAuth() {
    // Direct Google OAuth URL - Replace with your actual Google OAuth URL
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + 
        'client_id=YOUR_GOOGLE_CLIENT_ID&' +
        'redirect_uri=YOUR_REDIRECT_URI&' +
        'response_type=code&' +
        'scope=email profile&' +
        'access_type=offline&' +
        'prompt=consent';
    
    // For demo purposes, we'll simulate a successful login
    // In production, replace this with: window.location.href = googleAuthUrl;
    
    const userData = {
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: '👤',
        provider: 'google'
    };
    headerManager.login(userData);
}

function digilockerAuth() {
    // Direct DigiLocker OAuth URL - Replace with your actual DigiLocker URL
    const digilockerAuthUrl = 'https://digilocker.gov.in/oauth2/1/authorize?' +
        'client_id=YOUR_DIGILOCKER_CLIENT_ID&' +
        'redirect_uri=YOUR_REDIRECT_URI&' +
        'response_type=code&' +
        'state=YOUR_STATE';
    
    // For demo purposes, we'll simulate a successful login
    // In production, replace this with: window.location.href = digilockerAuthUrl;
    
    const userData = {
        name: 'DigiLocker User',
        email: 'user@digilocker.gov.in',
        avatar: '🆔',
        provider: 'digilocker'
    };
    headerManager.login(userData);
}

function showRegistration() {
    closeAuthModal();
    scrollToSection('registration');
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        headerManager.closeMobileMenu();
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('auth-modal');
    if (e.target === modal) {
        closeAuthModal();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && headerManager.isMobileMenuOpen) {
        headerManager.closeMobileMenu();
    }
});

// Initialize Header Manager
const headerManager = new HeaderManager();
