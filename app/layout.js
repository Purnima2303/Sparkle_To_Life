import './globals.css';
import './theatre.css';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import LayoutChrome from './components/LayoutChrome';

const theatreSerif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-theatre-serif',
  display: 'swap',
});

const theatreSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-theatre-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Sparkle to Life | A Life in Three Cities',
  description:
    'Kerala, Mumbai, and Lucknow stitched into a life-memory, music, cinema, and handwritten moments.',
  keywords: 'Kerala, Mumbai, Lucknow, Memory, Music, Cinema, Life',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d0907',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${theatreSerif.variable} ${theatreSans.variable}`}>
      <body suppressHydrationWarning className="bg-[#0d0907] text-[#f5efe4] antialiased">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}

