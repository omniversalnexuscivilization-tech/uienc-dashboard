// ============================================
// UIENC 2.0 Parent Dashboard - JavaScript
// Child Progress Monitoring System
// ============================================

// ===== Parent Data State =====
let parentData = {
    id: 'parent_001',
    name: "Mrs. Ronghang",
    email: "parent@example.com",
    relationship: "Mother",
    
    // Child information
    child: {
        id: 'learner_001',
        name: "Aanya Ronghang",
        age: 13,
        avatar: "AR",
        pod: "Green Pod",
        mentor: "Mr. Anil Das",
        peerMentor: "Ritu Sharma",
        joinedDate: "2024-09-01",
        
        // Current metrics
        contributionScore: 87,
        previousContributionScore: 82,
        learningHours: 487,
        completionRate: 92,
        projectsTotal: 6,
        projectsCompleted: 4,
        badgesCount: 8,
        newBadgesThisMonth: 2,
        averageGrowthLevel: 4.3,
        
        // Growth areas with detailed tracking
        growthAreas: [
            { 
                name: "Creativity & Innovation", 
                level: 5, 
                previousLevel: 4,
                trend: "up",
                evidence: "Designed original AI game and biomimicry solar compost system"
            },
            { 
                name: "Community Responsibility", 
                level: 5, 
                previousLevel: 4,
                trend: "up",
                evidence: "Mobilized 45+ peers for sustainability initiatives"
            },
            { 
                name: "Ethical Reasoning", 
                level: 5, 
                previousLevel: 4,
                trend: "up",
                evidence: "Challenges algorithmic bias, applies indigenous ethics"
            },
            { 
                name: "Effort & Dedication", 
                level: 4, 
                previousLevel: 3,
                trend: "up",
                evidence: "Completes 92% of inquiry cycles with persistence"
            },
            { 
                name: "Eco-Consciousness", 
                level: 4, 
                previousLevel: 3,
                trend: "up",
                evidence: "Family behavior change achieved, tracks water usage"
            },
            { 
                name: "Digital & AI Literacy", 
                level: 4, 
                previousLevel: 3,
                trend: "up",
                evidence: "Built AI quiz game with ethical considerations"
            },
            { 
                name: "Critical Thinking", 
                level: 4, 
                previousLevel: 3,
                trend: "up",
                evidence: "Applies Socratic method in discussions"
            },
            { 
                name: "Scientific Inquiry", 
                level: 4, 
                previousLevel: 3,
                trend: "up",
                evidence: "Mycoremediation research with hypothesis-driven approach"
            },
            { 
                name: "Global Collaboration", 
                level: 3, 
                previousLevel: 2,
                trend: "up",
                evidence: "Participated in Botswana exchange program"
            },
            { 
                name: "Mathematical Reasoning", 
                level: 4, 
                previousLevel: 3,
                trend: "stable",
                evidence: "Applied geometry in water harvesting design"
            }
        ],
        
        // Recent achievements
        recentAchievements: [
            {
                id: 'achievement_001',
                title: "Water Wisdom Keeper Badge",
                description: "Awarded for water conservation advocacy and data-driven solutions",
                date: "2025-06-18",
                icon: "💧",
                type: "badge"
            },
            {
                id: 'achievement_002',
                title: "Green Week Leadership",
                description: "Successfully mobilized 45 students for sustainability campaign",
                date: "2025-06-15",
                icon: "🌱",
                type: "project"
            },
            {
                id: 'achievement_003',
                title: "Citizen Scientist Badge",
                description: "Recognition for mycoremediation research and scientific methodology",
                date: "2025-06-10",
                icon: "🔬",
                type: "badge"
            }
        ],
        
        // Upcoming activities
        upcomingActivities: [
            {
                id: 'activity_001',
                title: "Youth Climate Summit Presentation",
                description: "Present mycoremediation research findings",
                date: "2025-07-05",
                time: "10:00 AM",
                location: "Community Center",
                type: "presentation"
            },
            {
                id: 'activity_002',
                title: "Botswana Pod Exchange Call",
                description: "Cross-cultural collaboration session on water management",
                date: "2025-07-08",
                time: "3:00 PM",
                location: "Online",
                type: "collaboration"
            },
            {
                id: 'activity_003',
                title: "Water Harvesting Project Review",
                description: "Mid-project assessment with mentor and peer team",
                date: "2025-07-12",
                time: "2:00 PM",
                location: "Green Pod",
                type: "review"
            }
        ],
        
        // Recent activities
        recentActivities: [
            {
                id: 'recent_001',
                title: "Completed Solar Compost Model",
                description: "Biomimetic design achieving 340% faster decomposition",
                date: "2025-06-28",
                type: "project_completed"
            },
            {
                id: 'recent_002',
                title: "Added Self-Reflection",
                description: "Reflected on public speaking goals and Green Week experience",
                date: "2025-06-27",
                type: "reflection"
            },
            {
                id: 'recent_003',
                title: "Updated Growth Level",
                description: "Creativity & Innovation level increased to 5/5",
                date: "2025-06-25",
                type: "growth_update"
            }
        ],
        
        // Latest mentor feedback
        latestFeedback: {
            mentor: "Mr. Anil Das",
            date: "2025-06-28",
            text: "Aanya embodies transformative learning. Over this cycle, she has transitioned from individual excellence to collective leadership. Her integration of traditional Rongmei ecological knowledge with contemporary AI tools demonstrates rare synthesis capacity."
        },
        
        // Areas of strength and focus
        strengths: [
            "Creativity & Innovation (⭐⭐⭐⭐⭐)",
            "Community Responsibility (⭐⭐⭐⭐⭐)",
            "Ethical Reasoning (⭐⭐⭐⭐⭐)",
            "Emotional Intelligence (⭐⭐⭐⭐⭐)"
        ],
        
        growingAreas: [
            "Global Collaboration (⭐⭐⭐)",
            "Public Speaking (Goal set)",
            "Mathematical Reasoning (⭐⭐⭐⭐)"
        ]
    },
    
    // Message history with mentor
    messageHistory: [
        {
            id: 'msg_001',
            sender: "Mrs. Ronghang",
            recipient: "Mr. Anil Das",
            subject: "Question about Water Project",
            text: "Hello Mr. Das, I wanted to ask about Aanya's water harvesting project. How can I support her at home with this?",
            date: "2025-06-27T14:30:00",
            type: "sent"
        },
        {
            id: 'msg_002',
            sender: "Mr. Anil Das",
            recipient: "Mrs. Ronghang",
            subject: "Re: Question about Water Project",
            text: "Hello Mrs. Ronghang! Great question. You can help by discussing traditional water conservation methods from your family's knowledge. Also, let her explain the math behind water flow calculations - teaching is the best learning!",
            date: "2025-06-27T16:45:00",
            type: "received"
        },
        {
            id: 'msg_003',
            sender: "Mrs. Ronghang",
            recipient: "Mr. Anil Das",
            subject: "Thank you",
            text: "Thank you so much! I shared my grandmother's rainwater collection stories and Aanya was so excited to incorporate them. She's already sketching new designs!",
            date: "2025-06-28T09:15:00",
            type: "sent"
        }
    ]
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            document.getElementById('mainApp').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('mainApp').style.opacity = '1';
                initializeParentDashboard();
            }, 50);
        }, 300);
    }, 1500);
});

function initializeParentDashboard() {
    loadParentData();
    setupEventListeners();
    renderAllContent();
    lucide.createIcons();
    
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║        👨‍👩‍👧 UIENC 2.0 Parent Dashboard - Initialized        ║
║                                                                ║
║  Parent: ${parentData.name}                                    
║  Child: ${parentData.child.name}                               
║  Pod: ${parentData.child.pod}                                  
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
}

// ===== Data Management =====
function loadParentData() {
    const savedData = localStorage.getItem('uienc_parent_data');
    if (savedData) {
        try {
            parentData = JSON.parse(savedData);
            console.log('✅ Parent data loaded from localStorage');
        } catch (e) {
            console.error('❌ Error loading parent data:', e);
        }
    }
}

function saveParentData() {
    try {
        localStorage.setItem('uienc_parent_data', JSON.stringify(parentData));
        showNotification('Data saved successfully!', 'success');
    } catch (e) {
        console.error('❌ Error saving parent data:', e);
        showNotification('Error saving data', 'error');
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Header buttons
    document.getElementById('communicateBtn')?.addEventListener('click', () => {
        switchTab('communication');
    });
    document.getElementById('exportReportBtn')?.addEventListener('click', exportChildReport);
    
    // Communication
    document.getElementById('newMessageBtn')?.addEventListener('click', () => openModal('sendMessageModal'));
    document.getElementById('sendMessageForm')?.addEventListener('submit', handleSendMessage);
    
    // Modal close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(btn.dataset.close);
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click

