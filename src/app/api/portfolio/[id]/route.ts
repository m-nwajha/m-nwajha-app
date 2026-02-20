import { NextRequest } from 'next/server';
import connectDB from '@/config/mongodb';
import { getPortfolioItemById, updatePortfolioRating, updatePortfolioItem, deletePortfolioItem } from '@/server/controllers/portfolioController';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    await connectDB();
    const { id } = await params;
    return getPortfolioItemById(id);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    await connectDB();
    const { id } = await params;
    return updatePortfolioRating(id, req);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    await connectDB();
    const { id } = await params;
    return updatePortfolioItem(id, req);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; }>; }
) {
    await connectDB();
    const { id } = await params;
    return deletePortfolioItem(id);
}
