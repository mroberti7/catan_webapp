import Button from '@/app/_components/button/button';
import { ROUTES } from '@/routes';
import { PlusCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import {} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import NewGameModal from '@/app/_components/widgets/newGameWidget/newGameModal';
import { useState } from 'react';

const HomeButtonWidget = () => {
  const router = useRouter();
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={() => {
              setIsNewGameModalOpen(true);
            }}
          >
            <div className="flex items-center justify-center gap-2 font-semibold">
              <PlusCircleIcon className="size-8" />
              <span className="text-xl">New Game</span>
            </div>
          </Button>
          <Button
            onClick={() => {
              router.push(ROUTES.STATISTICS.pathname);
            }}
          >
            <div className="flex items-center justify-center gap-2 font-semibold">
              <ChartBarIcon className="size-8" />
              <span className="text-xl">Statistics</span>
            </div>
          </Button>
        </div>
      </div>
      <NewGameModal
        isModalOpen={isNewGameModalOpen}
        onClose={() => {
          setIsNewGameModalOpen(false);
        }}
      />
    </>
  );
};
export default HomeButtonWidget;
