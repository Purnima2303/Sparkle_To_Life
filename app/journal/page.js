'use client';

import Link from 'next/link';

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0f1115]" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-gray-300 mb-4">Written Memories</p>
          <h1 className="text-7xl md:text-8xl font-light mb-6">Memory Journal</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Thoughts written in rain. Moments preserved in ink.</p>
        </div>
      </section>

      {/* JOURNAL ENTRIES */}
      <section className="py-28 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4\">Personal Diary</p>
            <h2 className="text-5xl font-light">Between Home & Journey</h2>
          </div>

          <div className="space-y-16">
            {[
              {
                date: 'June 15, 2024',
                title: 'Return to Kerala',
                content: "The smell of rain hits before the rain itself. Mom's face. The old house. Nothing changes, yet everything feels different. I'm still the boy who left, but I'm not the boy who left. Kerala doesn't ask questions. It just accepts.",
              },
              {
                date: 'May 22, 2024',
                title: 'Mumbai Midnight',
                content: "Alone in a tall building, watching the city sleep. Or is the city awake and we are the ones sleeping? The energy here never rests. It's beautiful in a way that hurts. This city takes everything and gives back ambition.",
              },
              {
                date: 'April 10, 2024',
                title: 'Lucknow Dreams',
                content: 'Walking through old streets where Nawabs once ruled. Every building has a story written on its walls. The people here speak in poetry without realizing it. I want to stay longer, but the journey calls.',
              },
              {
                date: 'March 3, 2024',
                title: 'On Moving Between Worlds',
                content: "I realized today that I don't belong completely to any one place. Kerala has my roots. Mumbai has my present. Lucknow has my dreams. Perhaps belonging means being three places at once, incomplete in each, whole in the between.",
              },
            ].map((entry, index) => (
              <div key={index} className="glass rounded-[30px] p-10 hover:-translate-y-2 transition-all duration-300 cinema-card">
                <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-3">{entry.date}</p>
                <h3 className="text-3xl font-light mb-6">{entry.title}</h3>
                <p className="text-gray-300 leading-8 text-lg">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="py-28 px-6 md:px-16 bg-[#14171d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">Recurring Themes</p>
            <h2 className="text-5xl font-light">What The Journey Taught</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { theme: 'Rain & Memory', desc: 'Every monsoon brings back what we forgot. The sound of rain is the sound of time traveling backward.' },
              { theme: 'Motion & Home', desc: "Home isn't where we stop. Home is where we want to return. The movement between places defines us more than any single place ever could." },
              { theme: 'Poetry & Architecture', desc: "The best cities are built with poetry in their walls. Beauty isn't about newness. It's about stories accumulating in silence." },
            ].map((item, index) => (
              <div key={index} className="bg-[#1b1f26] rounded-[30px] p-10 border border-white/10">
                <h3 className="text-2xl font-light mb-5">{item.theme}</h3>
                <p className="text-gray-300 leading-8">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-white/10 text-center">
        <Link href="/" className="text-gray-400 hover:text-white transition-all">
          {'<- Back to Home'}
        </Link>
        <p className="mt-6 text-xs tracking-[0.18em] text-white/35">© 2026 - My Life</p>
      </footer>
    </div>
  );
}

