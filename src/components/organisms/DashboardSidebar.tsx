'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CN } from '@/utils/className';
import axios from 'axios';

const sidebarLinks = [
    { href: '/dashboard', label: 'نظرة عامة', icon: 'bi-grid-1x2' },
    { href: '/dashboard/portfolio', label: 'المشاريع', icon: 'bi-grid' },
    { href: '/dashboard/blogs', label: 'المدونة', icon: 'bi-journal-text' },
    { href: '/dashboard/testimonials', label: 'التوصيات', icon: 'bi-chat-quote' },
    { href: '/dashboard/contacts', label: 'الرسائل', icon: 'bi-envelope' },
    { href: '/dashboard/settings', label: 'الإعدادات', icon: 'bi-gear' },
];

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            try {
                await axios.post('/api/auth/logout');
                router.push('/login-app');
                router.refresh();
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={CN(
                    "fixed right-0 top-0 h-full w-64 bg-primary border-l border-white/10 flex flex-col pt-20 z-40 transition-all duration-300 lg:translate-x-0",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="px-4 py-8">
                    <ul className="space-y-2">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) onClose();
                                        }}
                                        className={CN(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                                            isActive
                                                ? "bg-secondary/10 text-secondary border-r-4 border-secondary shadow-lg shadow-secondary/5 font-semibold"
                                                : "text-light/60 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <i className={CN("bi text-xl", link.icon)}></i>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mt-auto p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <i className="bi bi-box-arrow-right text-xl"></i>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;
