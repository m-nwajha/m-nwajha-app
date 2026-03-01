import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

import { getContacts, createContact } from '@/server/controllers/contactController';

export async function GET(req: NextRequest) {
    return getContacts(req);
}

export async function POST(req: NextRequest) {
    return createContact(req);
}
