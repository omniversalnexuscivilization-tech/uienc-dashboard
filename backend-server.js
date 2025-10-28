// ============================================
// backend-server.js - Node.js Backend
// ============================================

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'uienc-growth-dashboard.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// ============================================
// LEARNER DATA ENDPOINTS
// ============================================

// Get learner data
app.get('/api/learner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('learners').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    
    res.json({ success: true, data: doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update learner data
app.put('/api/learner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    await db.collection('learners').doc(id).set(data, { merge: true });
    
    res.json({ success: true, message: 'Learner updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// GROWTH AREA ENDPOINTS
// ============================================

// Update growth area
app.patch('/api/learner/:id/growth/:areaName', async (req, res) => {
  try {
    const { id, areaName } = req.params;
    const { level, trend } = req.body;
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    
    const data = doc.data();
    const updatedAreas = data.growthAreas.map(area => 
      area.name === areaName ? { ...area, level, trend, updatedAt: new Date().toISOString() } : area
    );
    
    await learnerRef.update({ growthAreas: updatedAreas });
    
    res.json({ success: true, message: 'Growth area updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PROJECT ENDPOINTS
// ============================================

// Add project
app.post('/api/learner/:id/project', upload.array('files', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = JSON.parse(req.body.data);
    const files = req.files || [];
    
    // Upload files to Firebase Storage
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const fileName = `projects/${id}/${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(fileName);
        
        await fileUpload.save(file.buffer, {
          metadata: { contentType: file.mimetype }
        });
        
        const [url] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });
        
        return {
          name: file.originalname,
          type: file.mimetype,
          size: file.size,
          url,
          uploadedAt: new Date().toISOString()
        };
      })
    );
    
    const project = {
      ...projectData,
      id: Date.now().toString(),
      files: uploadedFiles,
      createdAt: new Date().toISOString()
    };
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    const data = doc.data();
    
    await learnerRef.update({
      projects: [...data.projects, project]
    });
    
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
app.delete('/api/learner/:id/project/:projectId', async (req, res) => {
  try {
    const { id, projectId } = req.params;
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    const data = doc.data();
    
    const updatedProjects = data.projects.filter(p => p.id !== projectId);
    
    await learnerRef.update({ projects: updatedProjects });
    
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// REFLECTION ENDPOINTS
// ============================================

// Add reflection
app.post('/api/learner/:id/reflection', async (req, res) => {
  try {
    const { id } = req.params;
    const reflectionData = req.body;
    
    const reflection = {
      ...reflectionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    const data = doc.data();
    
    await learnerRef.update({
      reflections: [...data.reflections, reflection]
    });
    
    res.json({ success: true, reflection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete reflection
app.delete('/api/learner/:id/reflection/:reflectionId', async (req, res) => {
  try {
    const { id, reflectionId } = req.params;
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    const data = doc.data();
    
    const updatedReflections = data.reflections.filter(r => r.id !== reflectionId);
    
    await learnerRef.update({ reflections: updatedReflections });
    
    res.json({ success: true, message: 'Reflection deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// BADGE ENDPOINTS
// ============================================

// Add badge
app.post('/api/learner/:id/badge', async (req, res) => {
  try {
    const { id } = req.params;
    const badgeData = req.body;
    
    const badge = {
      ...badgeData,
      date: new Date().toISOString().split('T')[0],
      blockchainHash: generateBlockchainHash(id, badgeData)
    };
    
    const learnerRef = db.collection('learners').doc(id);
    const doc = await learnerRef.get();
    const data = doc.data();
    
    await learnerRef.update({
      badges: [...data.badges, badge]
    });
    
    res.json({ success: true, badge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// FILE UPLOAD ENDPOINT
// ============================================

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const { learnerId, folder } = req.body;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileName = `${folder}/${learnerId}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    
    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    });
    
    const [url] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-01-2500'
    });
    
    res.json({
      success: true,
      file: {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        url
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// EXPORT/REPORT ENDPOINTS
// ============================================

// Generate PDF report
app.get('/api/learner/:id/export/pdf', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('learners').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    
    const data = doc.data();
    
    // Generate PDF HTML content
    const htmlContent = generateReportHTML(data);
    
    res.json({
      success: true,
      html: htmlContent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export data as JSON
app.get('/api/learner/:id/export/json', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('learners').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=uienc_report_${id}_${Date.now()}.json`);
    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ANALYTICS ENDPOINTS
// ============================================

// Get learner analytics
app.get('/api/learner/:id/analytics', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('learners').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    
    const data = doc.data();
    
    const analytics = {
      totalProjects: data.projects.length,
      completedProjects: data.projects.filter(p => p.status === 'completed').length,
      totalBadges: data.badges.length,
      totalReflections: data.reflections.length,
      averageGrowthLevel: (data.growthAreas.reduce((sum, area) => sum + area.level, 0) / data.growthAreas.length).toFixed(2),
      growthTrends: {
        improving: data.growthAreas.filter(a => a.trend === 'up').length,
        stable: data.growthAreas.filter(a => a.trend === 'stable').length,
        needsFocus: data.growthAreas.filter(a => a.trend === 'down').length
      },
      contributionScore: data.contributionScore,
      learningHours: data.learningHours,
      completionRate: data.completionRate
    };
    
    res.json({ success: true, analytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// NOTIFICATION ENDPOINTS
// ============================================

// Send notification
app.post('/api/learner/:id/notification', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message, priority } = req.body;
    
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      priority: priority || 'normal',
      read: false,
      createdAt: new Date().toISOString()
    };
    
    await db.collection('notifications').doc(id).collection('items').add(notification);
    
    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notifications
app.get('/api/learner/:id/notifications', async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('notifications').doc(id).collection('items')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// BLOCKCHAIN VERIFICATION ENDPOINTS
// ============================================

// Generate blockchain hash for badge
function generateBlockchainHash(learnerId, badgeData) {
  const crypto = require('crypto');
  const dataString = `${learnerId}-${badgeData.name}-${badgeData.tier}-${Date.now()}`;
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

// Verify badge blockchain
app.post('/api/verify/badge', async (req, res) => {
  try {
    const { learnerId, badgeId, hash } = req.body;
    
    const doc = await db.collection('learners').doc(learnerId).get();
    const data = doc.data();
    
    const badge = data.badges.find(b => b.id === badgeId);
    
    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }
    
    const isValid = badge.blockchainHash === hash;
    
    res.json({
      success: true,
      verified: isValid,
      badge,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// COLLABORATION ENDPOINTS
// ============================================

// Share report with mentor/parent
app.post('/api/learner/:id/share', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, permissions } = req.body;
    
    const shareToken = require('crypto').randomBytes(32).toString('hex');
    
    const shareData = {
      learnerId: id,
      email,
      role,
      permissions,
      token: shareToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };
    
    await db.collection('shares').add(shareData);
    
    // Send email notification (integrate with email service)
    const shareLink = `https://uienc-dashboard.app/shared/${shareToken}`;
    
    res.json({
      success: true,
      shareLink,
      message: 'Report shared successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateReportHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>UIENC Growth Report - ${data.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto; }
        h1 { color: #7c3aed; border-bottom: 4px solid #7c3aed; padding-bottom: 10px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
        .metric { display: inline-block; width: 22%; padding: 20px; margin: 1%; background: #f9fafb; border-left: 4px solid #7c3aed; }
        .section { margin: 30px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌐 UIENC 2.0 Markless Growth Report</h1>
        <h2>${data.name}</h2>
        <p>${data.pod} • ${data.term}</p>
      </div>
      
      <div class="section">
        <h2>Key Metrics</h2>
        <div class="metric">
          <h3>Contribution Score</h3>
          <p style="font-size: 36px; color: #7c3aed;">${data.contributionScore}/100</p>
        </div>
        <div class="metric">
          <h3>Learning Hours</h3>
          <p style="font-size: 36px; color: #2563eb;">${data.learningHours}</p>
        </div>
        <div class="metric">
          <h3>Completion Rate</h3>
          <p style="font-size: 36px; color: #059669;">${data.completionRate}%</p>
        </div>
      </div>
      
      <div class="section">
        <h2>Growth Areas</h2>
        ${data.growthAreas.map(area => `
          <div style="padding: 15px; margin: 10px 0; background: #f3f4f6; border-radius: 8px;">
            <h3>${area.name}</h3>
            <p>Level: ${'⭐'.repeat(area.level)} (${area.level}/5)</p>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <h2>Projects</h2>
        ${data.projects.map(project => `
          <div style="padding: 20px; margin: 15px 0; border: 2px solid #e5e7eb; border-radius: 8px;">
            <h3>${project.title}</h3>
            <p><strong>Focus:</strong> ${project.focus}</p>
            <p><strong>Impact:</strong> ${project.impact}</p>
          </div>
        `).join('')}
      </div>
      
      <div style="margin-top: 50px; text-align: center; color: #6b7280;">
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>UIENC 2.0 Markless Education System</p>
      </div>
    </body>
    </html>
  `;
}

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 UIENC Backend Server running on port ${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api`);
});

module.exports = app;

