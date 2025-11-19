import React, { useMemo, useState, useRef, useEffect } from 'react';

// Import images
import image1 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_26 PM.png';
import image2 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_38 PM.png';
import image3 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_42 PM.png';
import image4 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_46 PM.png';
import image5 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_51 PM.png';
import image6 from '../assets/ChatGPT Image Nov 19, 2025, 06_35_56 PM.png';
import image7 from '../assets/ChatGPT Image Nov 19, 2025, 06_36_02 PM.png';
import image8 from '../assets/ChatGPT Image Nov 19, 2025, 06_36_07 PM.png';
import image9 from '../assets/ChatGPT Image Nov 19, 2025, 06_36_16 PM.png';
import image10 from '../assets/ChatGPT Image Nov 19, 2025, 06_36_20 PM.png';
import image11 from '../assets/ChatGPT Image Oct 30, 2025, 06_30_45 AM.png';
import image12 from '../assets/ChatGPT Image Oct 30, 2025, 06_30_50 AM.png';
import image13 from '../assets/ChatGPT Image Oct 30, 2025, 06_30_58 AM.png';

const descriptorPool = [
  { title: 'Cathedral Cloudline', tag: 'Environment', description: 'Procedural sky cities rendered in volumetric fog.' },
  { title: 'Monarch Relay', tag: 'Character', description: 'Fashion-forward avatars designed for holo runs.' },
  { title: 'Ion Choir', tag: 'Story Beat', description: 'Narrative keyframes for the Empire of Faith and Steam saga.' },
  { title: 'Eidolon Spire', tag: 'Architecture', description: 'Megastructures modeled with AI-assisted CAD workflows.' },
  { title: 'Spectral Bloom', tag: 'Lighting', description: 'Color scripts mixing sodium vapor with bioluminescence.' },
];

const gallerySources = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13
];

const ImageCard = ({ src, index, title, tag, description }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tiltStyle, setTiltStyle] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    setTiltStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlowPosition({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const resetPointerState = () => {
    setTiltStyle('');
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative border border-zinc-800/80 rounded-3xl bg-zinc-950/80 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transform: tiltStyle || undefined }}
      onMouseMove={handlePointerMove}
      onMouseEnter={handlePointerMove}
      onMouseLeave={resetPointerState}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(190, 242, 100, 0.2), transparent 60%)`
        }}
      ></div>

      <div className="relative overflow-hidden rounded-[28px] border border-zinc-900/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
        <img
          src={src}
          alt={`Showcase image ${index + 1}`}
          className="w-full h-80 object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute top-6 left-6 px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono uppercase tracking-[0.3em] text-white/80 bg-black/30">
          {tag}
        </div>
      </div>

      <div className="relative z-10 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">
          <span className="inline-flex h-2 w-2 rounded-full bg-lime-400 animate-pulse"></span>
          Case {String(index + 1).padStart(2, '0')}
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-lime-200 transition-colors">{title}</h3>
          <p className="text-sm text-zinc-400 font-mono leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.4em] text-zinc-500">
          <span>Scanline Ready</span>
          <span className="text-lime-400/80 group-hover:text-lime-300 transition-colors">Adaptive</span>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
    </div>
  );
};

const Showcase = () => {
  const showcaseItems = useMemo(() => (
    gallerySources.map((image, index) => ({
      src: image,
      ...descriptorPool[index % descriptorPool.length]
    }))
  ), []);

  return (
    <section id="showcase" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black/90">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <p className="font-mono text-xs text-lime-400 uppercase tracking-[0.5em] mb-3">Featured Project</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            EMPIRE OF FAITH AND STEAM
          </h2>
          <p className="text-zinc-500 max-w-2xl font-mono text-sm leading-relaxed">
            Hover across the gallery to wake the neural renderers. Each plate responds with tilt, glow, and adaptive lighting, mimicking the haptic controls in our production pipeline.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-zinc-500 uppercase tracking-[0.4em]">
          <p>Realtime Shader Suite</p>
          <p className="text-lime-400">Reactive / Immersive / Adaptive</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {showcaseItems.map((item, index) => (
          <ImageCard key={index} index={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Showcase;
