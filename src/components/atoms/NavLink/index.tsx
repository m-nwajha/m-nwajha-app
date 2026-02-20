'use client';
import Link from 'next/link';
import { FC, MouseEvent, useState } from 'react';
import styles from './style.module.css';
import { CN } from '@/utils/className';
type NavItemProps = {
    label: string;
    href: string;
    icon: string;
};

type Ripple = {
    id: number;
    x: number;
    y: number;
};
import useScrollSpy from '@/hooks/useScrollSpy';
import { PATHS } from '@/constants/paths';

const NavLink: FC<NavItemProps> = ({ label, href, icon }) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    // Extract IDs from PATHS for scroll spy
    const sectionIds = PATHS.map(path => path.path.replace('/#', ''));
    const activeSection = useScrollSpy(sectionIds);

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
    };

    const targetId = href.replace('/#', '');
    const isActive = activeSection === targetId;

    return (
        <li className={styles.nav_li}>
            <Link
                href={href}
                className={CN(styles.nav_link, 'scrollto', isActive && styles.active)}
            >
                <button onClick={handleClick} className='flex justify-center items-center cursor-pointer'>
                    <i className={`bi ${icon}`}></i>
                    <span>{label}</span>
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
            </Link>
        </li>
    );
};

export default NavLink;