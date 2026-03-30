import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 'forest',
    title: 'Проект «Лесной дом»',
    area: '240 м²',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
  },
  {
    id: 'terrace',
    title: 'Проект «Солнечная терраса»',
    area: '180 м²',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80',
  },
  {
    id: 'oasis',
    title: 'Проект «Городской оазис»',
    area: '120 м²',
    year: '2023',
    img: 'https://images.pexels.com/photos/3705537/pexels-photo-3705537.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
];

function PortfolioItem({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      data-testid={`portfolio-item-${project.id}`}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden mb-4"
    >
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 parallax-img">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-outfit text-white/50 text-sm tracking-widest uppercase">
              {project.area}
            </span>
            <span className="text-white/30">|</span>
            <span className="font-outfit text-white/50 text-sm tracking-widest">
              {project.year}
            </span>
          </div>

          <h3 className="font-caveat text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {project.title}
          </h3>

          <button
            data-testid={`portfolio-cta-${project.id}`}
            className="cta-btn inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3 font-outfit text-sm tracking-widest uppercase hover:bg-white hover:text-iris-dark transition-all duration-300"
          >
            Смотреть проект
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </motion.div>
      </div>

      {/* Sticker on first item */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: 'spring' }}
          className="sticker-badge absolute top-8 right-8 w-24 h-24 bg-iris-red rounded-full flex items-center justify-center text-white shadow-lg z-20"
        >
          <span className="font-caveat text-base font-bold text-center leading-tight">Награда года</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      data-testid="portfolio-section"
      id="portfolio"
      ref={ref}
      className="py-24 md:py-32 bg-iris-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="deco-square" style={{ borderColor: '#9ed5dc' }} />
            <span className="deco-square" style={{ borderColor: '#9ed5dc' }} />
          </div>
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight text-white">
            Портфолио
          </h2>
          <p className="font-manrope text-white/50 mt-4 text-base md:text-lg">
            Избранные проекты студии
          </p>
        </motion.div>
      </div>

      <div>
        {projects.map((project, i) => (
          <PortfolioItem key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
