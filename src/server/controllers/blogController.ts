import { NextRequest, NextResponse } from 'next/server';
import Blog from '../models/Blog';
import connectDB from '@/config/mongodb';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

export const getBlogs = async (req: NextRequest) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        // Pagination params
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
        const skip = (page - 1) * limit;

        // Filtering & Search params
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const tag = searchParams.get('tag');

        let query: any = { verified: true };

        if (category && category !== '*') {
            query.filter = category; // Mapping from slug/id in FilterBar
        }

        if (tag) {
            query.tag = tag;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        const items = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: items,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
};

export const getBlogById = async (id: string) => {
    try {
        await connectDB();
        const item = await Blog.findById(id);
        if (!item) {
            return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};

export const createBlog = async (req: NextRequest) => {
    try {
        await connectDB();
        const contentType = req.headers.get('content-type');
        let data: any = {};

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData();
            data.title = formData.get('title') as string;
            data.category = formData.get('category') as string;
            data.filter = formData.get('filter') as string;
            data.description = formData.get('description') as string;
            data.content = formData.get('content') as string;
            data.link = formData.get('link') as string;
            data.videoUrl = formData.get('videoUrl') as string;
            data.rating = parseFloat(formData.get('rating') as string) || 5;

            const tagRaw = formData.get('tag') as string;
            data.tag = tagRaw ? tagRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

            const imageFile = formData.get('image');
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                const uploadResult = await uploadToCloudinary(imageFile);
                data.image = uploadResult.secure_url;
            } else if (typeof imageFile === 'string' && imageFile.startsWith('http')) {
                data.image = imageFile;
            }
        } else {
            data = await req.json();
        }

        const newItem = await Blog.create(data);
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating blog:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create blog' },
            { status: 400 }
        );
    }
};

export const updateBlog = async (id: string, req: NextRequest) => {
    try {
        await connectDB();
        const contentType = req.headers.get('content-type');
        let updateData: any = {};

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData();
            ['title', 'category', 'filter', 'description', 'content', 'link', 'videoUrl'].forEach(key => {
                const val = formData.get(key);
                if (val !== null) updateData[key] = val;
            });

            const ratingVal = formData.get('rating');
            if (ratingVal !== null) updateData.rating = parseFloat(ratingVal as string);

            const tagRaw = formData.get('tag') as string;
            if (tagRaw !== null) {
                updateData.tag = tagRaw.split(',').map((s: string) => s.trim()).filter(Boolean);
            }

            const imageFile = formData.get('image');
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                const uploadResult = await uploadToCloudinary(imageFile);
                updateData.image = uploadResult.secure_url;
            } else if (typeof imageFile === 'string' && imageFile.startsWith('http')) {
                updateData.image = imageFile;
            }
        } else {
            updateData = await req.json();
        }

        const item = await Blog.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        console.error('Error updating blog:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update blog' },
            { status: 400 }
        );
    }
};

export const deleteBlog = async (id: string) => {
    try {
        await connectDB();
        const item = await Blog.findByIdAndDelete(id);
        if (!item) {
            return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
};
