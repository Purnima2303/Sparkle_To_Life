import Link from 'next/link';

export default function TheatreChapterStrip({ chapter, subtitle, href = '/' }) {
  return (
    <div className="border-b border-[#c9a962]/15 bg-[#1a120c]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a962]">*</span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a962]/70">Sparkle to Life</p>
            <p className="font-serif text-lg text-[#f5efe4]">{chapter}</p>
          </div>
        </div>
        <p className="max-w-md text-sm italic text-[#f5efe4]/50">{subtitle}</p>
        <Link
          href={href}
          className="text-[11px] uppercase tracking-[0.2em] text-[#c9a962] transition-colors hover:text-[#f5efe4]"
        >
          {'<- Return to the Stage'}
        </Link>
      </div>
    </div>
  );
}
