import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String, default: '' },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'admin' },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw error;
    }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Force model recreation in development to reflect schema changes
if (process.env.NODE_ENV !== 'production') {
    delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
