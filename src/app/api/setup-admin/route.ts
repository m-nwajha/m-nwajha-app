import { NextResponse } from 'next/server';
import connectDB from '@/config/mongodb';
import User from '@/server/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectDB();

        const email = 'm.nawjha@gmail.com';
        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            return NextResponse.json({ message: 'Admin user already exists!' }, { status: 200 });
        }

        const rawPassword = 'AdminPassword123!';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        const newAdmin = new User({
            name: 'Mohamed ALnawjha',
            email: email,
            password: hashedPassword,
            role: 'admin',
        });

        await newAdmin.save();

        return NextResponse.json({
            message: 'Admin user created successfully!',
            email: email,
            password: rawPassword,
            note: 'Please store this password safely and change it from the dashboard later.'
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
