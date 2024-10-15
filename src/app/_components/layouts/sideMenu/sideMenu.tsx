import { ROUTES } from '@/routes';
import { ChartBarIcon, WrenchScrewdriverIcon, UsersIcon, XMarkIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Ping from '@/app/_components/ping/ping';

type SideMenuProps = {
  isOpen: boolean;
  openMenu: Dispatch<SetStateAction<boolean>>;
};

const SideMenu = ({ isOpen, openMenu }: SideMenuProps) => {
  const router = useRouter();

  const menuEntries: { icon: React.ElementType; label: string; path: string; disabled: boolean }[] = [
    {
      icon: TrophyIcon,
      label: 'Games',
      path: ROUTES.GAMES.pathname,
      disabled: false,
    },
    {
      icon: UsersIcon,
      label: 'Players',
      path: ROUTES.PLAYERS.pathname,
      disabled: true,
    },
    {
      icon: ChartBarIcon,
      label: 'Statistics',
      path: ROUTES.STATISTICS.pathname,
      disabled: true,
    },
    {
      icon: WrenchScrewdriverIcon,
      label: 'Settings',
      path: ROUTES.SETTINGS.pathname,
      disabled: true,
    },
  ];

  return (
    <div
      className={`fixed left-0 z-50 h-full w-64 bg-catan-red px-2 py-3 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="ml-3 flex justify-end pt-1">
        <button onClick={() => openMenu(false)}>
          <XMarkIcon className="size-10 text-primary" />
        </button>
      </div>

      <div className="my-4 flex flex-col gap-8">
        <div className="mb-3 flex items-center justify-center gap-2">
          <button onClick={() => router.replace(ROUTES.HOME.pathname)}>
            <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
          </button>
        </div>
        {menuEntries.map((entry, index) =>
          entry.disabled ? (
            <div className="flex items-center justify-center gap-3">
              <entry.icon className="size-7 text-gray-300 md:size-8" />
              <span className="text-lg font-medium text-gray-300 md:text-xl">{entry.label}</span>
            </div>
          ) : (
            <button key={index} className="flex items-center justify-center gap-3" onClick={() => router.replace(entry.path)}>
              <entry.icon className="size-7 text-secondary md:size-8" />
              <span className="text-lg font-medium text-secondary md:text-xl">{entry.label}</span>
            </button>
          ),
        )}
        <div className="fixed bottom-0 flex w-full flex-col items-center gap-2 pb-8">
          <a href="https://github.com/fdifrison" target="_blank" className="text-xs text-secondary">
            fdifrison
          </a>
          <a href="https://github.com/mroberti7" target="_blank" className="text-xs text-secondary">
            mroberti7
          </a>
          <span className="text-xs text-primary">Developed with ❤️ during working hours</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
