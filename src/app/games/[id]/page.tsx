/* eslint-disable @next/next/no-async-client-component */
'use client';

import ComposedLayout from '@/app/_components/layouts';
import Loader from '@/app/_components/loader/loader';

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <ComposedLayout>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader />
        <h1>GAME PAGE RELATED TO ID: {id}</h1>
      </div>
    </ComposedLayout>
  );
};
export default Page;
