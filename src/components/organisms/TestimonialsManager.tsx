'use client';

import React, { useState } from 'react';
import { Table, THead, TBody, TR, TH, TD, Button, Badge, Box, useToast, Typography } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import DashboardTestimonialForm from './DashboardTestimonialForm';
import { AnimatePresence } from 'framer-motion';
import { CN } from '@/utils/className';

import DashboardManagerHeader from '../molecules/DashboardManagerHeader';
import DashboardActionButtons from '../molecules/DashboardActionButtons';

interface TestimonialsManagerProps {
    initialTestimonials: any[];
}

const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({ initialTestimonials }) => {
    const { showToast } = useToast();
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [showForm, setShowForm] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
    const { del, patch, isLoading } = useAPI('/api/testimonials');

    const handleDelete = async (id: string) => {
        const item = testimonials.find(t => t._id === id);
        if (window.confirm(`هل أنت متأكد من حذف تقييم " ${item?.name || ''} "؟`)) {
            try {
                await del(id);
                setTestimonials(testimonials.filter(t => t._id !== id));
                showToast(`تم حذف التقييم بنجاح`, 'success');
            } catch (error) {
                showToast('فشل حذف التقييم', 'error');
            }
        }
    };

    const handleToggleVerification = async (id: string) => {
        try {
            const res = await patch(null, false, id);
            if (res && res.success) {
                setTestimonials(testimonials.map(t => t._id === id ? res.data : t));
                showToast(res.data.verified ? 'تم تفعيل التقييم' : 'تم تعطيل التقييم', 'success');
            }
        } catch (error) {
            showToast('فشل تحديث حالة التقييم', 'error');
        }
    };

    const handleSuccess = (newTestimonial: any) => {
        if (editingTestimonial) {
            setTestimonials(testimonials.map(t => t._id === newTestimonial._id ? newTestimonial : t));
        } else {
            setTestimonials([newTestimonial, ...testimonials]);
        }
        setShowForm(false);
        setEditingTestimonial(null);
    };

    return (
        <Box className="space-y-6">
            <DashboardManagerHeader
                title="أراء العملاء"
                subtitle="إدارة التقييمات وتفعيلها للظهور على الموقع"
                icon="bi-chat-heart"
                count={testimonials.length}
                addButtonLabel="إضافة تقييم يدوي"
                onAdd={() => {
                    setEditingTestimonial(null);
                    setShowForm(true);
                }}
            />

            <Table>
                <THead>
                    <TR>
                        <TH>العميل</TH>
                        <TH>التقييم</TH>
                        <TH>الحالة</TH>
                        <TH>التاريخ</TH>
                        <TH className="text-center">الإجراءات</TH>
                    </TR>
                </THead>
                <TBody>
                    {testimonials.map((item) => (
                        <TR key={item._id}>
                            <TD>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-secondary font-bold uppercase">{item.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white leading-tight">{item.name}</span>
                                        <span className="text-[11px] text-light/40 italic">{item.role} {item.company ? `@ ${item.company}` : ''}</span>
                                    </div>
                                </div>
                            </TD>
                            <TD>
                                <div className="flex items-center gap-1.5 bg-amber-500/5 px-2 py-1 rounded-lg border border-amber-500/10 w-fit">
                                    <i className="bi bi-star-fill text-amber-500 text-[10px]"></i>
                                    <span className="text-amber-500 font-bold text-sm">{item.rating}</span>
                                </div>
                            </TD>
                            <TD>
                                <button
                                    onClick={() => handleToggleVerification(item._id)}
                                    className="hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Badge variant={item.verified ? 'success' : 'outline'} className={CN(!item.verified && "opacity-50")}>
                                        {item.verified ? 'مفعل' : 'مخفي'}
                                    </Badge>
                                </button>
                            </TD>
                            <TD className="text-[11px] text-light/40">
                                {new Date(item.createdAt).toLocaleDateString('ar-EG')}
                            </TD>
                            <TD>
                                <DashboardActionButtons
                                    onEdit={() => {
                                        setEditingTestimonial(item);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => handleDelete(item._id)}
                                    isLoading={isLoading}
                                />
                            </TD>
                        </TR>
                    ))}
                    {testimonials.length === 0 && (
                        <TR>
                            <TD  className="text-center py-20 text-light/40 italic">
                                لا توجد تقييمات حالياً.. سيظهر هنا أي تقييم يتم إرساله من الموقع العام.
                            </TD>
                        </TR>
                    )}
                </TBody>
            </Table>

            <AnimatePresence>
                {showForm && (
                    <DashboardTestimonialForm
                        testimonial={editingTestimonial}
                        onClose={() => {
                            setShowForm(false);
                            setEditingTestimonial(null);
                        }}
                        onSuccess={handleSuccess}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
};

export default TestimonialsManager;
