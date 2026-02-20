'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

export const ToastProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 left-8 z-[200] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: -50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border min-w-[300px]
                                ${toast.type === 'success' ? 'bg-secondary/20 border-secondary/30 text-secondary' :
                                    toast.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-500' :
                                        'bg-white/10 border-white/20 text-white'}
                            `}>
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                    ${toast.type === 'success' ? 'bg-secondary/20' :
                                        toast.type === 'error' ? 'bg-red-500/20' :
                                            'bg-white/10'}
                                `}>
                                    <i className={`bi ${toast.type === 'success' ? 'bi-check-circle-fill' :
                                            toast.type === 'error' ? 'bi-x-circle-fill' :
                                                'bi-info-circle-fill'
                                        } text-xl`}></i>
                                </div>
                                <div className="flex-1 font-medium font-spaceGrotesk text-right mr-auto">
                                    {toast.message}
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-all text-light/40 hover:text-light"
                                >
                                    <i className="bi bi-x-lg text-xs"></i>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
