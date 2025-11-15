import { useState } from 'react'
import { saveApplicant } from '../utils/storage'

function ApplicationForm({ jobId }) {
  const [formData, setFormData] = useState({
    name: '',
    contactPreference: 'email',
    contactInfo: '',
    experience: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }

    if (!formData.contactInfo.trim()) {
      setError(`Please enter your ${formData.contactPreference}`)
      return
    }

    // Basic email/phone validation
    if (formData.contactPreference === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.contactInfo)) {
        setError('Please enter a valid email address')
        return
      }
    } else {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!phoneRegex.test(formData.contactInfo) || formData.contactInfo.replace(/\D/g, '').length < 10) {
        setError('Please enter a valid phone number')
        return
      }
    }

    // Save applicant
    const applicant = {
      jobId,
      name: formData.name.trim(),
      contactPreference: formData.contactPreference,
      contactInfo: formData.contactInfo.trim(),
      experience: formData.experience.trim()
    }

    saveApplicant(applicant)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div>
        <div className="success-message">
          <h3>Application Submitted Successfully! 🎉</h3>
          <p>Thank you for your interest. We'll be in touch soon.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Job Application Form</h3>
      
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Preferred Mode of Contact *</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="email"
              name="contactPreference"
              value="email"
              checked={formData.contactPreference === 'email'}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="phone"
              name="contactPreference"
              value="phone"
              checked={formData.contactPreference === 'phone'}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contactInfo">
          {formData.contactPreference === 'email' ? 'Email Address' : 'Phone Number'} *
        </label>
        <input
          type={formData.contactPreference === 'email' ? 'email' : 'tel'}
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          required
          placeholder={
            formData.contactPreference === 'email'
              ? 'your.email@example.com'
              : '+1 (555) 123-4567'
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="experience">Previous Experience</label>
        <textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Tell us about your previous work experience, skills, or relevant background..."
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button type="submit" className="btn">
          Submit Application
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm

