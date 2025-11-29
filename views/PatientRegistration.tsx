
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

interface PatientRegistrationProps {
  onBack: () => void;
  onRegisterSuccess: (email: string) => void;
  onLoginClick: () => void;
}

export const PatientRegistration: React.FC<PatientRegistrationProps> = ({ onBack, onRegisterSuccess, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
        setIsLoading(false);
        onRegisterSuccess(formData.email || formData.phone);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900 -ml-2">
           <ArrowLeft size={20} /> <span className="ml-2">Back to Home</span>
        </Button>
        
        <Card className="p-8 bg-white">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                <p className="mt-2 text-slate-600">Join MediConnect BD to manage your health digitally</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input 
                            required 
                            type="text" 
                            className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                            placeholder="e.g. Rahim Uddin"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                            <input 
                                required 
                                type="tel" 
                                className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                                placeholder="017..."
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
                            <input 
                                required 
                                type="number" 
                                className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                                placeholder="Age"
                                value={formData.age}
                                onChange={e => setFormData({...formData, age: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input 
                            type="email" 
                            className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                            <input 
                                required 
                                type="password" 
                                className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                            <input 
                                required 
                                type="password" 
                                className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" 
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" loading={isLoading} className="w-full text-lg h-12">
                   Register Account
                </Button>

                 <div className="mt-4 text-center">
                   <p className="text-slate-600 text-sm">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={onLoginClick} 
                        className="text-primary-600 font-bold hover:underline"
                      >
                         Log In
                      </button>
                   </p>
                </div>
            </form>
        </Card>
      </div>
    </div>
  );
};
