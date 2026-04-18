import connectDB from '@/config/mongodb';
import User from '@/server/models/User'; 
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const user = await User.findOne({ email: 'm.nawjha@gmail.com' });
    if (!user) return NextResponse.json({ error: 'User not found' });
    user.password = 'admin123!';
    await user.save();
    return NextResponse.json({ success: true, message: 'Password updated' });
}
