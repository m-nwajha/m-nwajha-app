'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui';
import { CN } from '@/utils/className';

interface DashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: string;
    children: ReactNode;
    footer?: ReactNode;
    maxWidth?: 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl';
    className?: string;
}

const DashboardModal: React.FC<DashboardModalProps> = ({
    isOpen,
    onClose,
    title,
    icon,
    children,
    footer,
    maxWidth = 'max-w-2xl',
    className
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={CN(
                            "relative w-full bg-primary/50 border border-secondary/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden max-h-full",
                            maxWidth,
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-primary shrink-0">
                            <div className="flex items-center gap-4">
                                {icon && (
                                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/10">
                                        <i className={CN("bi text-xl", icon)}></i>
                                    </div>
                                )}
                                <Typography variant="h4" size="h5" className="font-bold font-spaceGrotesk text-white">
                                    {title}
                                </Typography>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-all border border-transparent hover:border-white/10"
                            >
                                <i className="bi bi-x-lg text-light/60"></i>
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="p-6 border-t border-white/5 bg-primary font-spaceGrotesk shrink-0">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DashboardModal;
