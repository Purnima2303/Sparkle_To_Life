'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-light handwritten">
          Sparkle to Life
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/kerala" className="hover:text-gray-300 transition-all">
            Kerala
          </Link>
          <Link href="/mumbai" className="hover:text-gray-300 transition-all">
            Mumbai
          </Link>
          <Link href="/lucknow" className="hover:text-gray-300 transition-all">
            Lucknow
          </Link>
          <Link href="/music" className="hover:text-gray-300 transition-all">
            Music
          </Link>
          <Link href="/cinema" className="hover:text-gray-300 transition-all">
            Cinema
          </Link>
          <Link href="/poetry" className="hover:text-gray-300 transition-all">
            Poetry
          </Link>
          <Link href="/memories" className="ml-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 px-5 py-2 text-sm text-yellow-200 hover:bg-yellow-300/10 transition">
            Enter Memories
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1"
        >
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <Link href="/kerala" className="block hover:text-gray-300 transition-all">
              Kerala
            </Link>
            <Link href="/mumbai" className="block hover:text-gray-300 transition-all">
              Mumbai
            </Link>
            <Link href="/lucknow" className="block hover:text-gray-300 transition-all">
              Lucknow
            </Link>
            <Link href="/music" className="block hover:text-gray-300 transition-all">
              Music
            </Link>
            <Link href="/cinema" className="block hover:text-gray-300 transition-all">
              Cinema
            </Link>
            <Link href="/poetry" className="block hover:text-gray-300 transition-all">
              Poetry
            </Link>
              <div className="pt-4">
                <Link href="/memories" className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 px-4 py-2 text-sm text-yellow-200 hover:bg-yellow-300/10 transition">
                  Enter Memories
                </Link>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
}
