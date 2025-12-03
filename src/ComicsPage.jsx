import React from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, Cloud } from 'lucide-react';

const comics = [
  {
    title: 'NEON WASTELAND',
    issue: 'Issue 01',
    summary: 'A synth-samurai defends the last analog archive in a city powered by corrupted AIs.',
    genres: ['Cyberpunk', 'Action', 'Cloudflare Images'],
    cloudflarePath: 'demo/neon-wasteland',
    accent: 'from-lime-400/30 via-fuchsia-400/20 to-amber-400/10',
  },
  {
    title: 'ORBITAL MYTHOS',
    issue: 'Issue 02',
    summary: 'Ancient gods are reborn as satellites while renegade scientists race to keep humanity grounded.',
    genres: ['Sci-Fi', 'Mythology', 'Edge Network'],
    cloudflarePath: 'demo/orbital-mythos',
    accent: 'from-cyan-400/30 via-indigo-400/20 to-slate-400/20',
  },
  {
    title: 'GARDENS OF STATIC',
    issue: 'Issue 03',
    summary: 'A horticulturist hacks signal noise to grow impossible flora in a datacenter ruin.',
    genres: ['Solarpunk', 'Mystery', 'R2 Ready'],
    cloudflarePath: 'demo/gardens-of-static',
    accent: 'from-emerald-400/30 via-lime-300/20 to-white/10',
  },
  {
    title: 'SPECTRUM RUNNERS',
    issue: 'Issue 04',
    summary: 'Street racers bend light to outrun surveillance drones across quantum tunnels.',
    genres: ['Thriller', 'Lightfield', 'Zero-Downtime'],
    cloudflarePath: 'demo/spectrum-runners',
    accent: 'from-orange-400/30 via-rose-300/20 to-purple-400/15',
  },
];

const ComicsPage = ({ onNavigateHome }) => {
  const cloudflareDeliveryBase = 'https://imagedelivery.net/YOUR_ACCOUNT_HASH';

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100">
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Tasteless Comics // Cloudflare Ready</p>
              <p className="text-lg font-bold text-white">TASTELESS<span className="text-lime-400">MEDIA</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400 border border-lime-400/30 px-3 py-2 hover:bg-lime-400 hover:text-black transition-colors"
              href="https://developers.cloudflare.com/pages" target="_blank" rel="noreferrer"
            >
              Cloudflare Pages <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-zinc-700 px-3 py-2 hover:border-lime-400 hover:text-lime-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Studio
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Cloudflare native</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">COMIC EXCHANGE</h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              A dedicated landing zone for sequential art hosted on Cloudflare infrastructure. Each issue references a
              Cloudflare Images delivery path, making it simple to swap in real assets once your account is wired up. When
              deployed to Cloudflare Pages, this view resolves instantly with global caching.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500">
              <div className="border border-zinc-800 p-4 rounded-md bg-zinc-900/40">
                <p className="text-white mb-1">SPA routing</p>
                <p>/_redirects ready for /comics path</p>
              </div>
              <div className="border border-zinc-800 p-4 rounded-md bg-zinc-900/40">
                <p className="text-white mb-1">Images</p>
                <p>Swap YOUR_ACCOUNT_HASH to stream covers</p>
              </div>
              <div className="border border-zinc-800 p-4 rounded-md bg-zinc-900/40">
                <p className="text-white mb-1">Zero config</p>
                <p>Works with npm run build on Pages</p>
              </div>
            </div>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3 text-lime-400">
              <Cloud className="w-5 h-5" />
              <p className="font-mono text-xs uppercase tracking-widest">Cloudflare delivery hints</p>
            </div>
            <ul className="text-sm text-zinc-400 space-y-2 list-disc list-inside">
              <li>Publish covers to Cloudflare Images or R2 and expose via <span className="text-white">{cloudflareDeliveryBase}/&lt;image-id&gt;/public</span>.</li>
              <li>Update the <span className="text-white">cloudflarePath</span> values below to match your asset identifiers.</li>
              <li>Because this is a single-page app, the included <code className="bg-zinc-800 px-1 rounded">/_redirects</code> file keeps deep links like <code className="bg-zinc-800 px-1 rounded">/comics</code> online on Pages.</li>
            </ul>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-lime-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Choose your comic</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {comics.map((comic) => (
              <article
                key={comic.title}
                className="relative border border-zinc-800 bg-zinc-900/60 hover:border-lime-400/40 transition-colors overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${comic.accent} opacity-60 group-hover:opacity-90 transition-opacity`}></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                <div className="relative p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200">{comic.issue}</p>
                      <h3 className="text-3xl font-black text-white tracking-tight">{comic.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-lime-300 border border-lime-300/40 px-2 py-1 rounded-full bg-lime-400/10">
                      Cloudflare ready
                    </span>
                  </div>
                  <p className="text-zinc-200 leading-relaxed">{comic.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {comic.genres.map((genre) => (
                      <span
                        key={genre}
                        className="text-[10px] font-mono uppercase tracking-widest text-zinc-200 border border-zinc-700/70 px-2 py-1 rounded-sm bg-zinc-950/40"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-zinc-300 font-mono">
                      <p>Image Path</p>
                      <p className="text-lime-300">{cloudflareDeliveryBase}/{comic.cloudflarePath}/public</p>
                    </div>
                    <a
                      href={`https://pages.dev/comics/${comic.cloudflarePath}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black bg-lime-400 px-3 py-2 hover:bg-white transition-colors"
                    >
                      View delivery <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComicsPage;
