'use client';
import SubPageLayout from '../organisms/SubPageLayout';

const BlogDetailsPage = ({ blogDetails }: { blogDetails: any; }) => {
    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المدونة', href: '/#portfolio' },
        { label: blogDetails.title },
    ];
    return (
        <SubPageLayout title={blogDetails.title} breadcrumbs={breadcrumbs} withContainer={false}>
fd
        </SubPageLayout>
        );
};

export default BlogDetailsPage;