// Body-specific JavaScript for UIENC 2.0

document.addEventListener('DOMContentLoaded', function() {
    // Initialize registration tabs
    initRegistrationTabs();
    
    // Initialize portfolio tabs
    initPortfolioTabs();
    
    // Initialize progress animations
    initProgressAnimations();
    
    // Initialize intelligence wheel interaction
    initIntelligenceWheel();
});

// Registration tabs functionality
function initRegistrationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.registration-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabId}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// Portfolio tabs functionality
function initPortfolioTabs() {
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            portfolioTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Progress animations
function initProgressAnimations() {
    // Animate progress rings
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference;
                
                // Get the target percentage from data attribute or calculate from offset
                const offset = circumference - (75 / 100) * circumference;
                
                setTimeout(() => {
                    circle.style.transition = 'stroke-dashoffset 1s ease-in-out';
                    circle.style.strokeDashoffset = offset;
                }, 200);
                
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });
    
    progressRings.forEach(ring => {
        observer.observe(ring);
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                
                // Reset width to 0 for animation
                fill.style.width = '0%';
                
                setTimeout(() => {
                    fill.style.transition = 'width 1s ease-in-out';
                    fill.style.width = width;
                }, 200);
                
                barObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// Intelligence wheel interaction
function initIntelligenceWheel() {
    const wheelItems = document.querySelectorAll('.wheel-item');
    
    wheelItems.forEach(item => {
        item.addEventListener('click', function() {
            const intelligenceType = this.textContent.trim();
            
            // Show a modal or tooltip with more information about this intelligence type
            showIntelligenceInfo(intelligenceType);
        });
    });
}

function showIntelligenceInfo(type) {
    // In a real implementation, this would show a modal with detailed information
    // For demo purposes, we'll just log to console
    console.log(`Showing information about ${type} intelligence`);
    
    // Create a simple tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'intelligence-tooltip';
    tooltip.textContent = `Learn more about ${type} intelligence`;
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'var(--primary-color)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px 15px';
    tooltip.style.borderRadius = 'var(--border-radius)';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = 'var(--shadow)';
    
    document.body.appendChild(tooltip);
    
    // Position tooltip near cursor
    document.addEventListener('mousemove', function positionTooltip(e) {
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY + 10) + 'px';
    });
    
    // Remove tooltip after a delay
    setTimeout(() => {
        document.body.removeChild(tooltip);
        document.removeEventListener('mousemove', positionTooltip);
    }, 2000);
}

// Dashboard card interactions
function initDashboardCards() {
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    dashboardCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside the card
            if (!e.target.closest('a')) {
                const cardTitle = this.querySelector('h3').textContent;
                
                // In a real implementation, this would navigate to the full dashboard
                console.log(`Navigating to ${cardTitle} dashboard`);
                
                // For demo, show an alert
                alert(`This would navigate to the full ${cardTitle.toLowerCase()} dashboard.`);
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initDashboardCards();
});

// Feature card animations
function initFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card, .vision-card, .involvement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initFeatureCardAnimations();
});
