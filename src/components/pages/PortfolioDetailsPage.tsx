'use client';

import { FC } from 'react';
import PageTitle from '../atoms/PageTitle';
import PortfolioDetails from '../organisms/PortfolioDetails';

interface PortfolioDetailsPageProps {
    project: any;
}

import SubPageLayout from '../organisms/SubPageLayout';

const PortfolioDetailsPage: FC<PortfolioDetailsPageProps> = ({ project }) => {
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المشاريع', href: '/#portfolio' },
        { label: project.title },
    ];

    return (
        <SubPageLayout title={project.title} breadcrumbs={breadcrumbs} withContainer={false}>
            <PortfolioDetails project={project} />
        </SubPageLayout>
    );
};

export default PortfolioDetailsPage;
