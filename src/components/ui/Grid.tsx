'use client';

import {
  ALIGN_ITEM,
  GAP,
  LG_SIZE,
  MD_SIZE,
  SM_SIZE,
  TEXT_ALIGN,
} from '@/constants/grid';
import { GridProps } from '@/@types/GridProps';
import { CN } from '@/utils/className';
import { FC } from 'react';

export const Grid: FC<GridProps> = ({
  children,
  sm = 1,
  md = 1,
  lg = 1,
  gap = 1,
  textAlign = 'start',
  alignItem = 'start',
  className,
}) => {
  return (
    <div
      className={CN(
        'grid',
        SM_SIZE[sm],
        MD_SIZE[md],
        LG_SIZE[lg],
        GAP[gap],
        TEXT_ALIGN[textAlign],
        ALIGN_ITEM[alignItem],
        className
      )}>
      {children}
    </div>
  );
};
