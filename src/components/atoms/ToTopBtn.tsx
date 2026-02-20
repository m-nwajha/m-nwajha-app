'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui';

const ToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    return (
        isVisible && (
            <Button
                href='#'
                onClick={scrollToTop}
                variant='outline'
                className='fixed bottom-[7rem]  lg:bottom-[1rem] right-[1rem] z-99999 flex justify-center items-center w-[34px] h-[34px] text-[1rem] rounded-[12px] p-0'>
                <i className='bi bi-arrow-up-short'></i>
            </Button>
        )
    );
};

export default ToTopBtn;