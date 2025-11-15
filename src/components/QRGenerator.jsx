import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

function QRGenerator() {
  const [jobId, setJobId] = useState('JOB-001')
  const [baseUrl, setBaseUrl] = useState(window.location.origin)
  const [showQR, setShowQR] = useState(false)

  const getQRUrl = () => {
    const cleanJobId = jobId.trim()
    return `${baseUrl}/apply/${encodeURIComponent(cleanJobId)}`
  }

  const handleGenerate = () => {
    if (jobId.trim()) {
      setShowQR(true)
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `QR-${jobId}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  return (
    <div className="card">
      <h2>Generate Job QR Code</h2>
      <p>Create a QR code for a job posting. Candidates will scan this to apply.</p>
      
      <div className="form-group">
        <label htmlFor="baseUrl">Base URL (where your app is hosted) *</label>
        <input
          type="text"
          id="baseUrl"
          value={baseUrl}
          onChange={(e) => {
            setBaseUrl(e.target.value)
            setShowQR(false)
          }}
          placeholder="https://yourdomain.com or http://localhost:3000"
          style={{ fontFamily: 'monospace', marginBottom: '15px' }}
        />
        <small style={{ color: '#666', marginTop: '5px', display: 'block', marginBottom: '15px' }}>
          The full URL where your application is hosted. For production, use your actual domain.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="jobId">Job ID / Identifier *</label>
        <input
          type="text"
          id="jobId"
          value={jobId}
          onChange={(e) => {
            setJobId(e.target.value)
            setShowQR(false)
          }}
          placeholder="e.g., JOB-001, Software-Engineer-2024"
          style={{ fontFamily: 'monospace' }}
        />
        <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
          This identifier will be shown in the admin panel when someone applies
        </small>
      </div>

      <button className="btn" onClick={handleGenerate} disabled={!jobId.trim()}>
        Generate QR Code
      </button>

      {showQR && (
        <div className="qr-display">
          <div style={{ marginBottom: '20px' }}>
            <QRCodeSVG
              id="qr-code-svg"
              value={getQRUrl()}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <p><strong>Job ID:</strong> <code>{jobId}</code></p>
          <p style={{ marginTop: '10px', wordBreak: 'break-all' }}>
            <strong>QR Code URL:</strong><br />
            <code style={{ fontSize: '12px', background: '#f0f0f0', padding: '5px', borderRadius: '4px' }}>
              {getQRUrl()}
            </code>
          </p>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            📱 Print or display this QR code in your store. When people scan it with their phone camera, 
            they'll be taken directly to the application form for this job.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button className="btn" onClick={handleDownload}>
              Download QR Code
            </button>
            <button className="btn btn-secondary" onClick={() => setShowQR(false)} style={{ marginLeft: '10px' }}>
              Generate New
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRGenerator

