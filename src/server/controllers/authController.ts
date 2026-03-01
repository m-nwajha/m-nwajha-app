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
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                image: user.image || '',
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

        const userData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image || '',
            role: user.role,
        };

        return NextResponse.json({ success: true, data: userData });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'توكن غير صالح' }, { status: 401 });
    }
};

export const updateProfile = async (req: NextRequest) => {
    try {
        await connectDB();
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: 'غير مصرح لك بالوصول' }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            console.error('User not found by ID:', decoded.id);
            return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 });
        }

        console.log('User found in DB for update:', { id: user._id, email: user.email, name: user.name });

        const contentType = req.headers.get('content-type') || '';
        let updateData: any = {};

        console.log('Update Profile - Content Type:', contentType);

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            console.log('FormData received keys:', Array.from(formData.keys()));

            const name = formData.get('name');
            const email = formData.get('email');

            if (name) updateData.name = name.toString();
            if (email) updateData.email = email.toString();

            const imageFile = formData.get('image');
            if (imageFile && typeof imageFile !== 'string' && (imageFile as any).size > 0) {
                console.log('Uploading image to Cloudinary...', (imageFile as any).name);
                const { uploadToCloudinary } = await import('../utils/cloudinaryUpload');
                try {
                    const result = await uploadToCloudinary(imageFile as any, 'avatars');
                    console.log('Cloudinary upload success:', result.secure_url);
                    updateData.image = result.secure_url;
                } catch (uploadError) {
                    console.error('Cloudinary upload error:', uploadError);
                    throw uploadError;
                }
            } else {
                console.log('No image file provided in FormData or invalid file type/size');
            }
        } else {
            const body = await req.json();
            console.log('JSON body received:', body);
            const { name, email, image } = body;
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (image !== undefined) updateData.image = image;
        }

        console.log('Final UpdateData to apply:', updateData);

        // Apply updates to the user object
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;
        if (updateData.image !== undefined) user.image = updateData.image;

        // Save the user (this will trigger schema validation and use the latest model definition)
        const updatedUser = await user.save();

        console.log('Database Update SUCCESS. Saved User document:', {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image ? 'URL PRESENT: ' + updatedUser.image : 'IMAGE STILL EMPTY'
        });

        const finalUserData = {
            id: updatedUser._id.toString(),
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image || '',
            role: updatedUser.role,
        };

        return NextResponse.json({ success: true, data: finalUserData });
    } catch (error: any) {
        console.error('Update profile error:', error);
        return NextResponse.json({ success: false, error: error.message || 'حدث خطأ ما أثناء تحديث الملف الشخصي' }, { status: 500 });
    }
};

export const updatePassword = async (req: NextRequest) => {
    try {
        await connectDB();
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: 'غير مصرح لك بالوصول' }, { status: 401 });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 });
        }

        const { currentPassword, newPassword } = await req.json();

        // Check current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return NextResponse.json({ success: false, error: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 });
        }

        // Set new password (it will be hashed by pre-save middleware)
        user.password = newPassword;
        await user.save();

        return NextResponse.json({ success: true, message: 'تم تغيير كلمة المرور بنجاح' });
    } catch (error: any) {
        console.error('Update password error:', error);
        return NextResponse.json({ success: false, error: error.message || 'حدث خطأ ما أثناء تغيير كلمة المرور' }, { status: 500 });
    }
};
