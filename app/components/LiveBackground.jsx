'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

const themes = {
  '/kerala': {
    base: 'radial-gradient(circle at top left, rgba(32, 160, 117, 0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(4, 78, 52, 0.35), transparent 30%), #061815',
    ring: 'rgba(16, 184, 131, 0.22)',
    accent: 'rgba(98, 255, 189, 0.18)',
    orb: 'rgba(21, 255, 178, 0.14)',
  },
  '/mumbai': {
    base: 'radial-gradient(circle at top right, rgba(255, 146, 30, 0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(12, 50, 83, 0.35), transparent 30%), #050a16',
    ring: 'rgba(255, 182, 91, 0.18)',
    accent: 'rgba(61, 182, 255, 0.16)',
    orb: 'rgba(111, 202, 255, 0.12)',
  },
  '/lucknow': {
    base: 'radial-gradient(circle at top left, rgba(246, 196, 81, 0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(60, 32, 16, 0.34), transparent 30%), #140f08',
    ring: 'rgba(255, 208, 129, 0.18)',
    accent: 'rgba(198, 146, 92, 0.14)',
    orb: 'rgba(255, 178, 55, 0.12)',
  },
  '/music': {
    base: 'radial-gradient(circle at top center, rgba(34, 197, 94, 0.08), transparent 28%), radial-gradient(circle at bottom right, rgba(20, 30, 24, 0.4), transparent 32%), #080908',
    ring: 'rgba(74, 222, 128, 0.12)',
    accent: 'rgba(34, 197, 94, 0.1)',
    orb: 'rgba(52, 211, 153, 0.1)',
  },
  default: {
    base: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(70, 63, 255, 0.12), transparent 32%), #090d12',
    ring: 'rgba(112, 96, 255, 0.16)',
    accent: 'rgba(150, 179, 255, 0.12)',
    orb: 'rgba(110, 130, 255, 0.1)',
  },
};

function getTheme(pathname) {
  if (pathname.includes('/kerala')) return themes['/kerala'];
  if (pathname.includes('/mumbai')) return themes['/mumbai'];
  if (pathname.includes('/lucknow')) return themes['/lucknow'];
  if (pathname.includes('/music')) return themes['/music'];
  return themes.default;
}

export default function LiveBackground() {
  const pathname = usePathname();
  const theme = useMemo(() => getTheme(pathname || '/'), [pathname]);

  return (
    <div className="live-background" aria-hidden="true">
      <div className="live-background__base" style={{ background: theme.base }} />
      <div className="live-background__orb orb-one" style={{ background: theme.orb }} />
      <div className="live-background__orb orb-two" style={{ background: theme.accent }} />
      <div className="live-background__ring" style={{ borderColor: theme.ring }} />
      <div className="live-background__lines" />
    </div>
  );
}
