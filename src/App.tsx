import { useState } from 'react'
import LandingPage from './components/LandingPage'
import LoginForm from './components/LoginForm'
import DoctorPortal from './components/DoctorPortal'
import PatientPortal from './components/PatientPortal'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [userRole, setUserRole] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (role: string) => {
    setUserRole(role)
    setCurrentPage('login')
  }

  const handleLoginSuccess = (role: string) => {
    setUserRole(role)
    setIsAuthenticated(true)
    if (role === 'doctor') {
      setCurrentPage('doctor')
    } else if (role === 'patient') {
      setCurrentPage('patient')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('landing')
    setUserRole('')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeSwitcher />
      
      {!isAuthenticated ? (
        <>
          {currentPage === 'landing' && (
            <LandingPage onLogin={handleLogin} />
          )}
          {currentPage === 'login' && (
            <LoginForm 
              role={userRole} 
              onLoginSuccess={handleLoginSuccess}
              onBack={() => setCurrentPage('landing')}
            />
          )}
        </>
      ) : (
        <>
          {userRole === 'doctor' && (
            <DoctorPortal onLogout={handleLogout} />
          )}
          {userRole === 'patient' && (
            <PatientPortal onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  )
}

export default App
