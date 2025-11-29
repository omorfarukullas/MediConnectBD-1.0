
import React, { useState } from 'react';
import { FileText, Calendar, Activity, Pill, Download, Eye, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from '../components/UIComponents';
import { MOCK_VITALS, MOCK_PRESCRIPTIONS, MOCK_REPORTS, MOCK_APPOINTMENTS } from '../constants';
import { AppointmentStatus } from '../types';

export const MedicalHistory = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRESCRIPTIONS' | 'REPORTS' | 'VISITS'>('OVERVIEW');

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <TabButton active={activeTab === 'OVERVIEW'} onClick={() => setActiveTab('OVERVIEW')} icon={<Activity size={16}/>} label="Overview" />
        <TabButton active={activeTab === 'PRESCRIPTIONS'} onClick={() => setActiveTab('PRESCRIPTIONS')} icon={<Pill size={16}/>} label="Prescriptions" />
        <TabButton active={activeTab === 'REPORTS'} onClick={() => setActiveTab('REPORTS')} icon={<FileText size={16}/>} label="Lab Reports" />
        <TabButton active={activeTab === 'VISITS'} onClick={() => setActiveTab('VISITS')} icon={<Calendar size={16}/>} label="Visit History" />
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'OVERVIEW' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vitals Card */}
              <Card className="md:col-span-2">
                 <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="text-primary-600"/> Current Vitals
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <VitalBox label="Blood Group" value={MOCK_VITALS.bloodGroup} color="text-red-600" />
                    <VitalBox label="Blood Pressure" value={MOCK_VITALS.bloodPressure} color="text-blue-600" />
                    <VitalBox label="Heart Rate" value={MOCK_VITALS.heartRate} color="text-purple-600" />
                    <VitalBox label="Weight" value={MOCK_VITALS.weight} color="text-slate-700" />
                 </div>
              </Card>

              {/* Conditions Card */}
              <Card>
                 <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="text-orange-500"/> Conditions & Allergies
                 </h3>
                 <div className="space-y-4">
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-2">Chronic Conditions</p>
                       <div className="flex flex-wrap gap-2">
                          {MOCK_VITALS.conditions.map(c => (
                             <Badge key={c} color="yellow">{c}</Badge>
                          ))}
                       </div>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-2">Allergies</p>
                       <div className="flex flex-wrap gap-2">
                          {MOCK_VITALS.allergies.map(a => (
                             <Badge key={a} color="red">{a}</Badge>
                          ))}
                       </div>
                    </div>
                 </div>
              </Card>
           </div>
        )}

        {activeTab === 'PRESCRIPTIONS' && (
           <div className="space-y-4">
              {MOCK_PRESCRIPTIONS.map(rx => (
                 <Card key={rx.id} className="hover:border-primary-200 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                       <div>
                          <h4 className="font-bold text-lg text-slate-900">{rx.doctorName}</h4>
                          <p className="text-sm text-slate-500">{rx.date} • Diagnosis: <span className="font-semibold text-slate-700">{rx.diagnosis}</span></p>
                       </div>
                       <Button variant="outline" className="text-sm h-9">
                          <Download size={16} className="mr-2"/> Download PDF
                       </Button>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                       <table className="w-full text-sm">
                          <thead>
                             <tr className="text-left text-slate-400 border-b border-slate-200">
                                <th className="pb-2 font-medium">Medicine</th>
                                <th className="pb-2 font-medium">Dosage</th>
                                <th className="pb-2 font-medium">Duration</th>
                                <th className="pb-2 font-medium">Instruction</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {rx.medicines.map((med, i) => (
                                <tr key={i}>
                                   <td className="py-2 font-medium text-slate-700">{med.name}</td>
                                   <td className="py-2 text-slate-600">{med.dosage}</td>
                                   <td className="py-2 text-slate-600">{med.duration}</td>
                                   <td className="py-2 text-slate-600">{med.instruction}</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </Card>
              ))}
           </div>
        )}

        {activeTab === 'REPORTS' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_REPORTS.map(report => (
                 <Card key={report.id} className="flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-2">
                          <Badge color={report.status === 'Ready' ? 'green' : 'yellow'}>{report.status}</Badge>
                          <span className="text-xs text-slate-400">{report.date}</span>
                       </div>
                       <h4 className="font-bold text-slate-900 text-lg mb-1">{report.testName}</h4>
                       <p className="text-sm text-slate-500 mb-4">{report.hospitalName}</p>
                    </div>
                    <div className="flex gap-2">
                       {report.status === 'Ready' ? (
                          <>
                             <Button variant="outline" className="flex-1 text-xs"><Eye size={14} className="mr-2"/> View</Button>
                             <Button variant="ghost" className="flex-1 text-xs"><Download size={14} className="mr-2"/> Download</Button>
                          </>
                       ) : (
                          <div className="w-full bg-slate-50 py-2 rounded text-center text-xs text-slate-400 italic">
                             Result awaited from lab
                          </div>
                       )}
                    </div>
                 </Card>
              ))}
           </div>
        )}

        {activeTab === 'VISITS' && (
           <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pl-8 py-2">
              {MOCK_APPOINTMENTS.map(apt => (
                 <div key={apt.id} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${apt.status === AppointmentStatus.COMPLETED ? 'bg-slate-400' : 'bg-primary-500'}`}></div>
                    <Card className="p-4">
                       <div className="flex flex-col sm:flex-row justify-between gap-2">
                          <div>
                             <h4 className="font-bold text-slate-900">{apt.doctorName}</h4>
                             <p className="text-sm text-slate-500 mb-2">{apt.type}</p>
                             <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Calendar size={12}/> {apt.date}
                                <Clock size={12} className="ml-2"/> {apt.time}
                             </div>
                          </div>
                          <div className="flex items-center">
                             <Badge color={apt.status === AppointmentStatus.CONFIRMED ? 'green' : 'slate'}>{apt.status}</Badge>
                          </div>
                       </div>
                    </Card>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
   <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${active ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
   >
      {icon} {label}
   </button>
);

const VitalBox = ({ label, value, color }: { label: string, value: string, color: string }) => (
   <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
   </div>
);
