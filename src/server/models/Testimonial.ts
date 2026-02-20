import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
    avatar?: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
}, {
    timestamps: true
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
