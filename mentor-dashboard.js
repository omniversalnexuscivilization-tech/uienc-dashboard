// ============================================
// UIENC 2.0 Mentor Dashboard - JavaScript
// Multiple Learners Management System
// ============================================

// ===== Mentor Data State =====
let mentorData = {
    id: 'mentor_001',
    name: "Mr. Anil Das",
    role: "Learning Facilitator",
    pod: "Green Pod",
    email: "anil.das@uienc.org",
    joinedDate: "2024-01-15",
    
    learners: [
        {
            id: 'learner_001',
            name: "Aanya Ronghang",
            age: 13,
            avatar: "AR",
            pod: "Green Pod",
            joinedDate: "2024-09-01",
            status: "excelling",
            contributionScore: 87,
            learningHours: 487,
            completionRate: 92,
            projectsCount: 6,
            projectsCompleted: 4,
            badgesCount: 8,
            averageGrowthLevel: 4.3,
            lastActivity: "2025-06-28",
            needsAttention: false,
            tags: ["leadership", "eco-conscious", "innovator"]
        },
        {
            id: 'learner_002',
            name: "Ravi Kumar",
            age: 12,
            avatar: "RK",
            pod: "Green Pod",
            joinedDate: "2024-09-15",
            status: "on-track",
            contributionScore: 78,
            learningHours: 423,
            completionRate: 85,
            projectsCount: 4,
            projectsCompleted: 3,
            badgesCount: 5,
            averageGrowthLevel: 3.7,
            lastActivity: "2025-06-27",
            needsAttention: false,
            tags: ["creative", "collaborative"]
        },
        {
            id: 'learner_003',
            name: "Priya Sharma",
            age: 14,
            avatar: "PS",
            pod: "Green Pod",
            joinedDate: "2024-08-20",
            status: "excelling",
            contributionScore: 91,
            learningHours: 512,
            completionRate: 95,
            projectsCount: 7,
            projectsCompleted: 6,
            badgesCount: 10,
            averageGrowthLevel: 4.6,
            lastActivity: "2025-06-28",
            needsAttention: false,
            tags: ["scientific-inquiry", "mentor", "high-achiever"]
        },
        {
            id: 'learner_004',
            name: "Arjun Patel",
            age: 11,
            avatar: "AP",
            pod: "Green Pod",
            joinedDate: "2024-10-01",
            status: "needs-support",
            contributionScore: 65,
            learningHours: 298,
            completionRate: 72,
            projectsCount: 3,
            projectsCompleted: 1,
            badgesCount: 3,
            averageGrowthLevel: 2.8,
            lastActivity: "2025-06-25",
            needsAttention: true,
            attentionReason: "Low completion rate, needs engagement support",
            tags: ["emerging", "needs-encouragement"]
        },
        {
            id: 'learner_005',
            name: "Meera Singh",
            age: 13,
            avatar: "MS",
            pod: "Green Pod",
            joinedDate: "2024-09-10",
            status: "on-track",
            contributionScore: 82,
            learningHours: 445,
            completionRate: 88,
            projectsCount: 5,
            projectsCompleted: 4,
            badgesCount: 6,
            averageGrowthLevel: 3.9,
            lastActivity: "2025-06-27",
            needsAttention: false,
            tags: ["artistic", "culturally-aware"]
        },
        {
            id: 'learner_006',
            name: "Kunal Verma",
            age: 12,
            avatar: "KV",
            pod: "Green Pod",
            joinedDate: "2024-11-01",
            status: "needs-support",
            contributionScore: 58,
            learningHours: 234,
            completionRate: 68,
            projectsCount: 2,
            projectsCompleted: 1,
            badgesCount: 2,
            averageGrowthLevel: 2.5,
            lastActivity: "2025-06-24",
            needsAttention: true,
            attentionReason: "Inconsistent attendance, family challenges reported",
            tags: ["shy", "potential"]
        },
        {
            id: 'learner_007',
            name: "Tara Reddy",
            age: 14,
            avatar: "TR",
            pod: "Green Pod",
            joinedDate: "2024-08-15",
            status: "on-track",
            contributionScore: 80,
            learningHours: 467,
            completionRate: 86,
            projectsCount: 5,
            projectsCompleted: 4,
            badgesCount: 7,
            averageGrowthLevel: 3.8,
            lastActivity: "2025-06-28",
            needsAttention: false,
            tags: ["mathematical", "logical-thinker"]
        },
        {
            id: 'learner_008',
            name: "Sanjay Gupta",
            age: 11,
            avatar: "SG",
            pod: "Green Pod",
            joinedDate: "2024-10-15",
            status: "needs-support",
            contributionScore: 62,
            learningHours: 276,
            completionRate: 70,
            projectsCount: 3,
            projectsCompleted: 2,
            badgesCount: 3,
            averageGrowthLevel: 2.9,
            lastActivity: "2025-06-26",
            needsAttention: true,
            attentionReason: "Struggling with self-directed learning, needs structure",
            tags: ["kinesthetic-learner", "outdoors"]
        },
        {
            id: 'learner_009',
            name: "Nisha Desai",
            age: 13,
            avatar: "ND",
            pod: "Green Pod",
            joinedDate: "2024-09-05",
            status: "on-track",
            contributionScore: 79,
            learningHours: 412,
            completionRate: 84,
            projectsCount: 4,
            projectsCompleted: 3,
            badgesCount: 5,
            averageGrowthLevel: 3.6,
            lastActivity: "2025-06-27",
            needsAttention: false,
            tags: ["empathetic", "peacemaker"]
        },
        {
            id: 'learner_010',
            name: "Rahul Joshi",
            age: 12,
            avatar: "RJ",
            pod: "Green Pod",
            joinedDate: "2024-09-20",
            status: "on-track",
            contributionScore: 76,
            learningHours: 398,
            completionRate: 83,
            projectsCount: 4,
            projectsCompleted: 3,
            badgesCount: 4,
            averageGrowthLevel: 3.5,
            lastActivity: "2025-06-26",
            needsAttention: false,
            tags: ["tech-savvy", "gamer"]
        },
        {
            id: 'learner_011',
            name: "Ananya Iyer",
            age: 14,
            avatar: "AI",
            pod: "Green Pod",
            joinedDate: "2024-08-25",
            status: "excelling",
            contributionScore: 89,
            learningHours: 498,
            completionRate: 93,
            projectsCount: 6,
            projectsCompleted: 5,
            badgesCount: 9,
            averageGrowthLevel: 4.4,
            lastActivity: "2025-06-28",
            needsAttention: false,
            tags: ["writer", "storyteller", "cultural-bridge"]
        },
        {
            id: 'learner_012',
            name: "Vivek Rao",
            age: 11,
            avatar: "VR",
            pod: "Green Pod",
            joinedDate: "2024-10-10",
            status: "on-track",
            contributionScore: 73,
            learningHours: 345,
            completionRate: 81,
            projectsCount: 3,
            projectsCompleted: 2,
            badgesCount: 4,
            averageGrowthLevel: 3.3,
            lastActivity: "2025-06-27",
            needsAttention: false,
            tags: ["curious", "experimenter"]
        }
    ],
    
    recentActivity: [
        {
            id: 'activity_001',
            type: 'project_completed',
            learner: 'Priya Sharma',
            learnerId: 'learner_003',
            title: 'Completed "Urban Farming Initiative"',
            timestamp: '2025-06-28T14:30:00',
            timeAgo: '2 hours ago'
        },
        {
            id: 'activity_002',
            type: 'badge_earned',
            learner: 'Aanya Ronghang',
            learnerId: 'learner_001',
            title: 'Earned "Water Wisdom Keeper" badge',
            timestamp: '2025-06-28T10:15:00',
            timeAgo: '6 hours ago'
        },
        {
            id: 'activity_003',
            type: 'reflection_added',
            learner: 'Ananya Iyer',
            learnerId: 'learner_011',
            title: 'Added self-reflection on cultural heritage project',
            timestamp: '2025-06-27T16:45:00',
            timeAgo: '1 day ago'
        },
        {
            id: 'activity_004',
            type: 'growth_updated',
            learner: 'Meera Singh',
            learnerId: 'learner_005',
            title: 'Updated growth level in Artistic Expression (Level 4→5)',
            timestamp: '2025-06-27T11:20:00',
            timeAgo: '1 day ago'
        },
        {
            id: 'activity_005',
            type: 'project_started',
            learner: 'Rahul Joshi',
            learnerId: 'learner_010',
            title: 'Started "AI Chatbot for Indigenous Language"',
            timestamp: '2025-06-26T09:00:00',
            timeAgo: '2 days ago'
        }
    ]
};

let currentLearnerDetail = null;
let filteredLearners = [];

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
                initializeMentorDashboard();
            }, 50);
        }, 300);
    }, 1500);
});

function initializeMentorDashboard() {
    loadMentorData();
    setupEventListeners();
    renderAllContent();
    lucide.createIcons();
    
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║        👨‍🏫 UIENC 2.0 Mentor Dashboard - Initialized          ║
║                                                                ║
║  Mentor: ${mentorData.name}                                    
║  Pod: ${mentorData.pod}                                        
║  Total Learners: ${mentorData.learners.length}                
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
}

// ===== Data Management =====
function loadMentorData() {
    const savedData = localStorage.getItem('uienc_mentor_data');
    if (savedData) {
        try {
            mentorData = JSON.parse(savedData);
            console.log('✅ Mentor data loaded from localStorage');
        } catch (e) {
            console.error('❌ Error loading mentor data:', e);
        }
    }
}

function saveMentorData() {
    try {
        localStorage.setItem('uienc_mentor_data', JSON.stringify(mentorData));
        showNotification('Mentor data saved successfully!', 'success');
    } catch (e) {
        console.error('❌ Error saving mentor data:', e);
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
    document.getElementById('addLearnerBtn').addEventListener('click', () => openModal('addLearnerModal'));
    document.getElementById('exportAllBtn').addEventListener('click', exportAllLearnersReport);
    
    // Search and filter
    document.getElementById('learnerSearch')?.addEventListener('input', filterLearners);
    document.getElementById('statusFilter')?.addEventListener('change', filterLearners);
    document.getElementById('sortBy')?.addEventListener('change', sortLearners);
    
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
    document.getElementById('addLearnerForm')?.addEventListener('submit', handleAddLearner);
    document.getElementById('addFeedbackForm')?.addEventListener('submit', handleAddFeedback);
    document.getElementById('awardBadgeForm')?.addEventListener('submit', handleAwardBadge);
}

// ===== Render Functions =====
function renderAllContent() {
    renderPodSummary();
    renderRecentActivity();
    renderAttentionLearners();
    renderLearnersGrid();
    renderAnalytics();
    renderFeedbackList();
    populateLearnerSelects();
}

function renderPodSummary() {
    const totalLearners = mentorData.learners.length;
    const avgContribution = (mentorData.learners.reduce((sum, l) => sum + l.contributionScore, 0) / totalLearners).toFixed(1);
    const activeProjects = mentorData.learners.reduce((sum, l) => sum + (l.projectsCount - l.projectsCompleted), 0);
    const needsAttention = mentorData.learners.filter(l => l.needsAttention).length;
    
    document.getElementById('totalLearners').textContent = totalLearners;
    document.getElementById('avgContribution').textContent = avgContribution;
    document.getElementById('activeProjects').textContent = activeProjects;
    document.getElementById('needsAttention').textContent = needsAttention;
}

function renderRecentActivity() {
    const container = document.getElementById('recentActivityList');
    if (!container) return;
    
    container.innerHTML = mentorData.recentActivity.slice(0, 5).map(activity => `
        <div class="activity-item">
            <div class="activity-avatar">${activity.learner.split(' ').map(n => n[0]).join('')}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.learner}</div>
                <div class="activity-time">${activity.timeAgo}</div>
            </div>
        </div>
    `).join('');
}

function renderAttentionLearners() {
    const container = document.getElementById('attentionLearnersList');
    if (!container) return;
    
    const attentionLearners = mentorData.learners.filter(l => l.needsAttention);
    
    if (attentionLearners.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">✅ All learners are on track!</p>';
        return;
    }
    
    container.innerHTML = attentionLearners.map(learner => `
        <div class="attention-item">
            <div class="attention-learner">
                <div class="attention-learner-avatar">${learner.avatar}</div>
                <div class="attention-info">
                    <h4>${learner.name}</h4>
                    <div class="attention-reason">${learner.attentionReason}</div>
                </div>
            </div>
            <div class="attention-actions">
                <button class="btn btn-secondary btn-sm" onclick="viewLearnerDetail('${learner.id}')">
                    <i data-lucide="eye"></i>
                    View
                </button>
                <button class="btn btn-primary btn-sm" onclick="scheduleMeeting('${learner.id}')">
                    <i data-lucide="calendar"></i>
                    Schedule
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderLearnersGrid() {
    const container = document.getElementById('learnersGrid');
    if (!container) return;
    
    filteredLearners = [...mentorData.learners];
    
    container.innerHTML = filteredLearners.map(learner => `
        <div class="learner-card status-${learner.status}" onclick="viewLearnerDetail('${learner.id}')">
            <div class="learner-card-header">
                <div class="learner-card-avatar">${learner.avatar}</div>
                <div class="learner-card-info">
                    <div class="learner-card-name">${learner.name}</div>
                    <div class="learner-card-meta">Age ${learner.age} • ${learner.pod}</div>
                </div>
            </div>

