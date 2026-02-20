import { ReactNode } from 'react';

export type TypographyProps = {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    size?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'span1'
    | 'span2';
    color?: 'primary' | 'secondary' | 'black' | 'white' | 'dark' | 'light' | 'foreground';
    className?: string;
};