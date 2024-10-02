'use client';
import Header from '@/app/_components/layouts/header/header';
import Footer from '@/app/_components/layouts/footer/footer';
import Button from '@/app/_components/button/button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { HomeIcon } from '@heroicons/react/24/solid';
export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-6 bg-[url('/assets/wallpapers/wallpaper-seefahrer.png')] bg-cover bg-bottom pt-32">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-catan-red">404</h1>
          <h1 className="text-3xl font-bold text-catan-red">Page not found</h1>
        </div>
        <Button onClick={() => router.push(ROUTES.HOME.pathname)}>
          <div className="flex items-center gap-2">
            <HomeIcon className="size-9" />
            <span className="text-3xl">GO TO HOME</span>
          </div>
        </Button>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
