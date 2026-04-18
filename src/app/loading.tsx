import { Box } from '@/components/ui';
import Image from 'next/image';
export default function Loading() {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' className='fixed inset-0 bg-primary'>
            <Image className='animate-bounce [animation-delay:150ms]' alt='logo-nawjha-tech' src='/assets/images/logo.png' height={150} width={150} />
        </Box>
    );
};