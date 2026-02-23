import { NextRequest } from 'next/server';
import { updateContactStatus, deleteContact } from '@/server/controllers/contactController';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    const { id } = await params;
    return updateContactStatus(id, req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    const { id } = await params;
    return deleteContact(id);
}
