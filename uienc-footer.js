// Footer JavaScript
class FooterManager {
    constructor() {
        this.init();
    }

    init() {
        this.renderFooter();
        this.attachEventListeners();
    }

    renderFooter() {
        const footer = document.getElementById('main-footer');
        footer.innerHTML = this.getFooterHTML();
    }

    getFooterHTML() {
        return `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <span>🌐</span>
                            <span>UIENC 2.0</span>
                        </div>
                        <p class="footer-description">
                            Enhanced Markless Growth Report Card System<br>
                            Holistic Learning Documentation for the 21st Century
                        </p>
                        <div class="social-links">
                            <a href="#" class="social-link" title="Facebook">📘</a>
                            <a href="#" class="social-link" title="Twitter">🐦</a>
                            <a href="#" class="social-link" title="Instagram">📷</a>
                            <a href="#" class="social-link" title="LinkedIn">💼</a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="#home" onclick="scrollToSection('home')">Home</a></li>
                            <li><a href="#about" onclick="scrollToSection('about')">About</a></li>
                            <li><a href="#dashboard" onclick="scrollToSection('dashboard')">Dashboard</a></li>
                            <li><a href="#portfolio" onclick="scrollToSection('portfolio')">Portfolio</a></li>
                            <li><a href="#get-involved" onclick="scrollToSection('get-involved')">Get Involved</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Resources</h4>
                        <ul class="footer-links">
                            <li><a href="/docs">Documentation</a></li>
                            <li><a href="/tutorials">Tutorials</a></li>
                            <li><a href="/research">Research Papers</a></li>
                            <li><a href="/case-studies">Case Studies</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Support</h4>
                        <ul class="footer-links">
                            <li><a href="/help">Help Center</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/accessibility">Accessibility</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Contact Info</h4>
                        <div class="contact-info">
                            <p>📧 hello@uienc.org</p>
                            <p>📞 +91-XXX-XXXX-XXX</p>
                            <p>🏢 Multiple locations across India</p>
                        </div>
                        <div class="newsletter">
                            <h5>Stay Updated</h5>
                            <div class="newsletter-form">
                                <input type="email" placeholder="Your email" id="newsletter-email">
                                <button type="button" onclick="subscribeNewsletter()">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-copyright">
                        <p>&copy; 2025 UIENC 2.0 Markless Education System. All rights reserved.</p>
                    </div>
                    <div class="footer-tech">
                        <span>Powered by:</span>
                        <span class="tech-logo" title="GitHub">🔗</span>
                        <span class="tech-logo" title="Cloudflare">☁️</span>
                        <span class="tech-logo" title="Google Drive">📁</span>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Newsletter subscription
        const newsletterInput = document.getElementById('newsletter-email');
        if (newsletterInput) {
            newsletterInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.subscribeNewsletter();
                }
            });
        }

        // Social media links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(e.target.closest('.social-link').title);
            });
        });
    }

    subscribeNewsletter() {
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();

        if (!email) {
            bodyManager.showNotification('Please enter your email address.', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            bodyManager.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate API call
        bodyManager.showNotification('Subscribing to newsletter...', 'info');
        
        setTimeout(() => {
            bodyManager.showNotification('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
        }, 1500);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleSocialClick(platform) {
        const socialUrls = {
            'Facebook': 'https://facebook.com/uienc',
            'Twitter': 'https://twitter.com/uienc',
            'Instagram': 'https://instagram.com/uienc',
            'LinkedIn': 'https://linkedin.com/company/uienc'
        };

        const url = socialUrls[platform];
        if (url) {
            bodyManager.showNotification(`Opening ${platform}...`, 'info');
            setTimeout(() => {
                window.open(url, '_blank');
            }, 500);
        }
    }
}

// Global function for newsletter subscription
function subscribeNewsletter() {
    footerManager.subscribeNewsletter();
}

// Initialize Footer Manager
const footerManager = new FooterManager();

// Additional footer-related functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add current year to copyright
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }

    // Add loading states to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const originalHTML = this.innerHTML;
            this.innerHTML = '⏳';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });
});

// Handle footer link clicks for smooth scrolling
document.addEventListener('click', (e) => {
    if (e.target.matches('.footer-links a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add some interactive effects to footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.main-footer');
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        footer.style.transform = `translateY(${rate}px)`;
    });
});

