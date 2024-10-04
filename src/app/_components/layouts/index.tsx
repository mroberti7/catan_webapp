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
    <div className="flex h-screen">
      <SideMenu isOpen={isSideMenuOpen} openMenu={setIsSideMenuOpen} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header isOpen={isSideMenuOpen} openMenu={setIsSideMenuOpen} />
        <div className="h-auto flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
};
export default ComposedLayout;
