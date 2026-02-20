import { NextRequest } from 'next/server';
import connectDB from '@/config/mongodb';
import { getPortfolioItems, createPortfolioItem } from '@/server/controllers/portfolioController';

export async function GET() {
    await connectDB();
    return getPortfolioItems();
}

export async function POST(req: NextRequest) {
    await connectDB();
    return createPortfolioItem(req);
}