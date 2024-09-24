import { Bars3Icon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type HeaderProps = {
  isOpen?: boolean;
  openMenu?: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ isOpen, openMenu }: HeaderProps) => {
  return (
    <header className="fixed top-0 flex h-16 w-full items-center justify-between bg-catan-red px-8 shadow-lg">
      {openMenu && (
        <button
          onClick={() => {
            openMenu(!isOpen);
          }}
        >
          <Bars3Icon className="size-8 text-primary" />
        </button>
      )}

      <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
    </header>
  );
};
export default Header;
