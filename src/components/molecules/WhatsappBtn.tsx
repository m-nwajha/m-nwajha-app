'use client';

import { CN } from '@/utils/className';

const WhatsappBtn = () => {
    return (
        <a
            href='https://wa.me/+972567634884'
            target='_blank'
            rel="noopener noreferrer"
            className={CN(
                'fixed bottom-28 lg:bottom-5 left-6 z-[999999] w-[60px] h-[60px]',
                'flex justify-center items-center rounded-full bg-[#00e676] text-white text-[1.7rem]',
                'shadow-[0_0.25rem_0.75rem_rgba(31,27,45,0.08)] transition-all duration-500 ease-in-out hover:opacity-70',
                // Pulse Animation using before/after
                'before:content-[""] before:absolute before:inset-0 before:border-4 before:border-[#00e67744] before:rounded-full before:z-[-1] before:animate-[whatsapp-pulse_2s_cubic-bezier(0,0.2,0.8,1)_infinite]',
                'after:content-[""] after:absolute after:inset-0 after:border-4 after:border-[#00e67744] after:rounded-full after:z-[-1] after:animate-[whatsapp-pulse_2s_cubic-bezier(0,0.2,0.8,1)_infinite] after:animation-delay-[-0.5s]'
            )}
        >
            <i className='bi bi-whatsapp'></i>

            {/* Small red dot with pulse */}
            <span className="absolute top-[10px] right-0 w-[10px] h-[10px] bg-red-500 rounded-full animate-pulse"></span>

            <style jsx global>{`
                @keyframes whatsapp-pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .animation-delay-\[-0\.5s\] {
                    animation-delay: -0.5s;
                }
            `}</style>
        </a>
    );
};

export default WhatsappBtn;
