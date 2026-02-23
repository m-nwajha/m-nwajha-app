import { NextRequest, NextResponse } from 'next/server';
import User from '../models/User';
import connectDB from '@/config/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: NextRequest) => {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, { status: 401 });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json({ success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, { status: 401 });
        }

        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set cookie
        const response = NextResponse.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/'
        });

        return response;
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, error: 'حدث خطأ ما أثناء تسجيل الدخول' }, { status: 500 });
    }
};

export const logout = async () => {
    const response = NextResponse.json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
    });
    return response;
};

export const getMe = async (req: NextRequest) => {
    try {
        await connectDB();
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: 'غير مصرح لك بالوصول' }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'توكن غير صالح' }, { status: 401 });
    }
};
