'use client';

import { FC } from 'react';
import { CN } from '@/utils/className';
import { BLOGS_DATA } from '@/constants/blogs';

interface BlogsFiltersProps {
    activeFilter: string;
    onFilterChange: (id: string) => void;
}

const BlogsFilters: FC<BlogsFiltersProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <ul className="flex justify-center flex-wrap gap-2 mb-10 list-none">
            {BLOGS_DATA.filters.map((filter) => (
                <li
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={CN(
                        "relative overflow-hidden px-6 py-3 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 border",
                        activeFilter === filter.id
                            ? "bg-linear-to-br from-secondary to-secondary/80 text-primary border-secondary shadow-lg shadow-secondary/20"
                            : "bg-white/5 text-light border-white/10 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-0.5"
                    )}
                >
                    <div className="flex items-center gap-2">
                        {filter.icon && <i className={CN("bi", filter.icon)}></i>}
                        {filter.label}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BlogsFilters;
