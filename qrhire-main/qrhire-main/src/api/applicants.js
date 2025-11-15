// Vercel serverless function for storing applicants
// This allows data to be shared across different devices/browsers

// Using a simple approach: store in a global variable
// Note: In production, use a database (MongoDB, PostgreSQL, etc.)
// This in-memory storage will reset on each deployment
let applicants = [];

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Retrieve all applicants
    if (req.method === 'GET') {
      return res.status(200).json(applicants || []);
    }

    // POST - Add a new applicant
    if (req.method === 'POST') {
      const newApplicant = {
        ...req.body,
        id: Date.now().toString(),
        appliedAt: new Date().toISOString()
      };
      applicants.push(newApplicant);
      return res.status(200).json(newApplicant);
    }

    // PUT - Update all applicants (used for syncing)
    if (req.method === 'PUT') {
      applicants = req.body || [];
      return res.status(200).json(applicants);
    }

    // DELETE - Delete an applicant or clear all
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        applicants = applicants.filter(app => app.id !== id);
      } else {
        applicants = [];
      }
      return res.status(200).json(applicants);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
