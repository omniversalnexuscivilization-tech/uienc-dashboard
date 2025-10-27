// ============================================
// UIENC 2.0 Dashboard - Enhanced JavaScript
// Realistic Pilot Project Implementation
// ============================================

// ===== Enhanced Global State with Comprehensive Demo Data =====
let learnerData = {
    id: 'learner_001',
    name: "Aanya Ronghang",
    age: 13,
    pod: "Green Pod – Community Eco-Hub",
    location: "Manipur, Northeast India",
    term: "April–June 2025 (Spring Cycle)",
    mentor: "Mr. Anil Das",
    peerMentor: "Ritu Sharma (Age 16)",
    avatar: "AR",
    joinedDate: "2024-09-01",
    
    // Comprehensive Growth Areas with Detailed Tracking
    growthAreas: [
        { 
            name: "Effort & Dedication", 
            level: 4, 
            trend: "up", 
            color: "bg-blue",
            previousLevel: 3,
            lastUpdated: "2025-06-15",
            evidence: "Completed 92% of inquiry cycles with consistent persistence"
        },
        { 
            name: "Creativity & Innovation", 
            level: 5, 
            trend: "up", 
            color: "bg-purple",
            previousLevel: 4,
            lastUpdated: "2025-06-20",
            evidence: "Designed original AI game and biomimicry solar compost system"
        },
        { 
            name: "Critical Thinking", 
            level: 4, 
            trend: "up", 
            color: "bg-indigo",
            previousLevel: 3,
            lastUpdated: "2025-06-10",
            evidence: "Applies Socratic method, questions assumptions regularly"
        },
        { 
            name: "Emotional Intelligence", 
            level: 5, 
            trend: "stable", 
            color: "bg-pink",
            previousLevel: 5,
            lastUpdated: "2025-06-01",
            evidence: "Mediates peer conflicts with empathy and cultural sensitivity"
        },
        { 
            name: "Ethical Reasoning", 
            level: 5, 
            trend: "up", 
            color: "bg-green",
            previousLevel: 4,
            lastUpdated: "2025-06-18",
            evidence: "Challenges algorithmic bias, applies indigenous ethics"
        },
        { 
            name: "Community Responsibility", 
            level: 5, 
            trend: "up", 
            color: "bg-teal",
            previousLevel: 4,
            lastUpdated: "2025-06-22",
            evidence: "Mobilized 45+ peers for sustainability initiatives"
        },
        { 
            name: "Eco-Consciousness", 
            level: 4, 
            trend: "up", 
            color: "bg-emerald",
            previousLevel: 3,
            lastUpdated: "2025-06-12",
            evidence: "Family behavior change achieved, tracks water usage"
        },
        { 
            name: "Digital & AI Literacy", 
            level: 4, 
            trend: "up", 
            color: "bg-cyan",
            previousLevel: 3,
            lastUpdated: "2025-06-05",
            evidence: "Built AI quiz game with ethical considerations"
        },
        { 
            name: "Scientific Inquiry", 
            level: 4, 
            trend: "up", 
            color: "bg-orange",
            previousLevel: 3,
            lastUpdated: "2025-06-08",
            evidence: "Mycoremediation research with hypothesis-driven approach"
        },
        { 
            name: "Global Collaboration", 
            level: 3, 
            trend: "up", 
            color: "bg-yellow",
            previousLevel: 2,
            lastUpdated: "2025-06-25",
            evidence: "Participated in Botswana exchange program"
        },
        { 
            name: "Mathematical Reasoning", 
            level: 4, 
            trend: "up", 
            color: "bg-indigo",
            previousLevel: 3,
            lastUpdated: "2025-06-14",
            evidence: "Applied geometry in water harvesting design"
        },
        { 
            name: "Linguistic Intelligence", 
            level: 4, 
            trend: "stable", 
            color: "bg-purple",
            previousLevel: 4,
            lastUpdated: "2025-05-20",
            evidence: "Trilingual proficiency: Rongmei, English, Hindi"
        }
    ],
    
    // Comprehensive Badge System with Blockchain Hashes
    badges: [
        { 
            name: "Eco-Steward", 
            icon: "🌱", 
            tier: "Level 3", 
            date: "2025-05-15",
            category: "Ecological Stewardship",
            description: "Community gardening & waste reduction leadership",
            blockchainHash: "0x7a8f2c3d9e1b4f6a8c2d5e7f9a1b3c5d"
        },
        { 
            name: "Young Innovator", 
            icon: "💡", 
            tier: "Advanced", 
            date: "2025-06-01",
            category: "Innovation & Technology",
            description: "AI Quiz Design + Solar Compost Technology",
            blockchainHash: "0x9b4c6f8a2e5d7c1f3a6b8d9e2c4f7a1b"
        },
        { 
            name: "Pod Leader", 
            icon: "👥", 
            tier: "Emeritus", 
            date: "2025-06-20",
            category: "Community Leadership",
            description: "Green Week Coordination + peer mentorship",
            blockchainHash: "0x3f7a9c2d5e8b1f4a6c9d2e5f8b1a4c7d"
        },
        { 
            name: "Biodiversity Guardian", 
            icon: "🦋", 
            tier: "Active", 
            date: "2025-05-28",
            category: "Ecological Stewardship",
            description: "Species documentation + habitat restoration",
            blockchainHash: "0x6c9f2a5d8e1b4f7a3c6d9e2f5b8a1c4d"
        },
        { 
            name: "Ethical AI Practitioner", 
            icon: "🤖", 
            tier: "Certified", 
            date: "2025-06-10",
            category: "Innovation & Technology",
            description: "Responsible AI use + bias awareness",
            blockchainHash: "0x8d3f6a9c2e5b1f4a7c9d2e6f8b1a4c7d"
        },
        { 
            name: "Water Wisdom Keeper", 
            icon: "💧", 
            tier: "Practitioner", 
            date: "2025-06-18",
            category: "Ecological Stewardship",
            description: "Water conservation advocacy + data-driven solutions",
            blockchainHash: "0x2e6f9a3c5d8b1f4a7c9d2e5f8b1a4c6d"
        },
        { 
            name: "Cultural Ambassador", 
            icon: "🎭", 
            tier: "Level 2", 
            date: "2025-05-10",
            category: "Cultural Preservation",
            description: "Indigenous language technology integration",
            blockchainHash: "0x5b8f2a6c9d3e1f4a7c9d2e6f8b1a4c7d"
        },
        { 
            name: "Citizen Scientist", 
            icon: "🔬", 
            tier: "Emerging", 
            date: "2025-06-22",
            category: "Innovation & Technology",
            description: "Mycoremediation research + scientific methodology",
            blockchainHash: "0x9c4f7a2d6e8b1f3a5c9d2e6f8b1a4c7d"
        }
    ],
    
    // Detailed Project Portfolio
    projects: [
        {
            id: '1',
            title: "Biomimetic Solar Compost Accelerator",
            focus: "Sustainability Science, Engineering, Biomimicry",
            impact: "340% faster decomposition, 23kg/week waste reduced, 2.4 tons CO2 offset/year",
            status: "completed",
            date: "2025-05-30",
            startDate: "2025-04-01",
            description: "Designed black soldier fly larvae-integrated solar heating chamber based on termite mound ventilation principles. Conducted 6-week controlled experiments with statistical analysis.",
            skills: ["Biomimicry", "Thermal Engineering", "Entomology", "Data Science", "CAD Modeling"],
            collaborators: ["Grandmother (Traditional Knowledge)", "Prof. Keerthana (University Mentor)", "Green Pod Team"],
            impact_metrics: {
                waste_reduced: "23 kg/week",
                decomposition_rate: "+340%",
                communities_adopted: 12,
                carbon_offset: "2.4 tons CO2/year"
            },
            files: [
                { name: "Research_Journal.pdf", type: "application/pdf", size: 2456789 },
                { name: "CAD_Design.dwg", type: "application/dwg", size: 1234567 },
                { name: "Presentation_Video.mp4", type: "video/mp4", size: 45678900 }
            ],
            images: ["compost_prototype_1.jpg", "data_charts.png"]
        },
        {
            id: '2',
            title: "Green Week Community Mobilization",
            focus: "Civic Leadership, Environmental Advocacy, Social Organizing",
            impact: "45 students engaged, 8 families adopted sustainable practices, media coverage achieved",
            status: "completed",
            date: "2025-06-15",
            startDate: "2025-06-08",
            description: "Week-long sustainability awareness campaign including plastic-free challenge, native tree planting (120 saplings), elder-youth knowledge exchange, and zero-waste workshops.",
            skills: ["Project Management", "Public Speaking", "Stakeholder Engagement", "Event Coordination"],
            collaborators: ["Community Members", "Local Government", "Elder Council", "Student Volunteers"],
            impact_metrics: {
                participants: 45,
                families_impacted: 8,
                trees_planted: 120,
                media_coverage: "Regional newspaper feature"
            },
            files: [
                { name: "Event_Report.pdf", type: "application/pdf", size: 3456789 },
                { name: "Media_Coverage.jpg", type: "image/jpeg", size: 876543 }
            ],
            images: ["green_week_day1.jpg", "tree_planting.jpg", "workshop.jpg"]
        },
        {
            id: '3',
            title: "AI-Powered Rongmei Language Learning Game",
            focus: "Technology, Cultural Preservation, Game Design, Education",
            impact: "34 learners actively using, 15% language retention improvement, 4 communities requesting adaptation",
            status: "active",
            date: "2025-06-01",
            startDate: "2025-05-10",
            description: "Interactive quiz game teaching Rongmei language vocabulary through storytelling with AI-assisted pronunciation. Addresses language erosion in indigenous communities.",
            skills: ["Python Programming", "UI/UX Design", "Game Mechanics", "Cultural Documentation", "Accessibility Design"],
            collaborators: ["Elders (Cultural Accuracy)", "Peer Programmers", "Language Teachers"],
            impact_metrics: {
                active_users: 34,
                retention_improvement: "15%",
                adaptation_requests: 4,
                vocabulary_covered: 250
            },
            files: [
                { name: "Source_Code.zip", type: "application/zip", size: 5678900 },
                { name: "User_Guide.pdf", type: "application/pdf", size: 1234567 }
            ],
            images: ["game_screenshot_1.png", "game_screenshot_2.png"]
        },
        {
            id: '4',
            title: "Household Water Audit & Conservation System",
            focus: "Environmental Science, Data Analytics, Behavior Change",
            impact: "12% daily water reduction (18L/day), 3 leaks fixed (45L/day saved), ₹240/month cost savings",
            status: "completed",
            date: "2025-05-20",
            startDate: "2025-03-15",
            description: "8-week longitudinal study tracking household water consumption with visual dashboard and intervention strategies. Replicated by 6 other households.",
            skills: ["Data Collection", "Statistical Analysis", "Data Visualization", "Persuasive Communication"],
            collaborators: ["Family Members", "Neighbor Households", "Local Water Department"],
            impact_metrics: {
                water_saved_daily: "18 liters",
                leaks_fixed: 3,
                cost_savings_monthly: "₹240",
                households_replicated: 6
            },
            files: [
                { name: "Water_Audit_Data.xlsx", type: "application/vnd.ms-excel", size: 234567 },
                { name: "Analysis_Report.pdf", type: "application/pdf", size: 1876543 }
            ],
            images: ["water_dashboard.png", "before_after_chart.png"]
        },
        {
            id: '5',
            title: "Mycoremediation Soil Health Experiment",
            focus: "Mycology, Soil Science, Bioremediation, Food Security",
            impact: "34% pesticide reduction in 45 days, improved tomato germination, selected for regional science fair",
            status: "active",
            date: "2025-06-25",
            startDate: "2025-05-01",
            description: "Research on oyster mushroom mycelium remediation of pesticide-polluted soil. Partnered with university lab for toxicity testing.",
            skills: ["Microbiology", "Experimental Design", "Lab Safety", "Scientific Writing", "University Collaboration"],
            collaborators: ["University Lab Partner", "Local Farmers", "Science Mentor"],
            impact_metrics: {
                pesticide_reduction: "34%",
                duration: "45 days",
                germination_improvement: "Significant",
                recognition: "Regional Young Scientist Exhibition"
            },
            files: [
                { name: "Research_Paper.pdf", type: "application/pdf", size: 2345678 },
                { name: "Lab_Results.xlsx", type: "application/vnd.ms-excel", size: 456789 }
            ],
            images: ["mycelium_growth.jpg", "soil_samples.jpg"]
        },
        {
            id: '6',
            title: "Monsoon Water Harvesting Funnel Design",
            focus: "Hydraulic Engineering, Climate Adaptation, Traditional Knowledge, Mathematics",
            impact: "8,000L seasonal storage capacity planned for community center",
            status: "in-progress",
            date: "2025-06-28",
            startDate: "2025-06-20",
            description: "Low-cost rainwater collection system combining indigenous architecture wisdom with modern hydraulic engineering and sustainable materials.",
            skills: ["Applied Geometry", "Fluid Dynamics", "Material Science", "Budgeting", "Traditional Architecture"],
            collaborators: ["Local Carpenter", "Civil Engineer Volunteer", "Grandfather (Traditional Knowledge)"],
            impact_metrics: {
                storage_capacity: "8,000 liters",
                cost: "Under ₹5,000",
                materials: "Bamboo + recycled plastics",
                beneficiaries: "Community Center (200+ users)"
            },
            files: [
                { name: "Design_Calculations.pdf", type: "application/pdf", size: 1234567 },
                { name: "Budget_Plan.xlsx", type: "application/vnd.ms-excel", size: 123456 }
            ],
            images: ["funnel_sketch.jpg", "site_photo.jpg"]
        }
    ],
    
    // Multi-Voice Reflections
    reflections: [
        {
            id: '1',
            author: "Mentor",
            authorRole: "Primary Learning Facilitator",
            text: "Aanya embodies transformative learning. Over this cycle, she has transitioned from individual excellence to collective leadership. Her integration of traditional Rongmei ecological knowledge with contemporary AI tools demonstrates rare synthesis capacity. She facilitates intergenerational dialogue with grace and challenges systemic injustices with courage.",
            date: "2025-06-28",
            tags: ["leadership", "synthesis", "cultural-integration"]
        },
        {
            id: '2',
            author: "Self",
            authorRole: "Learner Voice",
            text: "I used to think learning was about getting answers right. Now I see it's about asking better questions and helping my community. I'm proud of how Green Week brought people together, but I want to improve at public speaking because I get nervous presenting to adults. I learned that my grandmother's traditional farming knowledge is actually advanced permaculture science.",
            date: "2025-06-27",
            tags: ["growth-mindset", "community", "public-speaking-goal"]
        },
        {
            id: '3',
            author: "Parent",
            authorRole: "Family Perspective",
            text: "As Aanya's mother, I've witnessed profound transformation. She now discusses complex environmental systems at dinner and has influenced our entire household to adopt sustainable practices. Her confidence has grown remarkably. She advocates for her younger siblings' learning needs and takes initiative in community service.",
            date: "2025-06-26",
            tags: ["family-impact", "confidence", "sustainability"]
        },
        {
            id: '4',
            author: "Peer",
            authorRole: "Peer Mentor Ritu (Age 16)",
            text: "Mentoring Aanya has been reciprocal learning. She challenges me with questions I haven't considered and teaches me about her culture's relationship with nature. In our pod, she bridges age groups naturally and ensures quieter voices are heard. Her leadership style is inclusive rather than dominant.",
            date: "2025-06-25",
            tags: ["peer-mentorship", "inclusive-leadership", "cultural-exchange"]
        },
        {
            id: '5',
            author: "Elder",
            authorRole: "Grandfather Keishing - Wisdom Keeper",
            text: "Aanya walks between worlds with balanced feet. She carries forward our ancestral knowledge of reading weather patterns, sustainable harvest cycles, and community interdependence while embracing new tools. She understands that technology should serve life, not replace wisdom. Her generation will need this dual consciousness to heal the earth.",
            date: "2025-06-20",
            tags: ["indigenous-knowledge", "balance", "intergenerational"]
        },
        {
            id: '6',
            author: "Community Member",
            authorRole: "Ms. Monika Rongmei - Community Organizer",
            text: "Aanya's Green Week initiative created ripples beyond our pod. Eight families have adopted composting, and the local government is now consulting youth voices for environmental policy. She demonstrates that young people can be powerful changemakers when given authentic platforms.",
            date: "2025-06-18",
            tags: ["community-impact", "youth-agency", "policy-influence"]
        }
    ],
    
    // Comprehensive Metrics
    contributionScore: 87,
    learningHours: 487,
    completionRate: 92,
    projectsCompleted: 4,
    projectsActive: 2,
    totalBadges: 8,
    reflectionCycles: 4,
    
    // Additional Pilot Data
    accessibility: {
        accommodations: ["Visual-spatial learning preference", "Movement breaks", "Extended processing time"],
        strengths: ["Hands-on experimentation", "Multimodal learning", "Nature-based observation"]
    },
    
    languages: ["Rongmei (Native)", "English (Fluent)", "Hindi (Conversational)"],
    
    futureGoals: [
        "Lead cross-community eco-tech project by December 2025",
        "Improve public speaking through youth climate summit participation",
        "Document 50+ traditional ecological practices in multimedia format",
        "Mentor 3+ younger learners in scientific inquiry methods"
    ],
    
    communityConnections: [
        "Green Pod (12 members)",
        "Elder Council (5 wisdom keepers)",
        "University Research Partnership",
        "Botswana Exchange Pod",
        "Local Government Environmental Committee"
    ]
};

let currentEditArea = null;
let uploadedFiles = [];
let animationQueue = [];

// ===== Enhanced Initialization with Animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Animated loading sequence
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            document.getElementById('mainApp').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('mainApp').style.opacity = '1';
                initializeApp();
            }, 50);
        }, 300);
    }, 2000);
});

function initializeApp() {
    loadLearnerData();
    setupEventListeners();
    renderAllContent();
    initializeAnimations();
    lucide.createIcons();
    
    // Auto-save every 30 seconds
    setInterval(autoSave, 30000);
}

// ===== Enhanced Animation System =====
function initializeAnimations() {
    // Staggered fade-in for metrics
    const metrics = document.querySelectorAll('.metric-card');
    metrics.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animated progress bars
    setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, 100);
        });
    }, 500);
    
    // Badge pop-in animation
    const badges = document.querySelectorAll('.badge-item');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        setTimeout(() => {
            badge.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 700 + (index * 80));
    });
}

// ===== Data Management =====
function loadLearnerData() {
    const savedData = localStorage.getItem('uienc_learner_data');
    if (savedData) {
        try {
            learnerData = JSON.parse(savedData);
            console.log('✅ Data loaded from localStorage');
        } catch (e) {
            console.error('❌ Error loading data:', e);
        }
    }
}

function saveLearnerData() {
    try {
        localStorage.setItem('uienc_learner_data', JSON.stringify(learnerData));
        showNotification('Data saved successfully!', 'success');
        console.log('✅ Data saved to localStorage');
    } catch (e) {
        console.error('❌ Error saving data:', e);
        showNotification('Error saving data', 'error');
    }
}

function autoSave() {
    try {
        localStorage.setItem('uienc_learner_data', JSON.stringify(learnerData));
        console.log('💾 Auto-save completed');
    } catch (e) {
        console.error('❌ Auto-save failed:', e);
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Tab navigation with animation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Header buttons
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    document.getElementById('shareBtn').addEventListener('click', shareReport);
    
    // Add buttons
    document.getElementById('addProjectBtn')?.addEventListener('click', () => openModal('addProjectModal'));
    document.getElementById('addReflectionBtn')?.addEventListener('click', () => openModal('addReflectionModal'));
    document.getElementById('viewAllGrowthBtn')?.addEventListener('click', () => switchTab('growth'));
    
    // Modal close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(btn.dataset.close);
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Form submissions
    document.getElementById('addProjectForm').addEventListener('submit', handleAddProject);
    document.getElementById('addReflectionForm').addEventListener('submit', handleAddReflection);
    document.getElementById('editGrowthForm').addEventListener('submit', handleEditGrowth);
    
    // File upload
    const fileUploadArea = document.getElementById('fileUploadArea');
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => {
            document.getElementById('projectFiles').click();
        });
        
        // Drag and drop
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--color-purple)';
            fileUploadArea.style.background = 'var(--bg-light)';
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.style.borderColor = '';
            fileUploadArea.style.background = '';
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = '';
            fileUploadArea.style.background = '';
            const files = Array.from(e.dataTransfer.files);
            handleFiles(files);
        });
    }
    
    document.getElementById('projectFiles')?.addEventListener('change', handleFileSelect);
    
    // Star selector
    document.querySelectorAll('.star-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectStar(parseInt(btn.dataset.level));
        });
    });
    
    // Trend selector
    document.querySelectorAll('.trend-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectTrend(btn.dataset.trend);
        });
    });
}

// ===== Tab Switching with Animation =====
function switchTab(tabName) {
    const currentTab = document.querySelector('.tab-content.active');
    const newTab = document.getElementById(`${tabName}Tab`);
    
    if (currentTab === newTab) return;
    
    // Fade out current tab
    if (currentTab) {
        currentTab.style.opacity = '0';
        currentTab.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            currentTab.classList.remove('active');
            currentTab.style.opacity = '';
            currentTab.style.transform = '';
        }, 200);
    }
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Fade in new tab
    setTimeout(() => {
        newTab.classList.add('active');
        newTab.style.opacity = '0';
        newTab.style.transform = 'translateX(20px)';
        setTimeout(() => {
            newTab.style.transition = 'all 0.3s ease-out';
            newTab.style.opacity = '1';
            newTab.style.transform = 'translateX(0)';
        }, 50);
        
        lucide.createIcons();
        initializeAnimations();
    }, 200);
}

// ===== Render Functions =====
function renderAllContent() {
    renderMetrics();
    renderGrowthSnapshot();
    renderBadges();
    renderGrowthAreas();
    renderProjects();
    renderReflections();
}

function renderMetrics() {
    document.getElementById('contributionScore').textContent = `${learnerData.contributionScore}/100`;
    document.getElementById('learningHours').textContent = learnerData.learningHours;
    document.getElementById('completionRate').textContent = `${learnerData.completionRate}%`;
    document.getElementById('activeProjects').textContent = 
        learnerData.projects.filter(p => p.status === 'active' || p.status === 'in-progress').length;
}

function renderGrowthSnapshot() {
    const container = document.getElementById('growthSnapshotGrid');
    const topAreas = learnerData.growthAreas.slice(0, 6);
    
    container.innerHTML = topAreas.map(area => `
        <div class="growth-item">
            <div class="growth-item-info">
                <div class="growth-item-name">${area.name}</div>
                <div class="stars">
                    ${generateStars(area.level)}
                </div>
            </div>
            ${getTrendIcon(area.trend)}
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderBadges() {
    const container = document.getElementById('badgesGrid');
    const containerLarge = document.getElementById('allBadgesGrid');
    
    const badgeHTML = learnerData.badges.slice(0, 5).map(badge => `
        <div class="badge-item" title="${badge.description}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-tier">${badge.tier}</div>
        </div>
    `).join('');
    
    const badgeHTMLLarge = learnerData.badges.map(badge => `
        <div class="badge-item badge-item-large" title="Blockchain: ${badge.blockchainHash}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-tier">${badge.tier}</div>
            <div class="badge-date">Earned: ${badge.date}</div>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0.5rem 0;">${badge.description}</p>
            <button class="btn btn-primary btn-full-width" onclick="viewBadgeCertificate('${badge.name}')">View Certificate</button>
        </div>
    `).join('');
    
    if (container) container.innerHTML = badgeHTML;
    if (containerLarge) containerLarge.innerHTML = badgeHTMLLarge;
}

function viewBadgeCertificate(badgeName) {
    const badge = learnerData.badges.find(b => b.name === badgeName);
    if (!badge) return;
    
    showNotification(`🎉 Certificate for "${badgeName}" - Blockchain verified: ${badge.blockchainHash.substring(0, 12)}...`, 'success');
}

function renderGrowthAreas() {
    const container = document.getElementById('growthAreasContainer');
    if (!container) return;
    
    container.innerHTML = learnerData.growthAreas.map(area => `
        <div class="growth-area-item">
            <div class="growth-area-header">
                <div class="growth-area-title">
                    <h3 class="growth-area-name">${area.name}</h3>
                    ${getTrendIcon(area.trend)}
                </div>
                <div class="growth-area-actions">
                    <div class="stars">
                        ${generateStars(area.level)}
                    </div>
                    <button class="edit-btn" onclick="openEditGrowth('${area.name}')">
                        <i data-lucide="edit"></i>
                    </button>
                </div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar ${area.color}" style="width: ${(area.level / 5) * 100}%"></div>
            </div>
            <div class="progress-info">
                <span class="progress-label">${getLevelDescription(area.level)}</span>
                <span class="progress-value">${area.level}/5</span>
            </div>
            ${area.evidence ? `<p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">📝 ${area.evidence}</p>` : ''}
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    if (learnerData.projects.length === 0) {
        container.innerHTML = `
            <div class="card">
                <div class="card-body" style="text-align: center; padding: 3rem;">
                    <i data-lucide="folder-open" style="width: 4rem; height: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-secondary); font-size: 1.125rem;">No projects yet. Start by adding your first project!</p>
                </div>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = learnerData.projects.map(project => `
        <div class="project-card">
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="status-badge ${project.status}">
                        ${project.status === 'completed' ? '✅ Completed' : 
                          project.status === 'active' ? '🔄 Active' : '🚧 In Progress'}
                    </span>
                </div>
                <p class="project-focus"><strong>Focus:</strong> ${project.focus}</p>
                ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                <div class="project-impact">
                    <i data-lucide="activity"></i>
                    ${project.impact}
                </div>
                ${project.skills ? `
                    <div style="margin-top: 0.75rem;">
                        <strong style="font-size: 0.875rem;">Skills:</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                            ${project.skills.map(skill => `
                                <span style="padding: 0.25rem 0.75rem; background: #e0e7ff; color: #4338ca; border-radius: 9999px; font-size: 0.75rem;">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                <p class="project-date">📅 ${project.startDate ? `${project.startDate} → ` : ''}${project.date}</p>
                ${project.files && project.files.length > 0 ? `
                    <div class="project-files">
                        ${project.files.map(file => `
                            <span class="file-tag">
                                <i data-lucide="file-text"></i>
                                ${file.name}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                ${project.collaborators ? `
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.75rem;">
                        <strong>Collaborators:</strong> ${project.collaborators.join(', ')}
                    </p>
                ` : ''}
            </div>
            <div class="project-arrow">
                <i data-lucide="chevron-right"></i>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderReflections() {
    const container = document.getElementById('reflectionsContainer');
    if (!container) return;
    
    if (learnerData.reflections.length === 0) {
        container.innerHTML = `
            <div class="card">
                <div class="card-body" style="text-align: center; padding: 3rem;">
                    <i data-lucide="heart" style="width: 4rem; height: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-secondary); font-size: 1.125rem;">No reflections yet. Share your first thought!</p>
                </div>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = learnerData.reflections.map(reflection => `
        <div class="reflection-card">
            <div class="reflection-header">
                <div class="reflection-avatar">${reflection.author[0]}</div>
                <div class="reflection-info">
                    <div class="reflection-meta">
                        <h3 class="reflection-author">${reflection.author}</h3>
                        <span class="reflection-date">• ${reflection.date}</span>
                    </div>
                    ${reflection.authorRole ? `<p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${reflection.authorRole}</p>` : ''}
                    <p class="reflection-text">${reflection.text}</p>
                    ${reflection.tags ? `
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
                            ${reflection.tags.map(tag => `
                                <span style="padding: 0.25rem 0.5rem; background: #fef3c7; color: #92400e; border-radius: 9999px; font-size: 0.75rem;">#${tag}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Helper Functions =====
function generateStars(level) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= level) {
            stars += '<i data-lucide="star" class="filled"></i>';
        } else {
            stars += '<i data-lucide="star" class="empty"></i>';
        }
    }
    return stars;
}

function getTrendIcon(trend) {
    const icons = {
        up: '<i data-lucide="trending-up" class="trend-icon trend-up"></i>',
        down: '<i data-lucide="trending-down" class="trend-icon trend-down"></i>',
        stable: '<i data-lucide="minus" class="trend-icon trend-stable"></i>'
    };
    return icons[trend] || icons.stable;
}

function getLevelDescription(level) {
    const descriptions = {
        1: '⭐ Awakening',
        2: '⭐⭐ Exploring',
        3: '⭐⭐⭐ Integrating',
        4: '⭐⭐⭐⭐ Synthesizing',
        5: '⭐⭐⭐⭐⭐ Transforming'
    };
    return descriptions[level] || 'Unknown';
}

// ===== Modal Functions with Animation =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.9) translateY(50px)';
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'scale(1) translateY(0)';
    }, 50);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    
    // Animate out
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.9) translateY(50px)';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalContent.style.opacity = '';
        modalContent.style.transform = '';
        
        // Reset forms
        if (modalId === 'addProjectModal') {
            document.getElementById('addProjectForm').reset();
            uploadedFiles = [];
            document.getElementById('uploadedFilesList').innerHTML = '';
        }
        if (modalId === 'addReflectionModal') {
            document.getElementById('addReflectionForm').reset();
        }
    }, 300);
}

function openEditGrowth(areaName) {
    const area = learnerData.growthAreas.find(a => a.name === areaName);
    if (!area) return;
    
    currentEditArea = area;
    document.getElementById('editGrowthTitle').textContent = `Edit: ${area.name}`;
    document.getElementById('editGrowthAreaName').value = area.name;
    
    selectStar(area.level);
    selectTrend(area.trend);
    
    openModal('editGrowthModal');
}

// ===== Star & Trend Selection =====
function selectStar(level) {
    document.querySelectorAll('.star-btn').forEach((btn, index) => {
        if (index < level) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    const descriptions = ['', 'Awakening', 'Exploring', 'Integrating', 'Synthesizing', 'Transforming'];
    document.getElementById('starDescription').textContent = descriptions[level] || '';
    
    lucide.createIcons();
}

function selectTrend(trend) {
    document.querySelectorAll('.trend-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.trend === trend) {
            btn.classList.add('active');
        }
    });
}

// ===== File Handling =====
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
}

function handleFiles(files) {
    uploadedFiles = [...uploadedFiles, ...files];
    renderUploadedFiles();
    showNotification(`${files.length} file(s) selected`, 'success');
}

function renderUploadedFiles() {
    const container = document.getElementById('uploadedFilesList');
    if (!container) return;
    
    container.innerHTML = uploadedFiles.map((file, index) => `
        <div class="uploaded-file-item">
            <i data-lucide="file-text"></i>
            <span class="uploaded-file-name">${file.name}</span>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">(${formatFileSize(file.size)})</span>
            <button type="button" class="remove-file-btn" onclick="removeFile(${index})">
                <i data-lucide="trash-2"></i>
            </button>
        </div>
    `).join('');
    lucide.createIcons();
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderUploadedFiles();
    showNotification('File removed', 'info');
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== Form Handlers =====
function handleAddProject(e) {
    e.preventDefault();
    
    const newProject = {
        id: Date.now().toString(),
        title: document.getElementById('projectTitle').value,
        focus: document.getElementById('projectFocus').value,
        description: document.getElementById('projectDescription').value,
        impact: document.getElementById('projectImpact').value,
        status: document.getElementById('projectStatus').value,
        date: new Date().toISOString().split('T')[0],
        startDate: new Date().toISOString().split('T')[0],
        files: uploadedFiles.map(f => ({ 
            name: f.name, 
            type: f.type, 
            size: f.size 
        })),
        skills: [],
        collaborators: []
    };
    
    learnerData.projects.unshift(newProject);
    saveLearnerData();
    renderProjects();
    closeModal('addProjectModal');
    showNotification('🎉 Project added successfully!', 'success');
}

function handleAddReflection(e) {
    e.preventDefault();
    
    const newReflection = {
        id: Date.now().toString(),
        author: document.getElementById('reflectionAuthor').value,
        text: document.getElementById('reflectionText').value,
        date: new Date().toISOString().split('T')[0],
        authorRole: '',
        tags: []
    };
    
    learnerData.reflections.unshift(newReflection);
    saveLearnerData();
    renderReflections();
    closeModal('addReflectionModal');
    showNotification('💭 Reflection added successfully!', 'success');
}

function handleEditGrowth(e) {
    e.preventDefault();
    
    const areaName = document.getElementById('editGrowthAreaName').value;
    const selectedLevel = document.querySelectorAll('.star-btn.active').length;
    const selectedTrend = document.querySelector('.trend-btn.active')?.dataset.trend || 'stable';
    
    const areaIndex = learnerData.growthAreas.findIndex(a => a.name === areaName);
    if (areaIndex !== -1) {
        learnerData.growthAreas[areaIndex].previousLevel = learnerData.growthAreas[areaIndex].level;
        learnerData.growthAreas[areaIndex].level = selectedLevel;
        learnerData.growthAreas[areaIndex].trend = selectedTrend;
        learnerData.growthAreas[areaIndex].lastUpdated = new Date().toISOString().split('T')[0];
        
        saveLearnerData();
        renderAllContent();
        closeModal('editGrowthModal');
        showNotification('📈 Growth area updated successfully!', 'success');
    }
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    const messageEl = document.getElementById('notificationMessage');
    
    toast.classList.remove('error', 'info');
    if (type === 'error') toast.classList.add('error');
    if (type === 'info') toast.classList.add('info');
    
    messageEl.textContent = message;
    toast.classList.remove('hidden');
    
    // Animate in
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
        toast.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        toast.style.transform = 'translateX(0)';
    }, 50);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.style.transform = '';
        }, 300);
    }, 3000);
}

// ===== Export to PDF with Enhanced Content =====
function exportToPDF() {
    showNotification('📄 Preparing comprehensive PDF export...', 'info');
    
    setTimeout(() => {
        const printWindow = window.open('', '_blank');
        const content = generateEnhancedPrintContent();
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>UIENC Growth Report - ${learnerData.name}</title>
                <meta charset="UTF-8">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        padding: 40px; 
                        max-width: 1200px; 
                        margin: 0 auto; 
                        line-height: 1.6;
                        color: #1f2937;
                    }
                    h1 { 
                        color: #7c3aed; 
                        border-bottom: 4px solid #7c3aed; 
                        padding-bottom: 15px; 
                        margin-bottom: 20px;
                        font-size: 2.5rem;
                    }
                    h2 { 
                        color: #4f46e5; 
                        margin-top: 40px; 
                        margin-bottom: 20px;
                        font-size: 1.8rem;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    h3 {
                        color: #111827;
                        margin: 15px 0 10px 0;
                        font-size: 1.2rem;
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 40px; 
                        border-radius: 15px; 
                        margin-bottom: 40px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    }
                    .header h1 { 
                        color: white; 
                        border: none; 
                        margin: 0 0 15px 0; 
                    }
                    .header-info {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                        margin-top: 20px;
                        font-size: 0.95rem;
                    }
                    .metric-grid { 
                        display: grid; 
                        grid-template-columns: repeat(4, 1fr); 
                        gap: 20px; 
                        margin-bottom: 40px; 
                    }
                    .metric-card { 
                        padding: 25px; 
                        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
                        border-left: 5px solid #7c3aed; 
                        border-radius: 10px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    }
                    .metric-card h3 { 
                        margin: 0 0 10px 0; 
                        font-size: 0.85rem; 
                        color: #6b7280;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .metric-card .value { 
                        font-size: 2.5rem; 
                        font-weight: bold; 
                        color: #7c3aed;
                        line-height: 1;
                    }
                    .growth-area { 
                        padding: 20px; 
                        margin: 15px 0; 
                        background: #f9fafb; 
                        border-radius: 10px;
                        border-left: 4px solid #8b5cf6;
                    }
                    .growth-area h3 { 
                        margin: 0 0 10px 0;
                        color: #111827;
                    }
                    .growth-area .evidence {
                        font-size: 0.9rem;
                        color: #6b7280;
                        font-style: italic;
                        margin-top: 8px;
                        padding-left: 15px;
                        border-left: 3px solid #d1d5db;
                    }
                    .project-card { 
                        padding: 25px; 
                        margin: 20px 0; 
                        border: 2px solid #e5e7eb; 
                        border-radius: 12px;
                        background: white;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                        page-break-inside: avoid;
                    }
                    .project-card h3 { 
                        color: #111827; 
                        margin: 0 0 15px 0;
                        font-size: 1.3rem;
                    }
                    .project-meta {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                        margin: 15px 0;
                        font-size: 0.9rem;
                    }
                    .badge-grid { 
                        display: grid; 
                        grid-template-columns: repeat(4, 1fr); 
                        gap: 20px; 
                        margin-bottom: 40px; 
                    }
                    .badge { 
                        padding: 25px; 
                        text-align: center; 
                        background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
                        border: 2px solid #a855f7; 
                        border-radius: 12px;
                        box-shadow: 0 2px 8px rgba(168, 85, 247, 0.1);
                    }
                    .badge-icon { 
                        font-size: 3.5rem; 
                        margin-bottom: 12px; 
                    }
                    .badge h3 {
                        margin: 0 0 5px 0;
                        font-size: 1rem;
                    }
                    .badge-desc {
                        font-size: 0.75rem;
                        color: #6b7280;
                        margin-top: 8px;
                    }
                    .reflection { 
                        padding: 25px; 
                        margin: 20px 0; 
                        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
                        border-left: 5px solid #f59e0b; 
                        border-radius: 10px;
                        page-break-inside: avoid;
                    }
                    .reflection h3 { 
                        margin: 0 0 5px 0;
                        color: #92400e;
                    }
                    .reflection-role {
                        font-size: 0.85rem;
                        color: #92400e;
                        margin-bottom: 10px;
                        font-style: italic;
                    }
                    .skills-tags, .tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 10px;
                    }
                    .tag {
                        padding: 4px 12px;
                        background: #dbeafe;
                        color: #1e40af;
                        border-radius: 999px;
                        font-size: 0.75rem;
                        font-weight: 500;
                    }
                    .footer { 
                        margin-top: 60px; 
                        padding-top: 30px; 
                        border-top: 3px solid #e5e7eb; 
                        text-align: center; 
                        color: #6b7280;
                    }
                    .footer p {
                        margin: 8px 0;
                    }
                    .section-intro {
                        background: #f3f4f6;
                        padding: 15px 20px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                        font-size: 0.95rem;
                        color: #4b5563;
                    }
                    @media print {
                        .no-print { display: none !important; }
                        body { padding: 20px; }
                        .project-card, .reflection { page-break-inside: avoid; }
                    }
                    @page {
                        margin: 2cm;
                    }
                </style>
            </head>
            <body>
                ${content}
                <button class="no-print" onclick="window.print()" style="position: fixed; bottom: 30px; right: 30px; padding: 18px 35px; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; border: none; border-radius: 12px; cursor: pointer; font-size: 16px; font-weight: 600; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(124, 58, 237, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(124, 58, 237, 0.3)';">
                    📄 Print / Save as PDF
                </button>
            </body>
            </html>
        `);
        printWindow.document.close();
        showNotification('✅ Export window opened! Click "Print/Save as PDF" button.', 'success');
    }, 1200);
}

function generateEnhancedPrintContent() {
    return `
        <div class="header">
            <h1>🌐 UIENC 2.0 Markless Growth Report Card</h1>
            <h2 style="margin: 15px 0 10px 0; font-size: 2rem; color: white; border: none;">${learnerData.name}</h2>
            <div class="header-info">
                <p><strong>Pod:</strong> ${learnerData.pod}</p>
                <p><strong>Term:</strong> ${learnerData.term}</p>
                <p><strong>Location:</strong> ${learnerData.location}</p>
                <p><strong>Mentor:</strong> ${learnerData.mentor}</p>
                <p><strong>Age:</strong> ${learnerData.age} years</p>
                <p><strong>Joined:</strong> ${learnerData.joinedDate}</p>
            </div>
        </div>

        <div class="section-intro">
            <strong>About This Report:</strong> This markless growth report card represents ${learnerData.name}'s holistic learning journey. 
            It tracks multidimensional growth across ${learnerData.growthAreas.length} competency areas, documents ${learnerData.projects.length} portfolio projects, 
            and captures ${learnerData.reflections.length} reflections from multiple voices in the learning community.
        </div>

        <h2>📊 Key Learning Metrics</h2>
        <div class="metric-grid">
            <div class="metric-card">
                <h3>Contribution Score</h3>
                <div class="value">${learnerData.contributionScore}<span style="font-size: 1.5rem; color: #9ca3af;">/100</span></div>
                <p style="font-size: 0.85rem; color: #6b7280; margin-top: 8px;">Community + Ecological Impact</p>
            </div>
            <div class="metric-card">
                <h3>Learning Hours</h3>
                <div class="value">${learnerData.learningHours}</div>
                <p style="font-size: 0.85rem; color: #6b7280; margin-top: 8px;">This Quarter</p>
            </div>
            <div class="metric-card">
                <h3>Completion Rate</h3>
                <div class="value">${learnerData.completionRate}<span style="font-size: 1.5rem; color: #9ca3af;">%</span></div>
                <p style="font-size: 0.85rem; color: #6b7280; margin-top: 8px;">Above 85% Benchmark</p>
            </div>
            <div class="metric-card">
                <h3>Total Badges</h3>
                <div class="value">${learnerData.badges.length}</div>
                <p style="font-size: 0.85rem; color: #6b7280; margin-top: 8px;">Blockchain Verified</p>
            </div>
        </div>

