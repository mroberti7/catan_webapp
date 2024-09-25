import { Bars3Icon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';

type HeaderProps = {
  isOpen?: boolean;
  openMenu?: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ isOpen, openMenu }: HeaderProps) => {
  const router = useRouter();
  return (
    <header
      className={`fixed top-0 flex h-16 w-full items-center ${openMenu ? 'justify-between' : 'justify-center'} bg-catan-red px-8 shadow-lg`}
    >
      {openMenu && (
        <button
          onClick={() => {
            openMenu(!isOpen);
          }}
        >
          <Bars3Icon className="size-10 text-primary" />
        </button>
      )}

      <button onClick={() => router.push(ROUTES.HOME.pathname)}>
        <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
      </button>
    </header>
  );
};
export default Header;
