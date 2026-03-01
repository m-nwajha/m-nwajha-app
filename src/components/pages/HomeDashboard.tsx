'use client';

import React from 'react';
import DashboardHero from '../molecules/DashboardHero';
import DashboardStatCard from '../atoms/DashboardStatCard';
import { Grid, Card, Typography, Box } from '../ui';

interface HomeDashboardProps {
    stats: {
        totalBlogs: number;
        totalContacts: number;
        unreadContacts: number;
        totalProjects: number;
        totalTestimonials: number;
        totalVisitors: number;
        dailyVisitorsTrend: string;
    };
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ stats }) => {
    return (
        <div className="space-y-12">
            <DashboardHero
                title="أهلاً بك في لوحة تحكم"
                subtitle="نظرة عامة على أداء الموقع"
                description="هنا يمكنك متابعة آخر الإحصائيات، الرسائل الجديدة، وإدارة محتوى الموقع بالكامل بكل سهولة."
            />

            <Grid lg={4} md={2} sm={1} gap={6}>
                <DashboardStatCard
                    title="إجمالي الزيارات"
                    value={stats.totalVisitors}
                    icon="bi-people"
                    trend={{ value: stats.dailyVisitorsTrend, isUp: true }}
                    color="secondary"
                />
                <DashboardStatCard
                    title="الرسائل الجديدة"
                    value={stats.unreadContacts}
                    icon="bi-envelope-exclamation"
                    trend={{ value: `${stats.totalContacts} إجمالي`, isUp: false }}
                    color="primary"
                />
                <DashboardStatCard
                    title="المشاريع الكلية"
                    value={stats.totalProjects}
                    icon="bi-grid"
                    color="secondary"
                />
                <DashboardStatCard
                    title="مقالات المدونة"
                    value={stats.totalBlogs}
                    icon="bi-journal-text"
                    color="secondary"
                />
            </Grid>

            <Grid lg={2} md={1} gap={8} className="mt-8">
                <Card className="flex flex-col gap-6">
                    <Box display="flex" justifyContent="between" alignItems="center" className="mb-2">
                        <Typography variant="h5" size="h5" color="white" className="font-bold">حالة التفاعل</Typography>
                        <i className="bi bi-graph-up-arrow text-secondary text-xl"></i>
                    </Box>
                    <Box className="space-y-6">
                        <Box display="flex" justifyContent="between" alignItems="center">
                            <Typography size="body2" color="light" className="opacity-60">توصيات العملاء</Typography>
                            <Typography size="body1" color="white" className="font-bold">{stats.totalTestimonials}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="between" alignItems="center">
                            <Typography size="body2" color="light" className="opacity-60">متوسط وقت التفاعل</Typography>
                            <Typography size="body1" color="white" className="font-bold">12:30 م</Typography>
                        </Box>
                        <Box display="flex" justifyContent="between" alignItems="center">
                            <Typography size="body2" color="light" className="opacity-60">معدل التحويل</Typography>
                            <Typography size="body1" color="secondary" className="font-bold">4.2%</Typography>
                        </Box>
                    </Box>
                </Card>

                <Card className="flex flex-col gap-6">
                    <Box display="flex" justifyContent="between" alignItems="center" className="mb-2">
                        <Typography variant="h5" size="h5" color="white" className="font-bold">آخر الإضافات</Typography>
                        <i className="bi bi-clock-history text-light/40 text-xl"></i>
                    </Box>
                    <Box className="space-y-6">
                        <Box display="flex" gap={4} alignItems="center">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-secondary">
                                <i className="bi bi-plus-circle text-xl"></i>
                            </div>
                            <Box display="flex" direction="col">
                                <Typography size="body2" color="white" className="font-medium">تمت إضافة مشروع جديد</Typography>
                                <Typography size="body1" color="light" className="opacity-40">منذ 3 ساعات</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={4} alignItems="center">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary/80">
                                <i className="bi bi-chat-text text-xl"></i>
                            </div>
                            <Box display="flex" direction="col">
                                <Typography size="body2" color="white" className="font-medium">طلب تواصل جديد عبر الموقع</Typography>
                                <Typography size="body1" color="light" className="opacity-40">منذ 5 ساعات</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Grid>
        </div>
    );
};

export default HomeDashboard;