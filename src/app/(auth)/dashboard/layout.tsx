import React, { ReactNode } from 'react';
import DashboardSidebar from '@/components/organisms/DashboardSidebar';
import DashboardHeader from '@/components/organisms/DashboardHeader';

export default function DashboardLayout({ children }: { children: ReactNode; }) {
    return (
        <div className="min-h-screen bg-dark">
            <DashboardHeader />
            <DashboardSidebar />
            <main className="pr-64 pt-20 transition-all duration-300">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
