'use client';

import React, { ReactNode, useState } from 'react';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';
import DashboardHeader from '@/components/organisms/DashboardHeader';

export default function DashboardLayout({ children }: { children: ReactNode; }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-dark">
            <DashboardHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="lg:pr-64 pt-20 transition-all duration-300">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
