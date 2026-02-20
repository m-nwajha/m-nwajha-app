import cloudinary from '../../config/cloudinary';
import { allowedMimeTypes } from '../../constants/server/mimeTypes';

export const uploadToCloudinary = async (file: File, folder: string = 'uploads'): Promise<any> => {
    if (!allowedMimeTypes.includes(file.type)) {
        throw new Error('يسمح فقط برفع صور أو ملفات PDF/Word');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: file.type.startsWith('image/') ? 'image' : 'raw',
                public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(buffer);
    });
};
