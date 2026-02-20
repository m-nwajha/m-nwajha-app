import { CN } from '@/utils/className';
import { FC, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  variant?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};
export const Container: FC<ContainerProps> = ({
  children,
  className,
  variant = '2xl',
}) => {
  const variantWidths: Record<string, string> = {
    'sm': 'max-w-[24rem]', // 384px
    'md': 'max-w-[36rem]', // 576px
    'lg': 'max-w-[48rem]', // 768px
    'xl': 'max-w-[64rem]', // 1024px
    '2xl': 'max-w-[79rem]', // 1280px
  };
  return (
    <div
      className={CN(
        'container mx-auto px-4',
        variantWidths[variant],
        className
      )}>
      {children}
    </div>
  );
};
