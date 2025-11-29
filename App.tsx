
import React, { useState } from 'react';
import { UserRole, User } from './types';
import { PatientPortal } from './views/PatientPortal';
import { DoctorPortal } from './views/DoctorPortal';
import { AdminPortal } from './views/AdminPortal';
import { SuperAdminPortal } from './views/SuperAdminPortal';
import { EmergencyView } from './views/EmergencyView';
import { TelemedicineView } from './views/TelemedicineView';
import { LandingPage } from './views/LandingPage';
import { HospitalRegistration } from './views/HospitalRegistration';
import { HospitalLogin } from './views/HospitalLogin';
import { PatientLogin } from './views/PatientLogin';
import { PatientRegistration } from './views/PatientRegistration';
import { DoctorLogin } from './views/DoctorLogin';
import { DoctorRegistration } from './views/DoctorRegistration';
import { SuperAdminLogin } from './views/SuperAdminLogin';
import { Button } from './components/UIComponents';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Activity, LogOut, Menu, UserCircle } from 'lucide-react';

// Main App Component
const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('home'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login Handler (Route to appropriate login page or mock login)
  const handleLogin = (role: UserRole) => {
    // If Patient, go to specific login page
    if (role === UserRole.PATIENT) {
        setCurrentView('patient_login');
        return;
    }

    // If Doctor, go to specific login page
    if (role === UserRole.DOCTOR) {
        setCurrentView('doctor_login');
        return;
    }

    // If Super Admin, go to specific login page
    if (role === UserRole.SUPER_ADMIN) {
        setCurrentView('super_admin_login');
        return;
    }

    // For other roles, keep existing mock flow for now (fallback)
    let name = 'Rahim Uddin';
    setCurrentUser({
      id: 'u1',
      name: name,
      role: role,
      email: 'user@mediconnect.bd'
    });
    
    switch (role) {
      default: setCurrentView('patient');
    }
  };

  const handlePatientLoginSuccess = (identifier: string) => {
     setCurrentUser({
        id: 'u-patient-001',
        name: identifier.includes('@') ? identifier.split('@')[0] : 'Rahim Uddin',
        role: UserRole.PATIENT,
        email: identifier
     });
     setCurrentView('patient');
  };

  const handleDoctorLoginSuccess = (email: string) => {
     setCurrentUser({
        id: 'u-doctor-001',
        name: 'Dr. Omor Faruck',
        role: UserRole.DOCTOR,
        email: email
     });
     setCurrentView('doctor');
  };

  const handleHospitalAdminLogin = (hospitalId: string, email: string) => {
     setCurrentUser({
        id: 'admin-' + hospitalId,
        name: 'Admin',
        role: UserRole.ADMIN,
        email: email,
        hospitalId: hospitalId
     });
     setCurrentView('admin');
  };

  const handleSuperAdminLoginSuccess = (email: string) => {
    setCurrentUser({
        id: 'super-admin-001',
        name: 'System Owner',
        role: UserRole.SUPER_ADMIN,
        email: email
    });
    setCurrentView('super_admin');
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // View Router Logic
  const renderView = () => {
    if (currentView === 'emergency') return <EmergencyView onBack={() => setCurrentView(currentUser ? 'patient' : 'home')} />;
    if (currentView === 'telemedicine') return <TelemedicineView onEndCall={() => setCurrentView('patient')} />;
    if (currentView === 'hospital_registration') return <HospitalRegistration onBack={() => setCurrentView('home')} />;
    if (currentView === 'hospital_login') return <HospitalLogin onBack={() => setCurrentView('home')} onLoginSuccess={handleHospitalAdminLogin} />;
    
    // Patient Auth Flow
    if (currentView === 'patient_login') {
        return <PatientLogin 
            onBack={() => setCurrentView('home')} 
            onLoginSuccess={handlePatientLoginSuccess}
            onRegisterClick={() => setCurrentView('patient_registration')}
        />;
    }
    if (currentView === 'patient_registration') {
        return <PatientRegistration 
            onBack={() => setCurrentView('home')} 
            onRegisterSuccess={handlePatientLoginSuccess}
            onLoginClick={() => setCurrentView('patient_login')}
        />;
    }

    // Doctor Auth Flow
    if (currentView === 'doctor_login') {
        return <DoctorLogin
            onBack={() => setCurrentView('home')}
            onLoginSuccess={handleDoctorLoginSuccess}
            onRegisterClick={() => setCurrentView('doctor_registration')}
        />;
    }
    if (currentView === 'doctor_registration') {
        return <DoctorRegistration
            onBack={() => setCurrentView('home')}
            onLoginClick={() => setCurrentView('doctor_login')}
        />
    }

    // Super Admin Auth Flow
    if (currentView === 'super_admin_login') {
        return <SuperAdminLogin
            onBack={() => setCurrentView('home')}
            onLoginSuccess={handleSuperAdminLoginSuccess}
        />
    }

    if (!currentUser) {
      return (
        <LandingPage 
          onLogin={handleLogin} 
          onHospitalLogin={() => setCurrentView('hospital_login')}
          onEmergency={() => setCurrentView('emergency')} 
          onRegisterHospital={() => setCurrentView('hospital_registration')}
        />
      );
    }

    switch (currentView) {
      case 'patient': return <PatientPortal currentUser={currentUser} onNavigate={setCurrentView} onBack={handleLogout} initialMode="DASHBOARD" />;
      case 'patient_appointments': return <PatientPortal currentUser={currentUser} onNavigate={setCurrentView} onBack={handleLogout} initialMode="MY_APPOINTMENTS" />;
      case 'patient_settings': return <PatientPortal currentUser={currentUser} onNavigate={setCurrentView} onBack={handleLogout} initialMode="SETTINGS" />;
      case 'medical_history': return <PatientPortal currentUser={currentUser} onNavigate={setCurrentView} onBack={handleLogout} initialMode="MEDICAL_HISTORY" />;
      case 'doctor': return <DoctorPortal currentUser={currentUser} onNavigate={setCurrentView} onBack={handleLogout} />;
      case 'admin': return <AdminPortal currentUser={currentUser} onBack={handleLogout} />;
      case 'super_admin': return <SuperAdminPortal onBack={handleLogout} />;
      default: return <div>View Not Found</div>;
    }
  };

  // If in immersive mode (video/emergency/patient/doctor/admin portals) or Landing Page or Auth Screens, render without standard sidebar layout
  const isImmersive = [
    'telemedicine', 'emergency', 'hospital_registration', 
    'hospital_login', 'patient_login', 'patient_registration',
    'doctor_login', 'doctor_registration', 'super_admin_login',
    'doctor', 'admin', 'patient', 'patient_appointments', 'patient_settings', 'medical_history'
  ].includes(currentView);
  
  return (
    <>
      <ThemeSwitcher />
      {isImmersive || !currentUser ? (
        renderView()
      ) : (
        <div className="min-h-screen flex bg-slate-50 font-sans">
          {/* Sidebar - Desktop */}
          <aside className={`fixed md:relative z-20 h-full w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-6 flex items-center gap-2 border-b border-slate-100">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-md">
                  <Activity size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 font-heading">MediConnect BD</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {/* Super Admin Sidebar remains here */}
              {currentUser.role === UserRole.SUPER_ADMIN && (
                  <>
                      <Button variant="ghost" className="w-full justify-start font-medium">System Health</Button>
                      <Button variant="ghost" className="w-full justify-start font-medium">Audit Logs</Button>
                      <Button variant="ghost" className="w-full justify-start font-medium">Settings</Button>
                  </>
              )}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <Button variant="danger" className="w-full justify-start" onClick={() => setCurrentView('emergency')}>
                  Emergency Mode
              </Button>
              <div className="mt-4 flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <UserCircle size={24} className="text-slate-500" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate text-slate-800">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate font-medium">{currentUser.role}</p>
                  </div>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-slate-600" title="Logout">
                      <LogOut size={18} />
                  </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-h-screen relative">
            
            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Activity size={20} />
                    </div>
                    <span className="font-bold text-lg font-heading">MediConnect BD</span>
                </div>
                {currentUser && (
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded">
                        <Menu size={20} />
                    </button>
                )}
            </header>

            {/* Content Wrapper */}
            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
                {renderView()}
            </div>
          </main>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-10 md:hidden backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
