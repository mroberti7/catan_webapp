import type { Metadata } from 'next';
import '@/styles/globals.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Catan Game Assistant',
  description: 'Play Catan like a PRO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <main className="font-roboto">{children}</main>
      </body>
    </html>
  );
}
