'use client';
import { FC } from 'react';
import SubPageLayout from '../organisms/SubPageLayout';
import BlogDetails from '../organisms/BlogDetails';

interface BlogDetailsPageProps {
    blogDetails: any;
}

const BlogDetailsPage: FC<BlogDetailsPageProps> = ({ blogDetails }) => {
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المدونة', href: '/blogs' },
        { label: blogDetails.title },
    ];

    return (
        <SubPageLayout title={blogDetails.title} breadcrumbs={breadcrumbs} withContainer={false}>
            <BlogDetails blog={blogDetails} />
        </SubPageLayout>
    );
};

export default BlogDetailsPage;