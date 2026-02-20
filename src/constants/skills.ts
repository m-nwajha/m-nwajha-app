export const SKILLS_DATA = {
    title: { wordA: 'مهاراتي', wordB: 'التقنية' },
    summary: {
        title: 'الخبرة المهنية',
        description: 'أمتلك مهارات واسعة في تطوير البرمجيات، بدءاً من تصميم واجهات المستخدم الجذابة وصولاً إلى بناء أنظمة خلفية قوية وقابلة للتوسع. أركز دائماً على جودة الكود وأفضل الممارسات.',
        stats: [
            { number: '+3', label: 'سنوات خبرة', icon: 'bi-trophy' },
            { number: '+50', label: 'مشروع مكتمل', icon: 'bi-diagram-3' },
            { number: '+30', label: 'عميل سعيد', icon: 'bi-people' }
        ],
        certifications: {
            title: 'الشهادات',
            badges: ['Front_end_ReactJS', 'Backend_ExpressJS', 'Freelance_Skills']
        }
    },
    categories: [
        {
            title: 'تطوير الواجهات الأمامية',
            icon: 'bi-code-slash',
            skills: [
                { name: 'HTML/CSS', percentage: 95 },
                { name: 'JavaScript/TypeScript', percentage: 88 },
                { name: 'React/Next.js', percentage: 82 }
            ]
        },
        {
            title: 'تطوير الأنظمة الخلفية',
            icon: 'bi-server',
            skills: [
                { name: 'Node.js', percentage: 70 },
                { name: 'Express.js', percentage: 75 },
                { name: 'MongoDB', percentage: 80 }
            ]
        },
        {
            title: 'السحابية والـ DevOps',
            icon: 'bi-cloud',
            skills: [
                { name: 'AWS/Vercel/Netlify', percentage: 76 },
                { name: 'Docker', percentage: 73 },
                { name: 'Git', percentage: 90 }
            ]
        },
        {
            title: 'أدوات تقنية',
            icon: 'bi-lightning',
            skills: [
                { name: 'Trello/Jira', percentage: 85 },
                { name: 'Webpack/Vite', percentage: 70 },
                { name: 'Vibe Coding (AI)', percentage: 68 }
            ]
        }
    ]
};
