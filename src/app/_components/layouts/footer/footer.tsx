import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="flex h-28 w-full flex-col items-center justify-center gap-2 bg-catan-red text-primary shadow-lg">
      <Image src="/assets/catan-logo.png" alt="logo" width={100} height={100} />
      <span className="text-sm">Developed with ❤️ during working hours</span>
    </footer>
  );
};
export default Footer;
