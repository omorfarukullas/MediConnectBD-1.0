import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'glass';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  disabled,
  ...props
}) => {
  const baseStyle = "px-5 py-2.5 rounded-xl font-heading font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 border-none",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-md hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    glass: "glass-panel text-primary-700 hover:bg-white/80 shadow-sm"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'flat';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
    const variants = {
        default: "bg-white border border-slate-100 shadow-soft",
        glass: "glass-panel shadow-lg shadow-slate-200/20",
        flat: "bg-slate-50 border border-slate-200"
    };

    return (
        <div className={`p-6 rounded-2xl transition-all duration-300 ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue', className = '' }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    green: 'bg-green-50 text-green-700 border border-green-100',
    red: 'bg-red-50 text-red-700 border border-red-100',
    yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-100',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-primary-50 text-primary-700 border border-primary-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide ${colors[color] || colors.blue} ${className}`}>
      {children}
    </span>
  );
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className = '' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
            document.body.style.overflow = 'hidden';
        } else {
            setAnimate(false);
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden transform transition-all duration-400 cubic-bezier(0.16, 1, 0.3, 1) ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'} ${className}`}>
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};