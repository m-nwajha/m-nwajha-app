'use client';
import { Container, Grid } from '../ui';
import PortfolioDetailsMedia from '../molecules/PortfolioDetailsMedia';
import PortfolioDetailsContent from '../molecules/PortfolioDetailsContent';
import { motion } from 'framer-motion';

interface PortfolioDetailsProps {
    project: {
        _id: string;
        title: string;
        category: string;
        image: string;
        client?: string;
        date?: string;
        projectUrl?: string;
        githubUrl?: string;
        description?: string;
        overview?: string;
        challenge?: string;
        solutions?: string;
        techStack?: string[];
        features?: string[];
        gallery?: string[];
        accordionItems?: { title: string; icon: string; content: string; }[];
        nextProjectId?: string | null;
        prevProjectId?: string | null;
        rating?: number;
        createdAt?: string;
    };
}

const PortfolioDetails = ({ project }: PortfolioDetailsProps) => {
    if (!project) return null;

    // Combine main image with gallery for the slider
    const allImages = [project.image, ...(project.gallery || [])];

    return (
        <Container className="relative z-10 py-24">
            <Grid gap={12} sm={1} md={1} lg={2} className="items-start">
                {/* Media Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <PortfolioDetailsMedia
                        images={allImages}
                        techStack={project.techStack}
                    />
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <PortfolioDetailsContent
                        projectId={project._id}
                        title={project.title}
                        category={project.category}
                        client={project.client}
                        date={project.date}
                        projectUrl={project.projectUrl}
                        githubUrl={project.githubUrl}
                        description={project.description}
                        overview={project.overview}
                        challenge={project.challenge}
                        solutions={project.solutions}
                        features={project.features}
                        accordionItems={project.accordionItems}
                        nextProjectId={project.nextProjectId}
                        prevProjectId={project.prevProjectId}
                        initialRating={project.rating}
                        createdAt={project.createdAt}
                    />
                </motion.div>
            </Grid>
        </Container>
    );
};

export default PortfolioDetails;
