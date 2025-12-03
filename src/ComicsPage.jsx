import React, { useEffect, useMemo, useRef, useState } from 'react';

// Public base URL for the comic assets hosted on R2.
// Files live at the root of the bucket (see provided public endpoint).
const R2_BASE = 'https://pub-bf6e2f70f5bb4ea988c32f6edb2780d4.r2.dev';

// Library of comics. Add more objects to this array later.
const COMICS = [
  {
    slug: 'eyes-in-the-dark',
    title: 'Eyes in the Dark',
    description: 'Rural Myanmar horror one-shot.',
    cover: `${R2_BASE}/cover.png`,
    pages: [
      `${R2_BASE}/page-1.png`,
      `${R2_BASE}/page-2.png`,
      `${R2_BASE}/page-3.png`,
      `${R2_BASE}/page-4.png`,
      `${R2_BASE}/page-5.png`,
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
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="min-h-screen flex flex-col">
        <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur z-20 sticky top-0">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold tracking-tight">Tasteless Media Comics</h1>
              {onNavigateHome && (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hidden sm:inline-flex text-xs text-slate-500 hover:text-slate-900 transition"
                >
                  Back to studio
                </button>
              )}
            </div>
            <button
              id="homeNavButton"
              className="text-sm text-slate-500 hover:text-slate-900 transition"
              type="button"
              onClick={goHome}
            >
              All comics
            </button>
          </div>
        </header>

        <main className="flex-1">
          {route.route !== 'reader' && (
            <section id="homeView" className="max-w-4xl mx-auto px-4 py-6">
              <h2 className="text-xl font-semibold mb-4">Library</h2>
              <div id="comicGrid" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {COMICS.map((comic) => (
                  <article
                    key={comic.slug}
                    className="group cursor-pointer rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    onClick={() => goReader(comic.slug)}
                  >
                    <img
                      src={comic.cover}
                      alt={`${comic.title} cover`}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover bg-slate-100 group-hover:scale-[1.01] transition-transform"
                    />
                    <div className="p-3 flex flex-col gap-2 flex-1">
                      <h3 className="text-sm font-semibold line-clamp-1">{comic.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{comic.description}</p>
                      <div className="mt-auto pt-2 flex justify-between items-center">
                        <span className="text-[11px] text-slate-500">{comic.pages.length} pages</span>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            goReader(comic.slug);
                          }}
                        >
                          Read
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {route.route === 'reader' && (
            <section id="readerView" className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <button
                    id="readerBackButton"
                    className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
                    type="button"
                    onClick={goHome}
                  >
                    <span className="text-lg leading-none">&larr;</span>
                    <span>Back to library</span>
                  </button>
                </div>
                <div id="pageIndicator" className="text-xs font-medium text-slate-500">
                  {pageIndicatorText}
                </div>
              </div>

              <h2 id="readerTitle" className="text-xl font-semibold mb-3">
                {currentComic ? currentComic.title : 'Comic not found'}
              </h2>
              <p id="readerDescription" className="text-sm text-slate-600 mb-4">
                {currentComic?.description || ''}
              </p>

              <div id="pagesContainer" className="flex flex-col items-center gap-4 pb-16">
                {currentComic?.pages.map((src, index) => (
                  <div key={src} className="w-full flex justify-center">
                    <img
                      src={src}
                      alt={`${currentComic.title} – Page ${index + 1}`}
                      loading="lazy"
                      className="w-full max-w-[640px] rounded-xl shadow-sm bg-slate-100 object-contain"
                      data-index={index}
                      ref={(el) => {
                        pageRefs.current[index] = el;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div
                id="readerControlsDesktop"
                className="hidden md:flex flex-col gap-2 fixed right-4 top-1/2 -translate-y-1/2 z-30"
              >
                <button
                  id="btnPrevDesktop"
                  className="px-3 py-2 rounded-xl shadow border bg-white text-xs hover:bg-slate-50"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex - 1)}
                >
                  Prev
                </button>
                <button
                  id="btnNextDesktop"
                  className="px-3 py-2 rounded-xl shadow border bg-white text-xs hover:bg-slate-50"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex + 1)}
                >
                  Next
                </button>
                <button
                  id="btnTopDesktop"
                  className="px-3 py-2 rounded-xl shadow border bg-white text-xs hover:bg-slate-50"
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Top
                </button>
              </div>

              <div
                id="readerControlsMobile"
                className="fixed inset-x-0 bottom-0 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 flex items-center justify-between px-4 py-2 z-30"
              >
                <button
                  id="btnPrevMobile"
                  className="px-3 py-2 rounded-lg border text-xs text-slate-700"
                  type="button"
                  onClick={() => scrollToPage(currentPageIndex - 1)}
                >
                  Prev
                </button>
                <div id="pageIndicatorMobile" className="text-xs font-medium text-slate-500">
                  {pageIndicatorText}
                </div>
                <button
                  id="btnNextMobile"
                  className="px-3 py-2 rounded-lg border text-xs text-slate-700"
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
