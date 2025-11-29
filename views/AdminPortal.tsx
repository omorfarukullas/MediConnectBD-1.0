
import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Users, Calendar, Clock, Video, FileText, 
    Ambulance, Building2, CreditCard, Star, Settings, LogOut,
    Menu, Bell, Plus, Filter, Search, MoreVertical, MapPin, 
    Activity, CheckCircle, Edit3, Save, AlertCircle, Trash2, X, AlertTriangle,
    ChevronDown, Check, UserPlus, Play, Pause, RotateCcw, Mic, Monitor, ArrowLeft
} from 'lucide-react';
import { 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    LineChart, Line 
} from 'recharts';
import { MOCK_HOSPITALS, MOCK_DOCTORS, MOCK_AMBULANCES, MOCK_DEPARTMENTS, MOCK_TRANSACTIONS, MOCK_APPOINTMENTS } from '../constants';
import { Card, Badge, Button, Modal } from '../components/UIComponents';
import { User, Doctor, UserRole, Appointment, AppointmentStatus } from '../types';

export const AdminPortal = ({ currentUser, onBack }: { currentUser: User, onBack: () => void }) => {
  const [activeView, setActiveView] = useState<'DASHBOARD' | 'DOCTORS' | 'APPOINTMENTS' | 'QUEUE' | 'TELEMEDICINE' | 'RECORDS' | 'AMBULANCE' | 'DEPARTMENTS' | 'PROFILE' | 'FINANCIALS' | 'FEEDBACK' | 'SETTINGS'>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Hospital State (Editable)
  const [hospital, setHospital] = useState(MOCK_HOSPITALS.find(h => h.id === currentUser.hospitalId) || MOCK_HOSPITALS[0]);

  // Doctors Management State
  const [doctors, setDoctors] = useState<Doctor[]>(
      MOCK_DOCTORS.filter(d => d.hospital === hospital.name || d.hospital === 'Square Hospital')
  );
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isEditingDoctor, setIsEditingDoctor] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  
  // Initial Doctor Form State
  const initialDoctorForm = {
      id: '',
      name: '',
      email: '',
      specialization: 'General Medicine',
      bmdcNumber: '',
      fees: { online: 500, physical: 1000 },
      status: 'Active' as 'Active' | 'Inactive' | 'On Leave',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  };
  const [doctorForm, setDoctorForm] = useState(initialDoctorForm);

  // Appointments Management State
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [appointmentFilter, setAppointmentFilter] = useState({
      search: '',
      status: 'All',
      date: '',
      doctor: 'All'
  });
  
  // Appointment Action Modals
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });
  
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [reassignDoctorId, setReassignDoctorId] = useState('');

  // Queue Management State
  const [selectedQueueDoctor, setSelectedQueueDoctor] = useState<Doctor | null>(null);
  const [queueStatus, setQueueStatus] = useState<'ACTIVE' | 'PAUSED' | 'STOPPED'>('ACTIVE');
  const [currentQueueToken, setCurrentQueueToken] = useState(15);
  // Mock Queue List
  const [queueList, setQueueList] = useState([
      { token: 15, name: 'Rahim Uddin', status: 'Serving', time: '10:30 AM' },
      { token: 16, name: 'Karim Ahmed', status: 'Waiting', time: '10:45 AM' },
      { token: 17, name: 'Saima Khan', status: 'Waiting', time: '11:00 AM' },
      { token: 18, name: 'Abdul Jalil', status: 'Waiting', time: '11:15 AM' },
      { token: 19, name: 'Fatema Begum', status: 'Waiting', time: '11:30 AM' },
  ]);

  // Resource Edit State
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [resourceForm, setResourceForm] = useState({
      icuAvailable: hospital.icuAvailable,
      generalBedsAvailable: hospital.generalBedsAvailable,
      totalIcu: 20, // Mock total
      totalGeneral: 200 // Mock total
  });

  const handleUpdateResources = () => {
      setHospital(prev => ({
          ...prev,
          icuAvailable: parseInt(resourceForm.icuAvailable.toString()),
          generalBedsAvailable: parseInt(resourceForm.generalBedsAvailable.toString())
      }));
      setIsResourceModalOpen(false);
  };

  // Doctor CRUD Handlers
  const handleAddDoctorClick = () => {
      setIsEditingDoctor(false);
      setDoctorForm({ ...initialDoctorForm, id: Date.now().toString() });
      setIsDoctorModalOpen(true);
  };

  const handleEditDoctorClick = (doc: Doctor) => {
      setIsEditingDoctor(true);
      setDoctorForm({
          id: doc.id,
          name: doc.name,
          email: doc.email,
          specialization: doc.specialization,
          bmdcNumber: doc.bmdcNumber,
          fees: { ...doc.fees },
          status: doc.status || 'Active',
          image: doc.image
      });
      setIsDoctorModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
      setDoctorToDelete(id);
      setIsDeleteModalOpen(true);
  };

  const confirmDeleteDoctor = () => {
      if (doctorToDelete) {
          setDoctors(prev => prev.filter(d => d.id !== doctorToDelete));
          setDoctorToDelete(null);
          setIsDeleteModalOpen(false);
      }
  };

  const handleSaveDoctor = () => {
      if (!doctorForm.name || !doctorForm.bmdcNumber) {
          alert("Please fill in required fields");
          return;
      }

      if (isEditingDoctor) {
          // Update existing
          setDoctors(prev => prev.map(d => d.id === doctorForm.id ? {
              ...d,
              name: doctorForm.name,
              email: doctorForm.email,
              specialization: doctorForm.specialization,
              bmdcNumber: doctorForm.bmdcNumber,
              fees: doctorForm.fees,
              status: doctorForm.status
          } : d));
      } else {
          // Add new
          const newDoctor: Doctor = {
              id: doctorForm.id,
              name: doctorForm.name,
              role: UserRole.DOCTOR,
              email: doctorForm.email,
              specialization: doctorForm.specialization,
              hospital: hospital.name,
              bmdcNumber: doctorForm.bmdcNumber,
              fees: doctorForm.fees,
              status: doctorForm.status,
              image: doctorForm.image,
              experienceYears: 0,
              education: [],
              languages: ['Bengali', 'English'],
              available: true,
              nextSlot: 'TBD',
              rating: 0,
              reviews: [],
              patientsInQueue: 0,
              isTelemedicineAvailable: true,
              isVerified: false,
              degrees: [],
              location: hospital.address
          };
          setDoctors(prev => [...prev, newDoctor]);
      }
      setIsDoctorModalOpen(false);
  };

  // Queue Logic
  const handleNextPatient = () => {
      const nextToken = currentQueueToken + 1;
      setCurrentQueueToken(nextToken);
      setQueueList(prev => {
          const newList = prev.map(item => {
              if (item.token === currentQueueToken) return { ...item, status: 'Completed' };
              if (item.token === nextToken) return { ...item, status: 'Serving' };
              return item;
          });
          // Remove completed for this demo or keep them
          return newList.filter(i => i.status !== 'Completed');
      });
  };

  // Appointment Logic
  const filteredAppointments = appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(appointmentFilter.search.toLowerCase()) || 
                            apt.id.toLowerCase().includes(appointmentFilter.search.toLowerCase());
      const matchesStatus = appointmentFilter.status === 'All' || apt.status === appointmentFilter.status;
      const matchesDate = !appointmentFilter.date || apt.date === appointmentFilter.date;
      const matchesDoctor = appointmentFilter.doctor === 'All' || apt.doctorName === appointmentFilter.doctor;
      return matchesSearch && matchesStatus && matchesDate && matchesDoctor;
  });

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const openRescheduleModal = (apt: Appointment) => {
      setSelectedAppointment(apt);
      setRescheduleData({ date: apt.date, time: apt.time });
      setIsRescheduleModalOpen(true);
  };

  const handleRescheduleSubmit = () => {
      if (selectedAppointment) {
          setAppointments(prev => prev.map(a => a.id === selectedAppointment.id ? {
              ...a,
              date: rescheduleData.date,
              time: rescheduleData.time,
              status: AppointmentStatus.CONFIRMED // Reset status if it was missed/cancelled
          } : a));
          setIsRescheduleModalOpen(false);
          setSelectedAppointment(null);
      }
  };

  const openReassignModal = (apt: Appointment) => {
      setSelectedAppointment(apt);
      // Try to find doctor id by name match (simple mock logic)
      const currentDoc = doctors.find(d => d.name === apt.doctorName);
      setReassignDoctorId(currentDoc?.id || '');
      setIsReassignModalOpen(true);
  };

  const handleReassignSubmit = () => {
      if (selectedAppointment && reassignDoctorId) {
          const newDoc = doctors.find(d => d.id === reassignDoctorId);
          if (newDoc) {
              setAppointments(prev => prev.map(a => a.id === selectedAppointment.id ? {
                  ...a,
                  doctorName: newDoc.name
              } : a));
          }
          setIsReassignModalOpen(false);
          setSelectedAppointment(null);
      }
  };

  // Sidebar Menu Item Component
  const MenuItem = ({ view, icon, label }: { view: typeof activeView, icon: React.ReactNode, label: string }) => (
      <button 
        onClick={() => { setActiveView(view); setIsSidebarOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeView === view ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
      >
          {icon} {label}
      </button>
  );

  const revenueData = [
      { name: 'Mon', value: 45000 },
      { name: 'Tue', value: 52000 },
      { name: 'Wed', value: 48000 },
      { name: 'Thu', value: 61000 },
      { name: 'Fri', value: 55000 },
      { name: 'Sat', value: 67000 },
      { name: 'Sun', value: 72000 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
        
        {/* HOSPITAL ADMIN SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-sm border border-primary-100">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-sm truncate w-32 font-heading">{hospital.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">Admin Portal</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
                <MenuItem view="DASHBOARD" icon={<LayoutDashboard size={18}/>} label="Dashboard" />
                <MenuItem view="DOCTORS" icon={<Users size={18}/>} label="Doctors Management" />
                <MenuItem view="APPOINTMENTS" icon={<Calendar size={18}/>} label="Appointments" />
                <MenuItem view="QUEUE" icon={<Clock size={18}/>} label="Queue System" />
                <MenuItem view="TELEMEDICINE" icon={<Video size={18}/>} label="Telemedicine" />
                <MenuItem view="RECORDS" icon={<FileText size={18}/>} label="Patient Records" />
                <MenuItem view="AMBULANCE" icon={<Ambulance size={18}/>} label="Ambulance Service" />
                <MenuItem view="DEPARTMENTS" icon={<Activity size={18}/>} label="Departments" />
                <MenuItem view="PROFILE" icon={<Building2 size={18}/>} label="Hospital Profile" />
                <MenuItem view="FINANCIALS" icon={<CreditCard size={18}/>} label="Financials" />
                <MenuItem view="FEEDBACK" icon={<Star size={18}/>} label="Feedback" />
                <MenuItem view="SETTINGS" icon={<Settings size={18}/>} label="Settings" />
            </nav>
            <div className="p-4 border-t border-slate-100">
                <button onClick={onBack} className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-50 p-3 rounded-lg w-full transition-colors justify-center">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
             <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
            
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center lg:bg-transparent lg:border-b-0 lg:pt-8 lg:px-8 z-10">
                <div className="flex items-center gap-3">
                   <button className="lg:hidden text-slate-600" onClick={() => setIsSidebarOpen(true)}>
                       <Menu size={24} />
                   </button>
                   <div>
                       <h2 className="text-xl lg:text-3xl font-bold text-slate-900 capitalize font-heading">
                           {activeView === 'DASHBOARD' ? 'Hospital Overview' : 
                            activeView === 'QUEUE' ? 'Smart Queue Management' :
                            activeView.replace('_', ' ').toLowerCase()}
                       </h2>
                   </div>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-full relative transition-all">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-white shadow-sm">
                        A
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                
                {/* --- DASHBOARD VIEW --- */}
                {activeView === 'DASHBOARD' && (
                    <div className="space-y-6 animate-fade-in pb-10">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-white border-l-4 border-l-blue-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Appointments Today</p>
                                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-1">42</h2>
                                    </div>
                                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Calendar size={20}/></div>
                                </div>
                                <div className="mt-3 text-xs text-blue-600 font-bold flex gap-2 bg-blue-50 px-2 py-1 rounded inline-block">
                                    <span>28 Physical</span> <span>•</span> <span>14 Online</span>
                                </div>
                            </Card>
                             <Card className="bg-white border-l-4 border-l-green-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Active Doctors</p>
                                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-1">{doctors.length}</h2>
                                    </div>
                                    <div className="p-2.5 bg-green-50 text-green-600 rounded-xl"><Users size={20}/></div>
                                </div>
                                <div className="mt-3 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded inline-block">
                                    3 Departments Active
                                </div>
                            </Card>
                             <Card className="bg-white border-l-4 border-l-orange-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Live Queue</p>
                                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-1">115</h2>
                                    </div>
                                    <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl"><Clock size={20}/></div>
                                </div>
                                <div className="mt-3 text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded inline-block">
                                    Avg Wait: 22 mins
                                </div>
                            </Card>
                             <Card className="bg-white border-l-4 border-l-purple-500">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Daily Revenue</p>
                                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-1">৳ 1.2L</h2>
                                    </div>
                                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><CreditCard size={20}/></div>
                                </div>
                                <div className="mt-3 text-xs text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded inline-block">
                                    +12% vs yesterday
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Revenue Chart */}
                            <Card className="lg:col-span-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-800 font-heading">Revenue Analytics</h3>
                                    <select className="text-sm border-slate-200 rounded-lg p-1.5 bg-white">
                                        <option>This Week</option>
                                        <option>This Month</option>
                                    </select>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                            <Tooltip 
                                                contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'}}
                                                itemStyle={{color: '#0f172a', fontWeight: 'bold'}}
                                                cursor={{stroke: '#cbd5e1', strokeWidth: 1}}
                                            />
                                            <Line type="monotone" dataKey="value" stroke="rgb(var(--primary-500))" strokeWidth={3} dot={{r: 4, fill: '#fff', strokeWidth: 2}} activeDot={{r: 7}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            {/* Resource Monitor */}
                            <Card>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-800 font-heading">Resource Availability</h3>
                                    <button 
                                        onClick={() => {
                                            setResourceForm({
                                                icuAvailable: hospital.icuAvailable,
                                                generalBedsAvailable: hospital.generalBedsAvailable,
                                                totalIcu: 20,
                                                totalGeneral: 200
                                            });
                                            setIsResourceModalOpen(true);
                                        }}
                                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                        title="Update Resources"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-red-700 text-sm flex items-center gap-2"><Activity size={16}/> ICU Beds</span>
                                            <span className="font-bold text-red-700 bg-white px-2 py-0.5 rounded text-xs border border-red-100 shadow-sm">{hospital.icuAvailable}/20</span>
                                        </div>
                                        <div className="w-full bg-red-200/50 rounded-full h-2.5">
                                            <div 
                                                className="bg-red-500 h-2.5 rounded-full transition-all duration-700 ease-out shadow-sm" 
                                                style={{width: `${((20 - hospital.icuAvailable) / 20) * 100}%`}}
                                            ></div>
                                        </div>
                                        {hospital.icuAvailable < 5 && (
                                            <p className="text-[10px] text-red-600 mt-2 font-bold flex items-center gap-1">
                                                <AlertCircle size={12} /> Critical Occupancy
                                            </p>
                                        )}
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-blue-700 text-sm flex items-center gap-2"><Building2 size={16}/> General Ward</span>
                                            <span className="font-bold text-blue-700 bg-white px-2 py-0.5 rounded text-xs border border-blue-100 shadow-sm">{hospital.generalBedsAvailable}/200</span>
                                        </div>
                                        <div className="w-full bg-blue-200/50 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-500 h-2.5 rounded-full transition-all duration-700 ease-out shadow-sm" 
                                                style={{width: `${((200 - hospital.generalBedsAvailable) / 200) * 100}%`}}
                                            ></div>
                                        </div>
                                    </div>

                                     <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-teal-700 text-sm flex items-center gap-2"><Ambulance size={16}/> Ambulances</span>
                                            <span className="font-bold text-teal-700 bg-white px-2 py-0.5 rounded text-xs border border-teal-100 shadow-sm">2/5</span>
                                        </div>
                                        <div className="w-full bg-teal-200/50 rounded-full h-2.5">
                                            <div className="bg-teal-500 h-2.5 rounded-full shadow-sm" style={{width: '40%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* --- SMART QUEUE MANAGEMENT --- */}
                {activeView === 'QUEUE' && (
                    <div className="space-y-6 animate-fade-in pb-10">
                        
                        {!selectedQueueDoctor ? (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 font-heading">Select Doctor Queue</h3>
                                    <p className="text-slate-500 text-sm">Choose a doctor to manage their live patient queue</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {doctors.map(doc => (
                                        <div 
                                            key={doc.id} 
                                            onClick={() => { setSelectedQueueDoctor(doc); setCurrentQueueToken(Math.floor(Math.random() * 20)); }}
                                            className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-primary-200 transition-all cursor-pointer group hover:-translate-y-1"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <img src={doc.image} className="w-16 h-16 rounded-2xl object-cover group-hover:scale-105 transition-transform shadow-sm" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-lg font-heading">{doc.name}</h4>
                                                    <p className="text-xs text-primary-600 font-bold uppercase tracking-wide">{doc.specialization}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-t border-slate-50 pt-4">
                                                <span className="text-slate-500 font-medium">Status</span>
                                                <Badge color={doc.status === 'Active' ? 'green' : 'yellow'}>{doc.status || 'Active'}</Badge>
                                            </div>
                                            <div className="flex justify-between items-center text-sm mt-3">
                                                <span className="text-slate-500 font-medium">In Queue</span>
                                                <span className="font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded">{Math.floor(Math.random() * 15)} Patients</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="flex items-center gap-4 mb-6">
                                    <Button variant="ghost" onClick={() => setSelectedQueueDoctor(null)} className="-ml-2">
                                        <ArrowLeft size={20}/> Back
                                    </Button>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 font-heading">{selectedQueueDoctor.name}'s Queue</h3>
                                        <p className="text-slate-500 text-sm font-medium">{selectedQueueDoctor.specialization}</p>
                                    </div>
                                    <Badge color="blue" className="ml-auto">Live Console</Badge>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left: Queue List */}
                                    <Card className="lg:col-span-1 h-[600px] flex flex-col">
                                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                                            <h4 className="font-bold text-slate-800 font-heading">Waiting List</h4>
                                            <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600 font-bold">Total: {queueList.length}</span>
                                        </div>
                                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                            {queueList.map((item, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`p-4 rounded-xl border flex justify-between items-center transition-all ${item.status === 'Serving' ? 'bg-green-50 border-green-200 shadow-sm scale-[1.02]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${item.status === 'Serving' ? 'bg-green-500 text-white shadow-lg shadow-green-200 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                                                            {item.token}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold text-sm ${item.status === 'Serving' ? 'text-green-900' : 'text-slate-900'}`}>{item.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{item.time}</p>
                                                        </div>
                                                    </div>
                                                    {item.status === 'Serving' && <Badge color="green">Serving</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <h5 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-3">Manual Entry</h5>
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Patient Name" className="flex-1 p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 bg-white"/>
                                                <Button className="h-11 px-4 rounded-xl"><Plus size={20}/></Button>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Right: Live Control Panel */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <Card className="bg-slate-900 text-white relative overflow-hidden h-[340px] flex flex-col items-center justify-center shadow-2xl">
                                            {/* Abstract Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 opacity-80"></div>
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
                                            
                                            <div className="relative z-10 text-center">
                                                <p className="text-primary-300 uppercase tracking-[0.3em] text-xs font-bold mb-4">Current Token Serving</p>
                                                <div className="text-[140px] font-heading font-black leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl">
                                                    {currentQueueToken}
                                                </div>
                                                <div className="inline-flex items-center gap-3 bg-green-500/10 text-green-400 px-6 py-2 rounded-full border border-green-500/20 backdrop-blur-md animate-pulse">
                                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                                                    <span className="text-sm font-bold tracking-wide">LIVE NOW</span>
                                                </div>
                                            </div>
                                        </Card>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Card className="flex flex-col justify-between border-l-4 border-l-orange-500">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 font-heading">Estimated Wait</h4>
                                                        <p className="text-xs text-slate-500 font-medium uppercase mt-1">Per patient average</p>
                                                    </div>
                                                    <div className="bg-orange-50 p-2 rounded-lg text-orange-500"><Clock size={24}/></div>
                                                </div>
                                                <div className="text-4xl font-heading font-bold text-slate-800">15 <span className="text-sm font-medium text-slate-400">mins</span></div>
                                            </Card>
                                            <Card className="flex flex-col justify-between border-l-4 border-l-blue-500">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 font-heading">Total Served</h4>
                                                        <p className="text-xs text-slate-500 font-medium uppercase mt-1">Today's count</p>
                                                    </div>
                                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Users size={24}/></div>
                                                </div>
                                                <div className="text-4xl font-heading font-bold text-slate-800">42 <span className="text-sm font-medium text-slate-400">patients</span></div>
                                            </Card>
                                        </div>

                                        <Card>
                                            <div className="grid grid-cols-4 gap-4">
                                                <Button 
                                                    variant="outline" 
                                                    className="h-16 flex flex-col gap-1 items-center justify-center text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl"
                                                    onClick={() => setCurrentQueueToken(c => Math.max(1, c - 1))}
                                                >
                                                    <RotateCcw size={20}/>
                                                    <span className="text-xs font-bold">Recall</span>
                                                </Button>
                                                <Button 
                                                    className={`col-span-2 h-16 flex items-center justify-center gap-3 text-lg font-bold shadow-xl rounded-xl transition-all hover:-translate-y-1 ${queueStatus === 'ACTIVE' ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400' : 'bg-slate-400'}`}
                                                    onClick={handleNextPatient}
                                                    disabled={queueStatus !== 'ACTIVE'}
                                                >
                                                    <Play size={24} fill="currentColor"/> Call Next Token
                                                </Button>
                                                <Button 
                                                    variant="danger" 
                                                    className="h-16 flex flex-col gap-1 items-center justify-center bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-xl"
                                                    onClick={() => setQueueStatus(s => s === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')}
                                                >
                                                    {queueStatus === 'ACTIVE' ? <Pause size={24} fill="currentColor"/> : <Play size={24} fill="currentColor"/>}
                                                    <span className="text-xs font-bold">{queueStatus === 'ACTIVE' ? 'Pause' : 'Resume'}</span>
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ... (Other views fallback) ... */}
            </div>
        </div>

        {/* MODALS (Kept same structure, inherits new styles) */}
        {/* RESOURCE UPDATE MODAL */}
        <Modal isOpen={isResourceModalOpen} onClose={() => setIsResourceModalOpen(false)} title="Update Resource Status">
             <div className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">ICU Beds Available</label>
                     <div className="flex items-center gap-3">
                         <input 
                            type="number" 
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-bold text-lg bg-white"
                            value={resourceForm.icuAvailable}
                            onChange={(e) => setResourceForm({...resourceForm, icuAvailable: Number(e.target.value)})}
                            min={0}
                            max={resourceForm.totalIcu}
                         />
                         <span className="text-slate-400 font-medium">/ {resourceForm.totalIcu}</span>
                     </div>
                 </div>

                 <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">General Ward Beds Available</label>
                     <div className="flex items-center gap-3">
                         <input 
                            type="number" 
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-bold text-lg bg-white"
                            value={resourceForm.generalBedsAvailable}
                            onChange={(e) => setResourceForm({...resourceForm, generalBedsAvailable: Number(e.target.value)})}
                            min={0}
                            max={resourceForm.totalGeneral}
                         />
                         <span className="text-slate-400 font-medium">/ {resourceForm.totalGeneral}</span>
                     </div>
                 </div>

                 <div className="p-4 bg-yellow-50 rounded-xl text-yellow-800 text-sm flex items-start gap-3 border border-yellow-100">
                     <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                     <p>Changes will be instantly reflected on the Patient Portal and Emergency dashboard.</p>
                 </div>

                 <div className="flex justify-end gap-3 pt-2">
                     <Button variant="outline" onClick={() => setIsResourceModalOpen(false)}>Cancel</Button>
                     <Button onClick={handleUpdateResources}><Save size={18} className="mr-2"/> Update Status</Button>
                 </div>
             </div>
        </Modal>

        {/* ... (Other Modals) ... */}
    </div>
  );
};
