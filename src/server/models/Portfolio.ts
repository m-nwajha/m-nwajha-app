import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IPortfolio extends Document {
    title: string;
    category: string;
    image?: string;
    detailsLink?: string;
    rating?: number;
    description?: string;
    overview?: string;
    challenge?: string;
    solutions?: string;
    client?: string;
    projectUrl?: string;
    githubUrl?: string;
    techStack?: string[];
    features?: string[];
    gallery?: string[];
    accordionItems?: { content: string; }[];
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String },
        detailsLink: { type: String },
        rating: { type: Number, default: 0 },
        description: { type: String },
        overview: { type: String },
        challenge: { type: String },
        solutions: { type: String },
        client: { type: String },
        projectUrl: { type: String },
        githubUrl: { type: String },
        techStack: { type: [String], default: [] },
        features: { type: [String], default: [] },
        gallery: { type: [String], default: [] },
        accordionItems: [
            {
                content: { type: String },
            }
        ],
    },
    {
        timestamps: true,
    }
);

// Export the model, using a check to avoid re-defining it in development
if (mongoose.models.Portfolio) {
    delete mongoose.models.Portfolio;
}

const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
