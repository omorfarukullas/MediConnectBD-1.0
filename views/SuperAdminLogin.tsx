
import React, { useState } from 'react';
import { Shield, Lock, ArrowLeft, AlertCircle, KeyRound } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

interface SuperAdminLoginProps {
  onBack: () => void;
  onLoginSuccess: (email: string) => void;
}

export const SuperAdminLogin: React.FC<SuperAdminLoginProps> = ({ onBack, onLoginSuccess }) => {
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
      // Mock Credential Check
      if (email === 'admin@system.com' && password === 'admin123') {
         onLoginSuccess(email);
      } else {
         setError('Invalid system credentials. Access denied.');
         setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-900">
       <div className="w-full max-w-md">
          <Button variant="ghost" onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900 -ml-2">
             <ArrowLeft size={20} /> <span className="ml-2">Back to Home</span>
          </Button>

          <Card className="p-8 shadow-2xl border border-slate-200 bg-white">
             <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 border border-red-100 shadow-sm">
                   <Shield size={32} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-wide">System Control</h1>
                <p className="text-slate-500 mt-1 text-sm uppercase tracking-wider">Super Admin Access Only</p>
             </div>

             <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                   <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100">
                      <AlertCircle size={16} /> {error}
                   </div>
                )}

                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">System ID</label>
                   <div className="relative">
                      <KeyRound className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input 
                         type="email" 
                         required
                         className="w-full pl-10 p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-slate-400 transition-all shadow-sm"
                         placeholder="admin@system.com"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Security Key</label>
                   <div className="relative">
                      <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                      <input 
                         type="password" 
                         required
                         className="w-full pl-10 p-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-slate-400 transition-all shadow-sm"
                         placeholder="••••••••"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                      />
                   </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                   <label className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-800">
                      <input type="checkbox" className="rounded border-slate-300 bg-white text-red-600 focus:ring-red-500" />
                      Keep session active
                   </label>
                </div>

                <Button 
                    type="submit" 
                    loading={isLoading} 
                    className="w-full text-lg h-12 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 border-none"
                >
                   Authenticate
                </Button>

                <div className="mt-6 text-center">
                   <p className="text-slate-400 text-xs">
                      Restricted Area. All activities are logged and monitored.
                   </p>
                   <p className="text-slate-400 text-[10px] mt-1">Hint: admin@system.com / admin123</p>
                </div>
             </form>
          </Card>
       </div>
    </div>
  );
};
