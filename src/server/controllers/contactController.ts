import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import Contact from '../models/Contact';
import connectDB from '@/config/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const getContacts = async (req: NextRequest) => {
    try {
        await connectDB();
        const items = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: items });
    } catch (error: any) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
};

export const createContact = async (req: NextRequest) => {
    try {
        await connectDB();
        const data = await req.json();
        const newItem = await Contact.create(data);

        // Send Email via Resend
        try {
            await resend.emails.send({
                from: 'Contact Nawjha Tech <noreply@resend.dev>',
                to: 'm.nawjha@gmail.com',
                subject: `New Message: ${data.subject}`,
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center;">
                            <h1 style="color: #38bdf8; margin: 0; font-size: 24px; letter-spacing: 1px;">رسالة جديدة</h1>
                            <p style="color: #94a3b8; margin: 10px 0 0; font-size: 14px;">لقد تلقيت رسالة تواصل جديدة من موقعك</p>
                        </div>
                        <div style="padding: 30px; color: #334155;">
                            <div style="margin-bottom: 25px;">
                                <h3 style="color: #0f172a; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">معلومات المرسل</h3>
                                <p style="margin: 8px 0;"><strong>الاسم:</strong> <br /> ${data.name}</p>
                                <p style="margin: 8px 0;"><strong>البريد الإلكتروني:</strong> <br /> <a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a></p>
                                <p style="margin: 8px 0;"><strong>الموضوع:</strong> <br /> ${data.subject}</p>
                            </div>
                            <div>
                                <h3 style="color: #0f172a; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">نص الرسالة</h3>
                                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #f1f5f9; line-height: 1.6; color: #475569; white-space: pre-wrap;">${data.message}</div>
                            </div>
                        </div>
                        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
                            تحياتي،<br>
                            نظام إدارة المحتوى - Nawjha Tech
                        </div>
                    </div>
                `
            });
        } catch (emailError) {
            console.error('Resend Email Error:', emailError);
            // We don't fail the request if email fails, but we log it
        }

        revalidatePath('/dashboard/contacts');
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating contact:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to send message' },
            { status: 400 }
        );
    }
};

export const updateContactStatus = async (id: string, req: NextRequest) => {
    try {
        await connectDB();
        const { isRead } = await req.json();
        const item = await Contact.findByIdAndUpdate(id, { isRead }, { new: true });
        if (!item) {
            return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
        }
        revalidatePath('/dashboard/contacts');
        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};

export const deleteContact = async (id: string) => {
    try {
        await connectDB();
        const item = await Contact.findByIdAndDelete(id);
        if (!item) {
            return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
        }
        revalidatePath('/dashboard/contacts');
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};
