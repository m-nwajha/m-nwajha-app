import type { Metadata } from 'next';
import { Almarai, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
import MainLayout from '@/components/layouts/MainLayout';
import { ToastProvider } from '@/components/ui';
import { AuthProvider } from '@/context/AuthContext';

const almarai = Almarai({
  variable: '--font-almarai',
  weight: ['400', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-spaceGrotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nawjha Tech - Mohamed ALnawjha',
  description: '👨‍💻Full-Stack JavaScript Engineer | ⚛️REACT.JS - NEXT.JS | 🍃EXPRESS.JS - MONGODB',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ar'
      className={`${almarai.variable} ${spaceGrotesk.variable}`}>
      <body dir='rtl'>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
