'use client';

import { Box, Typography } from '../ui';
import { CN } from '@/utils/className';

interface ContactInfoItemProps {
    icon: string;
    title: string;
    text1: string;
    text2?: string;
}

const ContactInfoItem = ({ icon, title, text1, text2 }: ContactInfoItemProps) => {
    return (
        <div className="flex gap-6 items-start">
            <Box className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center shrink-0 transition-all hover:bg-primary/25">
                <i className={CN("bi text-2xl text-primary", icon)}></i>
            </Box>
            <div>
                <Typography variant="h4" size="body1" className="font-bold mb-1 text-primary/60">
                    {title}
                </Typography>
                <Typography size="body2" className="text-white/80">{text1}</Typography>
                {text2 && <Typography size="body2" className="text-white/80">{text2}</Typography>}
            </div>
        </div>
    );
};

export default ContactInfoItem;
