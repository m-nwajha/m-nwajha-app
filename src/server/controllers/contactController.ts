import { NextRequest, NextResponse } from 'next/server';
import Contact from '../models/Contact';
import connectDB from '@/config/mongodb';

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
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};
