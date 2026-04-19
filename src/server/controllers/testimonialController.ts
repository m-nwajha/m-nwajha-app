import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import Testimonial from '../models/Testimonial';
import { statusCode } from '@/constants/server/statusCode';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

export const getTestimonials = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const verifiedOnly = searchParams.get('verified') === 'true';

        const query = verifiedOnly ? { verified: true } : {};
        const items = await Testimonial.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, count: items.length, data: items });
    } catch (error: any) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch testimonials' },
            { status: statusCode.INTERNAL_SERVER_ERROR || 500 }
        );
    }
};

export const createTestimonial = async (req: NextRequest) => {
    try {
        const contentType = req.headers.get('content-type');
        let data: any = {};

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData();
            data.name = formData.get('name') as string;
            data.role = formData.get('role') as string;
            data.company = formData.get('company') as string;
            data.content = formData.get('content') as string;
            data.rating = parseInt(formData.get('rating') as string) || 5;
            data.verified = formData.get('verified') === 'true';

            const avatarFile = formData.get('avatar');
            if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
                const uploadResult = await uploadToCloudinary(avatarFile);
                data.avatar = uploadResult.secure_url;
            } else if (typeof avatarFile === 'string') {
                data.avatar = avatarFile;
            }
        } else {
            data = await req.json();
        }

        const newItem = await Testimonial.create(data);
        revalidatePath('/');
        revalidatePath('/dashboard/testimonials');
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create testimonial' },
            { status: 400 }
        );
    }
};

export const updateTestimonial = async (id: string, req: NextRequest) => {
    try {
        const contentType = req.headers.get('content-type');
        let updateData: any = {};

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData();
            ['name', 'role', 'company', 'content', 'rating', 'verified'].forEach(key => {
                const val = formData.get(key);
                if (val !== null) {
                    if (key === 'rating') updateData[key] = parseInt(val as string);
                    else if (key === 'verified') updateData[key] = val === 'true';
                    else updateData[key] = val;
                }
            });

            const avatarFile = formData.get('avatar');
            if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
                const uploadResult = await uploadToCloudinary(avatarFile);
                updateData.avatar = uploadResult.secure_url;
            } else if (typeof avatarFile === 'string') {
                updateData.avatar = avatarFile;
            }
        } else {
            updateData = await req.json();
        }

        const item = await Testimonial.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
        }

        revalidatePath('/');
        revalidatePath('/dashboard/testimonials');
        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update testimonial' },
            { status: 400 }
        );
    }
};

export const deleteTestimonial = async (id: string) => {
    try {
        const item = await Testimonial.findByIdAndDelete(id);
        if (!item) {
            return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
        }
        revalidatePath('/');
        revalidatePath('/dashboard/testimonials');
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};

export const toggleTestimonialVerification = async (id: string) => {
    try {
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
            return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
        }

        testimonial.verified = !testimonial.verified;
        await testimonial.save();

        revalidatePath('/');
        revalidatePath('/dashboard/testimonials');
        return NextResponse.json({ success: true, data: testimonial });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
};
