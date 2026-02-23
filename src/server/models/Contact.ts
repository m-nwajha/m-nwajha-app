import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Export the model, using a check to avoid re-defining it in development
if (mongoose.models.Contact) {
    delete mongoose.models.Contact;
}

const Contact = mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
