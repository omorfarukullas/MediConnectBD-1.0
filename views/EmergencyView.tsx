
import React, { useState, useEffect } from 'react';
import { Phone, Navigation, AlertTriangle, ArrowLeft, MapPin, Clock, Star, MessageSquare, ShieldAlert, CheckCircle, Radar } from 'lucide-react';
import { MOCK_AMBULANCES, MOCK_HOSPITALS } from '../constants';
import { Card, Button, Badge, Modal } from '../components/UIComponents';
import { Ambulance } from '../types';

export const EmergencyView = ({ onBack }: { onBack: () => void }) => {
  const [permissionState, setPermissionState] = useState<'PROMPT' | 'SCANNING' | 'RESULTS'>('PROMPT');
  const [nearbyAmbulances, setNearbyAmbulances] = useState<Ambulance[]>([]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Ambulance | null>(null);
  
  // Feedback Form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleGrantLocation = () => {
      // Simulate geolocation request
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  setPermissionState('SCANNING');
                  // Simulate network delay for scanning
                  setTimeout(() => {
                      // Filter ambulances within 5km radius based on mock values
                      const filtered = MOCK_AMBULANCES.filter(a => a.distanceValue <= 5.0);
                      setNearbyAmbulances(filtered);
                      setPermissionState('RESULTS');
                  }, 2500);
              },
              (error) => {
                  alert("Location access is required to find nearby ambulances. Please enable GPS.");
              }
          );
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  };

  const handleFeedback = (ambulance: Ambulance) => {
      setSelectedDriver(ambulance);
      setFeedbackModalOpen(true);
  };

  const submitFeedback = () => {
      setFeedbackModalOpen(false);
      alert(`Thank you! Feedback submitted for ${selectedDriver?.driverName}.`);
      setRating(5);
      setComment('');
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'text-green-600 bg-green-50 border-green-100';
          case 'Busy': return 'text-red-600 bg-red-50 border-red-100';
          case 'On the Way': return 'text-blue-600 bg-blue-50 border-blue-100';
          default: return 'text-slate-600 bg-slate-50 border-slate-100';
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
        {/* Urgent Header */}
        <div className="bg-red-600 text-white p-6 sticky top-0 z-50 shadow-lg">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full animate-pulse">
                        <AlertTriangle size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-heading font-bold leading-none">EMERGENCY RESPONSE</h1>
                        <p className="text-red-100 text-sm">Rapid Ambulance Dispatch</p>
                    </div>
                </div>
                <Button 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white border-none flex items-center gap-2"
                    onClick={onBack}
                >
                    <ArrowLeft size={20} /> Back
                </Button>
            </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
            
            {/* STATE 1: PERMISSION PROMPT */}
            {permissionState === 'PROMPT' && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
                        <MapPin size={64} className="text-red-600" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Location Access Required</h2>
                    <p className="text-slate-600 max-w-md mb-8 text-lg">
                        To find available ambulances within <span className="font-bold text-slate-900">5 kilometers</span>, we need access to your current GPS location.
                    </p>
                    <Button 
                        onClick={handleGrantLocation}
                        className="bg-red-600 hover:bg-red-700 text-white h-14 px-10 text-lg rounded-xl shadow-lg shadow-red-500/30 border-none"
                    >
                        Allow Location Access
                    </Button>
                    <p className="text-sm text-slate-400 mt-6 flex items-center gap-2">
                        <ShieldAlert size={14}/> Your location is only used for emergency dispatch.
                    </p>
                </div>
            )}

            {/* STATE 2: SCANNING ANIMATION */}
            {permissionState === 'SCANNING' && (
                <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
                    <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-4 bg-red-500 rounded-full animate-ping opacity-20 animation-delay-300"></div>
                        <div className="absolute inset-8 bg-red-500 rounded-full animate-ping opacity-20 animation-delay-700"></div>
                        <div className="relative z-10 bg-white p-4 rounded-full shadow-xl">
                            <Navigation size={48} className="text-red-600 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Scanning 5km Radius...</h2>
                    <p className="text-slate-500 mt-2">Locating nearest ICU & AC Ambulances</p>
                </div>
            )}

            {/* STATE 3: RESULTS LIST */}
            {permissionState === 'RESULTS' && (
                <div className="space-y-6 animate-slide-up">
                    <div className="flex justify-between items-end border-b border-slate-200 pb-4">
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-slate-900">Nearby Ambulances</h2>
                            <p className="text-slate-500 text-sm">Found {nearbyAmbulances.length} active units within 5km</p>
                        </div>
                        <Button variant="outline" onClick={() => setPermissionState('PROMPT')} className="text-sm">
                            Rescan Location
                        </Button>
                    </div>

                    {nearbyAmbulances.length === 0 ? (
                        <div className="text-center py-10 bg-slate-100 rounded-2xl">
                            <p className="text-slate-500 font-bold">No ambulances found nearby.</p>
                            <p className="text-sm text-slate-400">Please call the National Emergency Hotline: 999</p>
                        </div>
                    ) : (
                        nearbyAmbulances.map(amb => (
                            <div key={amb.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Card Header */}
                                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 shadow-sm border border-slate-100 font-bold">
                                            {amb.type}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">{amb.hospitalName || 'Private Service'}</h3>
                                            <p className="text-xs text-slate-500 font-mono">{amb.plateNumber}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(amb.status)}`}>
                                        {amb.status}
                                    </span>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Driver</p>
                                            <p className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                                {amb.driverName}
                                                <span className="text-xs bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-1">
                                                    <Star size={10} fill="currentColor"/> {amb.rating}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Distance</p>
                                                <p className="font-medium text-slate-700 flex items-center gap-1">
                                                    <Navigation size={14} className="text-blue-500"/> {amb.distance}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Est. Time</p>
                                                <p className="font-medium text-slate-700 flex items-center gap-1">
                                                    <Clock size={14} className="text-green-500"/> {amb.estimatedTime}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 justify-center">
                                        <Button 
                                            className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 border-none shadow-lg shadow-green-500/20"
                                            onClick={() => window.location.href = `tel:${amb.phone}`}
                                            disabled={amb.status === 'Busy'}
                                        >
                                            <Phone className="mr-2" fill="currentColor" /> {amb.status === 'Busy' ? 'Currently Busy' : 'Call Driver Now'}
                                        </Button>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="flex-1 text-xs" onClick={() => handleFeedback(amb)}>
                                                <MessageSquare size={14} className="mr-1"/> Rate Service
                                            </Button>
                                            <Button variant="outline" className="flex-1 text-xs text-red-600 border-red-100 hover:bg-red-50">
                                                Report Issue
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>

        {/* Feedback Modal */}
        <Modal isOpen={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} title="Rate Driver">
            <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
                    <Star size={32} className="text-yellow-500" fill="currentColor"/>
                </div>
                <div>
                    <h3 className="font-bold text-xl">{selectedDriver?.driverName}</h3>
                    <p className="text-slate-500 text-sm">{selectedDriver?.plateNumber}</p>
                </div>
                
                <div className="flex justify-center gap-2">
                    {[1,2,3,4,5].map(star => (
                        <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                            <Star 
                                size={32} 
                                className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} 
                            />
                        </button>
                    ))}
                </div>

                <textarea 
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white"
                    rows={3}
                    placeholder="Describe your experience (optional)..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <Button onClick={submitFeedback} className="w-full">Submit Feedback</Button>
            </div>
        </Modal>
    </div>
  );
};
