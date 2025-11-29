
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, FileText, ArrowLeft, CheckCircle, Upload, Building2, Calendar, CreditCard, Award, GraduationCap } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

interface DoctorRegistrationProps {
  onBack: () => void;
  onLoginClick: () => void;
}

export const DoctorRegistration: React.FC<DoctorRegistrationProps> = ({ onBack, onLoginClick }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Male',
    password: '',

    // Step 2: Professional
    bmdcNumber: '',
    specialization: 'General Medicine',
    subSpecialization: '',
    experience: '',
    hospital: '',
    degrees: '',

    // Step 3: Docs (Mocked)
    bmdcCert: null,
    nid: null,
    
    // Step 4: Schedule
    onlineTimes: '10:00 AM - 02:00 PM',
    physicalTimes: '05:00 PM - 09:00 PM',

    // Step 5: Fees
    onlineFee: '',
    physicalFee: ''
  });

  const handleNext = () => {
      setStep(prev => prev + 1);
  };

  const handleBack = () => {
      setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
        setIsLoading(false);
        setStep(6); // Success Step
    }, 1500);
  };

  const renderStepIndicator = () => (
      <div className="flex justify-between items-center mb-8 px-2">
          {[1,2,3,4,5].map(num => (
              <div key={num} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {step > num ? <CheckCircle size={16}/> : num}
                  </div>
                  <span className="text-[10px] mt-1 text-slate-500 hidden sm:block">
                      {num === 1 ? 'Basic' : num === 2 ? 'Prof.' : num === 3 ? 'Docs' : num === 4 ? 'Time' : 'Fees'}
                  </span>
              </div>
          ))}
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900 -ml-2">
           <ArrowLeft size={20} /> <span className="ml-2">Back to Home</span>
        </Button>
        
        <Card className="p-8 bg-white">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Doctor Verification Portal</h1>
                <p className="mt-2 text-slate-600">Complete the 5-step verification to join MediConnect BD</p>
            </div>

            {step < 6 && renderStepIndicator()}

            {/* STEP 1: BASIC INFO */}
            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Step 1: Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (Matches BMDC)</label>
                            <input required type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="Dr. Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number (OTP Verified)</label>
                            <input required type="tel" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="017..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input required type="email" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="doctor@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                            <input required type="date" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Set Password</label>
                            <input required type="password" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleNext}>Next Step</Button>
                    </div>
                </div>
            )}

            {/* STEP 2: PROFESSIONAL INFO */}
            {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Step 2: Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">BMDC Registration No.</label>
                            <input required type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="A-XXXXX" value={formData.bmdcNumber} onChange={e => setFormData({...formData, bmdcNumber: e.target.value})}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label>
                            <select className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})}>
                                <option>General Medicine</option>
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Orthopedics</option>
                                <option>Pediatrics</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sub-Specialization (Optional)</label>
                            <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="e.g. Interventional" value={formData.subSpecialization} onChange={e => setFormData({...formData, subSpecialization: e.target.value})}/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                            <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="e.g. 5" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}/>
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-slate-700 mb-1">Degrees (Comma Separated)</label>
                            <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="MBBS, FCPS, MD" value={formData.degrees} onChange={e => setFormData({...formData, degrees: e.target.value})}/>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Affiliation</label>
                            <input type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white" placeholder="Current Hospital Name" value={formData.hospital} onChange={e => setFormData({...formData, hospital: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button onClick={handleNext}>Next Step</Button>
                    </div>
                </div>
            )}

            {/* STEP 3: DOCUMENTS */}
            {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Step 3: Document Upload</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-slate-300 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <FileText size={40} className="text-slate-400 mb-2"/>
                            <p className="font-bold text-slate-700">BMDC Certificate</p>
                            <p className="text-xs text-slate-500">Upload PDF/JPG</p>
                        </div>
                        <div className="border-2 border-dashed border-slate-300 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <CreditCard size={40} className="text-slate-400 mb-2"/>
                            <p className="font-bold text-slate-700">National ID</p>
                            <p className="text-xs text-slate-500">Front & Back</p>
                        </div>
                        <div className="border-2 border-dashed border-slate-300 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <GraduationCap size={40} className="text-slate-400 mb-2"/>
                            <p className="font-bold text-slate-700">Medical Degrees</p>
                            <p className="text-xs text-slate-500">MBBS Certificate</p>
                        </div>
                         <div className="border-2 border-dashed border-slate-300 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <User size={40} className="text-slate-400 mb-2"/>
                            <p className="font-bold text-slate-700">Passport Photo</p>
                            <p className="text-xs text-slate-500">Recent photo</p>
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button onClick={handleNext}>Next Step</Button>
                    </div>
                </div>
            )}

            {/* STEP 4: SCHEDULE */}
            {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Step 4: Availability Setup</h3>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-white">
                            <h4 className="font-bold text-slate-900 mb-2">Online Consultation Hours</h4>
                            <input type="text" className="w-full p-2 border rounded bg-white" placeholder="e.g. 10:00 AM - 02:00 PM" value={formData.onlineTimes} onChange={e => setFormData({...formData, onlineTimes: e.target.value})} />
                        </div>
                         <div className="p-4 border rounded-lg bg-white">
                            <h4 className="font-bold text-slate-900 mb-2">Physical Chamber Hours</h4>
                            <input type="text" className="w-full p-2 border rounded bg-white" placeholder="e.g. 05:00 PM - 09:00 PM" value={formData.physicalTimes} onChange={e => setFormData({...formData, physicalTimes: e.target.value})} />
                        </div>
                    </div>
                     <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button onClick={handleNext}>Next Step</Button>
                    </div>
                </div>
            )}

            {/* STEP 5: FEES */}
            {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Step 5: Consultation Fees</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border rounded-xl bg-blue-50 border-blue-100">
                             <h4 className="font-bold text-blue-900 mb-2">Online Consultation Fee</h4>
                             <div className="flex items-center">
                                 <span className="text-2xl font-bold text-slate-700 mr-2">৳</span>
                                 <input type="number" className="w-full p-3 rounded-lg border border-blue-200 bg-white" placeholder="1000" value={formData.onlineFee} onChange={e => setFormData({...formData, onlineFee: e.target.value})} />
                             </div>
                        </div>
                        <div className="p-6 border rounded-xl bg-green-50 border-green-100">
                             <h4 className="font-bold text-green-900 mb-2">Physical Visit Fee</h4>
                             <div className="flex items-center">
                                 <span className="text-2xl font-bold text-slate-700 mr-2">৳</span>
                                 <input type="number" className="w-full p-3 rounded-lg border border-green-200 bg-white" placeholder="1500" value={formData.physicalFee} onChange={e => setFormData({...formData, physicalFee: e.target.value})} />
                             </div>
                        </div>
                    </div>
                     <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={handleBack}>Back</Button>
                        <Button loading={isLoading} onClick={handleSubmit}>Submit Application</Button>
                    </div>
                </div>
            )}

            {/* STEP 6: SUCCESS */}
            {step === 6 && (
                <div className="text-center py-10 animate-fade-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">
                        Your profile is now pending manual verification by our Super Admin team. 
                        We will verify your BMDC license and documents within 24-48 hours.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg max-w-md mx-auto mb-8 text-sm text-yellow-800">
                        <strong>Note:</strong> You cannot start consultations until your profile is approved.
                    </div>
                    <Button onClick={onBack} className="px-8">Return to Home</Button>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};
