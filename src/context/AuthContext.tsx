'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            if (pathname.startsWith('/dashboard')) {
                try {
                    const response = await axios.get('/api/auth/me');
                    if (response.data.success) {
                        setUser(response.data.data);
                    } else {
                        setUser(null);
                        router.push('/login');
                    }
                } catch (error) {
                    setUser(null);
                    router.push('/login');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [pathname, router]);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
