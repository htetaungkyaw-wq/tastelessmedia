import React from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Globe,
  Cpu,
  Camera,
  Play,
  Wand2,
} from 'lucide-react';

const dataRows = [
  {
    label: 'New briefs',
    value: '+14',
    detail: 'in the last 24h',
  },
  {
    label: 'Renders queued',
    value: '128',
    detail: 'GPU cluster ready',
  },
  {
    label: 'Live deliverables',
    value: '42',
    detail: 'shipping to clients',
  },
];

const tiles = [
  {
    title: 'Model lab',
    icon: Cpu,
    body: 'Custom LoRAs, fine-tunes, and on-demand checkpoints tailored to your product look.',
  },
  {
    title: 'Synthetic shoots',
    icon: Camera,
    body: 'Photo-realistic storyboards and campaigns without a single on-site production.',
  },
  {
    title: 'Motion systems',
    icon: Play,
    body: 'Text-to-video experiments, stabilized reels, and motion cues for editors.',
  },
  {
    title: 'Comics exchange',
    icon: Wand2,
    body: 'Sequential art delivered from the R2 vault; ship readers to the live catalog.',
    cta: true,
  },
];

const Capsule = ({ children }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.3em] text-slate-200 shadow-[0_10px_35px_-25px_rgba(15,23,42,0.9)]">
    {children}
  </span>
);

const GlowCard = ({
  title,
  icon: Icon,
  body,
  onClick,
  cta,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900 to-slate-950 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_-60px_rgba(0,0,0,0.9)] hover:border-lime-400/70 hover:-translate-y-1 transition"
  >
    <div className="flex items-center justify-between gap-3 mb-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-300">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      </div>
      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-lime-400" />
    </div>
    <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
    {cta && (
      <div className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-lime-300">
        Launch reader <ArrowUpRight className="w-4 h-4" />
      </div>
    )}
  </button>
);

export default function App({ onNavigateToComics = () => {} }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#a1ffcb1c,transparent_35%),radial-gradient(circle_at_80%_0%,#72efdd1f,transparent_30%),radial-gradient(circle_at_50%_60%,#7c3aed16,transparent_38%)]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <header className="flex items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shadow-inner shadow-lime-400/10">
              <Sparkles className="w-6 h-6 text-lime-300" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">Tasteless Media</p>
              <h1 className="text-2xl font-bold tracking-tight text-white">AI Studio Control</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm font-semibold hover:border-lime-400 hover:text-lime-300 transition"
            >
              <Globe className="w-4 h-4" />
              Live Status
            </button>
            <button
              type="button"
              onClick={onNavigateToComics}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-300 text-slate-900 text-sm font-semibold shadow-lg shadow-lime-300/30 hover:bg-white transition"
            >
              Comics Exchange <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8">
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_-60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-lime-300/15 blur-3xl" />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Capsule>Neural Fabric</Capsule>
              <Capsule>Dark mode</Capsule>
              <Capsule>2025 build</Capsule>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
              Reality is optional.
              <br /> We generate the impossible.
            </h2>
            <p className="text-slate-300 max-w-2xl leading-relaxed text-lg">
              A technical brutalist cockpit for turning prompts into polished visuals. Ship brand stories, motion studies, and sequential art without a camera on set.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {dataRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-1 shadow-inner shadow-black/30"
                >
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">{row.label}</p>
                  <p className="text-3xl font-bold text-white">{row.value}</p>
                  <p className="text-xs text-slate-400">{row.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm tracking-wide shadow-lg hover:bg-lime-200 transition"
              >
                Start a prompt <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/20 text-sm font-semibold text-white hover:border-lime-400 hover:text-lime-200 transition"
              >
                View deployments
              </button>
            </div>
          </section>

          <section className="space-y-4">
            {tiles.map((tile) => (
              <GlowCard
                key={tile.title}
                title={tile.title}
                icon={tile.icon}
                body={tile.body}
                onClick={tile.cta ? onNavigateToComics : undefined}
                cta={tile.cta}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
