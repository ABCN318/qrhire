import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import ApplicationPage from './components/ApplicationPage'
import ProtectedAdmin from './components/ProtectedAdmin'
import './index.css'

function Navigation() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <nav className="nav">
      <div className="nav-content">
        <h1>QR Scan Hire</h1>
        <div className="nav-links">
          {isAdminRoute && (
            <Link to="/apply">Back to Application</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<ApplicationPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/apply/:jobId" element={<ApplicationPage />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

