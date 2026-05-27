'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import CursorGlow from './CursorGlow';
import LiveBackground from './LiveBackground';
import { MusicProvider } from '../contexts/MusicContext';

export default function LayoutChrome({ children }) {
  const pathname = usePathname();
  const isTheatreHome = pathname === '/';

  if (isTheatreHome) {
    return <>{children}</>;
  }

  return (
    <MusicProvider>
      <LiveBackground />
      <CursorGlow />
      <Navbar />
      {children}
    </MusicProvider>
  );
}
