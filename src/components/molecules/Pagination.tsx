'use client';

import React from 'react';
import { Button } from '../ui';
import { CN } from '@/utils/className';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className
}) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={CN(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 font-medium",
                        currentPage === i
                            ? "bg-secondary text-white shadow-lg shadow-secondary/25"
                            : "bg-white/5 text-light/70 hover:bg-white/10 hover:text-white"
                    )}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className={CN("flex items-center justify-center gap-4 mt-16", className)}>
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl px-4 py-2 disabled:opacity-30 flex items-center gap-2 group"
            >
                <i className="bi bi-chevron-right group-hover:translate-x-1 transition-transform"></i>
                <span>السابق</span>
            </Button>

            <div className="flex items-center gap-2">
                {renderPageNumbers()}
            </div>

            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl px-4 py-2 disabled:opacity-30 flex items-center gap-2 group"
            >
                <span>التالي</span>
                <i className="bi bi-chevron-left group-hover:-translate-x-1 transition-transform"></i>
            </Button>
        </div>
    );
};

export default Pagination;
