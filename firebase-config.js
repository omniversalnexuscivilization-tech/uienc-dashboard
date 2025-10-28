import React, { useState, useEffect, useRef } from 'react';
import { Star, TrendingUp, Award, BookOpen, Users, Leaf, Brain, Heart, Globe, Code, Beaker, Camera, Edit, Download, Share2, ChevronRight, ChevronDown, Activity, Upload, Save, X, Plus, FileText, Image as ImageIcon, Video, Trash2, Check, Calendar, Bell, Settings, LogOut, Menu } from 'lucide-react';

// ============================================
// FIREBASE CONFIGURATION & SERVICES
// ============================================

// Simulated Firebase Service (In production, replace with actual Firebase)
class FirebaseService {
  constructor() {
    this.db = this.initializeDB();
    this.storage = this.initializeStorage();
    this.listeners = [];
  }

  initializeDB() {
    // Simulate Firestore
    return {
      collection: (name) => ({
        doc: (id) => ({
          get: async () => {
            const data = this.getFromStorage(`${name}/${id}`);
            return { exists: !!data, data: () => data };
          },
          set: async (data, options) => {
            if (options?.merge) {
              const existing = this.getFromStorage(`${name}/${id}`) || {};
              this.saveToStorage(`${name}/${id}`, { ...existing, ...data });
            } else {
              this.saveToStorage(`${name}/${id}`, data);
            }
            this.notifyListeners(`${name}/${id}`, data);
          },
          update: async (data) => {
            const existing = this.getFromStorage(`${name}/${id}`) || {};
            this.saveToStorage(`${name}/${id}`, { ...existing, ...data });
            this.notifyListeners(`${name}/${id}`, { ...existing, ...data });
          },
          delete: async () => {
            localStorage.removeItem(`firebase_${name}_${id}`);
            this.notifyListeners(`${name}/${id}`, null);
          },
          onSnapshot: (callback) => {
            const listener = { path: `${name}/${id}`, callback };
            this.listeners.push(listener);
            // Initial call
            const data = this.getFromStorage(`${name}/${id}`);
            callback({ exists: !!data, data: () => data });
            return () => {
              this.listeners = this.listeners.filter(l => l !== listener);
            };
          }
        }),
        where: () => ({
          get: async () => ({
            docs: []
          })
        }),
        add: async (data) => {
          const id = Date.now().toString();
          this.saveToStorage(`${name}/${id}`, { ...data, id });
          return { id };
        }
      })
    };
  }

  initializeStorage() {
    return {
      ref: (path) => ({
        put: async (file) => {
          // Simulate file upload
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target.result;
              this.saveToStorage(`storage/${path}`, base64);
              resolve({
                ref: {
                  getDownloadURL: async () => base64
                }
              });
            };
            reader.readAsDataURL(file);
          });
        },
        getDownloadURL: async () => {
          return this.getFromStorage(`storage/${path}`) || '';
        }
      })
    };
  }

  saveToStorage(key, data) {
    localStorage.setItem(`firebase_${key}`, JSON.stringify(data));
  }

  getFromStorage(key) {
    const data = localStorage.getItem(`firebase_${key}`);
    return data ? JSON.parse(data) : null;
  }

  notifyListeners(path, data) {
    this.listeners
      .filter(l => l.path === path)
      .forEach(l => l.callback({ exists: !!data, data: () => data }));
  }
}

const firebase = new FirebaseService();

// ============================================
// API SERVICE
// ============================================

class ApiService {
  async getLearnerData(learnerId) {
    const doc = await firebase.db.collection('learners').doc(learnerId).get();
    if (doc.exists) {
      return doc.data();
    }
    // Return default data if not exists
    return this.getDefaultLearnerData(learnerId);
  }

  async updateLearnerData(learnerId, data) {
    await firebase.db.collection('learners').doc(learnerId).set(data, { merge: true });
  }

  async addProject(learnerId, project) {
    const projectData = {
      ...project,
      learnerId,
      createdAt: new Date().toISOString()
    };
    const docRef = await firebase.db.collection('projects').add(projectData);
    return docRef.id;
  }

  async addReflection(learnerId, reflection) {
    const reflectionData = {
      ...reflection,
      learnerId,
      createdAt: new Date().toISOString()
    };
    await firebase.db.collection('reflections').add(reflectionData);
  }

  async uploadFile(file, path) {
    const storageRef = firebase.storage.ref(`${path}/${Date.now()}_${file.name}`);
    const snapshot = await storageRef.put(file);
    const url = await snapshot.ref.getDownloadURL();
    return url;
  }

  async updateGrowthArea(learnerId, areaName, newLevel) {
    const learnerData = await this.getLearnerData(learnerId);
    const updatedAreas = learnerData.growthAreas.map(area => 
      area.name === areaName ? { ...area, level: newLevel } : area
    );
    await this.updateLearnerData(learnerId, { growthAreas: updatedAreas });
  }

  async addBadge(learnerId, badge) {
    const learnerData = await this.getLearnerData(learnerId);
    const newBadge = {
      ...badge,
      date: new Date().toISOString().split('T')[0]
    };
    await this.updateLearnerData(learnerId, {
      badges: [...learnerData.badges, newBadge]
    });
  }

  getDefaultLearnerData(learnerId) {
    return {
      id: learnerId,
      name: "Aanya Ronghang",
      pod: "Green Pod – Community Eco-Hub",
      term: "April–June 2025",
      mentor: "Mr. Anil Das",
      avatar: "AR",
      
      growthAreas: [
        { name: "Effort & Dedication", level: 4, trend: "up", color: "bg-blue-500" },
        { name: "Creativity & Innovation", level: 5, trend: "up", color: "bg-purple-500" },
        { name: "Critical Thinking", level: 4, trend: "up", color: "bg-indigo-500" },
        { name: "Emotional Intelligence", level: 5, trend: "stable", color: "bg-pink-500" },
        { name: "Ethical Reasoning", level: 5, trend: "up", color: "bg-green-500" },
        { name: "Community Responsibility", level: 5, trend: "up", color: "bg-teal-500" },
        { name: "Eco-Consciousness", level: 4, trend: "up", color: "bg-emerald-500" },
        { name: "Digital & AI Literacy", level: 4, trend: "up", color: "bg-cyan-500" },
        { name: "Scientific Inquiry", level: 4, trend: "up", color: "bg-orange-500" },
        { name: "Global Collaboration", level: 3, trend: "up", color: "bg-yellow-500" }
      ],
      
      badges: [
        { name: "Eco-Steward", icon: "🌱", tier: "Level 3", date: "2025-05-15" },
        { name: "Young Innovator", icon: "💡", tier: "Advanced", date: "2025-06-01" },
        { name: "Pod Leader", icon: "👥", tier: "Emeritus", date: "2025-06-20" },
        { name: "Biodiversity Guardian", icon: "🦋", tier: "Active", date: "2025-05-28" },
        { name: "Ethical AI Practitioner", icon: "🤖", tier: "Certified", date: "2025-06-10" }
      ],
      
      projects: [
        {
          id: '1',
          title: "Solar Compost Model",
          focus: "Sustainability, Science",
          impact: "Reduced waste by 23kg/week",
          status: "completed",
          date: "2025-05-30",
          description: "Biomimetic solar heating chamber based on termite mound principles",
          files: []
        },
        {
          id: '2',
          title: "Green Week Leadership",
          focus: "Community, Service",
          impact: "45 students engaged",
          status: "completed",
          date: "2025-06-15",
          description: "Week-long sustainability awareness campaign",
          files: []
        },
        {
          id: '3',
          title: "AI Quiz Game",
          focus: "Tech, Logic, Design",
          impact: "34 learners using",
          status: "active",
          date: "2025-06-01",
          description: "Interactive Rongmei language learning game",
          files: []
        }
      ],
      
      reflections: [
        {
          id: '1',
          author: "Mentor",
          text: "Aanya is evolving as a compassionate, confident change-maker. She blends creativity with ethics, and her leadership is inspiring peers.",
          date: "2025-06-28"
        },
        {
          id: '2',
          author: "Self",
          text: "I enjoyed leading Green Week and want to strengthen my debating and public speaking skills.",
          date: "2025-06-27"
        },
        {
          id: '3',
          author: "Parent",
          text: "She is more responsible at home and shows curiosity about sustainability. We are proud of her confidence.",
          date: "2025-06-26"
        }
      ],
      
      contributionScore: 87,
      learningHours: 487,
      completionRate: 92
    };
  }
}

const api = new ApiService();

// ============================================
// MODAL COMPONENTS
// ============================================

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const EditGrowthModal = ({ isOpen, onClose, area, onSave }) => {
  const [level, setLevel] = useState(area?.level || 1);
  const [trend, setTrend] = useState(area?.trend || 'stable');

  const handleSave = async () => {
    await onSave(area.name, level, trend);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit: ${area?.name}`}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`flex-1 py-3 rounded-lg border-2 transition-colors ${
                  level >= l
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300'
                }`}
              >
                <Star className={`w-6 h-6 mx-auto ${level >= l ? 'fill-white' : ''}`} />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {level === 1 ? 'Awakening' : 
             level === 2 ? 'Exploring' : 
             level === 3 ? 'Integrating' : 
             level === 4 ? 'Synthesizing' : 'Transforming'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trend</label>
          <div className="grid grid-cols-3 gap-3">
            {['up', 'stable', 'down'].map((t) => (
              <button
                key={t}
                onClick={() => setTrend(t)}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  trend === t
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300'
                }`}
              >
                {t === 'up' ? '↗️ Growing' : t === 'stable' ? '→ Stable' : '↘️ Needs Focus'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AddProjectModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    focus: '',
    impact: '',
    status: 'active',
    description: '',
    files: []
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    const uploadedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString()
      }))
    );

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles]
    }));
    setUploading(false);
  };

  const handleSubmit = async () => {
    await onSave({
      ...formData,
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
    setFormData({
      title: '',
      focus: '',
      impact: '',
      status: 'active',
      description: '',
      files: []
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Project">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Water Harvesting System"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Focus Areas</label>
          <input
            type="text"
            value={formData.focus}
            onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Engineering, Sustainability"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="4"
            placeholder="Describe your project..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
          <input
            type="text"
            value={formData.impact}
            onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Reduced water waste by 20%"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="in-progress">In Progress</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
          {formData.files.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.files.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                  <FileText className="w-4 h-4" />
                  <span className="flex-1 truncate">{file.name}</span>
                  <button
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      files: prev.files.filter((_, i) => i !== idx)
                    }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!formData.title || uploading}
            className="flex-1 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Project
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AddReflectionModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    author: 'Self',
    text: ''
  });

  const handleSubmit = async () => {
    await onSave({
      ...formData,
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
    setFormData({ author: 'Self', text: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Reflection">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <select
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="Self">Self Reflection</option>
            <option value="Mentor">Mentor</option>
            <option value="Parent">Parent/Guardian</option>
            <option value="Peer">Peer Mentor</option>
            <option value="Elder">Elder Wisdom-Keeper</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reflection</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="6"
            placeholder="Share your thoughts, learnings, and growth..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!formData.text}
            className="flex-1 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Reflection
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

export default function UiencGrowthDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [learnerData, setLearnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modals, setModals] = useState({
    editGrowth: false,
    addProject: false,
    addReflection: false,
    addBadge: false
  });
  const [selectedArea, setSelectedArea] = useState(null);
  const [notification, setNotification] = useState(null);
  const learnerId = 'learner_001';

  useEffect(() => {
    loadLearnerData();
  }, []);

  const loadLearnerData = async () => {
    setLoading(true);
    const data = await api.getLearnerData(learnerId);
    setLearnerData(data);
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveGrowth = async (areaName, level, trend) => {
    const updatedAreas = learnerData.growthAreas.map(area => 
      area.name === areaName ? { ...area, level, trend } : area
    );
    const updatedData = { ...learnerData, growthAreas: updatedAreas };
    setLearnerData(updatedData);
    await api.updateLearnerData(learnerId, updatedData);
    showNotification('Growth area updated successfully!');
  };

  const handleAddProject = async (project) => {
    const newProject = { ...project, id: Date.now().toString() };
    const updatedData = {
      ...learnerData,
      projects: [...learnerData.projects, newProject]
    };
    setLearnerData(updatedData);
    await api.updateLearnerData(learnerId, updatedData);
    showNotification('Project added successfully!');
  };

  const handleAddReflection = async (reflection) => {
    const newReflection = { ...reflection, id: Date.now().toString() };
    const updatedData = {
      ...learnerData,
      reflections: [...learnerData.reflections, newReflection]
    };
    setLearnerData(updatedData);
    await api.updateLearnerData(learnerId, updatedData);
    showNotification('Reflection added successfully!');
  };

  const handleExportPDF = () => {
    showNotification('Preparing PDF export...', 'info');
    
    setTimeout(() => {
      const printWindow = window.open('', '_blank');
      const content = generatePrintContent(learnerData);
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>UIENC Growth Report - ${learnerData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto; }
            h1 { color: #7c3aed; border-bottom: 4px solid #7c3aed; padding-bottom: 10px; }
            h2 { color: #4f46e5; margin-top: 30px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
            .metric-card { display: inline-block; width: 22%; padding: 20px; margin: 1%; background: #f9fafb; border-left: 4px solid #7c3aed; }
            .growth-area { padding: 15px; margin: 10px 0; background: #f3f4f6; border-radius: 8px; }
            .project-card { padding: 20px; margin: 15px 0; border: 2px solid #e5e7eb; border-radius: 8px; }
            .badge { display: inline-block; padding: 15px; margin: 10px; text-align: center; background: #faf5ff; border: 2px solid #a855f7; border-radius: 8px; }
            .reflection { padding: 20px; margin: 15px 0; background: #fffbeb; border-left: 4px solid #f59e0b; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; }
            @media print {
              .no-print { display: none; }
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${content}
          <button class="no-print" onclick="window.print()" style="position: fixed; bottom: 20px; right: 20px; padding: 15px 30px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Print/Save as PDF</button>
        </body>
        </html>
      `);
      printWindow.document.close();
      showNotification('Export window opened!');
    }, 1000);
  };

  const generatePrintContent = (data) => {
    return `
      <div class="header">
        <h1>🌐 UIENC 2.0 Markless Growth Report Card</h1>
        <h2 style="margin-top: 10px;">${data.name}</h2>
        <p>${data.pod} • ${data.term}</p>
      </div>

      <h2>📊 Key Metrics</h2>
      <div class="metric-card">
        <h3>Contribution Score</h3>
        <p style="font-size: 36px; color: #7c3aed; margin: 10px 0;">${data.contributionScore}/100</p>
      </div>
      <div class="metric-card">
        <h3>Learning Hours</h3>
        <p style="font-size: 36px; color: #2563eb; margin: 10px 0;">${data.learningHours}</p>
      </div>
      <div class="metric-card">
        <h3>Completion Rate</h3>
        <p style="font-size: 36px; color: #059669; margin: 10px 0;">${data.completionRate}%</p>
      </div>
      <div class="metric-card">
        <h3>Active Projects</h3>
        <p style="font-size: 36px; color: #dc2626; margin: 10px 0;">${data.projects.filter(p => p.status === 'active' || p.status === 'in-progress').length}</p>
      </div>

      <h2>🌟 Growth Constellation</h2>
      ${data.growthAreas.map(area => `
        <div class="growth-area">
          <h3>${area.name}</h3>
          <p>Level: ${'⭐'.repeat(area.level)} (${area.level}/5)</p>
          <p>Status: ${area.trend === 'up' ? '↗️ Growing' : area.trend === 'down' ? '↘️ Needs Focus' : '→ Stable'}</p>
        </div>
      `).join('')}

      <h2>🎒 Portfolio Highlights</h2>
      ${data.projects.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p><strong>Focus:</strong> ${project.focus}</p>
          <p><strong>Impact:</strong> ${project.impact}</p>
          <p><strong>Status:</strong> ${project.status === 'completed' ? '✅ Completed' : project.status === 'active' ? '🔄 Active' : '🚧 In Progress'}</p>
          <p><strong>Date:</strong> ${project.date}</p>
          ${project.description ? `<p>${project.description}</p>` : ''}
        </div>
      `).join('')}

      <h2>🏅 Soulbound Achievements</h2>
      ${data.badges.map(badge => `
        <div class="badge">
          <div style="font-size: 48px;">${badge.icon}</div>
          <h3>${badge.name}</h3>
          <p>${badge.tier}</p>
          <p style="font-size: 12px; color: #6b7280;">Earned: ${badge.date}</p>
        </div>
      `).join('')}

      <h2>🪞 Reflections & Voices</h2>
      ${data.reflections.map(reflection => `
        <div class="reflection">
          <h3>${reflection.author}</h3>
          <p>${reflection.text}</p>
          <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">${reflection.date}</p>
        </div>
      `).join('')}

      <div class="footer">
        <p><strong>UIENC 2.0 Markless Education System</strong></p>
        <p>Learning without limits, growing without grades, thriving together</p>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Blockchain Verified • Life Passport Entry</p>
      </div>
    `;
  };

  const StarRating = ({ level, color }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= level ? `fill-yellow-400 text-yellow-400` : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const TrendIndicator = ({ trend }) => {
    const icons = {
      up: <TrendingUp className="w-4 h-4 text-green-500" />,
      down: <Activity className="w-4 h-4 text-red-500 rotate-180" />,
      stable: <Activity className="w-4 h-4 text-blue-500" />
    };
    return icons[trend] || icons.stable;
  };

  if (loading || !learnerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading Growth Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white animate-slide-in`}>
          <Check className="w-5 h-5" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-purple-500">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {learnerData.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{learnerData.name}</h1>
                <p className="text-gray-600">{learnerData.pod} • {learnerData.term}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportPDF}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 flex items-center gap-2 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'growth', label: 'Growth Map', icon: TrendingUp },
              { id: 'projects', label: 'Portfolio', icon: BookOpen },
              { id: 'badges', label: 'Achievements', icon: Award },
              { id: 'reflections', label: 'Reflections', icon: Heart }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-2 border-b-4 font-medium transition-colors flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Contribution Score</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{learnerData.contributionScore}/100</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12 this month
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Learning Hours</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{learnerData.learningHours}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  This quarter
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{learnerData.completionRate}%</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Above 85% benchmark
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Active Projects</p>
                    <p className="text-3xl font-bold text-pink-600 mt-2">{learnerData.projects.filter(p => p.status === 'active' || p.status === 'in-progress').length}</p>
                  </div>
                  <Beaker className="w-8 h-8 text-pink-500" />
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  In progress
                </div>
              </div>
            </div>

            {/* Growth Snapshot */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                Growth Snapshot
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learnerData.growthAreas.slice(0, 6).map((area, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{area.name}</h3>
                      <StarRating level={area.level} />
                    </div>
                    <TrendIndicator trend={area.trend} />
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setSelectedTab('growth')}
                className="mt-4 w-full py-2 text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-2"
              >
                View All Growth Areas <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Recent Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {learnerData.badges.map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="font-semibold text-center text-sm">{badge.name}</p>
                    <p className="text-xs text-gray-600">{badge.tier}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Growth Map Tab */}
        {selectedTab === 'growth' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Multidimensional Growth Constellation</h2>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                  Auto-Sync from Activities
                </button>
              </div>
              <div className="space-y-4">
                {learnerData.growthAreas.map((area, idx) => (
                  <div key={idx} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <h3 className="font-semibold text-gray-900">{area.name}</h3>
                        <TrendIndicator trend={area.trend} />
                      </div>
                      <div className="flex items-center gap-3">
                        <StarRating level={area.level} />
                        <button 
                          onClick={() => {
                            setSelectedArea(area);
                            setModals({ ...modals, editGrowth: true });
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${area.color} transition-all duration-1000`}
                        style={{ width: `${(area.level / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-600">
                        {area.level === 1 ? '⭐ Awakening' : 
                         area.level === 2 ? '⭐⭐ Exploring' : 
                         area.level === 3 ? '⭐⭐⭐ Integrating' : 
                         area.level === 4 ? '⭐⭐⭐⭐ Synthesizing' : '⭐⭐⭐⭐⭐ Transforming'}
                      </span>
                      <span className="font-medium text-purple-600">{area.level}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {selectedTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setModals({ ...modals, addProject: true })}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Project
              </button>
            </div>
            {learnerData.projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'active' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status === 'completed' ? '✅ Completed' :
                         project.status === 'active' ? '🔄 Active' : '🚧 In Progress'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2"><strong>Focus:</strong> {project.focus}</p>
                    {project.description && (
                      <p className="text-gray-700 mb-3">{project.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-purple-600 font-medium mb-2">
                      <Activity className="w-4 h-4" />
                      {project.impact}
                    </div>
                    <p className="text-sm text-gray-500">📅 {project.date}</p>
                    {project.files && project.files.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.files.map((file, fIdx) => (
                          <span key={fIdx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {file.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Soulbound Achievement Badges</h2>
                <div className="text-sm text-gray-600">
                  🔒 Blockchain Verified • Non-Transferable
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learnerData.badges.map((badge, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
                    <div className="text-6xl mb-4 text-center">{badge.icon}</div>
                    <h3 className="font-bold text-xl text-center mb-2">{badge.name}</h3>
                    <p className="text-center text-purple-600 font-semibold mb-2">{badge.tier}</p>
                    <p className="text-center text-sm text-gray-600 mb-4">Earned: {badge.date}</p>
                    <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                      View Certificate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reflections Tab */}
        {selectedTab === 'reflections' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setModals({ ...modals, addReflection: true })}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Reflection
              </button>
            </div>
            {learnerData.reflections.map((reflection, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {reflection.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{reflection.author}</h3>
                      <span className="text-sm text-gray-500">• {reflection.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{reflection.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <EditGrowthModal
        isOpen={modals.editGrowth}
        onClose={() => setModals({ ...modals, editGrowth: false })}
        area={selectedArea}
        onSave={handleSaveGrowth}
      />

      <AddProjectModal
        isOpen={modals.addProject}
        onClose={() => setModals({ ...modals, addProject: false })}
        onSave={handleAddProject}
      />

      <AddReflectionModal
        isOpen={modals.addReflection}
        onClose={() => setModals({ ...modals, addReflection: false })}
        onSave={handleAddReflection}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

