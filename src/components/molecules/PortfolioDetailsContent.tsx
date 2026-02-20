'use client';
import { Badge, Typography, Button } from '../ui';
import { CN } from '@/utils/className';
import Link from 'next/link';
import PortfolioRatingScale from '../atoms/PortfolioRatingScale';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface PortfolioDetailsContentProps {
    projectId: string;
    title: string;
    category: string;
    client?: string;
    date?: string;
    projectUrl?: string;
    githubUrl?: string;
    description?: string;
    overview?: string;
    challenge?: string;
    solutions?: string;
    features?: string[];
    accordionItems?: { content: string; }[];
    nextProjectId?: string | null;
    prevProjectId?: string | null;
    initialRating?: number;
    createdAt?: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
} as const;

const PortfolioDetailsContent: FC<PortfolioDetailsContentProps> = ({
    projectId,
    title,
    category,
    client,
    date,
    projectUrl,
    githubUrl,
    description,
    overview,
    challenge,
    solutions,
    features,
    accordionItems: dbAccordionItems,
    nextProjectId,
    prevProjectId,
    initialRating,
    createdAt,
}) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const baseDate = date || createdAt;
    const displayDate = baseDate
        ? new Date(baseDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'قريباً';

    const accordionItems = [
        {
            title: 'نظرة عامة على المشروع',
            icon: 'bi-clipboard-data',
            content: overview || dbAccordionItems?.[0]?.content || 'هذا المشروع يهدف إلى تقديم حلول مبتكرة في مجال التكنولوجيا المالية، مع التركيز على تجربة المستخدم والأمان العالي.',
        },
        {
            title: 'التحدي',
            icon: 'bi-exclamation-diamond',
            content: challenge || dbAccordionItems?.[1]?.content || 'كان التحدي الأكبر هو دمج أنظمة الدفع المتعددة مع الحفاظ على سرعة الاستجابة وبساطة الواجهة للمستخدم النهائي.',
        },
        {
            title: 'الحل',
            icon: 'bi-award',
            content: solutions || dbAccordionItems?.[2]?.content || 'قمنا بتطوير بنية تحتية سحابية مرنة واستخدام أحدث تقنيات الويب لضمان أداء مستقر وتغطية شاملة لجميع احتياجات العميل.',
        },
    ];

    return (
        <motion.div
            className="portfolio-details-content flex flex-col h-full lg:pl-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div className="project-meta flex flex-wrap justify-between items-center mb-6 gap-4" variants={itemVariants}>
                <div className="badge-wrapper">
                    <Badge variant="outline" className="text-secondary bg-secondary/10 border-secondary/20 font-semibold px-4 py-2">
                        {category}
                    </Badge>
                </div>
                <div className="date-client flex gap-6">
                    <div className="meta-item flex items-center text-sm text-light/70">
                        <i className="bi bi-calendar-check text-secondary ml-2"></i>
                        <span>{displayDate}</span>
                    </div>
                    <div className="meta-item flex items-center text-sm text-light/70">
                        <i className="bi bi-buildings text-secondary ml-2"></i>
                        <span>{client}</span>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h2" color='white' size="h2" className="font-bold mb-4 leading-tight">
                    {title}
                </Typography>
            </motion.div>

            <motion.div className="project-links flex flex-wrap gap-8 mb-6" variants={itemVariants}>
                <div className="project-website flex items-center">
                    <i className="bi bi-link-45deg text-2xl text-secondary ml-2"></i>
                    <a href={`https://${projectUrl}`} target="_blank" className="font-medium text-light hover:text-secondary transition-all hover:tracking-wider">
                        {projectUrl}
                    </a>
                </div>

                {githubUrl && (
                    <div className="project-github flex items-center">
                        <i className="bi bi-github text-xl text-secondary ml-2"></i>
                        <a href={githubUrl} target="_blank" className="font-medium text-light hover:text-secondary transition-all hover:tracking-wider">
                            GitHub Repository
                        </a>
                    </div>
                )}
            </motion.div>

            <div className="project-overview mb-10">
                <motion.div variants={itemVariants}>
                    <Typography className="lead text-lg leading-relaxed text-light/85 mb-6">
                        {description}
                    </Typography>
                </motion.div>

                <motion.div className="project-accordion space-y-3" variants={itemVariants}>
                    {accordionItems.map((item, index) => (
                        <div key={index} className="accordion-item overflow-hidden rounded-lg">
                            <button
                                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                                className={CN(
                                    "w-full flex items-center justify-between p-4 font-semibold text-left transition-all",
                                    openAccordion === index
                                        ? "bg-secondary/10 text-secondary"
                                        : "bg-white/5 text-white hover:bg-white/10"
                                )}
                            >
                                <span className="flex items-center">
                                    <i className={CN("bi ml-3 text-lg", item.icon)}></i>
                                    {item.title}
                                </span>
                                <i className={CN("bi transition-transform", openAccordion === index ? "bi-chevron-up" : "bi-chevron-down")}></i>
                            </button>
                            <div
                                className={CN(
                                    "transition-all duration-300 ease-in-out bg-white/5",
                                    openAccordion === index ? "max-h-40 p-4 opacity-100" : "max-h-0 p-0 opacity-0"
                                )}
                            >
                                <p className="text-light/70 leading-relaxed m-0">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {features && features.length > 0 && (
                <motion.div className="project-features mb-10" variants={itemVariants}>
                    <h3 className="flex items-center text-xl font-semibold mb-5">
                        <i className="bi bi-stars text-secondary ml-3 text-2xl"></i>
                        الميزات الرئيسية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center py-2 text-[15px] text-light/85">
                                <i className="bi bi-check2-circle text-secondary ml-3 text-lg"></i>
                                {feature}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            <motion.div variants={itemVariants}>
                <PortfolioRatingScale projectId={projectId} initialRating={initialRating} />
            </motion.div>

            <motion.div className="cta-buttons flex flex-wrap gap-4 mt-auto pt-8" variants={itemVariants}>
                {prevProjectId && (
                    <Link href={`/portfolio/${prevProjectId}`} className="inline-block">
                        <Button variant="outline" className="px-8 py-3 rounded-full flex items-center gap-2 group">
                            <i className="bi bi-arrow-right transition-transform group-hover:translate-x-1"></i>
                            المشروع السابق
                        </Button>
                    </Link>
                )}
                {nextProjectId && (
                    <Link href={`/portfolio/${nextProjectId}`} className="inline-block">
                        <Button variant="outline" className="px-8 py-3 rounded-full flex items-center gap-2 group">
                            المشروع التالي
                            <i className="bi bi-arrow-left transition-transform group-hover:-translate-x-1"></i>
                        </Button>
                    </Link>
                )}
            </motion.div>
        </motion.div>
    );
};

export default PortfolioDetailsContent;
