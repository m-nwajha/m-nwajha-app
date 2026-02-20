import { ReactNode } from 'react';
import { AlignSide, Cols } from './GridProps';

export type BoxProps = {
    children: ReactNode;
    display?: 'flex' | 'block';
    direction?: 'row' | 'col' | 'rowReverse' | 'colReverse';
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'baseline';
    alignItems?: AlignSide;
    textAlign?: AlignSide;
    gap?: Cols;
    className?: string;
    onClick?: void | ((e: any) => void);
};