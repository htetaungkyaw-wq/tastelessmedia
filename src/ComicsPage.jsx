import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, BookOpen, Home, PanelsTopLeft } from 'lucide-react';

// Public base URL for the comic assets hosted on R2.
// Files live at the root of the bucket (see provided public endpoint).
const R2_BASE = 'https://pub-bf6e2f70f5bb4ea988c32f6edb2780d4.r2.dev';

// Library of comics. Add more objects to this array later.
const COMICS = [
  {
    slug: 'eyes-in-the-dark',
    title: 'Eyes in the Dark',
    description: 'Rural Myanmar horror one-shot.',
    cover: `${R2_BASE}/eyes-in-the-dark/cover.png`,
    pages: [
      `${R2_BASE}/eyes-in-the-dark/page-1.png`,
      `${R2_BASE}/eyes-in-the-dark/page-2.png`,
      `${R2_BASE}/eyes-in-the-dark/page-3.png`,
      `${R2_BASE}/eyes-in-the-dark/page-4.png`,
      `${R2_BASE}/eyes-in-the-dark/page-5.png`,
    ],
  },
];

const parseHash = () => {
  const raw = window.location.hash.slice(1);
  if (!raw) {
    return { route: 'home', params: new URLSearchParams() };
  }
  const [route, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  return { route: route || 'home', params };
};

const getComicBySlug = (slug) => COMICS.find((c) => c.slug === slug) || null;

const ComicsPage = ({ onNavigateHome }) => {
  const [route, setRoute] = useState(parseHash());
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageRefs = useRef([]);
  const observerRef = useRef(null);

  const currentSlug = useMemo(
    () => (route.route === 'reader' ? route.params.get('slug') : null),
    [route],
  );

  const currentComic = useMemo(() => getComicBySlug(currentSlug), [currentSlug]);

  const goHome = () => {
    window.location.hash = '#home';
    setCurrentPageIndex(0);
  };

  const goReader = (slug) => {
    window.location.hash = `#reader?slug=${encodeURIComponent(slug)}`;
  };

  const scrollToPage = (index) => {
    const pages = pageRefs.current.filter(Boolean);
    if (!pages.length) return;
    const clampedIndex = Math.min(Math.max(index, 0), pages.length - 1);
    pages[clampedIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentPageIndex(clampedIndex);
  };

  useEffect(() => {
    const handleHash = () => setRoute(parseHash());
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    pageRefs.current = [];
    observerRef.current?.disconnect();

    if (route.route === 'reader' && currentComic) {
      document.title = `${currentComic.title} – Reader`;
    } else {
      document.title = 'Tasteless Media Comics';
    }

    setCurrentPageIndex(0);
    return () => observerRef.current?.disconnect();
  }, [route, currentComic]);

  useEffect(() => {
    if (route.route !== 'reader' || !currentComic) return undefined;

    const pages = pageRefs.current.filter(Boolean);
    if (!pages.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index || '0');
            setCurrentPageIndex(idx);
          }
        });
      },
      {
        root: null,
        threshold: 0.55,
      },
    );

    observerRef.current = observer;
    pages.forEach((img) => observer.observe(img));

    pages[0].scrollIntoView({ behavior: 'smooth', block: 'start' });

    return () => observer.disconnect();
  }, [route, currentComic]);

  const pageIndicatorText = currentComic?.pages?.length
    ? `${currentPageIndex + 1} / ${currentComic.pages.length}`
    : '';

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-lime-400 selection:text-black">
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4ade8033,transparent_25%),radial-gradient(circle_at_80%_0%,#22d3ee22,transparent_25%)]" />
        </div>

        <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur z-30 sticky top-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center shadow-inner shadow-lime-400/10">
                <PanelsTopLeft className="w-5 h-5 text-lime-400" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Tastelessmedia.ai</p>
                <h1 className="text-xl font-bold tracking-tight text-white">Sequential Lab</h1>
              </div>
              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-lime-400 transition"
                >
                  <Home className="w-4 h-4" /> Back to studio
                </button>
              )}
            </div>
            <button
              id="homeNavButton"
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900 text-[12px] font-semibold tracking-wide hover:border-lime-400 hover:text-lime-400 transition"
              type="button"
              onClick={goHome}
            >
              <BookOpen className="w-4 h-4" /> Library
            </button>
          </div>
        </header>

        <main className="flex-1 relative">
          {route.route !== 'reader' && (
            <section id="homeView" className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-6">
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime-400">/ Comics exchange</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">Experiments in sequential art.</h2>
                <p className="text-zinc-400 max-w-3xl">Readings delivered directly from the R2 vault, tuned for the same technical brutalism as the studio homepage.</p>
              </div>

              <div id="comicGrid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {COMICS.map((comic) => (
                  <article
                    key={comic.slug}
                    className="group cursor-pointer rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden shadow-[0_0_0_1px_#18181b,0_20px_50px_-30px_rgba(0,0,0,0.8)] hover:border-lime-400/50 transition-all duration-300 flex flex-col"
                    onClick={() => goReader(comic.slug)}
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-70"></div>
                      <img
                        src={comic.cover}
                        alt={`${comic.title} cover`}
                        loading="lazy"
                        className="w-full aspect-[3/4] object-cover bg-zinc-900 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-zinc-800 bg-black/60 text-[11px] font-mono uppercase tracking-[0.2em] text-lime-300 shadow-lg">{comic.pages.length} pages</div>
                    </div>

                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-lime-300 transition-colors">{comic.title}</h3>
                      <p className="text-sm text-zinc-400 line-clamp-3 font-mono">{comic.description}</p>
                      <div className="mt-auto pt-2 flex justify-between items-center">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">R2 Asset • {comic.slug}</span>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-md border border-lime-400/60 bg-lime-400/10 text-xs font-semibold tracking-wide text-lime-300 hover:bg-lime-400/20 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            goReader(comic.slug);
                          }}
                        >
                          Launch
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {route.route === 'reader' && (
            <section id="readerView" className="max-w-6xl mx-auto px-4 md:px-8 py-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    id="readerBackButton"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200 border border-zinc-800 px-3 py-2 rounded-md bg-zinc-900 hover:border-lime-400 hover:text-lime-300 transition"
                    type="button"
                    onClick={goHome}
                  >
                    <ArrowLeft className="w-4 h-4" /> Library
                  </button>
                  <span className="hidden md:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                    <PanelsTopLeft className="w-4 h-4" /> R2 Vault
                  </span>
                </div>
                <div id="pageIndicator" className="text-xs font-mono uppercase tracking-[0.2em] text-lime-300">
                  {pageIndicatorText}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_0_1px_#18181b,0_30px_60px_-40px_rgba(0,0,0,0.9)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime-400">/ Reader</p>
                    <h2 id="readerTitle" className="text-3xl font-bold tracking-tight text-white">{currentComic ? currentComic.title : 'Comic not found'}</h2>
                    <p id="readerDescription" className="text-sm text-zinc-400 mt-2 max-w-3xl">{currentComic?.description || ''}</p>
                  </div>
                  <span className="hidden md:inline-flex px-3 py-1 rounded-full border border-zinc-800 bg-black/60 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">Pages live-observed</span>
                </div>

                <div id="pagesContainer" className="mt-6 flex flex-col items-center gap-6 pb-16">
                  {currentComic?.pages.map((src, index) => (
                    <div key={src} className="w-full flex justify-center">
                      <div className="relative w-full max-w-[720px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/40 pointer-events-none"></div>
                        <img
                          src={src}
                          alt={`${currentComic.title} – Page ${index + 1}`}
                          loading="lazy"
                          className="w-full object-contain bg-zinc-950"
                          data-index={index}
                          ref={(el) => {
                            pageRefs.current[index] = el;
                          }}
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-zinc-800 bg-black/60 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">Pg {index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                id="readerControlsDesktop"
                className="hidden md:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-30"
              >
                <button
                  id="btnPrevDesktop"
                  className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-semibold hover:border-lime-400 hover:text-lime-300 transition"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex - 1)}
                >
                  Previous
                </button>
                <button
                  id="btnNextDesktop"
                  className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-semibold hover:border-lime-400 hover:text-lime-300 transition"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex + 1)}
                >
                  Next
                </button>
                <button
                  id="btnTopDesktop"
                  className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-semibold hover:border-lime-400 hover:text-lime-300 transition inline-flex items-center gap-2"
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowUp className="w-4 h-4" /> Top
                </button>
              </div>

              <div
                id="readerControlsMobile"
                className="fixed inset-x-0 bottom-0 md:hidden bg-zinc-950/95 backdrop-blur border-t border-zinc-800 flex items-center justify-between px-4 py-3 z-30"
              >
                <button
                  id="btnPrevMobile"
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:border-lime-400 hover:text-lime-300 transition"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex - 1)}
                >
                  Prev
                </button>
                <div id="pageIndicatorMobile" className="text-xs font-mono uppercase tracking-[0.25em] text-lime-300">
                  {pageIndicatorText}
                </div>
                <button
                  id="btnNextMobile"
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:border-lime-400 hover:text-lime-300 transition"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex + 1)}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComicsPage;
