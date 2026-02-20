'use client';

import { FC } from 'react';
import { Badge, Box, Typography } from '../ui';

interface SkillCertificationsProps {
    title: string;
    badges: string[];
}

const SkillCertifications: FC<SkillCertificationsProps> = ({ title, badges }) => {
    return (
        <Box>
            <Typography variant='h4' size='h6' color='white' className='mb-4 font-bold uppercase tracking-wider'>{title}</Typography>
            <div className='flex flex-wrap gap-3'>
                {badges.map((badge, index) => (
                    <Badge key={index}>
                        {badge}
                    </Badge>
                ))}
            </div>
        </Box>
    );
};

export default SkillCertifications;
