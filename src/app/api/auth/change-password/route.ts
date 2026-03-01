import { NextRequest } from 'next/server';
import { updatePassword } from '@/server/controllers/authController';

export async function POST(req: NextRequest) {
    return updatePassword(req);
}
