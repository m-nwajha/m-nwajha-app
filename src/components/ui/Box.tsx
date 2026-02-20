'use client';

import { DIRECTION, DISPLAY, JUSTIFY_CONTENT } from '@/constants/box';
import { ALIGN_ITEM, GAP, TEXT_ALIGN } from '@/constants/grid';
import { BoxProps } from '@/@types/BoxProps';
import { CN } from '@/utils/className';
import { FC } from 'react';

export const Box: FC<BoxProps> = ({
  children,
  display = 'block',
  direction = 'row',
  textAlign = 'start',
  justifyContent = 'start',
  alignItems = 'start',
  gap = 1,
  className,
  onClick = () => { }
}) => {
  return (
    <div
      onClick={onClick}
      className={CN(
        DISPLAY[display],
        display === 'flex' ? DIRECTION[direction] : '',
        display === 'block' ? TEXT_ALIGN[textAlign] : '',
        display === 'flex' ? JUSTIFY_CONTENT[justifyContent] : '',
        display === 'flex' ? ALIGN_ITEM[alignItems] : '',
        display === 'flex' ? GAP[gap] : '',
        className,
      )}>
      {children}
    </div>
  );
};
