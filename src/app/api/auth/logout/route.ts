import { NextResponse } from 'next/server';
import { logout } from '@/server/controllers/authController';

export async function POST() {
    return logout();
}
