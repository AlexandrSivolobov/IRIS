import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const polaroids = [
  {
    src: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80',
    alt: 'Счастливая семья',
    caption: 'Семья Ивановых, 2024',
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    alt: 'Уютная гостиная',
    caption: 'Проект «Лесной дом»',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    alt: 'Светлая кухня',
    caption: 'Проект «Солнечная терраса»',
  },
];

/* Layout slots for the 3-card stack:
   slot 0 = front card (big, centered)
   slot 1 = back-right (smaller, shifted right, behind)
   slot 2 = back-left  (smaller, shifted left, behind)  */
const slots = [
  { x: 0, y: 0, rotate: -2, scale: 1, zIndex: 20, opacity: 1 },
  { x: '40%', y: 20, rotate: 5, scale: 0.88, zIndex: 10, opacity: 0.85 },
  { x: '-8%', y: 140, rotate: -4, scale: 0.82, zIndex: 5, opacity: 0.7 },
];

function PolaroidStack({ inView }) {
  // order[0] = index of card in slot 0 (front), etc.
  const [order, setOrder] = useState([0, 1, 2]);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (inView && !hasAppeared) {
      const t = setTimeout(() => setHasAppeared(true), 1200);
      return () => clearTimeout(t);
    }
  }, [inView, hasAppeared]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 420 }}>
      {order.map((cardIdx, slotIdx) => {
        const p = polaroids[cardIdx];
        const s = slots[slotIdx];
        return (
          <motion.div
            key={cardIdx}
            data-testid={`about-polaroid-${cardIdx}`}
            onClick={slotIdx !== 0 ? () => setOrder(prev => {
              if (slotIdx === 1) return [prev[1], prev[2], prev[0]];
              return [prev[2], prev[0], prev[1]];
            }) : undefined}
            initial={!hasAppeared ? { opacity: 0, y: 60, rotate: 0, scale: 0.8 } : false}
            animate={{
              opacity: s.opacity,
              x: s.x,
              y: s.y,
              rotate: s.rotate,
              scale: s.scale,
            }}
            transition={{
              duration: hasAppeared ? 0.7 : 0.6,
              delay: hasAppeared ? 0 : slotIdx * 0.2 + 0.4,
              type: 'spring',
              stiffness: 70,
              damping: 14,
            }}
            whileHover={slotIdx === 0 ? { rotate: 0, scale: 1.04 } : { scale: s.scale + 0.03 }}
            className="polaroid absolute cursor-pointer"
            style={{
              width: slotIdx === 0 ? '58%' : '46%',
              zIndex: s.zIndex,
              transformOrigin: 'center bottom',
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
        );
      })}

      {/* Dots indicator */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {polaroids.map((_, i) => (
          <button
            key={i}
            data-testid={`about-dot-${i}`}
            onClick={() => {
              const idx = order.indexOf(i);
              if (idx === 0) return;
              if (idx === 1) setOrder([order[1], order[2], order[0]]);
              else setOrder([order[2], order[0], order[1]]);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              order[0] === i ? 'bg-iris-teal w-5' : 'bg-iris-teal/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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

          {/* Polaroid carousel — animated card stack */}
          <div className="lg:col-span-7 relative flex justify-center items-start min-h-[420px] md:min-h-[460px]">
            <PolaroidStack inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
