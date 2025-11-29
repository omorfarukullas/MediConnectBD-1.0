import React, { useState } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

const THEMES = [
    {
        id: 'neo-blue',
        name: 'Neo Blue',
        colors: {
            50: '240 249 255',
            100: '224 242 254',
            500: '14 165 233', // Sky 500
            600: '2 132 199',
            700: '3 105 161',
            900: '12 74 110',
        },
        preview: 'bg-[#0ea5e9]'
    },
    {
        id: 'bio-mint',
        name: 'Bio Mint',
        colors: {
            50: '240 253 250',
            100: '204 251 241',
            500: '20 184 166', // Teal 500
            600: '13 148 136',
            700: '15 118 110',
            900: '19 78 74',
        },
        preview: 'bg-[#14b8a6]'
    },
    {
        id: 'cyber-violet',
        name: 'Cyber Violet',
        colors: {
            50: '245 243 255',
            100: '237 233 254',
            500: '139 92 246', // Violet 500
            600: '124 58 237',
            700: '109 40 217',
            900: '76 29 149',
        },
        preview: 'bg-[#8b5cf6]'
    },
    {
        id: 'corporate-slate',
        name: 'Corporate Slate',
        colors: {
            50: '248 250 252',
            100: '241 245 249',
            500: '71 85 105', // Slate 600 equivalent
            600: '51 65 85',
            700: '30 41 59',
            900: '15 23 42',
        },
        preview: 'bg-[#475569]'
    }
];

export const ThemeSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('neo-blue');

    const applyTheme = (themeId: string) => {
        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--primary-${key}`, value);
        });
        
        setActiveTheme(themeId);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {isOpen && (
                <div className="absolute bottom-16 left-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 w-64 animate-slide-up mb-2 ring-1 ring-black/5">
                    <h3 className="font-bold text-slate-900 mb-3 text-sm font-heading flex items-center gap-2">
                        <Sparkles size={14} className="text-primary-500"/> Theme Engine
                    </h3>
                    <div className="space-y-2">
                        {THEMES.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => applyTheme(theme.id)}
                                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${activeTheme === theme.id ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100' : 'hover:bg-slate-50 text-slate-600'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${theme.preview} shadow-inner border-2 border-white`}></div>
                                    <span className="text-sm font-medium">{theme.name}</span>
                                </div>
                                {activeTheme === theme.id && <Check size={16} className="text-primary-600"/>}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/80 backdrop-blur-md text-slate-700 p-3.5 rounded-full shadow-lg border border-white/50 hover:bg-white transition-all hover:scale-110 hover:rotate-12 group ring-1 ring-black/5"
                title="Customize Theme"
            >
                <Palette size={20} className="group-hover:text-primary-600 transition-colors"/>
            </button>
        </div>
    );
};