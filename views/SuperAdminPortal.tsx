import React from 'react';
import { Shield, Building2, UserCheck, Activity, DollarSign, ArrowLeft, AlertOctagon, Settings, FileText } from 'lucide-react';
import { Card, Button } from '../components/UIComponents';

export const SuperAdminPortal = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex items-center gap-2 mb-2">
         <Button variant="ghost" onClick={onBack} className="text-slate-500 hover:text-slate-800 -ml-2">
            <ArrowLeft size={20} /> <span className="font-medium">Back</span>
         </Button>
       </div>
       
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="text-primary-600"/> Super Admin Dashboard
            </h1>
            <p className="text-slate-500">System Owner Control Panel & Ecosystem Security</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Settings size={16}/> Settings</Button>
            <Button variant="danger"><AlertOctagon size={16}/> System Alert</Button>
          </div>
       </div>

       {/* System Ecosystem Stats */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-slate-500 font-medium text-sm">Active Hospitals</p>
                   <h2 className="text-3xl font-bold text-slate-800">124</h2>
                   <span className="text-xs text-green-600">+2 this week</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Building2 size={24}/></div>
             </div>
          </Card>
          <Card>
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-slate-500 font-medium text-sm">Verified Doctors</p>
                   <h2 className="text-3xl font-bold text-slate-800">850</h2>
                   <span className="text-xs text-green-600">+12 pending</span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-green-600"><UserCheck size={24}/></div>
             </div>
          </Card>
          <Card>
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-slate-500 font-medium text-sm">Daily Appts</p>
                   <h2 className="text-3xl font-bold text-slate-800">2.5k</h2>
                   <span className="text-xs text-slate-400">Avg time: 15m</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Activity size={24}/></div>
             </div>
          </Card>
          <Card>
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-slate-500 font-medium text-sm">Total Revenue</p>
                   <h2 className="text-3xl font-bold text-slate-800">৳1.2M</h2>
                   <span className="text-xs text-green-600">+15% growth</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-amber-600"><DollarSign size={24}/></div>
             </div>
          </Card>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Onboarding & Approvals */}
          <Card className="lg:col-span-2">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Pending Onboarding Requests</h3>
                <Button variant="ghost" className="text-sm text-primary-600">View All</Button>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">LC</div>
                      <div>
                         <h4 className="font-bold text-sm text-slate-900">Labaid Cardiac</h4>
                         <p className="text-xs text-slate-500">Hospital Registration • License #8821</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" className="text-xs h-8">Documents</Button>
                      <Button variant="primary" className="text-xs h-8">Approve</Button>
                   </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">DR</div>
                      <div>
                         <h4 className="font-bold text-sm text-slate-900">Dr. Anisul Hoque</h4>
                         <p className="text-xs text-slate-500">Doctor Verification • BMDC #A-9922</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" className="text-xs h-8">Verify BMDC</Button>
                      <Button variant="primary" className="text-xs h-8">Approve</Button>
                   </div>
                </div>

                 <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">PC</div>
                      <div>
                         <h4 className="font-bold text-sm text-slate-900">Popular Diagnostic</h4>
                         <p className="text-xs text-slate-500">Diagnostic Center • License #1120</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" className="text-xs h-8">Documents</Button>
                      <Button variant="primary" className="text-xs h-8">Approve</Button>
                   </div>
                </div>
             </div>
          </Card>

           {/* Security & System Logs */}
           <div className="space-y-6">
               <Card className="bg-slate-900 text-slate-300 border-none">
                 <div className="flex items-center gap-2 mb-4 text-white">
                    <Shield size={20} />
                    <h3 className="font-bold">Security Watch</h3>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm p-2 bg-red-900/30 text-red-200 rounded border border-red-900/50">
                        <AlertOctagon size={16} className="mt-0.5 flex-shrink-0"/> 
                        <div>
                            <span className="font-bold block">Suspicious Login Attempt</span>
                            <span className="text-xs opacity-70">IP: 192.168.1.15 • 10m ago</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm p-2 bg-slate-800 rounded">
                        <UserCheck size={16} className="mt-0.5 flex-shrink-0 text-green-400"/> 
                        <div>
                            <span className="block text-slate-200">New Admin: Square Hospital</span>
                            <span className="text-xs opacity-50">Authorized by Super Admin • 1h ago</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm p-2 bg-slate-800 rounded">
                        <FileText size={16} className="mt-0.5 flex-shrink-0 text-blue-400"/> 
                        <div>
                            <span className="block text-slate-200">System Backup Completed</span>
                            <span className="text-xs opacity-50">Database Size: 2.4GB • 4h ago</span>
                        </div>
                    </div>
                 </div>
                 <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                    View Full Audit Log
                 </Button>
              </Card>

              <Card>
                 <h3 className="font-bold text-slate-900 mb-2">Commission & Billing</h3>
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-500">Pending Payouts</span>
                    <span className="font-bold">৳ 450,000</span>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-500">Platform Fees (Oct)</span>
                    <span className="font-bold text-green-600">+ ৳ 125,000</span>
                 </div>
                 <Button className="w-full">Manage Payments</Button>
              </Card>
           </div>
       </div>
    </div>
  );
};