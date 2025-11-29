
import React, { useState } from 'react';
import { Stethoscope, Lock, ArrowLeft, AlertCircle, Mail } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

interface DoctorLoginProps {
  onBack: () => void;
  onLoginSuccess: (email: string) => void;
  onRegisterClick: () => void;
}

export const DoctorLogin: React.FC<DoctorLoginProps> = ({ onBack, onLoginSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate Network Delay and Auth
    setTimeout(() => {
      if (email && password.length >= 4) {
         // Mock successful login
         onLoginSuccess(email);
      } else {
         setError('Invalid credentials. Please try again.');
         setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-md">
          <Button variant="ghost" onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900 -ml-2">
             <ArrowLeft size={20} /> <span className="ml-2">Back to Home</span>
          </Button>

          <Card className="p-8 shadow-xl border-t-4 border-t-primary-600 bg-white">
             <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                   <Stethoscope size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Doctor Portal</h1>
                <p className="text-slate-500 mt-1">Manage appointments & telemedicine</p>
             </div>

             <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                   <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                   </div>
                )}

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                   <div className="relative">
                      <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input 
                         type="email" 
                         required
                         className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                         placeholder="doctor@mediconnect.bd"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                   <div className="relative">
                      <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input 
                         type="password" 
                         required
                         className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                         placeholder="••••••••"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                      />
                   </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                   <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" className="rounded border-slate-300 bg-white text-primary-600 focus:ring-primary-500" />
                      Remember me
                   </label>
                   <a href="#" className="text-primary-600 hover:underline">Forgot password?</a>
                </div>

                <Button type="submit" loading={isLoading} className="w-full text-lg h-12">
                   Log In
                </Button>

                <div className="mt-4 text-center">
                   <p className="text-slate-600 text-sm">
                      New to MediConnect?{' '}
                      <button 
                        type="button"
                        onClick={onRegisterClick} 
                        className="text-primary-600 font-bold hover:underline"
                      >
                         Apply for Verification
                      </button>
                   </p>
                </div>
             </form>
          </Card>
       </div>
    </div>
  );
};
