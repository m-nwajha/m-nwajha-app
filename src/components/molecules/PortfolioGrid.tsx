'use client';

import { FC, useState } from 'react';
import FilterBar from './FilterBar';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import PortfolioItem from './PortfolioItem';
import { Grid } from '../ui';

interface PortfolioGridProps {
    initialData: any[];
}

const PortfolioGrid: FC<PortfolioGridProps> = ({ initialData }) => {
    const [activeFilter, setActiveFilter] = useState('*');
    const data = initialData || [];

    const filteredItems = activeFilter === '*'
        ? data
        : data?.filter((item: any) => item.category === activeFilter);

    return (
        <div className="w-full">
            <FilterBar
                filters={PORTFOLIO_DATA.filters}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <Grid sm={1} md={2} lg={4} gap={5}>
                {filteredItems.slice(0, 8).map((item: any) => (
                    <PortfolioItem
                        key={String(item._id)}
                        _id={String(item._id)}
                        title={item.title}
                        category={item.category}
                        image={item.image}
                        rating={item.rating}
                        projectUrl={item.projectUrl}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default PortfolioGrid;
