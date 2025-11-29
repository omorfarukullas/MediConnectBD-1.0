
import React, { useState } from 'react';
import { Building2, FileText, User, Mail, Phone, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../components/UIComponents';

export const HospitalRegistration = ({ onBack }: { onBack: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center space-y-6 p-8 bg-white">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Application Submitted!</h2>
          <p className="text-slate-600">
            Thank you for registering your hospital with MediConnect BD. 
            Our Super Admin team will verify your DGHS license and contact you within 24-48 hours.
          </p>
          <Button onClick={onBack} className="w-full">Return to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-slate-600 hover:text-slate-900 -ml-2">
           <ArrowLeft size={20} /> <span className="ml-2">Back to Home</span>
        </Button>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Join MediConnect BD Network</h1>
          <p className="mt-2 text-slate-600">Register your healthcare facility to manage queues, appointments, and resources digitally.</p>
        </div>

        <Card className="p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hospital Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="text-primary-600" size={20}/> Facility Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Hospital / Clinic Name</label>
                  <input required type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. Square Hospital" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Facility Type</label>
                  <select className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500">
                    <option>Private Hospital</option>
                    <option>Public/Government Hospital</option>
                    <option>Diagnostic Center</option>
                    <option>Specialized Clinic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">DGHS License Number</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input required type="text" className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="License #" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Establishment Year</label>
                  <input type="number" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="YYYY" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input required type="text" className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="Street, Area, City" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6"></div>

            {/* Admin/Contact Person */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="text-primary-600" size={20}/> Administrator Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Administrator Name</label>
                  <input required type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                  <input required type="text" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="e.g. Director, Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input required type="email" className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="admin@hospital.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input required type="tel" className="w-full pl-10 p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-primary-500" placeholder="+880 1..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input required type="checkbox" className="rounded border-slate-300 bg-white text-primary-600 focus:ring-primary-500" />
                I certify that the information provided is accurate and I am authorized to register this facility.
              </label>
            </div>

            <Button type="submit" loading={isLoading} className="w-full text-lg h-12">
              Submit Application
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
