'use client';

import React from 'react';

interface DashboardActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
    viewHref?: string;
    isLoading?: boolean;
}

const DashboardActionButtons: React.FC<DashboardActionButtonsProps> = ({
    onEdit,
    onDelete,
    viewHref,
    isLoading
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            {viewHref && (
                <a
                    href={viewHref}
                    target="_blank"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-secondary/10 hover:text-secondary border border-white/5 transition-all"
                    title="عرض"
                    rel="noreferrer"
                >
                    <i className="bi bi-eye"></i>
                </a>
            )}
            <button
                onClick={onEdit}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500/5 hover:bg-blue-500/20 text-blue-400 border border-blue-500/10 transition-all"
                title="تعديل"
                type="button"
            >
                <i className="bi bi-pencil-square"></i>
            </button>
            <button
                onClick={onDelete}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/5 hover:bg-red-500/20 text-red-400 border border-red-500/10 transition-all disabled:opacity-50"
                title="حذف"
                type="button"
            >
                <i className="bi bi-trash3"></i>
            </button>
        </div>
    );
};

export default DashboardActionButtons;
