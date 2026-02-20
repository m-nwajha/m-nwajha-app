import React, { ReactNode } from 'react';
import { CN } from '@/utils/className';

interface TableProps {
    children: ReactNode;
    className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => (
    <div className="w-full overflow-x-auto rounded-xl bg-white/5 border border-white/10 shadow-xl">
        <table className={CN("w-full text-right border-collapse", className)}>
            {children}
        </table>
    </div>
);

export const THead: React.FC<TableProps> = ({ children, className }) => (
    <thead className={CN("bg-secondary/10 border-b border-secondary/10", className)}>
        {children}
    </thead>
);

export const TBody: React.FC<TableProps> = ({ children, className }) => (
    <tbody className={CN("divide-y divide-white/5", className)}>
        {children}
    </tbody>
);

export const TR: React.FC<TableProps> = ({ children, className }) => (
    <tr className={CN("transition-colors hover:bg-white/2", className)}>
        {children}
    </tr>
);

export const TH: React.FC<TableProps> = ({ children, className }) => (
    <th className={CN("px-6 py-4 text-sm font-bold text-secondary text-right", className)}>
        {children}
    </th>
);

export const TD: React.FC<TableProps> = ({ children, className }) => (
    <td className={CN("px-6 py-4 text-sm text-light/80 align-middle", className)}>
        {children}
    </td>
);
