import { ROUTES } from '@/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 flex h-8 w-full flex-col items-center justify-center gap-2 bg-catan-red text-primary shadow-lg"></footer>
  );
};
export default Footer;
