import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    category: string;
    filter: string;
    rating?: number;
    image?: string;
    description: string;
    content?: string;
    tag: string[];
    link?: string;
    detailsLink?: string;
    videoUrl?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        filter: { type: String, required: true },
        rating: { type: Number, default: 0 },
        image: { type: String },
        description: { type: String, required: true },
        content: { type: String },
        tag: { type: [String], default: [] },
        link: { type: String },
        detailsLink: { type: String },
        videoUrl: { type: String },
        verified: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// Export the model, using a check to avoid re-defining it in development
if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
