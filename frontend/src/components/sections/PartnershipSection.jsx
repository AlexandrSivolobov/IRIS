import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const partnerProjects = [
  {
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    label: 'Продано',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    label: null,
  },
  {
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
    label: 'Награда года',
  },
];

export default function PartnershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="partnership-section"
      id="partnership"
      ref={ref}
      className="py-24 md:py-32 bg-iris-warm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight text-iris-text">
            Станьте частью нашей истории
          </h2>
          <p className="font-manrope text-iris-text/60 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Мы открыты для сотрудничества с застройщиками, архитекторами и поставщиками
          </p>
        </motion.div>

        {/* Project photos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {partnerProjects.map((project, i) => (
            <motion.div
              key={i}
              data-testid={`partner-project-${i}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="relative group overflow-hidden aspect-[4/3]"
            >
              <img
                src={project.img}
                alt={`Проект ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Sticker label */}
              {project.label && (
                <div className="sticker-badge absolute top-4 right-4 w-20 h-20 bg-iris-red rounded-full flex items-center justify-center text-white shadow-lg z-10">
                  <span className="font-caveat text-sm font-bold text-center leading-tight">
                    {project.label}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            data-testid="partner-cta-btn"
            className="cta-btn bg-iris-red text-white px-10 py-4 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-iris-red-hover"
          >
            Стать партнёром
            <ArrowRight size={16} className="arrow-icon" />
          </button>
          <button
            data-testid="partner-details-btn"
            className="cta-btn border-2 border-iris-text text-iris-text px-10 py-4 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-iris-text hover:text-white transition-all duration-300"
          >
            Подробнее
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
