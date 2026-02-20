import { Box, Typography } from '../ui';

const SkillsGridHeader = ({ title, icon }: { title: string, icon: string; }) => {
    return (
        <Box display='flex' alignItems='center' gap={4} className='mb-6'>
            <div className='w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center'>
                <i className={`${icon} text-2xl text-secondary text-shadow-sm text-shadow-black/50 transition-transform duration-300 group-hover:scale-110`}></i>
            </div>
            <Typography variant='h3' size='h5' color='white' className='font-bold'>{title}</Typography>
        </Box>
    );
};

export default SkillsGridHeader;