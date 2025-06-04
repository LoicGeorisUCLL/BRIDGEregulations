// server.js - Enhanced with add/delete functionality
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data', 'regulations.json');

// Default regulations
const defaultRegulations = [
    {
        id: 1,
        content: "All employees must maintain professional behavior at all times. This includes respectful communication, appropriate dress code, and courteous interaction with colleagues, clients, and visitors. Harassment, discrimination, or unprofessional conduct will not be tolerated.",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        content: "Employees are expected to arrive on time and maintain regular attendance. Work hours are from 9:00 AM to 5:00 PM, Monday through Friday. Any absences or tardiness must be reported to your supervisor at least 2 hours in advance when possible.",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        content: "All company data, client information, and proprietary materials must be kept strictly confidential. Employees must use strong passwords, secure their workstations when away, and never share sensitive information with unauthorized personnel or external parties.",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        content: "Safety is our top priority. Employees must follow all safety protocols, report hazards immediately, keep work areas clean and organized, and participate in safety training programs. Emergency procedures must be followed without exception.",
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        content: "Company technology and internet access are provided for business purposes. Personal use should be minimal and not interfere with work productivity. Installation of unauthorized software, accessing inappropriate websites, or using company devices for illegal activities is prohibited.",
        createdAt: new Date().toISOString()
    }
];

// Initialize data directory and file
async function initializeData() {
    try {
        // Create data directory if it doesn't exist
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        
        // Check if file exists, create with defaults if not
        try {
            await fs.access(DATA_FILE);
        } catch (error) {
            await saveRegulations(defaultRegulations);
            console.log('Created initial regulations file');
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

// Load regulations from file
async function loadRegulations() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading regulations:', error);
        return defaultRegulations;
    }
}

// Save regulations to file
async function saveRegulations(regulations) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(regulations, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving regulations:', error);
        return false;
    }
}

// Get next available ID
function getNextId(regulations) {
    if (regulations.length === 0) return 1;
    return Math.max(...regulations.map(r => r.id)) + 1;
}

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all regulations
app.get('/api/regulations', async (req, res) => {
    try {
        const regulations = await loadRegulations();
        res.json(regulations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load regulations' });
    }
});

// Add a new regulation
app.post('/api/regulations', async (req, res) => {
    try {
        const { content } = req.body;
        
        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Content is required' });
        }
        
        const regulations = await loadRegulations();
        const newRegulation = {
            id: getNextId(regulations),
            content: content.trim(),
            createdAt: new Date().toISOString()
        };
        
        regulations.push(newRegulation);
        
        const saved = await saveRegulations(regulations);
        if (!saved) {
            return res.status(500).json({ error: 'Failed to save regulation' });
        }
        
        res.status(201).json({ success: true, regulation: newRegulation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add regulation' });
    }
});

// Update a single regulation
app.put('/api/regulations/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { content } = req.body;
        
        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Content is required' });
        }
        
        const regulations = await loadRegulations();
        const regulation = regulations.find(r => r.id === id);
        
        if (!regulation) {
            return res.status(404).json({ error: 'Regulation not found' });
        }
        
        regulation.content = content.trim();
        regulation.lastModified = new Date().toISOString();
        
        const saved = await saveRegulations(regulations);
        if (!saved) {
            return res.status(500).json({ error: 'Failed to save regulation' });
        }
        
        res.json({ success: true, regulation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update regulation' });
    }
});

// Delete a regulation
app.delete('/api/regulations/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const regulations = await loadRegulations();
        const regulationIndex = regulations.findIndex(r => r.id === id);
        
        if (regulationIndex === -1) {
            return res.status(404).json({ error: 'Regulation not found' });
        }
        
        // Remove the regulation
        const deletedRegulation = regulations.splice(regulationIndex, 1)[0];
        
        const saved = await saveRegulations(regulations);
        if (!saved) {
            return res.status(500).json({ error: 'Failed to delete regulation' });
        }
        
        res.json({ success: true, deletedRegulation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete regulation' });
    }
});

// Reset all regulations to default
app.post('/api/regulations/reset', async (req, res) => {
    try {
        const resetRegulations = defaultRegulations.map(reg => ({
            ...reg,
            lastModified: new Date().toISOString()
        }));
        
        const saved = await saveRegulations(resetRegulations);
        if (!saved) {
            return res.status(500).json({ error: 'Failed to reset regulations' });
        }
        
        res.json({ success: true, regulations: resetRegulations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset regulations' });
    }
});

// Save all regulations (backup/export)
app.post('/api/regulations/save', async (req, res) => {
    try {
        const regulations = await loadRegulations();
        
        // Create a backup with timestamp
        const backupFile = path.join(__dirname, 'data', `regulations_backup_${Date.now()}.json`);
        await fs.writeFile(backupFile, JSON.stringify(regulations, null, 2));
        
        res.json({ 
            success: true, 
            message: 'Regulations saved and backed up successfully!',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save regulations' });
    }
});

// Initialize data on startup
initializeData().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Data stored in: ${DATA_FILE}`);
    });
});