'use client';
import ComposedLayout from '@/app/_components/layouts';
import HomeButtonWidget from '@/app/_components/widgets/homeButtonWidget/homeButtonWidget';
import HomeStatisticsWidget from '@/app/_components/widgets/homeStatisticsWidget/homeStatisticsWidget';

export default function Home() {
  return (
    <ComposedLayout>
      <div className="-mx-8 flex h-3/6 flex-col gap-4 border-b-8 border-catan-red bg-[url('/assets/catan-bg-1.png')] bg-cover">
        <HomeButtonWidget />
      </div>
      <div className="-mx-8 flex h-3/6 animate-ltr-linear-infinite flex-col gap-4 bg-[url('/assets/catan-bg-2.png')] bg-cover bg-repeat">
        <HomeStatisticsWidget />
      </div>
    </ComposedLayout>
  );
}
