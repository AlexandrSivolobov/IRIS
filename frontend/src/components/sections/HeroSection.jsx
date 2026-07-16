import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
    alt: 'Современная гостиная'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    alt: 'Солнечная кухня'
  },
  {
    url: 'https://images.pexels.com/photos/3705537/pexels-photo-3705537.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Уютная спальня'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    alt: 'Тёплый интерьер'
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
          <h1 className="text-white text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-[0.12em] leading-none uppercase" style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 400 }}>
            Ирис
          </h1>
          <span className="font-caveat text-iris-light-teal text-5xl sm:text-6xl md:text-7xl lg:text-8xl block mt-2">
            Design
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/80 font-manrope text-base sm:text-lg mt-8 tracking-widest uppercase max-w-lg text-center"
        >
          Студия дизайна интерьеров
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

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full py-4 bg-gradient-to-t from-black/60 to-transparent z-10">
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-white/30 font-caveat text-2xl sm:text-3xl mx-12 whitespace-nowrap">
                Больше чем ремонт &nbsp;&#9671;&nbsp; Счастливые истории &nbsp;&#9671;&nbsp; Дом с душой &nbsp;&#9671;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
