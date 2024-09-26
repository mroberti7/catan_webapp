'use client';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';

const GamesPage = () => {
  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader />
        <h1>ALL GAMES PAGE</h1>{' '}
      </div>
    </ComposedLayout>
  );
};
export default GamesPage;
