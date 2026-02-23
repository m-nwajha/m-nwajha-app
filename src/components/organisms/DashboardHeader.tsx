'use client';

import React, { useState, useEffect } from 'react';
import { Typography } from '../ui';
import Image from 'next/image';
import Link from 'next/link';
import useAPI from '@/hooks/useAPI';
import { ENDPOINTS } from '@/constants/endpoints';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface DashboardHeaderProps {
    onMenuToggle: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuToggle }) => {
    const { user } = useAuth();
    const { data: apiResponse, get } = useAPI(ENDPOINTS.contacts);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        get();
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (apiResponse?.success && apiResponse.data) {
            const unread = apiResponse.data.filter((c: any) => !c.isRead);
            setUnreadCount(unread.length);
            if (unread.length > 0) {
                setHasNewNotifications(true);
            }
        }
    }, [apiResponse]);

    const latestMessages = apiResponse?.data?.slice(0, 4) || [];

    const formatDate = (dateString: string) => {
        if (!isMounted) return '';
        return new Date(dateString).toLocaleDateString('ar-EG');
    };

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setHasNewNotifications(false);
        }
    };

    return (
        <header className="fixed top-0 right-0 left-0 h-20 bg-secondary/5 backdrop-blur-md border-b border-secondary/10 flex items-center justify-between px-4 md:px-8 z-50 transition-all">
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    onClick={onMenuToggle}
                    className="w-10 h-10 rounded-lg bg-white/5 flex lg:hidden items-center justify-center text-light/60 hover:text-secondary hover:bg-white/10 transition-all"
                >
                    <i className="bi bi-list text-2xl"></i>
                </button>
                <Link href='/'>
                    <Image alt='logo-nawjha-tech' src='/assets/images/logo.png' height={40} width={40} className="md:h-[50px] md:w-[50px]" />
                </Link>
                <Typography variant="h4" className="font-bold text-secondary text-base md:text-xl line-clamp-1">لوحة التحكم</Typography>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="relative hidden lg:block">
                    <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-light/40"></i>
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-white/5 border border-white/10 rounded-full py-2 pr-12 pl-4 text-sm focus:outline-none focus:border-secondary/50 transition-all w-64"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={handleToggleNotifications}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-light/60 hover:bg-white/10 hover:text-secondary transition-all"
                    >
                        <i className="bi bi-bell text-lg md:text-xl"></i>
                        {unreadCount > 0 && hasNewNotifications && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-[-1]"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-4 w-72 md:w-80 bg-primary border border-primary/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                        <span className="font-bold text-sm text-secondary">آخر الرسائل</span>
                                        <Link
                                            href="/dashboard/contacts"
                                            onClick={() => setShowNotifications(false)}
                                            className="text-[10px] text-secondary hover:underline"
                                        >
                                            عرض الكل
                                        </Link>
                                    </div>
                                    <div className="max-h-80 md:max-h-96 overflow-y-auto">
                                        {latestMessages.length > 0 ? (
                                            latestMessages.map((msg: any) => (
                                                <Link
                                                    key={msg._id}
                                                    href="/dashboard/contacts"
                                                    onClick={() => setShowNotifications(false)}
                                                    className={`block p-4 border-b border-white/5 hover:bg-white/5 transition-all ${!msg.isRead ? 'bg-secondary/5' : ''}`}
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold text-white">{msg.name}</span>
                                                        <span className="text-[9px] text-light/40">
                                                            {formatDate(msg.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-light/60 line-clamp-1">{msg.subject}</p>
                                                    <p className="text-[9px] text-light/30 line-clamp-2 mt-1">{msg.message}</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-light/40 text-[10px] italic">
                                                لا توجد رسائل حالياً
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-white/5 p-1.5 md:p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold uppercase text-xs md:text-sm">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="hidden sm:inline text-xs md:text-sm font-medium pr-1 text-light/90">{user?.name || 'مدير النظام'}</span>
                    <i className="bi bi-chevron-down text-[10px] md:text-xs text-light/40 ml-1 md:ml-2"></i>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
