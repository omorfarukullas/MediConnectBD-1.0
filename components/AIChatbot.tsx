
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, AlertTriangle, Loader2, ChevronDown } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { Button } from './UIComponents';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isEmergency?: boolean;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: "Hello! I'm MediBot. Describe your symptoms, and I'll help you find the right specialist." 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: inputText 
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getChatResponse(history, userMsg.text);
    
    // Check for emergency flag from system instruction
    const isEmergency = responseText?.includes("EMERGENCY ALERT");
    const cleanText = responseText?.replace("EMERGENCY ALERT:", "").trim();

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: cleanText || "I couldn't process that. Please try again.",
      isEmergency
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center justify-center gap-2 bg-slate-900 text-white p-4 rounded-full shadow-[0_0_20px_rgba(15,23,42,0.3)] hover:scale-105 transition-all duration-300 border border-slate-700 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary-400 group-hover:text-white transition-colors" />
            <span className="font-bold pr-2">AI Assistant</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-100px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl animate-slide-up border border-slate-200/50 backdrop-blur-xl bg-white/90">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-slate-900 to-slate-900 opacity-80"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none">MediBot AI</h3>
                <p className="text-xs text-primary-300 flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="relative z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-tr-none' 
                    : msg.isEmergency 
                      ? 'bg-red-50 border-l-4 border-red-500 text-slate-800 rounded-tl-none'
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                  {msg.isEmergency && (
                    <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-2 pb-2 border-b border-red-100">
                      <AlertTriangle size={16} /> EMERGENCY DETECTED
                    </div>
                  )}
                  
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.role === 'model' && (
                     <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-white border border-primary-200 flex items-center justify-center">
                        <Bot size={14} className="text-primary-600" />
                     </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2 ml-10">
                    <Loader2 size={16} className="text-primary-500 animate-spin" />
                    <span className="text-xs text-slate-400">Analyzing symptoms...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all shadow-inner">
              <input 
                type="text" 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                placeholder="Type your symptoms..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-slate-400">AI can make mistakes. For medical emergencies, call 999.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
