'use client';

import { FOOTER_DATA } from '@/constants/footer';
import { CN } from '@/utils/className';

const SocialLinks = () => {
    return (
        <ul className="flex justify-center items-center gap-2 list-none p-0 m-0">
            {FOOTER_DATA.socialLinks.map(socialItem => (
                <li key={socialItem.key}>
                    <a
                        href={socialItem.url}
                        title={socialItem.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={CN(
                            "flex justify-center items-center text-white/80 bg-secondary hover:bg-dark/80 transition-all duration-300 h-[30px] w-[30px] text-[1rem] rounded-[11px] cursor-pointer shadow-lg shadow-secondary/20 hover:-translate-y-1 hover:shadow-secondary/40",
                        )}
                    >
                        <i className={CN("bi", socialItem.icon)}></i>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialLinks;
