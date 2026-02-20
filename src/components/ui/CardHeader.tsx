import { CN } from '@/utils/className';
import { Box } from './Box';
import { Typography } from './Typography';


type CardHeaderProps = {
    title: string,
    icon?: string;
    variant?: 'primary' | 'secondary';
};
export const CardHeader = ({ title, icon, variant = 'primary' }: CardHeaderProps) => {
    return (
        <Box display='flex' alignItems='center' gap={4} className='mb-6'>
            {icon && (<div className={CN('w-14 h-14 rounded-xl flex items-center justify-center', variant === 'primary' ? 'bg-secondary/10' : 'bg-primary/30')}>
                <i className={CN(icon, 'text-2xl transition-transform duration-300 group-hover:scale-110', variant === 'primary' ? 'text-secondary text-shadow-sm text-shadow-black/50' : 'text-primary')}></i>
            </div>)}
            <Typography variant='h3' size={icon ? 'h5' : 'h4'} color='white' className='font-bold'>{title}</Typography>
        </Box>
    );
};