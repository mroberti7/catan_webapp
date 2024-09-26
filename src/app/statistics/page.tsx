'use client';
import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';

const StatisticsPage = () => {
  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader />
        <h1>Statistics</h1>
      </div>
    </ComposedLayout>
  );
};
export default StatisticsPage;
