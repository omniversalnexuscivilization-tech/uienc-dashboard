// ============================================
// UIENC 2.0 - Body Section JavaScript
// Interactive Features for Education 5.0
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeBodySections();
});

// Initialize all body section functionality
function initializeBodySections() {
    initializePortfolioTabs();
    initializeAnimations();
    initializeCounters();
    initializeIntelligenceMandala();
    initializeTutorialInteractions();
}

// Portfolio Tabs Functionality
function initializePortfolioTabs() {
    const tabs = document.querySelectorAll('.portfolio-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            contents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show target tab content
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Animated Counters for Statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target], .community-stat-card .stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const counter = entry.target;
                const target = counter.getAttribute('data-target') || 
                               counter.textContent.replace(/[^0-9]/g, '');
                
                if (target && !isNaN(target)) {
                    animateCounter(counter, parseInt(target), 2000);
                    counter.classList.add('counted');
                }
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Advanced Animations
function initializeAnimations() {
    // Parallax effect for hero section
    initializeParallax();
    
    // Card hover effects with 3D tilt
    initializeCardEffects();
    
    // Cosmic waves animation
    initializeCosmicEffects();
}

// Parallax Scrolling Effect
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.shape');
                    
                    parallaxElements.forEach((element, index) => {
                        const speed = (index + 1) * 0.3;
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// Enhanced 3D Card Effects
function initializeCardEffects() {
    const cards = document.querySelectorAll(
        '.feature-card, .vision-card, .light-card, .pillar-card, ' +
        '.project-card, .modern-card, .dashboard-card, .involvement-card, ' +
        '.registration-card, .community-stat-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Cosmic Effects Animation
function initializeCosmicEffects() {
    const cosmicWaves = document.querySelector('.cosmic-waves');
    if (cosmicWaves) {
        let animationFrame;
        let phase = 0;
        
        function animateWaves() {
            phase += 0.01;
            cosmicWaves.style.transform = `
                translateY(${Math.sin(phase) * 20}px)
                scale(${1 + Math.sin(phase * 0.5) * 0.05})
            `;
            animationFrame = requestAnimationFrame(animateWaves);
        }
        
        animateWaves();
    }
}

// Intelligence Mandala Interactive Animation
function initializeIntelligenceMandala() {
    const nodes = document.querySelectorAll('.intelligence-node');
    const center = document.querySelector('.mandala-center');
    
    nodes.forEach((node, index) => {
        node.addEventListener('click', function() {
            // Remove active class from all nodes
            nodes.forEach(n => n.classList.remove('active'));
            
            // Add active class to clicked node
            this.classList.add('active');
            
            // Get intelligence type
            const intelligenceType = this.getAttribute('data-intelligence');
            
            // Show intelligence info
            showIntelligenceInfo(intelligenceType);
            
            // Animate center
            if (center) {
                center.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    center.style.transform = '';
                }, 300);
            }
        });
        
        // Add hover effect
        node.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

function showIntelligenceInfo(intelligenceType) {
    const intelligenceInfo = {
        'Logical': {
            title: 'Logical-Mathematical Intelligence',
            description: 'Capacity for mathematical and logical reasoning, problem-solving, and pattern recognition.',
            examples: 'Scientific thinking, coding, strategic planning'
        },
        'Creative': {
            title: 'Creative-Artistic Intelligence',
            description: 'Ability to perceive, create, and appreciate art, music, and visual-spatial arrangements.',
            examples: 'Drawing, music composition, design thinking'
        },
        'Emotional': {
            title: 'Emotional Intelligence',
            description: 'Self-awareness, emotional regulation, and understanding of one\'s own feelings and motivations.',
            examples: 'Self-reflection, mindfulness, emotional management'
        },
        'Social': {
            title: 'Social-Interpersonal Intelligence',
            description: 'Capacity to understand and interact effectively with others, building relationships.',
            examples: 'Communication, empathy, collaboration'
        },
        'Physical': {
            title: 'Bodily-Kinesthetic Intelligence',
            description: 'Ability to use one\'s body skillfully and handle objects with finesse.',
            examples: 'Sports, dance, hands-on building'
        },
        'Naturalist': {
            title: 'Naturalist Intelligence',
            description: 'Recognition and understanding of the natural world, living organisms, and ecosystems.',
            examples: 'Environmental awareness, gardening, animal care'
        },
        'Spiritual': {
            title: 'Spiritual-Existential Intelligence',
            description: 'Capacity to contemplate deeper questions about existence, meaning, and consciousness.',
            examples: 'Meditation, philosophical inquiry, mindfulness'
        },
        'Cultural': {
            title: 'Cultural Intelligence',
            description: 'Understanding and appreciation of diverse cultures, traditions, and global perspectives.',
            examples: 'Cross-cultural communication, heritage preservation'
        }
    };
    
    const info = intelligenceInfo[intelligenceType];
    if (info) {
        window.UIENC.showToast(
            `${info.title}: ${info.description}`,
            'info'
        );
    }
}

// Tutorial Steps Interactions
function initializeTutorialInteractions() {
    const steps = document.querySelectorAll('.modern-step, .step-card');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Highlight current step
            steps.forEach(s => s.classList.remove('highlighted'));
            this.classList.add('highlighted');
            
            // Show step details
            showStepDetails(index + 1);
        });
    });
}

function showStepDetails(stepNumber) {
    const stepDetails = {
        1: {
            title: 'Create Your Account',
            details: 'Sign up using Google OAuth for instant access, DigiLocker for verified Indian credentials, or traditional email registration. All your data is encrypted and secure.'
        },
        2: {
            title: 'Set Up Your Profile',
            details: 'Build your personalized learning profile by selecting interests, documenting strengths, setting goals, and choosing learning preferences. This helps us customize your experience.'
        },
        3: {
            title: 'Join a Learning Pod',
            details: 'Connect with mentors who guide your journey and peers who share your interests. Learning pods are small communities focused on collaborative growth and mutual support.'
        },
        4: {
            title: 'Document Your Journey',
            details: 'Add projects that demonstrate your skills, write reflections on your learning, and provide evidence of growth across multiple intelligences. This builds your living portfolio.'
        },
        5: {
            title: 'Earn Soulbound Badges',
            details: 'Receive blockchain-verified, non-transferable badges that recognize your achievements, growth milestones, and contributions to the community. These are permanent and verifiable.'
        }
    };
    
    const detail = stepDetails[stepNumber];
    if (detail) {
        window.UIENC.showToast(
            `Step ${stepNumber}: ${detail.title} - ${detail.details}`,
            'info'
        );
    }
}

// Event Listeners for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Join button interactions
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const eventName = this.closest('.event-item').querySelector('h4').textContent;
            window.UIENC.showToast(`Registration for "${eventName}" coming soon!`, 'info');
        });
    });
    
    // Principle badges interaction
    const principleBadges = document.querySelectorAll('.principle-badge');
    principleBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const principle = this.textContent.trim();
            showPrincipleDetails(principle);
        });
    });
    
    // Feature cards expansion
    const featureCards = document.querySelectorAll('.cosmic-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            window.UIENC.showToast(`${title}: ${description}`, 'info');
        });
    });
});

function showPrincipleDetails(principle) {
    const principleInfo = {
        'Scientific Rationalism': 'Grounding all learning in evidence-based knowledge, critical inquiry, and rational thinking while recognizing the interconnection of all life.',
        'Humanistic Values': 'Cultivating compassion, empathy, and ethical decision-making rooted in reason, transcending dogma to embrace universal human dignity.',
        'Universal Cooperation': 'Fostering global citizenship and collaborative problem-solving, recognizing that humanity\'s challenges require unified action.'
    };
    
    const info = principleInfo[principle];
    if (info) {
        window.UIENC.showToast(info, 'info');
    }
}

// Scroll Progress for Sections
function updateSectionProgress() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view');
        }
    });
}

window.addEventListener('scroll', window.UIENC.throttle(updateSectionProgress, 100));

// Lazy Loading for Images and Content
function lazyLoadContent() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.tagName === 'IMG' && element.dataset.src) {
                    element.src = element.dataset.src;
                } else if (element.dataset.lazy === 'background' && element.dataset.src) {
                    element.style.backgroundImage = `url(${element.dataset.src})`;
                }
                
                element.removeAttribute('data-lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Initialize lazy loading
lazyLoadContent();

// Portfolio Project Filtering (if needed)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card, .modern-card');
    
    projects.forEach(project => {
        const projectCategory = project.dataset.category;
        
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Enhanced Search Functionality (if search is added)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.UIENC.debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            performSearch(searchTerm);
        }, 300));
    }
}

function performSearch(term) {
    // Implement search logic here
    console.log('Searching for:', term);
    
    // Example: Search through sections
    const searchableElements = document.querySelectorAll('section h2, section h3, section p');
    let results = [];
    
    searchableElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(term)) {
            results.push({
                element: el,
                section: el.closest('section').id,
                text: el.textContent.substring(0, 100)
            });
        }
    });
    
    if (results.length > 0) {
        console.log('Search results:', results);
    }
}

// Form Interactions Enhancement
function enhanceFormInteractions() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
}

// Initialize form enhancements
enhanceFormInteractions();

// Community Stats Real-time Simulation
function simulateStatsUpdate() {
    const statElements = document.querySelectorAll('.community-stat-card .stat-number.counted');
    
    setInterval(() => {
        statElements.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            if (!isNaN(currentValue) && currentValue < 100000) {
                const increase = Math.floor(Math.random() * 3);
                if (increase > 0) {
                    const newValue = currentValue + increase;
                    stat.textContent = newValue.toLocaleString();
                }
            }
        });
    }, 60000); // Update every minute
}

// Start stats simulation (optional)
// simulateStatsUpdate();

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll(
        '.feature-card, .vision-card, .pillar-card, .project-card, ' +
        '.dashboard-card, .involvement-card, .intelligence-node'
    );
    
    interactiveCards.forEach(card => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Export body-specific functions
window.UIENC.body = {
    filterProjects,
    showIntelligenceInfo,
    showStepDetails,
    performSearch,
    simulateStatsUpdate
};

// Performance monitoring (optional)
if (window.performance && window.performance.mark) {
    window.performance.mark('body-script-loaded');
    console.log('Body script initialized successfully');
}
