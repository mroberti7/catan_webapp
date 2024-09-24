import { ROUTES } from '@/routes';
import { Cog8ToothIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
type SideMenuProps = {
  isOpen: boolean;
  openMenu: Dispatch<SetStateAction<boolean>>;
};

const SideMenu = ({ isOpen, openMenu }: SideMenuProps) => {
  const router = useRouter();

  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 -mt-16 h-full w-56 bg-catan-red px-2 py-3 shadow-2xl">
          <div className="ml-3 flex justify-between pt-1">
            <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
            <button onClick={() => openMenu(false)}>
              <XMarkIcon className="size-8 text-primary" />
            </button>
          </div>

          <div className="ml-3 mt-8 flex flex-col gap-4">
            <button className="flex items-center justify-start gap-2" onClick={() => router.push(ROUTES.PLAYERS.pathname)}>
              <UsersIcon className="size-6 text-secondary" />
              <span className="text-lg font-medium text-secondary">Players</span>
            </button>
            <button className="flex items-center justify-start gap-2" onClick={() => router.push(ROUTES.SETTINGS.pathname)}>
              <Cog8ToothIcon className="size-6 text-secondary" />
              <span className="text-lg font-medium text-secondary">Settings</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
