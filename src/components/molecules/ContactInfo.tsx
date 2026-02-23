'use client';

import { Box } from '../ui';
import Image from 'next/image';

const ContactInfo = () => {
    return (
        <Box className="lg:col-span-5 p-8 lg:p-12 h-full">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center' className='order-2 md:order-2 xl:order-1 relative after:absolute after:-top-18 after:left-0 after:bg-[url(/assets/images/contact-arrow.svg)] after:bg-no-repeat after:not-last after:h-[130px] after:w-[163px]'>
                <Image alt='hero-img' src='/assets/images/contact-img.png' width={300} height={300} />
            </Box>
        </Box>
    );
};

export default ContactInfo;
