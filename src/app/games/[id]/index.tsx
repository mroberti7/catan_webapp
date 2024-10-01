'use client';

import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';

type GamePageProps = {
  id: string;
};

const GamePage = ({ id }: GamePageProps) => {
  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader />
        <h1>GAME PAGE RELATED TO ID: {id}</h1>
      </div>
    </ComposedLayout>
  );
};

export default GamePage;
