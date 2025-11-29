
import React, { useState } from 'react';
import { 
  Activity, Users, Building2, Clock, Video, Brain, 
  Phone, ArrowRight, ShieldCheck, HeartPulse, 
  Ambulance, Menu, X, LogIn, Lock, CheckCircle, Shield, ChevronRight
} from 'lucide-react';
import { Button } from '../components/UIComponents';
import { UserRole } from '../types';
import { AIChatbot } from '../components/AIChatbot';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
  onHospitalLogin: () => void;
  onEmergency: () => void;
  onRegisterHospital: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onHospitalLogin, onEmergency, onRegisterHospital }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg border-b border-white/20 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <div className="flex flex-col justify-center h-full">
              <span className="font-heading font-bold text-xl text-slate-900 tracking-tight leading-none">MediConnect BD</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8 text-sm font-medium text-slate-600 bg-slate-100/50 px-6 py-2 rounded-full border border-slate-200/50">
            <a href="#features" className="hover:text-primary-600 transition-colors">Key Features</a>
            <a href="#how-it-works" className="hover:text-primary-600 transition-colors">How It Works</a>
            <a href="#partner" className="hover:text-primary-600 transition-colors">For Hospitals</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
             <div className="flex items-center mr-2 bg-slate-100/80 rounded-xl p-1 border border-slate-200/50 backdrop-blur-sm">
                <Button 
                    variant="ghost" 
                    onClick={onHospitalLogin} 
                    className="text-slate-600 font-bold hover:bg-white hover:shadow-sm text-xs h-9 px-3 rounded-lg"
                >
                    <Building2 size={14} className="mr-2"/> Hospital Admin
                </Button>
                <Button 
                   variant="ghost"
                   onClick={() => onLogin(UserRole.SUPER_ADMIN)}
                   className="text-slate-600 font-bold hover:bg-white hover:shadow-sm text-xs h-9 px-3 rounded-lg"
                >
                   <Shield size={14} className="mr-2" /> Super Admin
                </Button>
             </div>

             <Button variant="outline" onClick={() => onLogin(UserRole.DOCTOR)} className="text-primary-700 font-bold border-primary-200 hover:border-primary-400 hover:bg-primary-50 h-11 rounded-xl">
                Doctor Portal
             </Button>
             <Button onClick={() => onLogin(UserRole.PATIENT)} className="shadow-lg shadow-primary-500/20 px-6 h-11 rounded-xl font-bold">
                Patient Login
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 bg-slate-100 rounded-lg">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 absolute w-full shadow-2xl animate-slide-up">
             <div className="px-4 py-6 space-y-3">
                <Button variant="ghost" onClick={onHospitalLogin} className="w-full justify-start text-slate-700 font-bold bg-slate-50">
                   <Building2 size={18} className="mr-2"/> Hospital Admin Login
                </Button>
                <Button variant="ghost" onClick={() => onLogin(UserRole.SUPER_ADMIN)} className="w-full justify-start text-slate-700 font-bold bg-slate-50">
                   <Shield size={18} className="mr-2"/> Super Admin Login
                </Button>
                <Button variant="outline" onClick={() => onLogin(UserRole.DOCTOR)} className="w-full justify-center">
                   Doctor Portal
                </Button>
                <Button onClick={() => onLogin(UserRole.PATIENT)} className="w-full justify-center">
                   Patient Login
                </Button>
             </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white -z-20"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-gradient-to-br from-primary-200/40 to-purple-200/40 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-teal-200/40 rounded-full blur-[100px] opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md text-primary-700 text-sm font-bold mb-8 border border-primary-100 shadow-sm animate-fade-in hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
            </span>
            #1 Smart Healthcare Ecosystem in Bangladesh
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-purple-600">Reimagined.</span> <br />
            Access for Everyone.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Skip the lines, not the care. We connect patients, specialists, and hospitals in one seamless, intelligent digital platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-20">
            <Button 
              onClick={() => onLogin(UserRole.PATIENT)} 
              className="h-14 px-10 text-lg rounded-2xl shadow-xl shadow-primary-500/25 hover:scale-105 transition-transform font-bold"
            >
              Find a Doctor Now
            </Button>
            
            <Button 
                variant="danger"
                onClick={onEmergency}
                className="h-14 px-10 text-lg rounded-2xl shadow-xl shadow-red-500/25 hover:scale-105 transition-transform flex items-center justify-center gap-2 font-bold"
            >
                <div className="bg-white/20 p-1 rounded-full"><Ambulance size={20} /></div> Emergency Mode
            </Button>
          </div>

          <div id="stats" className="glass-panel rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto shadow-soft backdrop-blur-md">
            <StatItem number="1.2M+" label="Patients Served" color="text-blue-600" />
            <StatItem number="850+" label="Verified Doctors" color="text-primary-600" />
            <StatItem number="120+" label="Partner Hospitals" color="text-purple-600" />
            <StatItem number="24/7" label="Support Active" color="text-green-600" />
          </div>
        </div>
      </section>

      {/* Emergency Strip */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-4 overflow-hidden shadow-lg cursor-pointer hover:brightness-110 transition-all relative group" onClick={onEmergency}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 relative z-10">
            <div className="flex items-center gap-3 font-bold animate-pulse text-lg tracking-wide">
                <div className="bg-white text-red-600 p-1 rounded-full"><ShieldCheck size={20} /></div>
                <span>NEED EMERGENCY HELP? CLICK HERE</span>
            </div>
            <div className="flex gap-6 text-sm font-medium opacity-90">
                <span className="flex items-center gap-2"><Phone size={14}/> Ambulance: 01700...</span>
                <span className="hidden sm:inline opacity-50">|</span>
                <span className="flex items-center gap-2"><Activity size={14}/> ICU Hotline: 106...</span>
            </div>
        </div>
      </div>

      {/* Key Features Section */}
      <section id="features" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-3 font-heading">Our Capabilities</h2>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900">Why Choose MediConnect?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="text-blue-600" size={32} />}
              title="Smart Queue System"
              desc="Track your serial number live from home. Arrive exactly when it's your turn. No more waiting hours in the lobby."
              color="blue"
            />
            <FeatureCard 
              icon={<Video className="text-teal-600" size={32} />}
              title="HD Telemedicine"
              desc="Connect with top specialists via secure video calls. Get prescriptions and medical advice instantly."
              color="teal"
            />
            <FeatureCard 
              icon={<Building2 className="text-indigo-600" size={32} />}
              title="Resource Visibility"
              desc="Real-time updates on ICU beds, Cabins, and Oxygen availability across all major hospitals."
              color="indigo"
            />
            <FeatureCard 
              icon={<Brain className="text-purple-600" size={32} />}
              title="AI Health Assistant"
              desc="Unsure which specialist to see? Our Gemini-powered AI analyzes your symptoms and guides you."
              color="purple"
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-600" size={32} />}
              title="Verified Doctors"
              desc="100% BMDC verified doctors. Read real patient reviews and ratings before booking."
              color="green"
            />
            <FeatureCard 
              icon={<HeartPulse className="text-red-600" size={32} />}
              title="Digital Health Records"
              desc="Securely store your history, prescriptions, and reports. Access them anytime, anywhere."
              color="red"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl lg:text-5xl font-heading font-bold text-slate-900 mb-6">Healthcare at your fingertips in 3 steps</h2>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed">We've streamlined the process to ensure you get the care you need without the administrative headaches.</p>
                    
                    <div className="space-y-6">
                        <StepItem number="1" title="Search & Discover" desc="Find a doctor by specialty, hospital, or describe your symptoms to AI." />
                        <StepItem number="2" title="Book or Join Instantly" desc="Book a physical appointment or start a video consultation instantly." />
                        <StepItem number="3" title="Track Live & Visit" desc="Monitor your queue live and visit the doctor without the wait." />
                    </div>
                    
                    <Button onClick={() => onLogin(UserRole.PATIENT)} className="mt-12 h-14 px-8 text-lg rounded-xl shadow-lg" variant="primary">
                        Get Started Now <ArrowRight size={20} className="ml-2" />
                    </Button>
                </div>
                
                <div className="lg:w-1/2 w-full relative perspective-1000">
                    {/* Abstract Decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-blue-400 rounded-[3rem] transform rotate-3 blur-3xl opacity-20"></div>
                    
                    <div className="relative glass-panel p-8 rounded-[3rem] shadow-2xl border border-white/50 transform transition-transform hover:scale-[1.02] duration-500">
                         <div className="flex items-center gap-3 mb-8 border-b border-slate-100/50 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                            <span className="text-xs text-slate-400 font-bold ml-auto uppercase tracking-wider">Live System Preview</span>
                         </div>
                         
                         {/* Mock UI Elements */}
                         <div className="space-y-5">
                            <div className="flex items-center gap-5 p-5 bg-white/80 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
                                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0 shadow-inner">
                                    <Clock size={28} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 text-lg">Your Serial: #14</h4>
                                    <p className="text-sm text-slate-500 font-medium">Est. Consultation: 10:45 AM</p>
                                </div>
                                <div className="text-primary-600 font-bold text-xs uppercase tracking-wider bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">Live Tracking</div>
                            </div>
                            
                            <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shrink-0 shadow-inner">
                                    <Video size={28} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 text-lg">Dr. Sarah Khan</h4>
                                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online Now
                                    </p>
                                </div>
                                <Button className="text-xs py-2 h-9 px-5 bg-teal-600 hover:bg-teal-700 border-none shadow-md shadow-teal-200">Join</Button>
                            </div>

                             <div className="flex items-center gap-5 p-5 bg-white/60 rounded-2xl border border-white/50 opacity-75 backdrop-blur-sm grayscale-[50%]">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <Building2 size={28} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 text-lg">ICU Availability</h4>
                                    <p className="text-sm text-slate-500 font-medium">Square Hospital</p>
                                </div>
                                <div className="text-red-500 font-bold text-sm bg-red-50 px-3 py-1 rounded-lg">Critical</div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Hospital Partner CTA */}
      <section id="partner" className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl transition-all hover:shadow-primary-500/20 border border-slate-800 group">
            {/* Decorators */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-primary-600 opacity-20 rounded-full blur-[80px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-600 opacity-10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="md:max-w-xl">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                    Join Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Partner Hospital</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                  Transform your hospital management with our digital ecosystem. 
                  Streamline appointments, manage resources, and connect with millions of patients instantly.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <CheckCircle size={16} className="text-green-400"/> Verified Profile
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <CheckCircle size={16} className="text-green-400"/> Analytics Dashboard
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <CheckCircle size={16} className="text-green-400"/> Smart Queues
                    </div>
                </div>
            </div>
            
            <div className="flex-shrink-0">
                <button 
                    onClick={onRegisterHospital}
                    className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-heading font-bold text-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    <Building2 className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Register Facility</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                </button>
            </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-slate-600 pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white shadow-md">
                            <Activity size={18} />
                        </div>
                        <span className="font-heading font-bold text-xl text-slate-900">MediConnect BD</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                        Revolutionizing healthcare in Bangladesh through technology. Connecting patients, doctors, and hospitals for a seamless experience.
                    </p>
                </div>

                <div>
                    <h3 className="font-heading font-bold text-slate-900 mb-6">Quick Links</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Home</a></li>
                        <li><a href="#doctors" className="hover:text-primary-600 transition-colors">Find a Doctor</a></li>
                        <li><a href="#features" className="hover:text-primary-600 transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Emergency</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading font-bold text-slate-900 mb-6">For Providers</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><button onClick={() => onLogin(UserRole.DOCTOR)} className="hover:text-primary-600 transition-colors">Doctor Login</button></li>
                        <li><button onClick={onHospitalLogin} className="hover:text-primary-600 transition-colors text-left">Hospital Login</button></li>
                        <li><button onClick={onRegisterHospital} className="hover:text-primary-600 transition-colors text-left">Register New Facility</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading font-bold text-slate-900 mb-6">Contact</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex items-start gap-3">
                            <Building2 size={18} className="mt-0.5 text-primary-600"/>
                            <span>Level 4, United City, Madani Avenue, Dhaka-1212</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-primary-600"/>
                            <span>+880 1711-000000</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Activity size={18} className="text-primary-600"/>
                            <span>support@mediconnect.bd</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wide">
                <p>&copy; 2025 MediConnect BD. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>
      
      {/* AI Chatbot Widget */}
      <AIChatbot />
    </div>
  );
};

// Sub-components
const StatItem = ({ number, label, color }: { number: string, label: string, color?: string }) => (
  <div className="text-center group cursor-default">
    <div className={`text-4xl lg:text-5xl font-heading font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300 ${color || 'text-slate-900'}`}>{number}</div>
    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => {
    // Static class mapping for Tailwind compilation safety
    const bgColors: Record<string, string> = {
        blue: 'bg-blue-50 group-hover:bg-blue-100',
        teal: 'bg-teal-50 group-hover:bg-teal-100',
        indigo: 'bg-indigo-50 group-hover:bg-indigo-100',
        purple: 'bg-purple-50 group-hover:bg-purple-100',
        green: 'bg-green-50 group-hover:bg-green-100',
        red: 'bg-red-50 group-hover:bg-red-100',
    };

    return (
        <div className="glass-panel p-8 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group border border-slate-100/60 bg-white/50 hover:bg-white relative overflow-hidden">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${bgColors[color] || 'bg-slate-50'} shadow-sm`}>
                {icon}
            </div>
            <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
            
            {/* Hover Decorator */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${bgColors[color]?.split(' ')[0].replace('50', '500')}`}></div>
        </div>
    );
};

const StepItem = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
    <div className="flex gap-6 group">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-soft text-primary-600 font-heading font-bold flex items-center justify-center border border-slate-100 text-xl group-hover:scale-110 transition-transform duration-300 group-hover:text-white group-hover:bg-primary-600 group-hover:border-primary-600">
            {number}
        </div>
        <div className="pt-1">
            <h4 className="text-xl font-heading font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{desc}</p>
        </div>
    </div>
);
