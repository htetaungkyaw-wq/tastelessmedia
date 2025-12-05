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
  Cpu, 
  Globe,
  Zap,
  TrendingUp,
  Fingerprint,
  Bot,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import Showcase from './components/Showcase';

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

// --- Components ---

const Marquee = ({ items, speed = 20, reverse = false }) => (
  <div className="relative flex overflow-hidden border-y border-zinc-800 bg-zinc-900 py-4 select-none">
    <div className={`animate-marquee flex whitespace-nowrap ${reverse ? 'flex-row-reverse' : ''}`}>
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xl font-mono font-bold text-zinc-500 uppercase tracking-widest hover:text-lime-400 transition-colors cursor-default">
          {item}
        </span>
      ))}
    </div>
    <div className={`absolute top-0 flex whitespace-nowrap ${reverse ? 'flex-row-reverse' : ''} animate-marquee2`}>
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xl font-mono font-bold text-zinc-500 uppercase tracking-widest hover:text-lime-400 transition-colors cursor-default">
          {item}
        </span>
      ))}
    </div>
    {/* CSS styles for marquee are injected at bottom */}
  </div>
);

const StatCard = ({ label, value, trend, icon: Icon }) => (
  <div className="relative group p-6 border-r border-b border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
      <Icon className="w-5 h-5 text-zinc-600 group-hover:text-lime-400 transition-colors" />
      <span className="font-mono text-xs text-zinc-500 uppercase">{trend}</span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1 tracking-tighter">{value}</h3>
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
        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
        <p className="text-zinc-400 max-w-xl font-mono text-sm">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end max-w-xs">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 border border-zinc-700 text-zinc-500 text-[10px] uppercase tracking-widest font-mono rounded-sm group-hover:border-lime-400/30 group-hover:text-lime-400 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      <ArrowUpRight className="w-8 h-8 text-zinc-700 group-hover:text-lime-400 transform group-hover:rotate-45 transition-all duration-300" />
    </div>
  </div>
);

export default function App({ onNavigateToComics = () => {} }) {
  const scrollProgress = useScrollProgress();
  const [hoveredCase, setHoveredCase] = useState(null);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-200 selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* --- Progress Bar --- */}
      <div className="fixed top-0 left-0 h-1 bg-lime-400 z-[60]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex justify-between items-stretch h-16">
          {/* Logo Area */}
          <div className="flex items-center px-6 md:px-10 border-r border-zinc-800 bg-zinc-950">
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter text-white">TASTELESS<span className="text-lime-400">MEDIA</span></span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em]">AI.STUDIO // v1.0</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-end bg-zinc-950/50">
            {[{
              label: 'Models', href: '#models'
            }, {
              label: 'Neural-Art', href: '#neural-art'
            }, {
              label: 'Deployments', href: '#showcase'
            }, {
              label: 'Uplink', href: '#uplink'
            }, {
              label: 'Comics', onClick: onNavigateToComics
            }].map((item, i) => (
              <button
                key={i}
                onClick={() => item.onClick ? item.onClick() : window.location.assign(item.href)}
                className="h-full flex items-center px-8 text-xs font-mono uppercase tracking-widest hover:bg-zinc-900 hover:text-lime-400 border-l border-zinc-800 transition-colors"
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button className="h-full px-8 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-white transition-colors flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Start Prompt
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center px-6 border-l border-zinc-800">
            <Menu className="w-6 h-6 text-white" />
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative min-h-screen flex flex-col pt-16">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}></div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 relative z-10">
          <div className="max-w-7xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-lime-400 animate-pulse rounded-full"></div>
              <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">Transmission 001 // Public feed</span>
            </div>

            <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white mb-8 mix-blend-difference">
              MAKE THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">UNREAL INEVITABLE.</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-zinc-800 pt-8 mt-8">
              <div className="max-w-xl">
                <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                  Tasteless Media is a synthetic production unit. We spin up <span className="text-white font-medium border-b border-lime-400">campaign-grade visuals</span>, <span className="text-white font-medium border-b border-fuchsia-500">motion pieces</span>, and <span className="text-white font-medium border-b border-sky-400">custom AI stacks</span> with no cameras required.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={onNavigateToComics}
                    className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-4 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors"
                  >
                    <Terminal className="w-4 h-4" /> Open Sequential Lab
                  </button>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Figma x Cloudflare delivery, straight from the vault
                  </p>
                </div>
              </div>

              <div className="flex flex-col font-mono text-xs text-zinc-500 gap-1 text-right">
                <span>GPU CLUSTER: GREENLIGHT</span>
                <span>RENDITIONS: 45/cycle</span>
                <span>STATUS: DEPLOYING NEW RUNS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-800">
          <StatCard label="Launch Assets" value="380+" trend="Campaign ready" icon={Aperture} />
          <StatCard label="Prototype Windows" value="<24h" trend="Speed lane" icon={BrainCircuit} />
          <StatCard label="Inference Latency" value="9ms" trend="Edge tuned" icon={Zap} />
          <StatCard label="Custom Pipelines" value="30+" trend="Live" icon={Code2} />
        </div>
      </header>

      {/* --- Marquee --- */}
      <Marquee items={['Campaign Engine', 'Text-to-Video', 'Fine-tuned LoRAs', 'ControlNet', 'Edge Delivery', 'Comics Exchange', 'Realtime Renders']} />

      {/* --- Services (The Protocol) --- */}
      <section id="models" className="border-t border-zinc-800 bg-zinc-950 relative">
         <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-lime-400 to-transparent"></div>
         <div className="flex flex-col md:flex-row">
            {/* Sidebar Title */}
            <div className="md:w-24 md:h-auto border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex md:flex-col justify-center items-center bg-zinc-900/50">
               <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500 rotate-0 md:-rotate-90 whitespace-nowrap">Capabilities</h2>
            </div>
            
            {/* Service List */}
            <div className="flex-1">
              <ServiceRow
                number="01"
                title="Campaign Labs"
                desc="Rapid-fire explorations for product drops, album releases, and experiential stunts. We build the visual language before the shoot would have even wrapped."
                tags={['Storyboard grids', 'Product renders', 'Key art', 'Variations']}
              />
              <ServiceRow
                number="02"
                title="Motion Systems"
                desc="Text-to-video, camera-controlled clips, and animated stills for social. Motion design without a set—perfect for teasers, lyric shorts, and reactive ads."
                tags={['Runway Gen-3', 'Camera paths', 'Interpolations', 'Color grades']}
              />
              <ServiceRow
                number="03"
                title="Model Ops"
                desc="Style-locked LoRAs, IP adapters, and assistants tuned to your product stack. Delivered with prompts, seeds, and repeatable runbooks."
                tags={['LoRA kits', 'Adapters', 'Seed packs', 'Prompt notebooks']}
              />
            </div>
         </div>
      </section>

      {/* --- Case Studies (Deployments) --- */}
      <section id="neural-art" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">DEPLOYMENT<br/>LOG</h2>
             <p className="font-mono text-zinc-500 text-sm uppercase tracking-widest">Recent synth runs</p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-mono text-xs text-lime-400 border border-lime-400/30 px-4 py-2 hover:bg-lime-400 hover:text-black transition-colors uppercase">
            Open vault <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {[
            { client: "CLOUD CASSETTE", metric: "Launch Film", desc: "Text-to-video trailer cut from a single prompt thread.", color: "bg-fuchsia-900" },
            { client: "STADIUM ENERGY", metric: "OOH Suite", desc: "Dozens of billboard variants rendered overnight.", color: "bg-blue-900" },
            { client: "AETHER HOTEL", metric: "Lobby Loop", desc: "Procedural motion art for in-venue displays.", color: "bg-emerald-900" },
            { client: "ZINE DROP", metric: "Sequential", desc: "AI comic experiment stitched for print and web.", color: "bg-orange-900" }
          ].map((item, i) => (
            <div 
              key={i}
              className="group relative h-[400px] md:h-[500px] border border-zinc-800 overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredCase(i)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              {/* Image Placeholder */}
              <div className={`absolute inset-0 ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-zinc-400 uppercase border border-zinc-700 px-2 py-1 bg-zinc-950/50 backdrop-blur-sm">
                    Gen_ID: 00{i+1}
                  </span>
                  <Maximize2 className="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                <div>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.client}
                  </h3>
                  <div className="h-[1px] w-full bg-zinc-700 my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                     <p className="font-mono text-xs text-zinc-300 max-w-[200px]">{item.desc}</p>
                     <p className="text-3xl font-bold text-lime-400 tracking-tight">{item.metric}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Showcase />

      {/* --- Comics CTA --- */}
      <section id="comics" className="border-y border-zinc-800 bg-zinc-950 py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-lime-400 uppercase tracking-[0.3em] mb-3">Cloudflare ready</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Sequential Lab</h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-6">
              A first-class portal for comics, zines, and motion tests. Launch the reader to browse Cloudflare-backed issues,
              swap in your own image delivery hashes, and keep the brutalist shell intact for every drop.
            </p>
            <div className="flex flex-wrap gap-3">
              {["SPA friendly routing", "Cloudflare delivery IDs", "Edge cached on Pages"].map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-200 border border-zinc-700 px-3 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onNavigateToComics}
                className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-5 py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" /> Open reader
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
            {[{
              title: 'Cloudflare Pages ready',
              desc: 'Included /_redirects file keeps /comic deep-link healthy as a single-page app.',
            }, {
              title: 'Swappable covers',
              desc: 'Each card exposes the delivery URL pattern so you can paste your Cloudflare asset IDs.',
            }, {
              title: 'Edge observability',
              desc: 'Pair with Pages Analytics or Logs to monitor engagement on the comic catalog.',
            }, {
              title: 'Speed without servers',
              desc: 'All static assets bundle into Vite build—nothing to maintain beyond npm run build.',
            }].map((item, idx) => (
              <div key={idx} className="border border-zinc-800 bg-zinc-900/60 p-4 rounded-md">
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
                <span className="text-lime-400">➜</span> <span className="text-blue-400">~</span> pip install tasteless-media-vault
              </div>
              <div className="text-zinc-300">
                Downloading packages... <span className="text-green-400">[DONE]</span><br/>
                Initializing broadcast to creative ops...
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
                     <button className="border border-zinc-700 p-2 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-colors text-zinc-400">--campaign-lab</button>
                     <button className="border border-zinc-700 p-2 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-colors text-zinc-400">--motion</button>
                     <button className="border border-lime-400/50 text-lime-400 p-2 bg-lime-400/10">--model-ops</button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full bg-white hover:bg-lime-400 text-black font-bold py-4 px-8 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group">
                  <span className="group-hover:animate-pulse">/imagine collaboration</span> <ArrowUpRight className="w-4 h-4" />
                </button>
                <p className="text-center text-zinc-600 text-xs mt-4">
                  Processing time: Immediate upon transmission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-800 text-zinc-600 font-mono text-xs">
        <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
             <span className="block text-white font-bold tracking-tight text-lg mb-1">TASTELESS<span className="text-lime-400">MEDIA</span></span>
             <span>AI.STUDIO // BUILD 2049</span>
           </div>
           <div className="flex gap-8 uppercase tracking-widest">
             <a href="#" className="hover:text-lime-400 transition-colors">Discord</a>
             <a href="#" className="hover:text-lime-400 transition-colors">HuggingFace</a>
             <a href="#" className="hover:text-lime-400 transition-colors">Twitter</a>
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
      `}</style>
    </div>
  );
}
