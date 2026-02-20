'use client';

import { Box, Typography } from '../ui';
import { CONTACT_DATA } from '@/constants/contact';
import ContactInfoItem from './ContactInfoItem';
import Image from 'next/image';
import SectionHeading from '../atoms/SectionHeading';

const ContactInfo = () => {
    return (
        <Box className="lg:col-span-5 p-8 lg:p-12 h-full">
            <SectionHeading title={CONTACT_DATA.title} className="after:bg-[url(/assets/images/mail.svg)]" />

            <Box
                display='flex'
                justifyContent='center'
                alignItems='center' className='order-2 md:order-2 xl:order-1 relative after:absolute after:-top-18 after:left-0 after:bg-[url(/assets/images/contact-arrow.svg)] after:bg-no-repeat after:not-last after:h-[130px] after:w-[163px]'>
                <Image alt='hero-img' src='/assets/images/contact-img.png' width={300} height={300} />
            </Box>
            {/* <Typography variant="h3" size="h3" className="mb-4 text-primary/60 font-bold">
                {CONTACT_DATA.infoTitle}
            </Typography>
            <Typography className="mb-8 text-white/80">
                {CONTACT_DATA.infoDescription}
            </Typography>

            <div className="space-y-8">
                <ContactInfoItem
                    icon={CONTACT_DATA.location.icon}
                    title={CONTACT_DATA.location.title}
                    text1={CONTACT_DATA.location.address1}
                    text2={CONTACT_DATA.location.address2}
                />
                <ContactInfoItem
                    icon={CONTACT_DATA.phone.icon}
                    title={CONTACT_DATA.phone.title}
                    text1={CONTACT_DATA.phone.number1}
                    text2={CONTACT_DATA.phone.number2}
                />
                <ContactInfoItem
                    icon={CONTACT_DATA.email.icon}
                    title={CONTACT_DATA.email.title}
                    text1={CONTACT_DATA.email.email1}
                    text2={CONTACT_DATA.email.email2}
                />
            </div> */}
        </Box>
    );
};

export default ContactInfo;
