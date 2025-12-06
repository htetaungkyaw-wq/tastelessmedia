import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Terminal,
  Aperture,
  Activity,
  Maximize2,
  X,
  Menu,
  Code2,
  Zap,
  BrainCircuit,
  Layers,
  ChevronLeft,
} from 'lucide-react';

/**
 * TASTELESSMEDIA.AI.STUDIO
 * Design Concept: Technical Brutalist / Dark Mode Command Center
 * "We generate the impossible."
 */

// --- Custom Hooks ---

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setProgress(Number(scroll));
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  return progress;
};

// --- Sub-Components ---

const Marquee = ({ items, speed = 20, reverse = false }) => (
  <div className="relative flex overflow-hidden border-y border-zinc-800 bg-zinc-900 py-4 select-none">
    <div className={`animate-marquee flex whitespace-nowrap ${reverse ? 'flex-row-reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xl font-mono text-zinc-500 uppercase tracking-widest hover:text-lime-400 transition-colors cursor-default">
          {item}
        </span>
      ))}
    </div>
    <div className={`absolute top-0 flex whitespace-nowrap ${reverse ? 'flex-row-reverse' : ''} animate-marquee2`} style={{ animationDuration: `${speed}s` }}>
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xl font-mono text-zinc-500 uppercase tracking-widest hover:text-lime-400 transition-colors cursor-default">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const StatCard = ({ label, value, trend, icon: Icon }) => (
  <div className="relative group p-6 border-r border-b border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
      <Icon className="w-5 h-5 text-zinc-600 group-hover:text-lime-400 transition-colors" />
      <span className="font-mono text-xs text-zinc-500 uppercase">{trend}</span>
    </div>
    <h3 className="text-3xl text-white mb-1 tracking-tighter">{value}</h3>
    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{label}</p>
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </div>
);

const ServiceRow = ({ number, title, desc, tags }) => (
  <div className="group border-b border-zinc-800 p-8 md:p-12 hover:bg-zinc-900 transition-all duration-300 cursor-pointer relative overflow-hidden">
    <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 relative z-10">
      <span className="font-mono text-lime-400/50 text-xl md:text-2xl group-hover:text-lime-400 transition-colors">/{number}</span>
      <div className="flex-1">
        <h3 className="text-2xl md:text-4xl text-white mb-2 uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
        <p className="text-zinc-400 max-w-xl font-mono text-sm">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end max-w-xs">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 border border-zinc-700 text-zinc-500 text-[10px] uppercase tracking-widest font-mono rounded-sm group-hover:border-lime-400/30 group-hover:text-lime-400 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      <ArrowUpRight className="w-8 h-8 text-zinc-700 group-hover:text-lime-400 transform group-hover:rotate-45 transition-all duration-300" />
    </div>
  </div>
);

// --- Showcase Component ---

const Showcase = () => {
  const deployments = [
    { id: 'DP-01', name: 'Flux Realism', status: 'Active', latency: '23ms', type: 'Image Gen' },
    { id: 'DP-04', name: 'Sora Bridge', status: 'Training', latency: '---', type: 'Video Synth' },
    { id: 'DP-09', name: 'Llama-3-70b', status: 'Idle', latency: '45ms', type: 'LLM Core' },
    { id: 'DP-12', name: 'Audio-Craft', status: 'Active', latency: '12ms', type: 'Audio Gen' },
  ];

  return (
    <section id="showcase" className="py-24 bg-zinc-950 border-t border-zinc-800">
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping"></div>
            <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">Live Deployments</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white tracking-tighter uppercase">Active Nodes</h2>
        </div>
        <div className="font-mono text-xs text-zinc-500 text-right">
          <p>REGION: US-EAST-1</p>
          <p>UPTIME: 99.999%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-zinc-800">
        {deployments.map((node, i) => (
          <div
            key={node.id}
            className="group border-b md:border-b-0 md:border-r border-zinc-800 last:border-r-0 bg-zinc-950 hover:bg-zinc-900 transition-colors p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <Activity className="w-12 h-12 text-zinc-700 group-hover:text-lime-400" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-zinc-500 border border-zinc-800 px-2 py-1 bg-zinc-950">{node.id}</span>
                <div className={`w-2 h-2 rounded-full ${node.status === 'Active' ? 'bg-lime-500' : 'bg-amber-500'}`}></div>
              </div>

              <div>
                <h3 className="text-xl text-white mb-1">{node.name}</h3>
                <p className="font-mono text-xs text-zinc-500 uppercase">{node.type}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-800/50">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Status</span>
                  <span className={node.status === 'Active' ? 'text-lime-400' : 'text-amber-400'}>{node.status}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600">Latency</span>
                  <span className="text-zinc-300">{node.latency}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-zinc-800 hover:bg-lime-400 hover:text-black text-white text-xs py-2 uppercase tracking-wider transition-colors">
                Access Node
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Comics Page Placeholder ---

const ComicsPage = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
    <nav className="border-b border-zinc-800 p-6 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md fixed w-full z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm font-mono uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Studio
        </button>
      </div>
      <span className="tracking-tighter">COMICS<span className="text-lime-400">EXCHANGE</span></span>
    </nav>

    <div className="flex-1 flex flex-col items-center justify-center p-6 pt-32 text-center">
      <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-zinc-800 animate-pulse">
        <Layers className="w-10 h-10 text-lime-400" />
      </div>
      <h1 className="text-4xl md:text-6xl uppercase tracking-tighter mb-4">Sequential Art<br />Protocol</h1>
      <p className="text-zinc-400 max-w-md mx-auto font-mono text-sm leading-relaxed mb-8">
        The comics exchange is currently initializing. Connection to Cloudflare R2 bucket is pending authentication.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-[2/3] bg-zinc-900 border border-zinc-800 rounded-sm relative group cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">Issue #{String(i).padStart(3, '0')}</span>
            </div>
            <div className="absolute inset-0 bg-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-zinc-950/90 border-t border-zinc-800">
              <p className="text-xs text-white uppercase">Read Issue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App/Home Component ---

const Home = ({ onNavigateToComics = () => {} }) => {
  const scrollProgress = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">
      {/* --- Progress Bar --- */}
      <div className="fixed top-0 left-0 h-1 bg-lime-400 z-[60]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex justify-between items-stretch h-16">
          {/* Logo Area */}
          <div
            className="flex items-center px-6 md:px-10 border-r border-zinc-800 bg-zinc-950 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="flex flex-col">
              <span className="text-xl tracking-tighter text-white">TASTELESS<span className="text-lime-400">MEDIA</span></span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em]">AI.STUDIO // v1.0</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-end bg-zinc-950/50">
            {[
              {
                label: 'Comics',
                onClick: onNavigateToComics,
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => (item.onClick ? item.onClick() : window.location.replace(item.href))}
                className="h-full flex items-center px-8 text-xs font-mono uppercase tracking-widest hover:bg-zinc-900 hover:text-lime-400 border-l border-zinc-800 transition-colors"
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button className="h-full px-8 bg-lime-400 text-black uppercase text-sm tracking-wide hover:bg-white transition-colors flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Start Prompt
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center px-6 border-l border-zinc-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950 pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            <a href="#models" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-tight">
              Models
            </a>
            <a href="#neural-art" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-tight">
              Neural Art
            </a>
            <button
              onClick={() => {
                onNavigateToComics();
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-2xl text-white uppercase tracking-tight"
            >
              Comics
            </button>
            <a href="#uplink" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl text-lime-400 uppercase tracking-tight">
              Start Uplink
            </a>
          </div>
        </div>
      )}

      {/* --- Hero Section --- */}
      <header className="relative min-h-screen flex flex-col pt-16">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 relative z-10">
          <div className="max-w-7xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-lime-400 animate-pulse rounded-full"></div>
              <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">Neural Networks Online</span>
            </div>

            <h1 className="text-[12vw] leading-[0.85] tracking-tighter text-white mb-8 mix-blend-difference">
              REALITY IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">OPTIONAL.</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-zinc-800 pt-8 mt-8">
              <div className="max-w-xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={onNavigateToComics}
                    className="inline-flex items-center gap-2 bg-lime-400 text-black px-4 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors"
                  >
                    <Terminal className="w-4 h-4" /> Launch Comics Exchange
                  </button>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Now shipping sequential art via Cloudflare Pages
                  </p>
                </div>
              </div>

              <div className="flex flex-col font-mono text-xs text-zinc-500 gap-1 text-right">
                <span>GPU CLUSTER: ONLINE</span>
                <span>LATENCY: 12ms</span>
                <span>STATUS: TRAINING...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-800">
          <StatCard label="Images Generated" value="1.2M+" trend="↑ Weekly" icon={Aperture} />
          <StatCard label="Model Accuracy" value="99.4%" trend="v4.0 Beta" icon={BrainCircuit} />
          <StatCard label="Render Time" value="<8s" trend="Real-time" icon={Zap} />
          <StatCard label="Styles Trained" value="450+" trend="Library" icon={Code2} />
        </div>
      </header>

      {/* --- Marquee --- */}
      <Marquee items={['Stable Diffusion', 'Midjourney v6', 'Runway Gen-2', 'Llama 3', 'LoRA Training', 'Synthetic Video', 'ControlNet']} />

      {/* --- Services --- */}
      <section id="models" className="border-t border-zinc-800 bg-zinc-950 relative">
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-lime-400 to-transparent"></div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-24 md:h-auto border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex md:flex-col justify-center items-center bg-zinc-900/50">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 rotate-0 md:-rotate-90 whitespace-nowrap">Capabilities</h2>
          </div>

          <div className="flex-1">
            <ServiceRow
              number="01"
              title="Prompt Packs & AI App Guides"
              desc="Expert-crafted prompt libraries and application blueprints. Get production-ready workflows for image generation, content creation, and automation—optimized for GPT-4, Claude, and Midjourney."
              tags={['ChatGPT', 'Claude', 'Midjourney', 'Templates']}
            />
            <ServiceRow
              number="02"
              title="Synthetic Video"
              desc="Text-to-Video and Image-to-Video workflows that defy physics. We create commercials, social clips, and music visualizations without a single camera lens."
              tags={['Runway Gen-3', 'Pika Labs', 'Sora', 'Deforum']}
            />
            <ServiceRow
              number="03"
              title="Media Buying & Performance Intelligence"
              desc="AI-powered ad optimization across Meta, Google, and TikTok. Real-time analytics, automated bidding, and creative performance insights to maximize ROAS and scale profitably."
              tags={['Meta Ads', 'Google Ads', 'Analytics', 'Attribution']}
            />
          </div>
        </div>
      </section>

      {/* --- Case Studies --- */}
      <section id="neural-art" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl tracking-tighter text-white mb-4">SYNTHETIC<br />ARCHIVE</h2>
            <p className="font-mono text-zinc-500 text-sm uppercase tracking-widest">Recent Generations</p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-mono text-xs text-lime-400 border border-lime-400/30 px-4 py-2 hover:bg-lime-400 hover:text-black transition-colors uppercase">
            View Database <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {[
            { client: 'PAGAN REBORN', metric: 'Epic Fantasy', desc: 'Dark fantasy world-building with mystical architecture.', color: 'bg-amber-900' },
            { client: 'COMING SOON', metric: 'Retro Future', desc: 'Synthwave aesthetic with vibrant cyberpunk elements.', color: 'bg-blue-900' },
            { client: 'WAR OF FAITH 1', metric: 'Battle Epic', desc: 'Cinematic war scenes with dramatic lighting and scale.', color: 'bg-emerald-900' },
            { client: 'EMPIRE OF STEAM', metric: 'Steampunk', desc: 'Industrial revolution meets fantasy in a steampunk realm.', color: 'bg-orange-900' },
          ].map((item, i) => (
            <div
              key={item.client}
              className="group relative h-[400px] md:h-[500px] border border-zinc-800 overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-zinc-400 uppercase border border-zinc-700 px-2 py-1 bg-zinc-950/50 backdrop-blur-sm">
                    Project_{String(i + 1).padStart(2, '0')}
                  </span>
                  <Maximize2 className="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                <div>
                  <h3 className="text-4xl md:text-6xl text-white uppercase tracking-tighter mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.client}
                  </h3>
                  <div className="h-[1px] w-full bg-zinc-700 my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="font-mono text-xs text-zinc-300 max-w-[200px]">{item.desc}</p>
                    <p className="text-3xl text-lime-400 tracking-tight">{item.metric}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Showcase --- */}
      <Showcase />

      {/* --- Comics CTA --- */}
      <section id="comics" className="border-y border-zinc-800 bg-zinc-950 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-lime-400 uppercase tracking-[0.3em] mb-3">Cloudflare ready</p>
            <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">Comics Exchange</h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              Route your readers to a dedicated comics surface that ships with the build. Clicking through opens a full-page
              selector where each issue is paired with a Cloudflare Images delivery path—perfect for R2 or Images backed
              hosting.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SPA friendly routing', 'Cloudflare Image hints', 'Edge cached on Pages'].map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-200 border border-zinc-700 px-3 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onNavigateToComics}
                className="inline-flex items-center gap-2 bg-lime-400 text-black px-5 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" /> Go to comics
              </button>
              <a
                href="https://developers.cloudflare.com/images"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-lime-400 border border-lime-400/30 px-4 py-3 hover:bg-lime-400 hover:text-black transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Cloudflare Images <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Cloudflare Pages ready',
                desc: 'Included /_redirects file keeps /comic deep-link healthy as a single-page app.',
              },
              {
                title: 'Swappable covers',
                desc: 'Each card exposes the delivery URL pattern so you can paste your Cloudflare asset IDs.',
              },
              {
                title: 'Edge observability',
                desc: 'Pair with Pages Analytics or Logs to monitor engagement on the comic catalog.',
              },
              {
                title: 'Speed without servers',
                desc: 'All static assets bundle into Vite build—nothing to maintain beyond npm run build.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-zinc-800 bg-zinc-900/60 p-4 rounded-md">
                <p className="text-sm text-lime-400 font-mono uppercase tracking-[0.2em] mb-2">{item.title}</p>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Interactive Terminal (CTA) --- */}
      <section id="uplink" className="border-y border-zinc-800 bg-zinc-900 py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-zinc-950 border border-zinc-700 shadow-2xl rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 p-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-xs text-zinc-500">root@tastelessmedia-ai:~</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 md:p-12 font-mono text-sm md:text-base space-y-6">
              <div className="text-zinc-400">
                <span className="text-lime-400">➜</span> <span className="text-blue-400">~</span> pip install tasteless-media-studio
              </div>
              <div className="text-zinc-300">
                Downloading packages... <span className="text-green-400">[DONE]</span>
                <br />
                Initializing collaboration request...
              </div>

              <div className="grid gap-4 pt-4">
                <div className="flex flex-col">
                  <label className="text-xs text-zinc-500 uppercase mb-1">Input: Name/Brand</label>
                  <input type="text" className="bg-zinc-900 border-b border-zinc-700 text-white p-2 focus:outline-none focus:border-lime-400 transition-colors" placeholder="_" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-zinc-500 uppercase mb-1">Input: Contact Email</label>
                  <input type="email" className="bg-zinc-900 border-b border-zinc-700 text-white p-2 focus:outline-none focus:border-lime-400 transition-colors" placeholder="_" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-zinc-500 uppercase mb-1">Select Parameters (Service)</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button className="border border-zinc-700 p-2 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-colors text-zinc-400">--images</button>
                    <button className="border border-zinc-700 p-2 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-colors text-zinc-400">--video</button>
                    <button className="border border-lime-400/50 text-lime-400 p-2 bg-lime-400/10">--custom-model</button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full bg-white hover:bg-lime-400 text-black py-4 px-8 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group">
                  <span className="group-hover:animate-pulse">/imagine collaboration</span> <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-center text-zinc-600 text-xs mt-4">Processing time: Immediate upon transmission.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-800 text-zinc-600 font-mono text-xs">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="block text-white tracking-tight text-lg mb-1">TASTELESS<span className="text-lime-400">MEDIA</span></span>
            <span>AI.STUDIO // BUILD 2049</span>
          </div>
          <div className="flex gap-8 uppercase tracking-widest">
            <a href="#" className="hover:text-lime-400 transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              HuggingFace
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              Twitter
            </a>
          </div>
          <div className="text-right">
            <p>© 2025 Tasteless Media.</p>
            <p>All prompts reserved.</p>
          </div>
        </div>
      </footer>

      {/* --- Global Styles for Marquee & Grain --- */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const getPageFromPath = () => (window.location.pathname.startsWith('/comic') ? 'comics' : 'home');
  const [currentPage, setCurrentPage] = useState(getPageFromPath());

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setCurrentPage('home');
  };

  const navigateToComics = () => {
    if (!window.location.pathname.startsWith('/comic')) {
      window.history.pushState({}, '', '/comic');
    }
    setCurrentPage('comics');
  };

  if (currentPage === 'comics') {
    return <ComicsPage onBack={navigateToHome} />;
  }

  return <Home onNavigateToComics={navigateToComics} />;
}
