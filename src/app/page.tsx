'use client';
import ComposedLayout from '@/app/_components/layouts';

export default function Home() {
  return (
    <ComposedLayout>
      <div className="-mx-8 flex min-h-96 flex-col gap-4 border-b-8 border-catan-red bg-[url('/assets/catan-bg-1.png')] bg-cover">
        <div className="mx-8 mt-3">hello</div>
      </div>
      <div className="-mx-8 flex min-h-96 animate-ltr-linear-infinite flex-col gap-4  bg-[url('/assets/catan-bg-2.png')] bg-cover bg-repeat">
        <div className="mx-8 mt-3">hello</div>
      </div>
    </ComposedLayout>
  );
}
