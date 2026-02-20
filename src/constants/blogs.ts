export const BLOGS_DATA = {
    title: { wordA: 'آخر', wordB: 'المقالات' },
    filters: [
        { id: '*', label: 'الكل', icon: 'bi-grid-3x3' },
        { id: 'filter-web', label: 'تصميم الويب', icon: 'bi-window' },
        { id: 'filter-mobile', label: 'تطبيقات الجوال', icon: 'bi-phone' },
        { id: 'filter-branding', label: 'العلامة التجارية', icon: 'bi-award' },
        { id: 'filter-ui', icon: 'bi-palette', label: 'واجهة المستخدم' },
    ],
    items: [
        {
            id: 1,
            title: 'منصة الابتكار الرقمي',
            category: 'Web Design',
            filter: 'filter-web',
            rating: 4.8,
            image: '/assets/images/Rwaq-mockup.png',
            description: 'استكشاف كيف تقود المنصات الرقمية الابتكار في المؤسسات الحديثة.',
            tech: ['React', 'Node.js', 'AWS'],
            link: '#',
            detailsLink: '#'
        },
        {
            id: 2,
            title: 'تطبيق الإنتاجية الذكي',
            category: 'Mobile App',
            filter: 'filter-mobile',
            rating: 4.9,
            image: '/assets/images/screen-1.png',
            description: 'حلول ذكية لتحسين الإنتاجية الشخصية باستخدام تقنيات الذكاء الاصطناعي.',
            tech: ['Flutter', 'Firebase', 'AI'],
            link: '#',
            detailsLink: '#'
        },
        {
            id: 3,
            title: 'الهوية البصرية الحديثة',
            category: 'Branding',
            filter: 'filter-branding',
            rating: 5.0,
            image: '/assets/images/Rwaq-mockup.png',
            description: 'بناء علامة تجارية قوية تترك أثراً دائماً في السوق التنافسي.',
            tech: ['Illustrator', 'Figma', 'Brand'],
            link: '#',
            detailsLink: '#'
        },
        {
            id: 4,
            title: 'تصميم لوحة تحكم SaaS',
            category: 'UI/UX',
            filter: 'filter-ui',
            rating: 4.7,
            image: '/assets/images/Rwaq-mockup.png',
            description: 'أفضل الممارسات لتصميم لوحات تحكم سهلة الاستخدام ومعقدة البيانات.',
            tech: ['Figma', 'Prototyping', 'UX'],
            link: '#',
            detailsLink: '#'
        },
        {
            id: 5,
            title: 'منصة التجارة الإلكترونية',
            category: 'E-commerce',
            filter: 'filter-web',
            rating: 4.6,
            image: '/assets/images/Rwaq-mockup.png',
            description: 'تطوير متاجر إلكترونية متكاملة تركز على تجربة المستخدم وزيادة التحويل.',
            tech: ['Shopify', 'React', 'API'],
            link: '#',
            detailsLink: '#'
        },
        {
            id: 6,
            title: 'حلول التقنية المالية',
            category: 'Fintech',
            filter: 'filter-mobile',
            rating: 4.8,
            image: '/assets/images/screen-1.png',
            description: 'تأثير تكنولوجيا البلوكشين على مستقبل الخدمات المالية والمصرفية.',
            tech: ['Swift', 'Kotlin', 'Blockchain'],
            link: '#',
            detailsLink: '#'
        }
    ]
};
