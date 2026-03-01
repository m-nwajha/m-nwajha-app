'use client';

import { useState } from 'react';
import { Box, Typography, Button, Input, TextArea, useToast } from '../ui';
import { CONTACT_DATA } from '@/constants/contact';
import useAPI from '@/hooks/useAPI';
import { ENDPOINTS } from '@/constants/endpoints';

const ContactForm = () => {
    const { post, isLoading } = useAPI();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const web3formsBody = {
            ...formData, access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
        };
        try {
            await Promise.all([
                post(web3formsBody, process.env.NEXT_PUBLIC_WEB3FORMS_API_URL),
                post(formData, ENDPOINTS.contacts)
            ]);
            showToast('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً.', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            showToast('عذراً، حدث خطأ ما أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
        }
    };

    return (
        <Box className="lg:col-span-7 bg-primary border border-secondary/10 p-8 lg:p-12 rounded-2xl h-full shadow-lg">
            <Typography color='secondary' variant="h3" size="h3" className="mb-4 font-bold">
                {CONTACT_DATA.formTitle}
            </Typography>
            <Typography color='light' className="mb-8">
                {CONTACT_DATA.formDescription}
            </Typography>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="text"
                        placeholder={CONTACT_DATA.formLabels.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        type="email"
                        placeholder={CONTACT_DATA.formLabels.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <Input
                    type="text"
                    placeholder={CONTACT_DATA.formLabels.subject}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                />
                <TextArea
                    rows={6}
                    placeholder={CONTACT_DATA.formLabels.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                />

                <div className="text-center">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="px-10 h-auto py-4 mx-auto flex items-center gap-2"
                    >
                        {isLoading ? 'جاري الإرسال...' : CONTACT_DATA.formLabels.button}
                        {!isLoading && <i className="bi bi-send"></i>}
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default ContactForm;
