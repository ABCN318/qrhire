import { useState } from 'react'

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simple password check - you can change this password
    const ADMIN_PASSWORD = 'admin123' // Change this to your desired password

    if (password === ADMIN_PASSWORD) {
      // Store authentication in sessionStorage (clears when browser closes)
      sessionStorage.setItem('adminAuthenticated', 'true')
      onLogin()
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Admin Login</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Enter the admin password to access the admin panel.
      </p>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            required
          />
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin

