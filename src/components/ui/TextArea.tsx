'use client';

import { CN } from '@/utils/className';
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={CN(
                "w-full px-5 py-4 bg-dark border border-secondary/10 rounded-xl focus:border-secondary outline-none transition-all placeholder:text-light/50 text-white resize-none",
                className
            )}
            {...props}
        />
    );
});

TextArea.displayName = 'TextArea';
