'use client';
import { FC, ReactNode } from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const PublicLayout: FC<{ children: ReactNode; }> = ({ children }) => {
    return <MainLayout>{children}</MainLayout>;
};

export default PublicLayout;
