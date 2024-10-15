'use client';
import ComposedLayout from '@/app/_components/layouts';
import HomeButtonWidget from '@/app/_components/widgets/homeButtonWidget/homeButtonWidget';
import HomeStatisticsWidget from '@/app/_components/widgets/homeStatisticsWidget/homeStatisticsWidget';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <ComposedLayout>
      <div className="mt-18 min-h-3/6 -mx-8 flex h-3/6 flex-col gap-4 border-b-8 border-catan-red bg-[url('/assets/catan-bg-1.png')] bg-cover bg-no-repeat">
        <HomeButtonWidget />
      </div>
      <div className="min-h-3/6 -mx-8 flex h-3/6 animate-ltr-linear-infinite flex-col gap-4 bg-[url('/assets/catan-bg-2.png')] bg-cover bg-repeat">
        <HomeStatisticsWidget />
      </div>
    </ComposedLayout>
  );
}
