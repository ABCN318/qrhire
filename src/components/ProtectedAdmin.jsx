import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

function ProtectedAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    navigate('/')
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminPanel onLogout={handleLogout} />
}

export default ProtectedAdmin

