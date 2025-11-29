
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Video, Calendar, Clock, AlertCircle, ArrowLeft, Filter, CheckCircle, User, Star, Activity, ChevronRight, AlertTriangle, Settings, Bell, Lock, Globe, Save, Mail, Phone, Shield, LogOut, ChevronLeft, GraduationCap, Languages, Menu, FileText, Home } from 'lucide-react';
import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_VITALS } from '../constants';
import { Doctor, Appointment, AppointmentStatus, User as UserType } from '../types';
import { Button, Card, Badge, Modal } from '../components/UIComponents';
import { analyzeSymptoms, AISymptomResponse } from '../services/geminiService';
import { MedicalHistory } from './MedicalHistory';

interface PatientPortalProps {
  currentUser?: UserType;
  onNavigate: (view: string) => void;
  onBack: () => void;
  initialMode?: 'DASHBOARD' | 'MY_APPOINTMENTS' | 'SETTINGS' | 'MEDICAL_HISTORY';
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ currentUser, onNavigate, onBack, initialMode = 'DASHBOARD' }) => {
  // View State
  const [viewMode, setViewMode] = useState<'DASHBOARD' | 'MY_APPOINTMENTS' | 'SETTINGS' | 'MEDICAL_HISTORY'>(initialMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Sync prop change to state
  useEffect(() => {
    setViewMode(initialMode);
    if (initialMode === 'SETTINGS') {
        setActiveSettingsTab('PROFILE');
    }
  }, [initialMode]);

  // Appointments State (initialized from Mock)
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedHospital, setSelectedHospital] = useState('All Hospitals');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  // AI State
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<AISymptomResponse | null>(null);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Profile/Date/Time, 2: Review, 3: Success
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingType, setBookingType] = useState<'In-Person' | 'Telemedicine'>('In-Person');

  // Queue Modal State
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [trackedAppointment, setTrackedAppointment] = useState<Appointment | null>(null);

  // Cancellation Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAptIdCancel, setSelectedAptIdCancel] = useState<string | null>(null);

  // Settings Internal State
  const [activeSettingsTab, setActiveSettingsTab] = useState<'PROFILE' | 'SECURITY' | 'NOTIFICATIONS' | 'PRIVACY'>('PROFILE');
  
  const [settingsForm, setSettingsForm] = useState({
      name: currentUser?.name || 'Rahim Uddin',
      email: currentUser?.email || 'rahim@example.com',
      phone: '01712345678',
      bloodGroup: MOCK_VITALS.bloodGroup,
      notifications: {
          email: true,
          sms: true,
          push: false
      },
      privacy: {
          shareHistory: true,
          visibleToSearch: false
      }
  });

  // Update form if currentUser changes (e.g. login)
  useEffect(() => {
      if (currentUser) {
          setSettingsForm(prev => ({
              ...prev,
              name: currentUser.name,
              email: currentUser.email
          }));
      }
  }, [currentUser]);

  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Filter Data Population
  const cities = ['All Cities', 'Dhaka', 'Chittagong', 'Sylhet'];
  const areas = ['All Areas', 'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Panthapath', 'Bakshibazar', 'Bashundhara R/A'];
  const hospitals = ['All Hospitals', ...Array.from(new Set(MOCK_DOCTORS.map(d => d.hospital)))];
  const specialties = ['All Specialties', ...Array.from(new Set(MOCK_DOCTORS.map(d => d.specialization)))];

  // Logic: Filtering Doctors
  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All Cities' || doc.location.includes(selectedCity);
    const matchesArea = selectedArea === 'All Areas' || doc.location.includes(selectedArea);
    const matchesHospital = selectedHospital === 'All Hospitals' || doc.hospital === selectedHospital;
    const matchesSpec = selectedSpecialty === 'All Specialties' || doc.specialization === selectedSpecialty;
    const matchesAi = aiRecommendation ? doc.specialization.includes(aiRecommendation.specialist) : true;
    
    return matchesSearch && matchesCity && matchesArea && matchesHospital && matchesSpec && matchesAi;
  });

  // Logic: Handle Booking Flow
  const handleBookClick = (doctor: Doctor) => {
      setBookingDoctor(doctor);
      setBookingStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setBookingType('In-Person');
      setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
      const newApt: Appointment = {
          id: `new-${Date.now()}`,
          doctorName: bookingDoctor!.name,
          patientName: settingsForm.name,
          date: selectedDate,
          time: selectedTime,
          type: bookingType,
          status: AppointmentStatus.CONFIRMED,
          queueNumber: Math.floor(Math.random() * 20) + 10
      };
      // Push to mock data so it persists when switching views
      MOCK_APPOINTMENTS.push(newApt);
      setAppointments(prev => [...prev, newApt]);
      setBookingStep(3); 
  };

  const handleSymptomAnalysis = async () => {
    if (!symptomInput.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeSymptoms(symptomInput);
    if (result) {
      setAiRecommendation(result);
      setSelectedSpecialty('All Specialties'); 
      setSearchTerm(result.specialist);
    }
    setIsAnalyzing(false);
  };

  const openQueueTracker = (apt: Appointment) => {
      if (apt.status === AppointmentStatus.CANCELLED || apt.status === AppointmentStatus.COMPLETED) return;
      setTrackedAppointment(apt);
      setIsQueueModalOpen(true);
  }

  const handleCancelClick = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setSelectedAptIdCancel(id);
      setIsCancelModalOpen(true);
  };

  const confirmCancel = () => {
      if (selectedAptIdCancel) {
          const mockIndex = MOCK_APPOINTMENTS.findIndex(a => a.id === selectedAptIdCancel);
          if (mockIndex >= 0) {
              MOCK_APPOINTMENTS[mockIndex].status = AppointmentStatus.CANCELLED;
          }
          setAppointments(prev => prev.map(apt => 
              apt.id === selectedAptIdCancel ? { ...apt, status: AppointmentStatus.CANCELLED } : apt
          ));
      }
      setIsCancelModalOpen(false);
      setSelectedAptIdCancel(null);
  };

  const saveSettings = () => {
      setIsSavingSettings(true);
      setTimeout(() => {
          setIsSavingSettings(false);
          alert("Settings saved successfully!");
      }, 1000);
  };

  const getNext7Days = () => {
      const dates = [];
      const today = new Date();
      for(let i=1; i<=6; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          dates.push({
             day: d.toLocaleDateString('en-US', { weekday: 'short' }),
             date: d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
             fullDate: d.toISOString().split('T')[0]
          });
      }
      return dates;
  }

  // Helper for Sidebar items
  const SidebarItem = ({ view, icon, label }: { view: typeof viewMode, icon: React.ReactNode, label: string }) => (
      <button 
        onClick={() => { setViewMode(view); setIsSidebarOpen(false); onNavigate(view === 'DASHBOARD' ? 'patient' : view === 'MY_APPOINTMENTS' ? 'patient_appointments' : view === 'SETTINGS' ? 'patient_settings' : 'medical_history'); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${viewMode === view ? 'bg-primary-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
      >
          {icon} {label}
      </button>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
       
       {/* PATIENT SIDEBAR (Matching Doctor Portal Style) */}
       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-slate-500">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm truncate w-32">{settingsForm.name}</h3>
                        <p className="text-xs text-primary-600 font-bold flex items-center gap-1">Patient Portal</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <SidebarItem view="DASHBOARD" icon={<Home size={18}/>} label="Find Doctor" />
                <SidebarItem view="MY_APPOINTMENTS" icon={<Calendar size={18}/>} label="My Appointments" />
                <SidebarItem view="MEDICAL_HISTORY" icon={<FileText size={18}/>} label="Medical History" />
                <SidebarItem view="SETTINGS" icon={<Settings size={18}/>} label="Settings" />
            </nav>
            <div className="p-4 border-t border-slate-100">
                <button onClick={() => onNavigate('emergency')} className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 font-medium p-3 rounded-lg w-full transition-colors mb-2 justify-center shadow-md shadow-red-200">
                    <AlertTriangle size={18} /> Emergency Mode
                </button>
                <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-medium hover:bg-slate-100 p-3 rounded-lg w-full transition-colors justify-center">
                    <LogOut size={18} /> Logout
                </button>
            </div>
       </aside>

       {/* Mobile Sidebar Overlay */}
       {isSidebarOpen && (
             <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
       )}

       {/* MAIN CONTENT AREA */}
       <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* Header for Mobile/Context */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center md:bg-transparent md:border-b-0 md:pt-8 md:px-8">
                <div className="flex items-center gap-3">
                   <button className="md:hidden text-slate-600" onClick={() => setIsSidebarOpen(true)}>
                       <Menu size={24} />
                   </button>
                   <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                            {viewMode === 'DASHBOARD' ? 'Find Doctor' : 
                             viewMode === 'MY_APPOINTMENTS' ? 'My Appointments' : 
                             viewMode === 'MEDICAL_HISTORY' ? 'Medical Records' : 'Settings'}
                        </h2>
                   </div>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-full relative transition-all">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          
          {/* --- VIEW: MEDICAL HISTORY --- */}
          {viewMode === 'MEDICAL_HISTORY' && (
             <MedicalHistory onBack={() => setViewMode('DASHBOARD')} />
          )}

          {/* --- VIEW: SETTINGS --- */}
          {viewMode === 'SETTINGS' && (
              <div className="animate-fade-in pb-20">
                  <div className="flex flex-col md:flex-row gap-6 min-h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      {/* Settings Internal Sidebar */}
                      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 flex flex-col">
                          <div className="p-6 border-b border-slate-100">
                              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                  <Settings size={20} className="text-primary-600"/> Preferences
                              </h2>
                          </div>
                          <nav className="flex-1 p-4 space-y-1">
                              <button 
                                 onClick={() => setActiveSettingsTab('PROFILE')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${activeSettingsTab === 'PROFILE' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                              >
                                 <User size={18}/> My Profile
                              </button>
                              <button 
                                 onClick={() => setActiveSettingsTab('SECURITY')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${activeSettingsTab === 'SECURITY' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                              >
                                 <Lock size={18}/> Security
                              </button>
                              <button 
                                 onClick={() => setActiveSettingsTab('NOTIFICATIONS')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${activeSettingsTab === 'NOTIFICATIONS' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                              >
                                 <Bell size={18}/> Notifications
                              </button>
                              <button 
                                 onClick={() => setActiveSettingsTab('PRIVACY')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${activeSettingsTab === 'PRIVACY' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                              >
                                 <Shield size={18}/> Privacy
                              </button>
                          </nav>
                      </div>

                      {/* Right Content Area */}
                      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                          {activeSettingsTab === 'PROFILE' && (
                              <div className="space-y-6 animate-fade-in">
                                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
                                  <div className="flex items-center gap-6 mb-8">
                                      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 border-4 border-white shadow-lg">
                                          <User size={40}/>
                                      </div>
                                      <div>
                                          <Button variant="outline" className="text-sm">Change Photo</Button>
                                      </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                          <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={settingsForm.name} onChange={e => setSettingsForm({...settingsForm, name: e.target.value})} />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                                          <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={settingsForm.bloodGroup} onChange={e => setSettingsForm({...settingsForm, bloodGroup: e.target.value})} />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                          <input type="email" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                          <input type="tel" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} />
                                      </div>
                                  </div>
                                  <div className="flex justify-end pt-4">
                                      <Button onClick={saveSettings} loading={isSavingSettings} className="px-8"><Save size={18} className="mr-2"/> Save Changes</Button>
                                  </div>
                              </div>
                          )}

                          {activeSettingsTab === 'SECURITY' && (
                              <div className="space-y-6 animate-fade-in">
                                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h3>
                                  <div className="max-w-md space-y-4">
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                          <input type="password" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="••••••••" />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                          <input type="password" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="••••••••" />
                                      </div>
                                      <div>
                                          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                          <input type="password" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="••••••••" />
                                      </div>
                                      <Button className="mt-4">Update Password</Button>
                                  </div>
                              </div>
                          )}

                          {activeSettingsTab === 'NOTIFICATIONS' && (
                              <div className="space-y-6 animate-fade-in">
                                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h3>
                                  <div className="space-y-4">
                                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                          <div className="flex items-center gap-3">
                                              <Mail className="text-slate-500"/>
                                              <div>
                                                  <p className="font-bold text-slate-800">Email Notifications</p>
                                                  <p className="text-sm text-slate-500">Receive appointment confirmations</p>
                                              </div>
                                          </div>
                                          <input type="checkbox" checked={settingsForm.notifications.email} onChange={e => setSettingsForm({...settingsForm, notifications: {...settingsForm.notifications, email: e.target.checked}})} className="w-5 h-5 text-primary-600 rounded bg-white" />
                                      </div>
                                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                          <div className="flex items-center gap-3">
                                              <Phone className="text-slate-500"/>
                                              <div>
                                                  <p className="font-bold text-slate-800">SMS Alerts</p>
                                                  <p className="text-sm text-slate-500">Receive reminders for queue tracking</p>
                                              </div>
                                          </div>
                                          <input type="checkbox" checked={settingsForm.notifications.sms} onChange={e => setSettingsForm({...settingsForm, notifications: {...settingsForm.notifications, sms: e.target.checked}})} className="w-5 h-5 text-primary-600 rounded bg-white" />
                                      </div>
                                  </div>
                              </div>
                          )}
                          
                          {activeSettingsTab === 'PRIVACY' && (
                              <div className="space-y-6 animate-fade-in">
                                   <h3 className="text-2xl font-bold text-slate-900 mb-6">Privacy & Data</h3>
                                   <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg text-yellow-800 text-sm mb-6">
                                       <p className="font-bold flex items-center gap-2"><AlertCircle size={16}/> Medical Data Privacy</p>
                                       <p className="mt-1">Your medical history is encrypted. Only doctors with active appointments can view your current symptoms.</p>
                                   </div>
                                   <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                                       <div>
                                           <p className="font-bold text-slate-800">Share Medical History</p>
                                           <p className="text-sm text-slate-500">Allow doctors to see past prescriptions</p>
                                       </div>
                                       <input type="checkbox" checked={settingsForm.privacy.shareHistory} onChange={e => setSettingsForm({...settingsForm, privacy: {...settingsForm.privacy, shareHistory: e.target.checked}})} className="w-5 h-5 text-primary-600 rounded bg-white" />
                                   </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          )}

          {/* --- VIEW: MY APPOINTMENTS --- */}
          {viewMode === 'MY_APPOINTMENTS' && (
              <div className="space-y-6 animate-fade-in pb-20">
                  <Card>
                    <div className="space-y-4">
                      {appointments.length > 0 ? (
                        appointments.map(apt => (
                          <div 
                            key={apt.id} 
                            onClick={() => openQueueTracker(apt)}
                            className={`flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-xl border shadow-sm transition-all cursor-pointer group ${apt.status === AppointmentStatus.CANCELLED ? 'opacity-60 border-slate-100 bg-slate-50' : 'border-slate-100 hover:shadow-md hover:border-primary-200'}`}
                          >
                            <div className="flex items-center gap-5 mb-4 md:mb-0">
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${apt.status === AppointmentStatus.CONFIRMED ? 'bg-green-100 text-green-600' : apt.status === AppointmentStatus.CANCELLED ? 'bg-red-50 text-red-300' : 'bg-orange-100 text-orange-600'}`}>
                                {apt.type === 'Telemedicine' ? <Video size={24} /> : <MapPin size={24} />}
                              </div>
                              <div>
                                <h3 className={`font-bold text-lg transition-colors ${apt.status === AppointmentStatus.CANCELLED ? 'text-slate-500 line-through' : 'text-slate-900 group-hover:text-primary-600'}`}>{apt.doctorName}</h3>
                                <div className="text-sm text-slate-500 space-y-1">
                                    <p className="flex items-center gap-2"><Calendar size={14}/> {apt.date}</p>
                                    <p className="flex items-center gap-2"><Clock size={14}/> {apt.time}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:gap-1 pl-14 md:pl-0">
                               {apt.status === AppointmentStatus.CONFIRMED && (
                                   <div className="flex items-center gap-2 mb-1 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                       <span className="text-xs font-bold text-green-700">Live Queue</span>
                                   </div>
                               )}
                               <Badge color={apt.status === AppointmentStatus.CONFIRMED ? 'green' : apt.status === AppointmentStatus.CANCELLED ? 'red' : 'yellow'}>{apt.status}</Badge>
                               
                               {(apt.status === AppointmentStatus.PENDING || apt.status === AppointmentStatus.CONFIRMED) && (
                                   <button 
                                       onClick={(e) => handleCancelClick(e, apt.id)}
                                       className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline mt-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                   >
                                       Cancel Appointment
                                   </button>
                               )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-medium">No appointments scheduled.</p>
                            <Button variant="outline" className="mt-4" onClick={() => setViewMode('DASHBOARD')}>Book an Appointment</Button>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Queue Modal & Cancel Modal (Same as before) */}
                  <Modal isOpen={isQueueModalOpen} onClose={() => setIsQueueModalOpen(false)} title="Smart Live Queue">
                     {/* ... Queue Logic ... */}
                     {trackedAppointment && (
                          <div className="space-y-8 text-center pb-4">
                              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500"></div>
                                  <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">Your Token Number</p>
                                  <h2 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                                      {trackedAppointment.queueNumber || 'N/A'}
                                  </h2>
                                  <p className="text-primary-300 text-sm">Est. Wait: 25 mins</p>
                              </div>
                          </div>
                      )}
                  </Modal>
                  <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="Cancel Appointment">
                     <div className="space-y-4">
                        <p>Are you sure?</p>
                        <div className="flex gap-2 justify-end">
                            <Button variant="danger" onClick={confirmCancel}>Yes, Cancel</Button>
                        </div>
                     </div>
                  </Modal>
              </div>
          )}

          {/* --- VIEW: DASHBOARD (FIND DOCTOR) --- */}
          {viewMode === 'DASHBOARD' && (
            <div className="space-y-8 animate-fade-in pb-20">
              
              {/* Header & AI Symptom Checker */}
              <section className="bg-primary-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                {/* ... (AI Logic same as before) ... */}
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-3xl font-bold mb-4">Find the Right Care</h1>
                  <p className="text-primary-100 mb-6">Describe your symptoms to get AI recommendations, or search manually below.</p>
                  
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-inner">
                    <div className="flex items-start gap-3">
                        <Activity className="text-primary-200 mt-2" size={20} />
                        <textarea 
                        className="w-full bg-white text-slate-900 rounded-lg p-3 placeholder-slate-400 border-none focus:ring-0 resize-none h-20 text-lg"
                        placeholder="e.g., I have a severe headache and nausea since morning..."
                        value={symptomInput}
                        onChange={(e) => setSymptomInput(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-2">
                      <span className="text-xs text-primary-200">Powered by Gemini AI</span>
                      <Button 
                        variant="secondary" 
                        className="bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 text-sm py-1.5 px-4 h-auto shadow-none"
                        onClick={handleSymptomAnalysis}
                        loading={isAnalyzing}
                      >
                        Analyze Symptoms
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Advanced Doctor Search & Filters */}
              <section id="doctors">
                {/* ... Search & Filter UI (same as before) ... */}
                <div className="flex flex-col gap-4 mb-6">
                    {/* Search inputs... */}
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                            <input 
                              type="text" 
                              placeholder="Search doctor or hospital..." 
                              className="w-full pl-10 p-3 rounded-xl border border-slate-200 shadow-sm bg-white focus:ring-2 focus:ring-primary-500"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                            <select 
                              className="w-full pl-10 p-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary-500 bg-white"
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                {cities.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="relative">
                             <Filter className="absolute left-3 top-3.5 text-slate-400" size={18}/>
                             <select 
                                className="w-full pl-10 p-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary-500 bg-white"
                                value={selectedSpecialty}
                                onChange={(e) => setSelectedSpecialty(e.target.value)}
                             >
                                 {specialties.map(s => <option key={s}>{s}</option>)}
                             </select>
                        </div>
                    </div>
                </div>

                {/* Results Grid - UPDATED DOCTOR CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                      {/* Doctor Image Header */}
                      <div className="h-48 overflow-hidden relative bg-slate-100">
                          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          
                          {/* Verified Badge Overlay */}
                          {doctor.isVerified && (
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-green-700">
                                  <CheckCircle size={12} fill="currentColor" className="text-white"/> BMDC Verified
                              </div>
                          )}

                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                              <Star size={12} className="text-yellow-500 fill-yellow-500" /> {doctor.rating}
                          </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{doctor.name}</h3>
                          <p className="text-primary-600 font-medium text-sm mb-2">{doctor.specialization}</p>
                          
                          {/* Rich Profile Details Summary */}
                          <div className="text-xs text-slate-500 mb-4 space-y-1.5">
                              <p className="flex items-center gap-1.5 font-medium"><GraduationCap size={12}/> {doctor.degrees.join(', ')}</p>
                              <p className="flex items-center gap-1.5"><MapPin size={12}/> {doctor.hospital}</p>
                              <p className="flex items-center gap-1.5"><Languages size={12}/> {doctor.languages.join(', ')}</p>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-50">
                              <div className="flex justify-between items-center mb-3">
                                   <div>
                                       <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Physical</p>
                                       <p className="font-bold text-slate-900">৳{doctor.fees.physical}</p>
                                   </div>
                                   <div className="text-right">
                                       <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Online</p>
                                       <p className="font-bold text-slate-900">৳{doctor.fees.online}</p>
                                   </div>
                              </div>
                              <Button 
                                onClick={() => handleBookClick(doctor)}
                                className="w-full rounded-xl shadow-primary-500/30"
                              >
                                View Profile & Book
                              </Button>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Enhanced Booking Modal */}
              <Modal 
                 isOpen={isBookingModalOpen} 
                 onClose={() => setIsBookingModalOpen(false)}
                 title={bookingStep === 3 ? "Booking Confirmed!" : ""}
                 className="max-w-4xl" // Wider modal for profile
              >
                 {bookingStep === 1 && bookingDoctor && (
                     <div className="flex flex-col lg:flex-row gap-6">
                         {/* Left: Doctor Profile Detail */}
                         <div className="lg:w-1/3 bg-slate-50 rounded-xl p-6 border border-slate-100">
                              <div className="text-center mb-4">
                                  <img src={bookingDoctor.image} className="w-32 h-32 rounded-full object-cover mx-auto mb-3 shadow-md border-4 border-white" />
                                  <h3 className="font-bold text-xl text-slate-900">{bookingDoctor.name}</h3>
                                  <p className="text-primary-600 font-medium">{bookingDoctor.specialization}</p>
                                  <div className="flex justify-center gap-2 mt-2">
                                     {bookingDoctor.isVerified && <Badge color="green">BMDC Verified</Badge>}
                                     <Badge color="yellow">{bookingDoctor.rating} ★</Badge>
                                  </div>
                              </div>
                              
                              <div className="space-y-4 text-sm">
                                  <div>
                                      <p className="font-bold text-slate-700 mb-1">Registration</p>
                                      <p className="text-slate-500 font-mono text-xs">BMDC-{bookingDoctor.bmdcNumber}****</p>
                                  </div>
                                  <div>
                                      <p className="font-bold text-slate-700 mb-1">Education</p>
                                      <ul className="list-disc list-inside text-slate-500 space-y-1">
                                          {bookingDoctor.education.map((edu, i) => (
                                              <li key={i}>{edu.degree} - {edu.institute}</li>
                                          ))}
                                      </ul>
                                  </div>
                                   <div>
                                      <p className="font-bold text-slate-700 mb-1">Patient Reviews</p>
                                      {bookingDoctor.reviews.length > 0 ? (
                                          <div className="space-y-2">
                                              {bookingDoctor.reviews.slice(0, 2).map(r => (
                                                  <div key={r.id} className="bg-white p-2 rounded border border-slate-100">
                                                      <div className="flex justify-between text-xs mb-1">
                                                          <span className="font-bold">{r.patientName}</span>
                                                          <span className="text-yellow-500">{r.rating} ★</span>
                                                      </div>
                                                      <p className="text-slate-500 text-xs italic">"{r.comment}"</p>
                                                  </div>
                                              ))}
                                          </div>
                                      ) : (
                                          <p className="text-slate-400 italic">No reviews yet.</p>
                                      )}
                                  </div>
                              </div>
                         </div>

                         {/* Right: Booking Actions */}
                         <div className="flex-1 space-y-6">
                             <div>
                                 <h2 className="text-2xl font-bold text-slate-900 mb-4">Book Appointment</h2>
                                 
                                 {/* Consultation Type Toggle */}
                                 <div className="grid grid-cols-2 gap-4 mb-6">
                                     <label className={`p-4 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all ${bookingType === 'In-Person' ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-slate-200 bg-white'}`}>
                                         <input type="radio" name="type" className="hidden" checked={bookingType === 'In-Person'} onChange={() => setBookingType('In-Person')} />
                                         <MapPin className={bookingType === 'In-Person' ? 'text-primary-600' : 'text-slate-400'} size={24} />
                                         <div className="text-center">
                                             <span className="block font-bold text-slate-900">Physical Visit</span>
                                             <span className="text-xs text-slate-500">৳{bookingDoctor.fees.physical} • 20 mins</span>
                                         </div>
                                     </label>

                                     {bookingDoctor.isTelemedicineAvailable ? (
                                         <label className={`p-4 border rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all ${bookingType === 'Telemedicine' ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-slate-200 bg-white'}`}>
                                             <input type="radio" name="type" className="hidden" checked={bookingType === 'Telemedicine'} onChange={() => setBookingType('Telemedicine')} />
                                             <Video className={bookingType === 'Telemedicine' ? 'text-primary-600' : 'text-slate-400'} size={24} />
                                             <div className="text-center">
                                                 <span className="block font-bold text-slate-900">Video Consult</span>
                                                 <span className="text-xs text-slate-500">৳{bookingDoctor.fees.online} • 15 mins</span>
                                             </div>
                                         </label>
                                     ) : (
                                         <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-60 flex flex-col items-center justify-center gap-1">
                                             <Video className="text-slate-300" size={24}/>
                                             <span className="text-xs font-bold text-slate-400">Telemedicine Unavailable</span>
                                         </div>
                                     )}
                                 </div>

                                 {/* Date Selection */}
                                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Calendar size={18}/> Select Date</h4>
                                 <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
                                     {getNext7Days().map((d, i) => (
                                         <button 
                                            key={i}
                                            onClick={() => setSelectedDate(d.fullDate)}
                                            className={`flex-shrink-0 w-20 h-24 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${selectedDate === d.fullDate ? 'bg-primary-600 border-primary-600 text-white ring-2 ring-primary-200' : 'bg-white border-slate-200 hover:border-primary-300 text-slate-600'}`}
                                         >
                                             <span className="text-xs font-medium uppercase opacity-80">{d.day}</span>
                                             <span className="text-xl font-bold">{d.date.split(' ')[0]}</span>
                                             <span className="text-[10px] opacity-80">{d.date.split(' ')[1]}</span>
                                         </button>
                                     ))}
                                 </div>

                                 {/* Time Selection */}
                                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Clock size={18}/> Select Time Slot</h4>
                                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                                     {['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'].map(time => (
                                         <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 rounded-lg text-sm font-medium border transition-all ${selectedTime === time ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                                         >
                                             {time}
                                         </button>
                                     ))}
                                 </div>

                                 <Button 
                                    className="w-full h-12 text-lg" 
                                    disabled={!selectedDate || !selectedTime}
                                    onClick={() => setBookingStep(2)}
                                 >
                                     Proceed to Confirmation
                                 </Button>
                             </div>
                         </div>
                     </div>
                 )}
                 
                 {bookingStep === 2 && (
                     <div className="max-w-md mx-auto space-y-6">
                         <h2 className="text-2xl font-bold text-slate-900 text-center">Confirm Booking</h2>
                         <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                             <div className="space-y-3 text-sm">
                                 <div className="flex justify-between"><span className="text-slate-500">Doctor</span><span className="font-medium text-slate-900">{bookingDoctor?.name}</span></div>
                                 <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium text-slate-900">{selectedDate}</span></div>
                                 <div className="flex justify-between"><span className="text-slate-500">Time</span><span className="font-medium text-slate-900">{selectedTime}</span></div>
                                 <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-medium text-slate-900">{bookingType}</span></div>
                                 <div className="flex justify-between pt-2 border-t border-slate-200 mt-2">
                                     <span className="font-bold text-slate-700">Total Fee</span>
                                     <span className="font-bold text-primary-600 text-lg">৳{bookingType === 'In-Person' ? bookingDoctor?.fees.physical : bookingDoctor?.fees.online}</span>
                                 </div>
                             </div>
                         </div>
                         <div className="flex gap-3">
                             <Button variant="outline" className="flex-1" onClick={() => setBookingStep(1)}>Back</Button>
                             <Button className="flex-[2]" onClick={handleConfirmBooking}>Confirm & Book</Button>
                         </div>
                     </div>
                 )}

                 {bookingStep === 3 && (
                     <div className="text-center py-8">
                         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 animate-bounce">
                             <CheckCircle size={40} />
                         </div>
                         <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Successful!</h2>
                         <Button onClick={() => { setIsBookingModalOpen(false); setViewMode('MY_APPOINTMENTS'); onNavigate('patient_appointments'); }} className="w-full">
                             View My Appointments
                         </Button>
                     </div>
                 )}
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
