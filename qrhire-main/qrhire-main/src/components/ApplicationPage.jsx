import { useParams } from 'react-router-dom'
import ApplicationForm from './ApplicationForm'

function ApplicationPage() {
  const { jobId } = useParams()
  
  return (
    <div className="card">
      <h2>Job Application</h2>
      {jobId && (
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Applying for: <strong>{jobId}</strong>
        </p>
      )}
      <ApplicationForm jobId={jobId || 'General'} />
    </div>
  )
}

export default ApplicationPage

