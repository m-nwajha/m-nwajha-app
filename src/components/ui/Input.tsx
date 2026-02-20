'use client';

import { CN } from '@/utils/className';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={CN(
                "w-full px-5 py-4 bg-dark border border-secondary/10 rounded-xl focus:border-secondary outline-none transition-all placeholder:text-light/50 text-white",
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'Input';
