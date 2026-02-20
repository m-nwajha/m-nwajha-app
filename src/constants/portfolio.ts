export const PORTFOLIO_DATA = {
    title: { wordA: 'معرض', wordB: 'الأعمال' },
    filters: [
        { id: '*', label: 'الكل', icon: 'bi-grid-3x3' },
        { id: 'web-corporate', label: 'مواقع تعريفية', icon: 'bi-building', className: 'filter-ui' },
        { id: 'web-landing', label: 'صفحات الهبوط', icon: 'bi-layout-text-sidebar-reverse', className: 'filter-development' },
        { id: 'web-ecommerce', label: 'المتاجر الإلكترونية', icon: 'bi-cart3', className: 'filter-photography' },
        { id: 'web-cloud', label: 'التطبيقات السحابية', icon: 'bi-cloud-check', className: 'filter-marketing' },
    ],
    items: [
        {
            id: 1,
            title: 'تطبيق بنكي للجوال',
            category: 'web-corporate',
            image: '/assets/images/screen-1.png',
            detailsLink: '/portfolio/1',
            rating: 4.8,
            description: 'تصميم واجهة مستخدم مبتكرة لتطبيق بنكي يركز على سهولة الاستخدام والأمان.',
            client: 'DigitalCraft Solutions',
            projectUrl: 'projectwebsite.example.com',
            techStack: ['Angular', 'Express.js', 'PostgreSQL', 'GraphQL', 'Firebase'],
            features: [
                'تصور البيانات في الوقت الفعلي',
                'إدارة أدوار المستخدمين',
                'المصادقة الآمنة',
                'لوحات تحكم قابلة للتخصيص',
                'خيارات تصدير البيانات',
                'دعم الأجهزة المتعددة'
            ],
            gallery: [
                '/assets/images/screen-1.png',
                '/assets/images/Rwaq-mockup.png',
                '/assets/images/screen-1.png',
                '/assets/images/Rwaq-mockup.png'
            ]
        },
        {
            id: 2,
            title: 'منصة تعليم إلكتروني',
            category: 'web-landing',
            image: '/assets/images/Rwaq-mockup.png',
            detailsLink: '/portfolio/2',
            rating: 4.9,
            description: 'تطوير منصة تعليمية متكاملة تدعم الفصول الافتراضية وإدارة المحتوى الدراسي.'
        },
        {
            id: 3,
            title: 'العمارة الحضرية',
            category: 'web-ecommerce',
            image: '/assets/images/Rwaq-mockup.png',
            detailsLink: '/portfolio/3',
            rating: 4.7,
            description: 'مجموعة صور فوتوغرافية تبرز جمال التصميم المعماري في المدن الحديثة.'
        },
        {
            id: 4,
            title: 'حملة تواصل اجتماعي',
            category: 'web-cloud',
            image: '/assets/images/Rwaq-mockup.png',
            detailsLink: '/portfolio/4',
            rating: 4.5,
            description: 'إدارة حملة تسويقية ناجحة عبر منصات التواصل الاجتماعي لزيادة الوعي بالعلامة التجارية.'
        },
        {
            id: 5,
            title: 'واجهة المنزل الذكي',
            category: 'web-corporate',
            image: '/assets/images/Rwaq-mockup.png',
            detailsLink: '/portfolio/5',
            rating: 4.8,
            description: 'تصميم واجهة تحكم ذكية للمنازل تتيح التحكم في الإضاءة والحرارة والأمان.'
        },
        {
            id: 6,
            title: 'نظام إدارة السحاب',
            category: 'web-cloud',
            image: '/assets/images/Rwaq-mockup.png',
            detailsLink: '/portfolio/6',
            rating: 4.6,
            description: 'تطوير تطبيق لإدارة الموارد السحابية ومراقبة الأداء في الوقت الفعلي.'
        }
    ]
};
