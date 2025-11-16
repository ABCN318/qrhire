import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = join(__dirname, 'applicants.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Create applicants table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS applicants (
        id TEXT PRIMARY KEY,
        jobId TEXT NOT NULL,
        name TEXT NOT NULL,
        contactPreference TEXT NOT NULL,
        contactInfo TEXT NOT NULL,
        experience TEXT,
        speaksSpanish TEXT,
        appliedAt TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Applicants table ready');
      }
    });
  }
});

// API Routes

// Get all applicants
app.get('/api/applicants', (req, res) => {
  db.all('SELECT * FROM applicants ORDER BY appliedAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get applicant by ID
app.get('/api/applicants/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM applicants WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Applicant not found' });
      return;
    }
    res.json(row);
  });
});

// Create new applicant
app.post('/api/applicants', (req, res) => {
  const { jobId, name, contactPreference, contactInfo, experience, speaksSpanish } = req.body;
  
  if (!jobId || !name || !contactPreference || !contactInfo) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const id = Date.now().toString();
  const appliedAt = new Date().toISOString();

  db.run(
    'INSERT INTO applicants (id, jobId, name, contactPreference, contactInfo, experience, speaksSpanish, appliedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, jobId, name, contactPreference, contactInfo, experience || '', speaksSpanish || '', appliedAt],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id,
        jobId,
        name,
        contactPreference,
        contactInfo,
        experience: experience || '',
        speaksSpanish: speaksSpanish || '',
        appliedAt
      });
    }
  );
});

// Delete applicant by ID
app.delete('/api/applicants/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM applicants WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Applicant not found' });
      return;
    }
    res.json({ message: 'Applicant deleted successfully' });
  });
});

// Delete all applicants
app.delete('/api/applicants', (req, res) => {
  db.run('DELETE FROM applicants', [], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'All applicants deleted successfully', count: this.changes });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

