import Header from '@/app/_components/layouts/header/header';
import Footer from '@/app/_components/layouts/footer/footer';
import SideMenu from '@/app/_components/layouts/sideMenu/sideMenu';
import { useState } from 'react';

type ComposedLayoutProps = {
  children: React.ReactNode;
};

const ComposedLayout = ({ children }: ComposedLayoutProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div className="mt-16">
      <Header isOpen={isSideMenuOpen} openMenu={setIsSideMenuOpen} />
      <SideMenu isOpen={isSideMenuOpen} openMenu={setIsSideMenuOpen} />
      <div className="min-h-auto mx-8">{children}</div>
      <Footer />
    </div>
  );
};
export default ComposedLayout;
