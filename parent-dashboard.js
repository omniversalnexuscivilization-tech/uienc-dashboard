// Parent Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initDashboard();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Dashboard initialization
function initDashboard() {
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        // Initialize components
        initNavigation();
        initModals();
        initForms();
        populateAchievements();
        initCharts();
        
        // Show welcome notification
        showNotification('Parent dashboard loaded successfully');
    }, 1500);
}

// Initialize navigation tabs
function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${targetTab}Tab`) {
                    content.classList.add('active');
                }
            });
            
            // Refresh charts when switching to progress tab
            if (targetTab === 'progress') {
                initCharts();
            }
        });
    });
}

// Initialize modals
function initModals() {
    // Send message modal
    const newMessageBtn = document.getElementById('newMessageBtn');
    const sendMessageModal = document.getElementById('sendMessageModal');
    const closeModalButtons = document.querySelectorAll('[data-close]');
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            openModal('sendMessageModal');
        });
    }
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-close');
            closeModal(modalId);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize forms
function initForms() {
    // Send message form
    const sendMessageForm = document.getElementById('sendMessageForm');
    if (sendMessageForm) {
        sendMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const to = document.getElementById('messageTo').value;
            const subject = document.getElementById('messageSubject').value;
            const body = document.getElementById('messageBody').value;
            
            // In a real app, you would send this data to a server
            console.log('Sending message:', { to, subject, body });
            
            // Show success message
            showNotification('Message sent successfully');
            
            // Close modal and reset form
            closeModal('sendMessageModal');
            sendMessageForm.reset();
        });
    }
    
    // Export report button
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', () => {
            // Simulate report generation
            showNotification('Generating and downloading report...');
            
            // In a real app, this would trigger a download
            setTimeout(() => {
                showNotification('Report downloaded successfully');
            }, 2000);
        });
    }
    
    // Communicate button
    const communicateBtn = document.getElementById('communicateBtn');
    if (communicateBtn) {
        communicateBtn.addEventListener('click', () => {
            openModal('sendMessageModal');
        });
    }
    
    // Progress timeframe selector
    const progressTimeframe = document.getElementById('progressTimeframe');
    if (progressTimeframe) {
        progressTimeframe.addEventListener('change', () => {
            initCharts();
            showNotification(`Progress view updated to ${progressTimeframe.options[progressTimeframe.selectedIndex].text}`);
        });
    }
}

// Populate achievements dynamically
function populateAchievements() {
    const achievementsContainer = document.getElementById('recentAchievements');
    
    if (!achievementsContainer) return;
    
    const achievements = [
        {
            icon: 'award',
            title: 'Community Leadership Badge',
            description: 'For organizing the neighborhood clean-up drive',
            date: 'June 28, 2025'
        },
        {
            icon: 'star',
            title: 'Creative Problem Solver',
            description: 'Innovative solution for water conservation project',
            date: 'June 25, 2025'
        },
        {
            icon: 'users',
            title: 'Team Collaboration Award',
            description: 'Excellent teamwork in science fair project',
            date: 'June 20, 2025'
        },
        {
            icon: 'book-open',
            title: 'Research Excellence',
            description: 'Outstanding research on traditional ecological knowledge',
            date: 'June 15, 2025'
        }
    ];
    
    let achievementsHTML = '';
    
    achievements.forEach(achievement => {
        achievementsHTML += `
            <div class="achievement-item">
                <div class="achievement-icon">
                    <i data-lucide="${achievement.icon}"></i>
                </div>
                <div class="achievement-content">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                    <span class="achievement-date">${achievement.date}</span>
                </div>
            </div>
        `;
    });
    
    achievementsContainer.innerHTML = achievementsHTML;
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize charts
function initCharts() {
    // This is a placeholder for actual chart implementation
    // In a real application, you would use a library like Chart.js or D3.js
    
    const progressTimeframe = document.getElementById('progressTimeframe');
    const timeframe = progressTimeframe ? progressTimeframe.value : 'quarter';
    
    // Simulate different data based on timeframe
    let data;
    switch(timeframe) {
        case 'month':
            data = [65, 75, 60, 85, 70];
            break;
        case 'quarter':
            data = [75, 85, 65, 90, 70];
            break;
        case 'year':
            data = [80, 90, 75, 95, 85];
            break;
        default:
            data = [75, 85, 65, 90, 70];
    }
    
    // Update chart bars (simplified visualization)
    const chartBars = document.querySelectorAll('.chart-bar');
    if (chartBars.length === data.length) {
        chartBars.forEach((bar, index) => {
            bar.style.height = `${data[index]}%`;
            const barValue = bar.querySelector('.bar-value');
            if (barValue) {
                barValue.textContent = `${data[index]}%`;
            }
        });
    }
}

// Show notification toast
function showNotification(message) {
    const toast = document.getElementById('notificationToast');
    const messageElement = document.getElementById('notificationMessage');
    
    if (!toast || !messageElement) return;
    
    messageElement.textContent = message;
    toast.classList.add('show');
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Handle responsive behavior
function handleResize() {
    // Add any responsive behavior needed
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Export functionality for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDashboard,
        openModal,
        closeModal,
        showNotification
    };
}
