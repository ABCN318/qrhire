import { useState, useEffect } from 'react'
import { getApplicants, deleteApplicant, clearAllApplicants } from '../utils/storage'
import QRGenerator from './QRGenerator'

function AdminPanel({ onLogout }) {
  const [applicants, setApplicants] = useState([])
  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState('applicants')

  useEffect(() => {
    loadApplicants()

    // Listen for storage changes (e.g., when a new application is submitted from another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === 'applicants' || e.key === null) {
        loadApplicants()
      }
    }

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom events (for same-tab updates)
    window.addEventListener('applicantSaved', loadApplicants)

    // Refresh when window gains focus (in case data changed in another tab)
    const handleFocus = () => {
      loadApplicants()
    }
    window.addEventListener('focus', handleFocus)

    // Periodic refresh as a fallback (every 3 seconds when admin panel is active)
    // This ensures we catch any applications even if events don't fire
    const refreshInterval = setInterval(() => {
      loadApplicants()
    }, 3000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('applicantSaved', loadApplicants)
      window.removeEventListener('focus', handleFocus)
      clearInterval(refreshInterval)
    }
  }, [])

  const loadApplicants = () => {
    const allApplicants = getApplicants()
    setApplicants(allApplicants)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplicant(id)
      loadApplicants()
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL applications? This cannot be undone.')) {
      clearAllApplicants()
      loadApplicants()
    }
  }

  const filteredApplicants = applicants.filter(applicant => {
    if (!filter) return true
    const searchTerm = filter.toLowerCase()
    return (
      (applicant.name || '').toLowerCase().includes(searchTerm) ||
      (applicant.contactInfo || '').toLowerCase().includes(searchTerm) ||
      (applicant.jobId || '').toLowerCase().includes(searchTerm) ||
      (applicant.experience || '').toLowerCase().includes(searchTerm) ||
      (applicant.speaksSpanish && applicant.speaksSpanish.toLowerCase().includes(searchTerm))
    )
  })

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleString()
    } catch (e) {
      return 'Invalid Date'
    }
  }

  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e0e0e0', flex: 1 }}>
            <button
              className="btn"
              onClick={() => setActiveTab('applicants')}
              style={{
                background: activeTab === 'applicants' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                color: activeTab === 'applicants' ? 'white' : '#333',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer'
              }}
            >
              View Applicants
            </button>
            <button
              className="btn"
              onClick={() => setActiveTab('generator')}
              style={{
                background: activeTab === 'generator' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                color: activeTab === 'generator' ? 'white' : '#333',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer'
              }}
            >
              Generate QR Code
            </button>
          </div>
          {onLogout && (
            <button
              className="btn btn-secondary"
              onClick={onLogout}
              style={{ marginLeft: '15px', padding: '10px 20px' }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {activeTab === 'generator' && <QRGenerator />}

      {activeTab === 'applicants' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Applicants</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" onClick={loadApplicants} style={{ padding: '10px 20px' }}>
                🔄 Refresh
              </button>
              <button className="btn btn-danger" onClick={handleClearAll} disabled={applicants.length === 0}>
                Clear All
              </button>
            </div>
          </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search applicants..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px', color: '#666' }}>
        Total Applicants: {applicants.length} | Showing: {filteredApplicants.length}
      </div>

      {filteredApplicants.length === 0 ? (
        <div className="empty-state">
          <p>{applicants.length === 0 ? 'No applications yet.' : 'No applicants match your search.'}</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="applicants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Contact Info</th>
                <th>Job ID</th>
                <th>Speaks Spanish</th>
                <th>Experience</th>
                <th>Applied At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td><strong>{applicant.name}</strong></td>
                  <td>{applicant.contactPreference === 'email' ? '📧 Email' : '📞 Phone'}</td>
                  <td>{applicant.contactInfo}</td>
                  <td><code>{applicant.jobId}</code></td>
                  <td>
                    {applicant.speaksSpanish === 'yes' ? (
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅ Yes</span>
                    ) : applicant.speaksSpanish === 'no' ? (
                      <span style={{ color: '#dc3545' }}>❌ No</span>
                    ) : (
                      <span style={{ color: '#999' }}>—</span>
                    )}
                  </td>
                  <td>
                    {applicant.experience ? (
                      <details>
                        <summary style={{ cursor: 'pointer', color: '#667eea' }}>
                          View Experience
                        </summary>
                        <div style={{ marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                          {applicant.experience}
                        </div>
                      </details>
                    ) : (
                      <span style={{ color: '#999' }}>No experience provided</span>
                    )}
                  </td>
                  <td>{formatDate(applicant.appliedAt)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(applicant.id)}
                      style={{ padding: '6px 12px', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
      )}
    </>
  )
}

export default AdminPanel

