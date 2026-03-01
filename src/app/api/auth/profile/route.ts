import { NextRequest } from 'next/server';
import { updateProfile } from '@/server/controllers/authController';

export async function PATCH(req: NextRequest) {
    return updateProfile(req);
}
