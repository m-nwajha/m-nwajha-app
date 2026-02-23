'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Input, useToast } from '@/components/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.data.success) {
                showToast('تم تسجيل الدخول بنجاح', 'success');
                router.push('/dashboard');
                router.refresh(); // To trigger middleware check again
            }
        } catch (error: any) {
            console.error('Login error:', error);
            const message = error.response?.data?.error || 'فشل تسجيل الدخول. تأكد من البيانات.';
            showToast(message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="flex flex-col items-center mb-10">
                <Image src="/assets/images/logo.png" alt="Logo" width={80} height={80} className="mb-4" />
                <Typography variant="h2" className="font-bold text-secondary">لوحة التحكم</Typography>
                <Typography className="text-light/40 text-sm mt-2">قم بتسجيل الدخول لإدارة محتوى موقعك</Typography>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-light/60 text-sm mb-2 pr-4">البريد الإلكتروني</label>
                    <Input
                        type="email"
                        placeholder="admin@nawjha.tech"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/10"
                    />
                </div>
                <div>
                    <label className="block text-light/60 text-sm mb-2 pr-4">كلمة المرور</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/10"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl font-bold bg-secondary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary/20"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                            جاري التحميل...
                        </div>
                    ) : (
                        'تسجيل الدخول'
                    )}
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <Typography className="text-[10px] text-light/20 uppercase tracking-widest">
                    Nawjha Tech Admin v1.0
                </Typography>
            </div>
        </Box>
    );
};

export default LoginForm;
