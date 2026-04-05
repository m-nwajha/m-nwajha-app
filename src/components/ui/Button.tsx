'use client';

import { FC, MouseEvent, ReactNode, useState } from 'react';
import Link from 'next/link';
import { CN } from '@/utils/className';

type Ripple = {
    id: number;
    x: number;
    y: number;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    href?: string;
    variant?: 'bg' | 'outline';
    target?: string;
}

export const Button: FC<ButtonProps> = ({ children, onClick, href, target, className, variant = 'bg', type = 'button', ...props }) => {

    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newRipple: Ripple = {
            id: Date.now(),
            x,
            y,
        };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
        if (onClick) {
            onClick(event);
        }
    };

    const buttonElement = (
        <button
            type={type}
            {...props}
            className={CN('relative overflow-hidden px-[1.3rem] rounded-[50px] h-[2.3rem] text-shadow-sm text-shadow-black/50 cursor-pointer transition ease-in'
                , variant === 'bg' ? 'bg-linear-to-r from-secondary to-secondary/60  text-white hover:to-secondary hover:from-secondary/60 hover:-translate-y-[3px] hover:shadow-lg shadow-secondary/30' : 'border border-white/10 bg-white/5 text-white hover:border-secondary hover:bg-secondary/5 hover:text-secondary hover:-translate-y-[3px]'
                , className)}
            onClick={handleClick}
        >
            {children}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className='absolute bg-white/30 rounded-full animate-ping'
                    style={{
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                    }}
                />
            ))}
        </button>
    );

    if (href) {
        return (
            <Link href={href} target={target}>
                {buttonElement}
            </Link>
        );
    }


    return buttonElement;
};
