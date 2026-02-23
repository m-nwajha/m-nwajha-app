'use client';

import React, { useState } from 'react';
import { Table, THead, TBody, TR, TH, TD, Badge, Box, useToast } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import DashboardManagerHeader from '../molecules/DashboardManagerHeader';
import DashboardActionButtons from '../molecules/DashboardActionButtons';
import { ENDPOINTS } from '@/constants/endpoints';

interface ContactsManagerProps {
    initialContacts: any[];
}

const ContactsManager: React.FC<ContactsManagerProps> = ({ initialContacts }) => {
    const { showToast } = useToast();
    const [contacts, setContacts] = useState(initialContacts);
    const { del, patch, isLoading } = useAPI(ENDPOINTS.contacts);
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const formatDate = (dateString: string) => {
        if (!isMounted) return '';
        return new Date(dateString).toLocaleString('ar-EG');
    };

    const handleDelete = async (id: string) => {
        const contact = contacts.find(c => c._id === id);
        if (window.confirm(`هل أنت متأكد من حذف رسالة "${contact?.name || ''}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
            try {
                await del(id);
                setContacts(contacts.filter(c => c._id !== id));
                showToast(`تم حذف الرسالة بنجاح`, 'success');
            } catch (error) {
                console.error('Failed to delete contact:', error);
                showToast('فشل حذف الرسالة. حاول مرة أخرى.', 'error');
            }
        }
    };

    const toggleReadStatus = async (id: string, currentStatus: boolean) => {
        try {
            await patch({ isRead: !currentStatus }, false, id);
            setContacts(contacts.map(c => c._id === id ? { ...c, isRead: !currentStatus } : c));
            showToast('تم تحديث حالة الرسالة', 'success');
        } catch (error) {
            console.error('Failed to update status:', error);
            showToast('فشل تحديث حالة الرسالة', 'error');
        }
    };

    return (
        <Box className="contacts-manager space-y-6">
            <DashboardManagerHeader
                title="إدارة رسائل التواصل"
                subtitle="راجع رسائل الزوار وطلبات التواصل"
                icon="bi-envelope"
                count={contacts.length}
            />

            <Table>
                <THead>
                    <TR>
                        <TH>المرسل</TH>
                        <TH>الموضوع</TH>
                        <TH>الرسالة</TH>
                        <TH>الحالة</TH>
                        <TH>التاريخ</TH>
                        <TH className="text-center">الإجراءات</TH>
                    </TR>
                </THead>
                <TBody>
                    {contacts.map((contact) => (
                        <TR key={contact._id} className={!contact.isRead ? 'bg-secondary/5' : ''}>
                            <TD>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">{contact.name}</span>
                                    <span className="text-[10px] text-light/40">{contact.email}</span>
                                </div>
                            </TD>
                            <TD className="text-light/80 font-medium">
                                {contact.subject}
                            </TD>
                            <TD>
                                <span className="text-[10px] text-light/40 line-clamp-2 max-w-[300px]">
                                    {contact.message}
                                </span>
                            </TD>
                            <TD>
                                <Badge
                                    variant={contact.isRead ? 'outline' : 'secondary'}
                                    className={`text-xs cursor-pointer ${contact.isRead ? 'border-light/20 text-light/40' : 'font-bold'}`}
                                    onClick={() => toggleReadStatus(contact._id, contact.isRead)}
                                >
                                    {contact.isRead ? 'تمت القراءة' : 'جديدة'}
                                </Badge>
                            </TD>
                            <TD className="text-light/40 text-[10px]">
                                {formatDate(contact.createdAt)}
                            </TD>
                            <TD>
                                <DashboardActionButtons
                                    onDelete={() => handleDelete(contact._id)}
                                    isLoading={isLoading}
                                />
                            </TD>
                        </TR>
                    ))}
                    {contacts.length === 0 && (
                        <TR>
                            <TD className="text-center py-20 text-light/40 italic">
                                لا توجد رسائل حالياً.
                            </TD>
                        </TR>
                    )}
                </TBody>
            </Table>
        </Box>
    );
};

export default ContactsManager;
