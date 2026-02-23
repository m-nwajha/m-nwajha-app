import { NextRequest } from 'next/server';
import { getMe } from '@/server/controllers/authController';

export async function GET(req: NextRequest) {
    return getMe(req);
}
