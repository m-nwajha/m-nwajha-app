import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '../models/Portfolio';
import { statusCode } from '@/constants/server/statusCode';

export const getPortfolioItems = async () => {
    try {
        const items = await Portfolio.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, count: items.length, data: items });
    } catch (error: any) {
        console.error('Error fetching portfolio items:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch portfolio items' },
            { status: statusCode.INTERNAL_SERVER_ERROR }
        );
    }
};

import { uploadToCloudinary } from '../utils/cloudinaryUpload';

export const createPortfolioItem = async (req: NextRequest) => {
    try {
        console.log('🚀 API: Creating Portfolio Item...');
        const contentType = req.headers.get('content-type');
        let projectData: any = {};

        if (contentType?.includes('multipart/form-data')) {
            console.log('📦 Content: multipart/form-data');
            const formData = await req.formData();

            // Extract text fields manually to avoid binary data issues
            projectData.title = formData.get('title') as string;
            projectData.category = formData.get('category') as string;
            projectData.description = formData.get('description') as string;
            projectData.overview = formData.get('overview') as string;
            projectData.challenge = formData.get('challenge') as string;
            projectData.solutions = formData.get('solutions') as string;
            projectData.client = formData.get('client') as string;
            projectData.projectUrl = formData.get('projectUrl') as string;
            projectData.githubUrl = formData.get('githubUrl') as string;

            // Handle main image upload
            const imageFile = formData.get('image');
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                console.log('🖼️ Uploading main image to Cloudinary...', imageFile.name);
                try {
                    const uploadResult = await uploadToCloudinary(imageFile);
                    projectData.image = uploadResult.secure_url;
                } catch (uploadError) {
                    console.error('❌ Cloudinary Main Image Error:', uploadError);
                }
            } else if (typeof imageFile === 'string') {
                projectData.image = imageFile;
            }

            // Handle Gallery Image uploads
            const galleryFiles = formData.getAll('gallery');
            const galleryUrls: string[] = [];

            // Add existing gallery URLs if any (sent as JSON string)
            const existingGalleryStr = formData.get('existingGallery') as string;
            if (existingGalleryStr) {
                try {
                    const existing = JSON.parse(existingGalleryStr);
                    if (Array.isArray(existing)) galleryUrls.push(...existing);
                } catch (e) { }
            }

            if (galleryFiles.length > 0) {
                console.log(`🖼️ Uploading ${galleryFiles.length} gallery images...`);
                for (const file of galleryFiles) {
                    if (file instanceof File && file.size > 0) {
                        try {
                            const res = await uploadToCloudinary(file);
                            galleryUrls.push(res.secure_url);
                        } catch (e) {
                            console.error('❌ Gallery Upload Error:', e);
                        }
                    } else if (typeof file === 'string') {
                        galleryUrls.push(file);
                    }
                }
            }
            projectData.gallery = galleryUrls;

            // Parse JSON-stringified arrays
            ['techStack', 'features', 'accordionItems'].forEach(field => {
                const value = formData.get(field);
                if (value && typeof value === 'string') {
                    try {
                        projectData[field] = JSON.parse(value);
                    } catch (e) {
                        console.warn(`⚠️ Failed to parse field ${field}:`, value);
                    }
                }
            });
        } else {
            console.log('📦 Content: JSON');
            projectData = await req.json();
        }

        console.log('💾 Saving to MongoDB...', projectData.title);
        const newItem = await Portfolio.create(projectData);
        console.log('✨ Portfolio item created successfully');
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
    } catch (error: any) {
        console.error('❌ SERVER ERROR (createPortfolioItem):', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create portfolio item' },
            { status: statusCode.INTERNAL_SERVER_ERROR || 500 }
        );
    }
};

export const getPortfolioItemById = async (id: string) => {
    try {
        const item = await Portfolio.findById(id);
        if (!item) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        // Find the next project (the one created just before this one, since we sort by -1)
        const nextProject = await Portfolio.findOne({
            createdAt: { $lt: item.createdAt }
        })
            .sort({ createdAt: -1 })
            .select('_id');

        // Find the previous project (the one created just after this one)
        const prevProject = await Portfolio.findOne({
            createdAt: { $gt: item.createdAt }
        })
            .sort({ createdAt: 1 })
            .select('_id');

        return NextResponse.json({
            success: true,
            data: {
                ...item.toObject(),
                nextProjectId: nextProject ? nextProject._id : null,
                prevProjectId: prevProject ? prevProject._id : null
            }
        });
    } catch (error: any) {
        console.error('Error fetching portfolio item by ID:', error);
        return NextResponse.json(
            { success: false, error: 'Invalid Project ID or Server Error' },
            { status: 500 }
        );
    }
};

export const updatePortfolioRating = async (id: string, req: NextRequest) => {
    try {
        const { rating } = await req.json();

        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            return NextResponse.json(
                { success: false, error: 'Invalid rating value. Must be between 0 and 5.' },
                { status: 400 }
            );
        }

        const item = await Portfolio.findByIdAndUpdate(
            id,
            { rating },
            { new: true, runValidators: true }
        );

        if (!item) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        console.error('Error updating portfolio rating:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update rating' },
            { status: 500 }
        );
    }
};
export const updatePortfolioItem = async (id: string, req: NextRequest) => {
    try {
        console.log(`🚀 API: Updating Portfolio Item ${id}...`);
        const contentType = req.headers.get('content-type');
        let updateData: any = {};

        if (contentType?.includes('multipart/form-data')) {
            const formData = await req.formData();

            // Extract text fields
            ['title', 'category', 'description', 'overview', 'challenge', 'solutions', 'client', 'projectUrl', 'githubUrl'].forEach(key => {
                const val = formData.get(key);
                if (val !== null) updateData[key] = val;
            });

            // Handle main image
            const imageFile = formData.get('image');
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                const uploadResult = await uploadToCloudinary(imageFile);
                updateData.image = uploadResult.secure_url;
            } else if (typeof imageFile === 'string') {
                updateData.image = imageFile;
            }

            // Handle Gallery
            const galleryFiles = formData.getAll('gallery');
            const galleryUrls: string[] = [];

            const existingGalleryStr = formData.get('existingGallery') as string;
            if (existingGalleryStr) {
                try {
                    const existing = JSON.parse(existingGalleryStr);
                    if (Array.isArray(existing)) galleryUrls.push(...existing);
                } catch (e) { }
            }

            if (galleryFiles.length > 0) {
                for (const file of galleryFiles) {
                    if (file instanceof File && file.size > 0) {
                        try {
                            const res = await uploadToCloudinary(file);
                            galleryUrls.push(res.secure_url);
                        } catch (e) { }
                    }
                }
            }
            // Only update gallery if we have new items or existing ones were sent
            if (galleryUrls.length > 0 || existingGalleryStr) {
                updateData.gallery = galleryUrls;
            }

            // Parse arrays
            ['techStack', 'features', 'accordionItems'].forEach(field => {
                const value = formData.get(field);
                if (value && typeof value === 'string') {
                    try {
                        updateData[field] = JSON.parse(value);
                    } catch (e) { }
                }
            });
        } else {
            updateData = await req.json();
        }

        const item = await Portfolio.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!item) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: item });
    } catch (error: any) {
        console.error('Error updating portfolio item:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update portfolio item' },
            { status: 400 }
        );
    }
};

export const deletePortfolioItem = async (id: string) => {
    try {
        const item = await Portfolio.findByIdAndDelete(id);
        if (!item) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        console.error('Error deleting portfolio item:', error);
        return NextResponse.json(
            { success: false, error: 'Server Error during deletion' },
            { status: 500 }
        );
    }
};
