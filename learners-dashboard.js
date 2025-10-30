// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab navigation
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
    
    // Set up dimension card toggles
    const dimensionCards = document.querySelectorAll('.dimension-card');
    dimensionCards.forEach(card => {
        card.addEventListener('click', function() {
            toggleDimension(this);
        });
    });
    
    // Set up offline report functionality
    const downloadButton = document.getElementById('download-report');
    const saveButton = document.getElementById('save-to-storage');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', generateOfflineReport);
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', saveToLocalStorage);
    }
    
    // Animate progress bars on load
    animateProgressBars();
    
    // Check for saved report in local storage
    checkLocalStorage();
});

function showTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

function toggleDimension(element) {
    element.classList.toggle('expanded');
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Generate offline report (PDF simulation)
function generateOfflineReport() {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = "🔄 Generating...";
    button.disabled = true;
    
    // Simulate PDF generation
    setTimeout(() => {
        // Create a simulated download
        const element = document.createElement('a');
        const text = "UIENC 2.0 Growth Portfolio Report\n\n" +
                    "Learner: Aanya Ronghang\n" +
                    "Age: 14 years\n" +
                    "Learning Pod: Green Pod\n" +
                    "Assessment Period: April - June 2025\n\n" +
                    "Life Contribution Index: 82/100\n" +
                    "Growth Dimensions: 8/8 assessed\n" +
                    "Projects Completed: 4\n" +
                    "Badges Earned: 4\n\n" +
                    "Report generated on: " + new Date().toLocaleDateString() + "\n" +
                    "Document ID: LP-IN-KA-2025-7492-Q2-OFFLINE";
        
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'UIENC_Report_Aanya_Ronghang_Q2_2025.txt');
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
        
        // Restore button
        button.textContent = originalText;
        button.disabled = false;
        
        // Save to local storage
        saveToLocalStorage();
        
        alert("Offline report downloaded successfully!");
    }, 1500);
}

// Save report data to local storage
function saveToLocalStorage() {
    const reportData = {
        learner: "Aanya Ronghang",
        age: "14 years",
        pod: "Green Pod",
        period: "April - June 2025",
        contributionIndex: "82/100",
        lastUpdated: new Date().toLocaleString()
    };
    
    localStorage.setItem('uiencGrowthReport', JSON.stringify(reportData));
    
    // Update UI
    checkLocalStorage();
    
    alert("Report saved to local storage!");
}

// Check local storage for saved report
function checkLocalStorage() {
    const savedReport = localStorage.getItem('uiencGrowthReport');
    const lastSavedElement = document.getElementById('last-saved-date');
    
    if (savedReport) {
        const reportData = JSON.parse(savedReport);
        lastSavedElement.textContent = reportData.lastUpdated;
    } else {
        lastSavedElement.textContent = "No report saved locally yet";
    }
}

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTab,
        toggleDimension,
        generateOfflineReport,
        saveToLocalStorage,
        checkLocalStorage
    };
}

