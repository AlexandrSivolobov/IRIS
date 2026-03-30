import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const polaroids = [
  {
    src: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80',
    alt: 'Счастливая семья',
    caption: 'Семья Ивановых, 2024',
    rotate: -3,
    delay: 0.4,
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    alt: 'Уютная гостиная',
    caption: 'Проект «Лесной дом»',
    rotate: 4,
    delay: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    alt: 'Светлая кухня',
    caption: 'Проект «Солнечная терраса»',
    rotate: -2,
    delay: 0.8,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-testid="about-section"
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-iris-warm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative squares */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="deco-square" />
            <span className="deco-square" />
            <span className="deco-square" />
          </div>
          <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-iris-text uppercase leading-tight max-w-3xl">
            Место, где дом превращается в{' '}
            <span className="text-iris-teal">историю</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="text-base md:text-lg leading-relaxed text-iris-text/80 mb-6">
              Студия <span className="text-iris-red font-semibold">«Ирис»</span> — это команда 
              архитекторов и дизайнеров, для которых каждый проект — не просто набор квадратных метров, 
              а уникальная <span className="text-iris-teal font-semibold">история</span>, рассказанная 
              через свет, фактуры и пространство.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-iris-text/80 mb-6">
              Мы верим, что интерьер должен не только выглядеть красиво, но и{' '}
              <span className="text-iris-green font-semibold">чувствоваться</span> правильно. 
              Каждая деталь продумана: от текстуры дерева до направления солнечного света.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-iris-text/80">
              За 8 лет мы реализовали более <span className="text-iris-red font-semibold">150 проектов</span>, 
              каждый из которых стал отражением характера и мечты его владельцев.
            </p>
          </motion.div>

          {/* Polaroid collage — 3 photos */}
          <div className="lg:col-span-7 relative flex justify-center items-start min-h-[380px] md:min-h-[420px]">
            {polaroids.map((p, i) => (
              <motion.div
                key={i}
                data-testid={`about-polaroid-${i}`}
                initial={{ opacity: 0, rotate: p.rotate * 2, scale: 0.85, y: 30 }}
                animate={inView ? { opacity: 1, rotate: p.rotate, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: p.delay, type: 'spring', stiffness: 90 }}
                whileHover={{ rotate: 0, scale: 1.06, zIndex: 30 }}
                className="polaroid absolute cursor-pointer"
                style={{
                  width: i === 0 ? '55%' : '45%',
                  left: i === 0 ? '0%' : i === 1 ? '35%' : '12%',
                  top: i === 0 ? '0px' : i === 1 ? '20px' : '160px',
                  zIndex: i === 0 ? 10 : i === 1 ? 20 : 15,
                }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full aspect-[4/3] object-cover"
                />
                <p className="font-caveat text-lg md:text-xl text-iris-text/70 text-center mt-3">
                  {p.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
