'use client';

import { Container, Typography } from '../ui';
import SocialLinks from '../molecules/SocialLinks';
import { FOOTER_DATA } from '@/constants/footer';
import { CONTACT_DATA } from '@/constants/contact';

const Footer = () => {
    const contactInfo = [
        {
            key: 'email',
            label: 'Email',
            value: CONTACT_DATA.email.email1,
            icon: CONTACT_DATA.email.icon,
        },
        {
            key: 'phone',
            label: 'Phone',
            value: CONTACT_DATA.phone.number1,
            icon: CONTACT_DATA.phone.icon,
        },
        {
            key: 'location',
            label: 'Location',
            value: CONTACT_DATA.location.address1,
            icon: CONTACT_DATA.location.icon,
        },
    ];

    return (
        <footer className="pt-12 bg-dark/50 border-t border-white/5 pb-30 md:pb-12">
            <Container>
                <div className="flex flex-col items-center gap-8">
                    <ul className='flex flex-col md:flex-row gap-4 list-none'>
                        {contactInfo.map((infoItem) => (
                            <li key={infoItem.key}>
                                <a
                                    href={
                                        infoItem.label === 'Email'
                                            ? `mailto:${infoItem.value}`
                                            : infoItem.label === 'Phone'
                                                ? `tel:${infoItem.value}`
                                                : '#'
                                    }
                                    className="text-light text-[1.1rem] [text-shadow:1px_1px_2px_black] transition-all duration-[800ms] hover:text-secondary flex items-center"
                                >
                                    <i className={`bi ${infoItem.icon} text-[1.2rem] me-2`}></i>
                                    {infoItem.value}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <SocialLinks />
                    <Typography
                        variant="p"
                        size="body1"
                        className="text-center text-white/90"
                    >
                        {new Date().getFullYear()} © Copyright
                        <strong>
                            <a
                                className='mx-1 text-secondary hover:text-secondary/50 transition-colors duration-300'
                                href='https://nawjha.com'
                                target='_blank'
                                rel='noopener noreferrer'>
                                nawjha.tech
                            </a>
                        </strong>
                        . All Rights Reserved
                    </Typography>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
