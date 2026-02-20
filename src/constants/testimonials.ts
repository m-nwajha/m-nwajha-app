export const TESTIMONIALS_DATA = {
    title: {
        wordA: 'أراء',
        wordB: 'العملاء'
    },
    items: [
        {
            id: 1,
            name: 'جينيفر مارتينيز',
            role: 'مصممة منتجات',
            content: 'تحولت فكرتي إلى واقع ملموس باحترافية عالية. التعامل كان راقياً جداً والنتائج أبهرتني.',
            avatar: '/assets/images/mohamed-photo.png', // Using existing image for placeholder
            company: 'تيك كورب',
            rating: 5,
            verified: true
        },
        {
            id: 2,
            name: 'ألكسندر تشين',
            role: 'مهندس واجهات',
            content: 'سرعة في الأداء ودقة في التفاصيل. الكود نظيف جداً وسهل التعديل عليه مستقبلاً.',
            avatar: '/assets/images/mohamed-photo.png',
            company: 'إنوفيت لاب',
            rating: 5,
            verified: true
        },
        {
            id: 3,
            name: 'راشيل تايلور',
            role: 'مديرة تسويق',
            content: 'الخدمة كانت استثنائية من البداية حتى النهاية. أنصح بشدة بالتعامل معهم لأي مشروع تقني.',
            avatar: '/assets/images/mohamed-photo.png',
            company: 'جروث كو',
            rating: 5,
            verified: true
        },
        {
            id: 4,
            name: 'كريستوفر لي',
            role: 'نائب مدير الهندسة',
            content: 'خبرة عميقة في تطوير التطبيقات المعقدة. الالتزام بالمواعيد كان مبهراً.',
            avatar: '/assets/images/mohamed-photo.png',
            company: 'ديف ستريم',
            rating: 5,
            verified: true
        }
    ]
};

export const ADD_TESTIMONIAL = {
    title: "إضافة تقييم جديد",
    breadcrumbs: [
        { label: 'الرئيسية', href: '/' },
        { label: 'أراء العملاء', href: '/#testimonials' },
        { label: 'إضافة تقييم' },
    ],
    hero: {
        title: 'أنا أقدر رأيكم! ❤️',
        supTitle: 'رأيكم يساعدني على التطوير المستمر وتقديم أفضل جودة ممكنة لعملائي . شكراً لمشاركتكم التجربة.'
    },
    formItems: [
        {
            id: 1,
            label: 'الاسم بالكامل',
            placeholder: 'مثال: محمد أحمد',
            required: true,
            value: 'name',
            type: 'text',
        },
        {
            id: 2,
            label: 'المسمى الوظيفي',
            placeholder: 'مثال: مدير مشاريع',
            required: true,
            value: 'role',
            type: 'text',
        },
        {
            id: 3,
            label: 'الشركة (اختياري)',
            placeholder: "اسم الشركة التي تعمل بها",
            required: true,
            value: 'company',
            type: 'text',
        },
        {
            id: 4,
            label: 'رأيك بالتفصيل',
            placeholder: "اكتب هنا تجربتك مع خدماتنا...",
            required: true,
            value: 'company',
            type: 'text',
        },

    ]
};
