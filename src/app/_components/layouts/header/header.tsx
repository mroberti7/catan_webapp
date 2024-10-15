import { Bars3Icon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import Ping from '@/app/_components/ping/ping';

type HeaderProps = {
  isOpen?: boolean;
  openMenu?: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ isOpen, openMenu }: HeaderProps) => {
  const router = useRouter();
  return (
    <header
      className={`fixed top-0 z-40 flex h-16 w-full items-center ${openMenu ? 'justify-between' : 'justify-center'} bg-catan-red px-8 shadow-lg`}
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

      <div className="flex items-center gap-4">
        <Ping showBackground={false} />
        <button onClick={() => router.replace(ROUTES.HOME.pathname)}>
          <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
        </button>
      </div>
    </header>
  );
};
export default Header;
