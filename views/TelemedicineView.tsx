
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Paperclip, Send, ArrowLeft } from 'lucide-react';
import { Button } from '../components/UIComponents';

export const TelemedicineView = ({ onEndCall }: { onEndCall: () => void }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'Dr. Omor', text: 'Hello! I can see you clearly. How are you feeling today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const sendMessage = () => {
    if(!inputMsg.trim()) return;
    setMessages([...messages, { sender: 'Me', text: inputMsg }]);
    setInputMsg('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
        {/* Header/Back Button Overlay */}
        <div className="absolute top-4 left-4 z-50">
             <Button variant="secondary" onClick={onEndCall} className="bg-black/40 text-white hover:bg-black/60 border-none backdrop-blur-md flex items-center gap-2">
                <ArrowLeft size={20} /> Back
             </Button>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 relative flex">
            
            {/* Main Feed (Remote) */}
            <div className="flex-1 bg-slate-800 relative flex items-center justify-center">
                <div className="text-white text-center">
                    <img 
                        src="https://picsum.photos/800/600" 
                        alt="Remote Doctor" 
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded text-white text-sm backdrop-blur">
                        Dr. Omor Faruck Ullas
                    </div>
                </div>
            </div>

            {/* Side Chat Panel */}
            {showChat && (
                <div className="w-80 bg-white flex flex-col border-l border-slate-200">
                    <div className="p-4 border-b border-slate-100 font-bold">Chat</div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex flex-col ${m.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-3 py-2 rounded-lg max-w-[85%] text-sm ${m.sender === 'Me' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-slate-100 flex gap-2">
                        <input 
                            className="flex-1 border border-slate-200 rounded px-2 text-sm focus:outline-none focus:border-primary-500 bg-white"
                            placeholder="Type..."
                            value={inputMsg}
                            onChange={e => setInputMsg(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="text-primary-600 hover:bg-primary-50 p-2 rounded"><Send size={18}/></button>
                    </div>
                </div>
            )}

            {/* Self View (PIP) */}
            <div className="absolute bottom-24 right-6 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-slate-700 shadow-xl">
                 {videoOn ? (
                    <img src="https://picsum.photos/300/200" className="w-full h-full object-cover" alt="Me" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">Camera Off</div>
                 )}
                 <div className="absolute bottom-1 left-2 text-xs text-white drop-shadow">You</div>
            </div>
        </div>

        {/* Controls */}
        <div className="h-20 bg-slate-950 flex items-center justify-center gap-4 px-4">
            <button 
                onClick={() => setMicOn(!micOn)}
                className={`p-4 rounded-full ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'}`}
            >
                {micOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`p-4 rounded-full ${videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500 text-white'}`}
            >
                {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            <button 
                onClick={onEndCall}
                className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 px-8 flex items-center gap-2 font-bold"
            >
                <PhoneOff size={24} /> End
            </button>
            <button 
                onClick={() => setShowChat(!showChat)}
                className={`p-4 rounded-full ${showChat ? 'bg-primary-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
                <MessageSquare size={24} />
            </button>
            <button className="p-4 rounded-full bg-slate-800 text-white hover:bg-slate-700">
                <Paperclip size={24} />
            </button>
        </div>
    </div>
  );
};
