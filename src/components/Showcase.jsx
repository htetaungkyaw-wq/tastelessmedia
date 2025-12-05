import React from 'react';

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

const Showcase = () => {
  const images = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13
  ];

  const captions = [
    'Midjourney v6 prompt testing',
    'SORA text2video',
    'GANKEYFRAME stock',
    'Runway G3 for performance ads',
    'WAIFU.DIFFUSION pipeline manager',
    'Midjourney VARY & INPAINT QC',
    'OPENAI o4-mini image sequencing'
  ];

  return (
    <section id="showcase" className="py-24 md:py-32 px-6 md:px-12 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            ACTIVE NODES
          </h2>
          <p className="font-mono text-zinc-500 text-sm uppercase tracking-widest">
            Currently deployed pipelines
          </p>
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => {
            const caption = captions[index % captions.length];

            return (
              <div key={index} className="group relative border border-zinc-800 overflow-hidden">
                <img src={image} alt={`Showcase image ${index + 1}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white font-bold text-lg">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
};

export default Showcase;
