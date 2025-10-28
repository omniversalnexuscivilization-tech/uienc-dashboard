// Body JavaScript
class BodyManager {
    constructor() {
        this.currentRegistrationTab = 'learner';
        this.currentPortfolioTab = 'projects';
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.initializeAnimations();
        this.initializeForms();
    }

    attachEventListeners() {
        // Registration tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchRegistrationTab(e.target.dataset.tab);
            });
        });

        // Portfolio tab switching
        document.querySelectorAll('.portfolio-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchPortfolioTab(e.target.dataset.tab);
            });
        });

        // Form submissions
        document.querySelectorAll('.registration-form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });

        // Interest tags interaction
        document.querySelectorAll('.tag-option').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const checkbox = tag.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                tag.classList.toggle('active', checkbox.checked);
            });
        });

        // Initialize intersection observer for animations
        this.initIntersectionObserver();
    }

    switchRegistrationTab(tabName) {
        this.currentRegistrationTab = tabName;
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Show corresponding form
        document.querySelectorAll('.registration-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}-form`);
        });
    }

    switchPortfolioTab(tabName) {
        this.currentPortfolioTab = tabName;
        
        // Update active tab button
        document.querySelectorAll('.portfolio-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Basic validation
        if (!this.validateForm(form)) {
            this.showNotification('Please fill all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Account created successfully! Welcome to UIENC 2.0.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Close modal if open
            closeAuthModal();
        }, 2000);
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                this.highlightField(field, false);
            } else {
                this.highlightField(field, true);
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    this.highlightField(field, false);
                }
            }
        });
        
        return isValid;
    }

    highlightField(field, isValid) {
        if (isValid) {
            field.style.borderColor = '#10b981';
        } else {
            field.style.borderColor = '#ef4444';
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    initializeAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections for fade-in animation
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });

        // Observe feature cards for staggered animation
        document.querySelectorAll('.feature-card, .vision-card, .step-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    initializeForms() {
        // Add real-time validation
        document.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
    }

    validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bodyManager = new BodyManager();
});

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle CTA buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-primary') || 
        e.target.classList.contains('btn-primary') ||
        e.target.classList.contains('involvement-btn')) {
        
        if (!headerManager.isLoggedIn) {
            openAuthModal();
        } else {
            // Redirect to dashboard or appropriate page
            bodyManager.showNotification('Redirecting to your dashboard...', 'success');
            // In a real app, this would be: window.location.href = '/dashboard';
        }
    }
});

// Add some interactive features to the intelligence wheel
document.addEventListener('DOMContentLoaded', () => {
    const wheelItems = document.querySelectorAll('.wheel-item');
    wheelItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = item.style.transform.replace('scale(1)', 'scale(1.2)');
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = item.style.transform.replace('scale(1.2)', 'scale(1)');
        });
    });
});

