'use client';

import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '/kerala', label: 'Kerala' },
  { href: '/mumbai', label: 'Mumbai' },
  { href: '/lucknow', label: 'Lucknow' },
  { href: '/music', label: 'Music' },
  { href: '/cinema', label: 'Cinema' },
  { href: '/poetry', label: 'Poetry' },
];

export default function TheatreNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="theatre-nav fixed left-0 right-0 top-0 z-[100]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="theatre-nav__brand group flex items-center gap-3">
          <span className="theatre-emblem flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a962]/40 text-lg text-[#c9a962]">
            *
          </span>
          <span className="flex flex-col handwritten">
            <span className="text-lg text-[#f5efe4]">Sparkle to Life</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#c9a962]/80">A Life in Three Cities</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="theatre-nav__link text-[13px] tracking-wide">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/memories" className="theatre-btn theatre-btn--ghost hidden sm:inline-flex">
            Enter Memories
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <span className={`h-px w-6 bg-[#c9a962] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-[#c9a962] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-[#c9a962] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#c9a962]/15 bg-[#1a120c]/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="theatre-nav__link text-base"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/memories" className="theatre-btn mt-2 w-fit" onClick={() => setOpen(false)}>
              Enter Memories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
