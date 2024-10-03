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

  const menuEntries: { icon: React.ElementType; label: string; path: string }[] = [
    {
      icon: TrophyIcon,
      label: 'Games',
      path: ROUTES.GAMES.pathname,
    },
    {
      icon: UsersIcon,
      label: 'Players',
      path: ROUTES.PLAYERS.pathname,
    },
    {
      icon: ChartBarIcon,
      label: 'Statistics',
      path: ROUTES.STATISTICS.pathname,
    },
    {
      icon: WrenchScrewdriverIcon,
      label: 'Settings',
      path: ROUTES.SETTINGS.pathname,
    },
  ];

  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 z-50 -mt-16 h-full w-64 bg-catan-red px-2 py-3 shadow-2xl open:animate-slideRight">
          <div className="ml-3 flex justify-end pt-1">
            <button onClick={() => openMenu(false)}>
              <XMarkIcon className="size-10 text-primary" />
            </button>
          </div>

          <div className="my-4 ml-3 flex flex-col gap-8">
            <div className="mb-3 flex items-center justify-center gap-2">
              <button onClick={() => router.push(ROUTES.HOME.pathname)}>
                <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
              </button>
            </div>
            {menuEntries.map((entry, index) => (
              <button key={index} className="flex items-center justify-center gap-3" onClick={() => router.push(entry.path)}>
                <entry.icon className="size-7 text-secondary md:size-8" />
                <span className="text-lg font-medium text-secondary md:text-xl">{entry.label}</span>
              </button>
            ))}
            <div className="mt-16">
              <Ping showTriggerButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
