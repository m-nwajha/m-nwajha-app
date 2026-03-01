import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/config/mongodb';
import { getTestimonials, createTestimonial } from '@/server/controllers/testimonialController';

export async function GET(req: NextRequest) {
    await connectDB();
    return getTestimonials(req);
}

export async function POST(req: NextRequest) {
    await connectDB();
    return createTestimonial(req);
}
