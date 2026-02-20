import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/mongodb';
import { updateTestimonial, deleteTestimonial, toggleTestimonialVerification } from '@/server/controllers/testimonialController';

export async function PUT(req: NextRequest, { params }: { params: { id: string; }; }) {
    await connectDB();
    const { id } = await params;
    return updateTestimonial(id, req);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string; }; }) {
    await connectDB();
    const { id } = await params;
    return deleteTestimonial(id);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string; }; }) {
    await connectDB();
    const { id } = await params;
    return toggleTestimonialVerification(id);
}
