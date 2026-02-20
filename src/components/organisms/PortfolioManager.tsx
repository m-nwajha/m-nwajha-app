'use client';

import React, { useState } from 'react';
import { Table, THead, TBody, TR, TH, TD, Button, Badge, Box, useToast } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import ProjectForm from './ProjectForm';

import DashboardManagerHeader from '../molecules/DashboardManagerHeader';
import DashboardActionButtons from '../molecules/DashboardActionButtons';

interface PortfolioManagerProps {
    initialProjects: any[];
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ initialProjects }) => {
    const { showToast } = useToast();
    const [projects, setProjects] = useState(initialProjects);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const { del, isLoading } = useAPI('/api/portfolio');

    const handleDelete = async (id: string) => {
        const project = projects.find(p => p._id === id);
        if (window.confirm(`هل أنت متأكد من حذف مشروع "${project?.title || ''}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
            try {
                await del(id);
                setProjects(projects.filter(p => p._id !== id));
                showToast(`تم حذف مشروع "${project?.title || ''}" بنجاح`, 'success');
            } catch (error) {
                console.error('Failed to delete project:', error);
                showToast('فشل حذف المشروع. حاول مرة أخرى.', 'error');
            }
        }
    };

    const handleSuccess = (newProject: any) => {
        if (editingProject) {
            setProjects(projects.map(p => p._id === newProject._id ? newProject : p));
        } else {
            setProjects([newProject, ...projects]);
        }
        setShowForm(false);
        setEditingProject(null);
    };

    return (
        <Box className="portfolio-manager space-y-6">
            <DashboardManagerHeader
                title="قائمة المشاريع"
                subtitle="إدارة معرض أعمالك وإضافة مشاريع جديدة"
                icon="bi-collection"
                count={projects.length}
                addButtonLabel="إضافة مشروع جديد"
                onAdd={() => {
                    setEditingProject(null);
                    setShowForm(true);
                }}
            />

            <Table>
                <THead>
                    <TR>
                        <TH>المشروع</TH>
                        <TH>التصنيف</TH>
                        <TH>التقييم</TH>
                        <TH>تاريخ الإنشاء</TH>
                        <TH className="text-center">الإجراءات</TH>
                    </TR>
                </THead>
                <TBody>
                    {projects.map((project) => (
                        <TR key={project._id}>
                            <TD>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden border border-white/10 text-[0]">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-semibold text-white">{project.title}</span>
                                </div>
                            </TD>
                            <TD>
                                <Badge variant="outline" showHash={true} className="text-xs bg-secondary/5 text-secondary border-secondary/20">
                                    {project.category}
                                </Badge>
                            </TD>
                            <TD>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <i className="bi bi-star-fill text-xs"></i>
                                    <span>{project.rating || 0}</span>
                                </div>
                            </TD>
                            <TD className="text-light/40">
                                {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                            </TD>
                            <TD>
                                <DashboardActionButtons
                                    onEdit={() => {
                                        setEditingProject(project);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => handleDelete(project._id)}
                                    viewHref={`/portfolio/${project._id}`}
                                    isLoading={isLoading}
                                />
                            </TD>
                        </TR>
                    ))}
                    {projects.length === 0 && (
                        <TR>
                            <TD className="text-center py-20 text-light/40 italic">
                                لا يوجد مشاريع لعرضها حالياً.. ابدأ بإضافة مشروعك الأول!
                            </TD>
                        </TR>
                    )}
                </TBody>
            </Table>

            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </Box>
    );
};

export default PortfolioManager;
