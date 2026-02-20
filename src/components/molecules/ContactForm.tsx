'use client';

import { Box, Typography, Button, Input, TextArea } from '../ui';
import { CONTACT_DATA } from '@/constants/contact';

const ContactForm = () => {
    return (
        <Box className="lg:col-span-7 bg-primary border border-secondary/10 p-8 lg:p-12 rounded-2xl h-full shadow-lg">
            <Typography color='secondary' variant="h3" size="h3" className="mb-4 font-bold">
                {CONTACT_DATA.formTitle}
            </Typography>
            <Typography color='light' className="mb-8">
                {CONTACT_DATA.formDescription}
            </Typography>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="text"
                        placeholder={CONTACT_DATA.formLabels.name}
                        required
                    />
                    <Input
                        type="email"
                        placeholder={CONTACT_DATA.formLabels.email}
                        required
                    />
                </div>
                <Input
                    type="text"
                    placeholder={CONTACT_DATA.formLabels.subject}
                    required
                />
                <TextArea
                    rows={6}
                    placeholder={CONTACT_DATA.formLabels.message}
                    required
                />

                <div className="text-center">
                    <Button
                        type="submit"
                        className="px-10 h-auto py-4 mx-auto flex items-center gap-2"
                    >
                        {CONTACT_DATA.formLabels.button}
                        <i className="bi bi-send"></i>
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default ContactForm;
