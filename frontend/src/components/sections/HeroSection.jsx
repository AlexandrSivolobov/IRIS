import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    url: '/photos/living-room.jpg',
    alt: 'Гостиная — Волгоград'
  },
  {
    url: '/photos/bedroom.jpg',
    alt: 'Спальня — Волгоград'
  },
  {
    url: '/photos/terrace-1.jpg',
    alt: 'Терраса — Волгоград'
  },
  {
    url: '/photos/terrace-2.jpg',
    alt: 'Терраса с видом — Волгоград'
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section data-testid="hero-section" id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Slideshow Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].url}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-white text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-[0.12em] leading-none uppercase" style={{ fontFamily: "'Vetrino', 'Poiret One', sans-serif" }}>
            Ирис
          </h1>
          <span className="font-caveat text-[#f5e6d3] text-5xl sm:text-6xl md:text-7xl lg:text-8xl block mt-2">
            Design
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/80 font-manrope text-base sm:text-lg mt-8 tracking-widest uppercase max-w-lg text-center"
        >
          Архитектура, дизайн, реализация
        </motion.p>

        <motion.button
          data-testid="hero-cta-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta-btn mt-12 bg-iris-red text-white px-10 py-4 font-outfit text-sm tracking-widest uppercase hover:bg-iris-red-hover flex items-center gap-3"
        >
          Узнать больше
          <span className="arrow-icon">&#8594;</span>
        </motion.button>
      </div>
    </section>
  );
}
