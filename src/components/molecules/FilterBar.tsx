'use client';

import { FC } from 'react';
import { CN } from '@/utils/className';

interface FilterItem {
    id: string;
    label: string;
    icon?: string;
}

interface FilterBarProps {
    filters: FilterItem[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    className?: string;
}

const FilterBar: FC<FilterBarProps> = ({ filters, activeFilter, onFilterChange, className }) => {
    return (
        <ul className={CN("flex justify-center flex-wrap gap-4 p-0 mb-10 list-none", className)}>
            {filters.map((filter) => (
                <li
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={CN(
                        'text-sm font-medium px-6 py-3 cursor-pointer rounded-full flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 text-shadow-sm text-shadow-black/50 group',
                        activeFilter === filter.id
                            ? 'bg-secondary text-white'
                            : 'bg-white/5 text-light hover:text-secondary hover:bg-secondary/10'
                    )}
                >
                    {filter.icon && (
                        <i className={CN(
                            'bi text-lg transition-transform duration-300',
                            filter.icon,
                            activeFilter === filter.id ? '' : 'group-hover:scale-110'
                        )}></i>
                    )}
                    {filter.label}
                </li>
            ))}
        </ul>
    );
};

export default FilterBar;
