'use client';

import { COLORS, TYPOGRAPHY_SIZE } from '@/constants/typography';
import { TypographyProps } from '@/@types/TypographyProps';
import { CN } from '@/utils/className';
import { FC } from 'react';

export const Typography: FC<TypographyProps> = ({
  children,
  variant = 'p',
  size = 'body1',
  color = 'black',
  className,
}) => {
  const CreateTypography = variant;
  return (
    <CreateTypography
      className={CN(TYPOGRAPHY_SIZE[size], COLORS[color], className)}>
      {children}
    </CreateTypography>
  );
};
