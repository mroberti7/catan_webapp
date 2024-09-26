import { ROUTES } from '@/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bottom-0 flex h-28 w-full flex-col items-center justify-center gap-2 bg-catan-red text-primary shadow-lg">
      <button onClick={() => router.push(ROUTES.HOME.pathname)}>
        <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
      </button>
      <span className="text-sm">Developed with ❤️ during working hours</span>
    </footer>
  );
};
export default Footer;
