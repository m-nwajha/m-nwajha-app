'use client';

import React from 'react';
import { Typography } from '../ui';
import Image from 'next/image';
import Link from 'next/link';

const DashboardHeader = () => {
    return (
        <header className="fixed top-0 right-0 left-0 h-20 bg-secondary/5 backdrop-blur-md border-b border-secondary/10 flex items-center justify-between px-8 z-50 transition-all">
            <div className="flex items-center gap-4">
                <Link href='/'>
                    <Image alt='logo-nawjha-tech' src='/assets/images/logo.png' height={50} width={50} />
                </Link>
                <Typography variant="h4" className="font-bold text-secondary">لوحة التحكم</Typography>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-light/40"></i>
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-white/5 border border-white/10 rounded-full py-2 pr-12 pl-4 text-sm focus:outline-none focus:border-secondary/50 transition-all w-64"
                    />
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                        M
                    </div>
                    <span className="text-sm font-medium pr-1 text-light/90">محمد</span>
                    <i className="bi bi-chevron-down text-xs text-light/40 ml-2"></i>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
