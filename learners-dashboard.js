// Growth Report Card Functionality

class GrowthReportCard {
    constructor() {
        this.isOffline = false;
        this.reportData = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadReportData();
        this.checkOnlineStatus();
    }

    bindEvents() {
        // Toggle offline mode
        document.getElementById('toggleOfflineBtn').addEventListener('click', () => {
            this.toggleOfflineMode();
        });

        // Print report
        document.getElementById('printReportBtn').addEventListener('click', () => {
            this.printReport();
        });

        // Export as PDF
        document.getElementById('exportReportPdfBtn').addEventListener('click', () => {
            this.exportAsPDF();
        });

        // Tab switching
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.getAttribute('data-tab');
                if (tabName === 'report-card') {
                    this.refreshReportData();
                }
            });
        });
    }

    loadReportData() {
        // Try to load from localStorage first
        const savedData = localStorage.getItem('uienc_report_data');
        
        if (savedData) {
            this.reportData = JSON.parse(savedData);
            this.renderReport();
        } else {
            // Load default data
            this.loadDefaultData();
        }
    }

    loadDefaultData() {
        this.reportData = {
            learner: {
                name: "Aanya Ronghang",
                avatar: "AR",
                pod: "Green Pod – Community Eco-Hub",
                period: "April–June 2025"
            },
            summary: {
                contributionScore: "87/100",
                learningHours: "487",
                completionRate: "92%",
                activeProjects: "2",
                narrative: "Aanya has demonstrated exceptional growth in her understanding of sustainable community practices. Her work on the rainwater harvesting system has shown both technical skill and deep community awareness. She has actively mentored younger learners in the pod and contributed to collective knowledge sharing."
            },
            growthAreas: [
                {
                    area: "Ecological Stewardship",
                    level: 4,
                    progress: "Advanced",
                    trend: "up",
                    evidence: "Led rainwater harvesting project; documented local biodiversity"
                },
                {
                    area: "Community Leadership",
                    level: 3,
                    progress: "Intermediate",
                    trend: "up",
                    evidence: "Mentored 2 younger learners; facilitated community meetings"
                },
                {
                    area: "Technical Skills",
                    level: 4,
                    progress: "Advanced",
                    trend: "stable",
                    evidence: "Designed and built functional water filtration system"
                },
                {
                    area: "Cultural Knowledge",
                    level: 3,
                    progress: "Intermediate",
                    trend: "up",
                    evidence: "Documented traditional water management practices"
                },
                {
                    area: "Collaborative Problem Solving",
                    level: 3,
                    progress: "Intermediate",
                    trend: "up",
                    evidence: "Resolved team conflicts; integrated diverse perspectives"
                }
            ],
            projects: [
                {
                    title: "Community Rainwater Harvesting System",
                    status: "completed",
                    description: "Designed and implemented a rainwater collection system for the community garden, incorporating traditional knowledge with modern techniques.",
                    impact: "Reduced water consumption by 30% during dry season"
                },
                {
                    title: "Indigenous Plant Database",
                    status: "in-progress",
                    description: "Creating a digital archive of local medicinal plants with traditional uses and modern applications.",
                    impact: "Preserving traditional knowledge for future generations"
                }
            ],
            achievements: [
                {
                    title: "Water Wisdom Keeper",
                    description: "Awarded for exceptional understanding and application of traditional water management systems"
                },
                {
                    title: "Community Bridge Builder",
                    description: "Recognized for effectively connecting traditional knowledge with modern sustainability practices"
                },
                {
                    title: "Eco-Innovation Award",
                    description: "For creative problem-solving in designing the rainwater harvesting system"
                }
            ],
            reflections: [
                {
                    author: "Self",
                    date: "June 15, 2025",
                    text: "I've learned that true sustainability comes from listening to both the land and the elders. The rainwater system works not just because of the technical design, but because it honors the ways water has always moved through this place."
                },
                {
                    author: "Mentor",
                    date: "June 20, 2025",
                    text: "Aanya shows remarkable ability to integrate different ways of knowing. Her respect for traditional practices combined with technical curiosity makes her a true bridge between worlds."
                },
                {
                    author: "Community Elder",
                    date: "June 25, 2025",
                    text: "This young one carries the old ways in her heart while walking firmly into the future. Her work with water reminds us all of our responsibility to the next seven generations."
                }
            ]
        };

        this.saveToStorage();
        this.renderReport();
    }

    renderReport() {
        if (!this.reportData) return;

        this.renderSummary();
        this.renderGrowthAreas();
        this.renderProjects();
        this.renderAchievements();
        this.renderReflections();
    }

    renderSummary() {
        const data = this.reportData.summary;
        
        document.getElementById('summaryContributionScore').textContent = data.contributionScore;
        document.getElementById('summaryLearningHours').textContent = data.learningHours;
        document.getElementById('summaryCompletionRate').textContent = data.completionRate;
        document.getElementById('summaryProjects').textContent = data.activeProjects;
        
        const narrativeEl = document.querySelector('.summary-narrative p');
        if (narrativeEl) {
            narrativeEl.textContent = data.narrative;
        }
    }

    renderGrowthAreas() {
        const container = document.getElementById('growthAreasTableBody');
        if (!container) return;

        container.innerHTML = '';

        this.reportData.growthAreas.forEach(area => {
            const row = document.createElement('div');
            row.className = 'table-row';
            
            const stars = this.renderStars(area.level);
            const trendIcon = this.getTrendIcon(area.trend);
            const trendClass = this.getTrendClass(area.trend);
            
            row.innerHTML = `
                <div class="table-col">
                    <strong>${area.area}</strong>
                </div>
                <div class="table-col">
                    <div class="level-indicator">
                        ${stars}
                    </div>
                </div>
                <div class="table-col">${area.progress}</div>
                <div class="table-col">
                    <div class="trend-indicator ${trendClass}">
                        ${trendIcon}
                        <span>${this.getTrendText(area.trend)}</span>
                    </div>
                </div>
                <div class="table-col">${area.evidence}</div>
            `;
            
            container.appendChild(row);
        });
    }

    renderStars(level) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= level ? 'filled' : '';
            stars += `<i data-lucide="star" class="level-star ${filled}"></i>`;
        }
        return stars;
    }

    getTrendIcon(trend) {
        const icons = {
            up: '<i data-lucide="trending-up"></i>',
            down: '<i data-lucide="trending-down"></i>',
            stable: '<i data-lucide="minus"></i>'
        };
        return icons[trend] || icons.stable;
    }

    getTrendClass(trend) {
        const classes = {
            up: 'trend-up',
            down: 'trend-down',
            stable: 'trend-stable'
        };
        return classes[trend] || 'trend-stable';
    }

    getTrendText(trend) {
        const texts = {
            up: 'Growing',
            down: 'Needs Focus',
            stable: 'Stable'
        };
        return texts[trend] || 'Stable';
    }

    renderProjects() {
        const container = document.getElementById('projectsList');
        if (!container) return;

        container.innerHTML = '';

        this.reportData.projects.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-item';
            
            const statusClass = `status-${project.status.replace(' ', '-')}`;
            
            projectEl.innerHTML = `
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-status ${statusClass}">${project.status}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <p class="project-impact"><strong>Impact:</strong> ${project.impact}</p>
            `;
            
            container.appendChild(projectEl);
        });
    }

    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        container.innerHTML = '';

        this.reportData.achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'achievement-item';
            
            achievementEl.innerHTML = `
                <div class="achievement-icon">
                    <i data-lucide="award"></i>
                </div>
                <div class="achievement-content">
                    <h3>${achievement.title}</h3>
                    <p>${achievement.description}</p>
                </div>
            `;
            
            container.appendChild(achievementEl);
        });
    }

    renderReflections() {
        const container = document.getElementById('reflectionsList');
        if (!container) return;

        container.innerHTML = '';

        this.reportData.reflections.forEach(reflection => {
            const reflectionEl = document.createElement('div');
            reflectionEl.className = 'reflection-item';
            
            reflectionEl.innerHTML = `
                <div class="reflection-header">
                    <span class="reflection-author">${reflection.author}</span>
                    <span class="reflection-date">${reflection.date}</span>
                </div>
                <p class="reflection-text">${reflection.text}</p>
            `;
            
            container.appendChild(reflectionEl);
        });
    }

    toggleOfflineMode() {
        this.isOffline = !this.isOffline;
        this.updateOfflineStatus();
        
        if (this.isOffline) {
            this.showNotification('Offline mode activated. Data will be saved locally.');
        } else {
            this.showNotification('Online mode activated. Syncing data...');
            // In a real app, you would sync data with server here
        }
    }

    updateOfflineStatus() {
        const offlineStatus = document.getElementById('offlineStatus');
        const toggleBtn = document.getElementById('toggleOfflineBtn');
        const toggleIcon = toggleBtn.querySelector('i');
        
        if (this.isOffline) {
            offlineStatus.classList.remove('hidden');
            toggleBtn.innerHTML = '<i data-lucide="wifi"></i> Go Online';
        } else {
            offlineStatus.classList.add('hidden');
            toggleBtn.innerHTML = '<i data-lucide="wifi-off"></i> Go Offline';
        }
        
        // Update icons
        lucide.createIcons();
    }

    checkOnlineStatus() {
        window.addEventListener('online', () => {
            if (!this.isOffline) {
                this.showNotification('Connection restored. Data synced.');
            }
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are currently offline. Working in offline mode.');
            this.isOffline = true;
            this.updateOfflineStatus();
        });

        // Initial check
        if (!navigator.onLine) {
            this.isOffline = true;
            this.updateOfflineStatus();
        }
    }

    printReport() {
        window.print();
    }

    exportAsPDF() {
        this.showNotification('Generating PDF report...');
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const reportElement = document.getElementById('reportCardContent');
        
        // Use html2canvas to capture the report
        html2canvas(reportElement, {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add new pages if content is longer than one page
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Save the PDF
            doc.save(`UIENC_Growth_Report_${this.reportData.learner.name.replace(' ', '_')}_${new Date().getFullYear()}.pdf`);
            this.showNotification('PDF report downloaded successfully!');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            this.showNotification('Error generating PDF. Please try again.', 'error');
        });
    }

    refreshReportData() {
        // In a real application, this would fetch updated data from the server
        // For now, we'll just re-render with current data
        this.renderReport();
    }

    saveToStorage() {
        if (this.reportData) {
            localStorage.setItem('uienc_report_data', JSON.stringify(this.reportData));
        }
    }

    showNotification(message, type = 'success') {
        const toast = document.getElementById('notificationToast');
        const messageEl = document.getElementById('notificationMessage');
        
        messageEl.textContent = message;
        toast.classList.remove('hidden');
        
        // Update icon based on type
        const icon = toast.querySelector('i');
        if (type === 'error') {
            icon.setAttribute('data-lucide', 'alert-circle');
        } else {
            icon.setAttribute('data-lucide', 'check-circle');
        }
        lucide.createIcons();
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the Growth Report Card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.growthReportCard = new GrowthReportCard();
});
