// Vercel serverless function for applicants API
// This works on Vercel's serverless platform

// Note: Using in-memory storage for simplicity
// For production with persistent data, consider using:
// - Vercel KV (Redis)
// - Vercel Postgres
// - Supabase
// - MongoDB Atlas

let applicants = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Get all applicants
    if (req.method === 'GET') {
      return res.status(200).json(applicants.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)));
    }

    // POST - Create new applicant
    if (req.method === 'POST') {
      const { jobId, name, contactPreference, contactInfo, experience, speaksSpanish } = req.body;

      if (!jobId || !name || !contactPreference || !contactInfo) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newApplicant = {
        id: Date.now().toString(),
        jobId,
        name,
        contactPreference,
        contactInfo,
        experience: experience || '',
        speaksSpanish: speaksSpanish || '',
        appliedAt: new Date().toISOString()
      };

      applicants.push(newApplicant);
      return res.status(201).json(newApplicant);
    }

    // DELETE - Delete applicant(s)
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (id) {
        // Delete specific applicant
        const index = applicants.findIndex(app => app.id === id);
        if (index === -1) {
          return res.status(404).json({ error: 'Applicant not found' });
        }
        applicants.splice(index, 1);
        return res.status(200).json({ message: 'Applicant deleted successfully' });
      } else {
        // Delete all applicants
        const count = applicants.length;
        applicants = [];
        return res.status(200).json({ message: 'All applicants deleted successfully', count });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

