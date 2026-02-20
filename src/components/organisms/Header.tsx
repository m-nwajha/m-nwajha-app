'use client';

import { PATHS } from '@/constants/paths';
import NavLink from '../atoms/NavLink';

const Header = () => {
  return (
    <header className='header fixed bottom-0 lg:bottom-0 lg:inset-y-0 right-0 left-0 lg:left-auto transition-all p-4 lg:p-[15] flex flex-row lg:flex-col justify-center items-center lg:max-w-max z-999 bg-dark/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-t-[30px] lg:rounded-none border-t lg:border-t-0 border-white/10 overflow-hidden gap-2'>
      <nav className='w-full'>
        <ul className='flex flex-row lg:flex-col justify-around lg:justify-center items-center lg:items-start w-full lg:w-auto'>
          {
            PATHS.map((navItem) => (
              <NavLink key={navItem.key} label={navItem.label} href={navItem.path} icon={navItem.icon} />
            ))
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;