import { ReactNode } from 'react';

export type AlignSide = 'center' | 'start' | 'end';
export type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridProps = {
    children: ReactNode;
    sm?: Cols;
    md?: Cols;
    lg?: Cols;
    gap?: Cols;
    textAlign?: AlignSide;
    alignItem?: AlignSide;
    className?: string;
};