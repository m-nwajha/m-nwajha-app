import { Box } from '@/components/ui';
import Image from 'next/image';
export default function Loading() {
    return (
        <Box
            display='flex'
            direction='col'
            justifyContent='center'
            alignItems='center'
            className='fixed inset-0 bg-primary overflow-hidden'
        >
            {/* Glowing blobs in background */}
            <div className='absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] top-[-100px] left-[-100px] pointer-events-none' />
            <div className='absolute w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] bottom-[-80px] right-[-80px] pointer-events-none' />
            <Image className='animate-bounce [animation-delay:150ms]' alt='logo-nawjha-tech' src='/assets/images/logo.png' height={150} width={150} />
        </Box>
    );
};