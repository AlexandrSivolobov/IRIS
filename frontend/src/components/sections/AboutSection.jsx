import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const images = [
  {
    src: '/photos/living-room.jpg',
    alt: 'Гостиная — Волжские высоты',
    caption: '«Волжские высоты», 2025',
  },
  {
    src: '/photos/neo-living.jpg',
    alt: 'Гостиная — Семейная гармония',
    caption: '«Семейная гармония», 2022',
  },
  {
    src: 'https://images.pexels.com/photos/3705537/pexels-photo-3705537.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Спальня — Городской оазис',
    caption: '«Городской оазис», 2023',
  },
];

function ExpandingGallery({ inView }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex h-[420px] md:h-[480px] gap-2 w-full">
      {images.map((img, i) => {
        const isHovered = hovered === i;
        const hasHover = hovered !== null;
        return (
          <motion.div
            key={i}
            data-testid={`about-image-${i}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, flex: 1 }}
            animate={inView ? {
              opacity: 1,
              flex: isHovered ? 3 : hasHover ? 0.5 : 1,
            } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.15 },
              flex: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="relative overflow-hidden cursor-pointer group"
            style={{ minWidth: 0 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Caption — visible on hover */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
            >
              <p className="font-caveat text-xl text-white">{img.caption}</p>
            </motion.div>
          </motion.div>
        );
      })}
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
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#21190f' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative squares */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-tight max-w-3xl" style={{ color: '#dbc7ad' }}>
            Место, где дом превращается в{' '}
            <span style={{ color: '#dbc7ad' }}>историю</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 font-outfit"
          >
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#dbc7ad' }}>
              Студия <span className="text-iris-red font-semibold">«Ирис»</span> — это команда
              архитекторов и дизайнеров, для которых каждый проект — не просто набор квадратных метров,
              а уникальная <span className="font-semibold" style={{ color: '#dbc7ad' }}>история</span>, рассказанная
              через свет, фактуры и пространство.
            </p>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#dbc7ad' }}>
              Мы верим, что интерьер должен не только выглядеть красиво, но и{' '}
              <span className="font-semibold" style={{ color: '#dbc7ad' }}>чувствоваться</span> правильно.
              Каждая деталь продумана: от текстуры дерева до направления солнечного света.
            </p>
          </motion.div>

          {/* 3-column expanding gallery */}
          <div className="lg:col-span-8">
            <ExpandingGallery inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
