import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/app/_components/layouts/header/header';
import Footer from '@/app/_components/layouts/footer/footer';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
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
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
