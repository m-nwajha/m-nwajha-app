import type { Metadata, Viewport } from 'next';
import { Almarai, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const viewport: Viewport = {
  themeColor: '#00adb5',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Basic ── */
  title: {
    default: 'Nawjha Tech | Mohamed ALnawjha - Full-Stack Developer',
    template: '%s | Nawjha Tech',
  },
  description:
    'Mohamed ALnawjha — Full-Stack JavaScript Engineer with 3+ years of experience. Specialized in building professional web apps using React, Next.js, Node.js, Express.js & MongoDB. 50+ completed projects and 30+ happy clients.',
  keywords: [
    'Mohamed ALnawjha',
    'Nawjha Tech',
    'مهندس برمجيات',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Express.js',
    'MongoDB',
    'TypeScript',
    'JavaScript',
    'تطوير مواقع',
    'تطوير تطبيقات ويب',
    'برمجة صفحة هبوط',
    'موقع تعريفي',
    'متجر إلكتروني',
    'freelance developer',
    'مطور فري لانس',
    'محمد النواجحة',
  ],
  authors: [{ name: 'Mohamed ALnawjha', url: BASE_URL }],
  creator: 'Mohamed ALnawjha - Nawjha Tech',
  publisher: 'Nawjha Tech',
  category: 'Technology',

  /* ── Alternate languages ── */
  alternates: {
    canonical: BASE_URL,
    languages: {
      'ar-SA': BASE_URL,
      'en-US': BASE_URL,
    },
  },

  /* ── OpenGraph ── */
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'Nawjha Tech',
    title: 'Nawjha Tech | Mohamed ALnawjha - Full-Stack Developer',
    description:
      'Mohamed ALnawjha — Full-Stack Developer with 3+ years of experience in React, Next.js, Node.js. 50+ completed projects.',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nawjha Tech - Mohamed ALnawjha Full-Stack Developer',
        type: 'image/png',
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card: 'summary_large_image',
    site: '@nawjha_m',
    creator: '@nawjha_m',
    title: 'Nawjha Tech | Mohamed ALnawjha - Full-Stack Developer',
    description:
      'Mohamed ALnawjha — Full-Stack Developer with 3+ years of experience in React, Next.js, Node.js.',
    images: ['/assets/images/og-image.png'],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Icons ── */
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/assets/images/logo.png',
  },

  /* ── Verification (add keys when available) ── */
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_KEY',
  //   yandex: 'YOUR_YANDEX_KEY',
  // },
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
