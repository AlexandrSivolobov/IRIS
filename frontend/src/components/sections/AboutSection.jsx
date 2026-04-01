import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const polaroids = [
{
  src: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&q=80',
  alt: 'Счастливая семья',
  caption: 'Семья Ивановых, 2024'
},
{
  src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
  alt: 'Уютная гостиная',
  caption: 'Проект «Лесной дом»'
},
{
  src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  alt: 'Светлая кухня',
  caption: 'Проект «Солнечная терраса»'
}];


/* Fan layout: cards spread from a shared bottom pivot with horizontal offsets */
const fanConfig = [
{ angle: -18, xOffset: -160 }, // left
{ angle: 0, xOffset: 0 }, // center
{ angle: 18, xOffset: 160 } // right
];

function PolaroidFan({ inView }) {
  const [activeIdx, setActiveIdx] = useState(1);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (inView && !hasAppeared) {
      const t = setTimeout(() => setHasAppeared(true), 1000);
      return () => clearTimeout(t);
    }
  }, [inView, hasAppeared]);

  return (
    <div className="relative w-full flex items-end justify-center" style={{ minHeight: 540 }}>
      {polaroids.map((p, i) => {
        const isActive = activeIdx === i;
        const cfg = fanConfig[i];
        return (
          <motion.div
            key={i}
            data-testid={`about-polaroid-${i}`}
            onClick={() => setActiveIdx(i)}
            initial={{ opacity: 0, rotate: 0, x: 0, scale: 0.7 }}
            animate={hasAppeared ? {
              opacity: 1,
              rotate: isActive ? 0 : cfg.angle,
              x: isActive ? 0 : cfg.xOffset,
              scale: isActive ? 1.05 : 0.85,
              y: isActive ? -24 : 0
            } : { opacity: 0, rotate: 0, x: 0, scale: 0.7 }}
            transition={{
              duration: 0.5,
              delay: hasAppeared ? 0 : i * 0.12,
              type: 'spring',
              stiffness: 100,
              damping: 16
            }}
            whileHover={!isActive ? { y: -12, scale: 0.89 } : {}}
            className="polaroid absolute cursor-pointer select-none"
            style={{
              width: 340,
              left: '50%',
              bottom: 0,
              marginLeft: -170,
              zIndex: isActive ? 30 : 10,
              transformOrigin: '50% 100%',
              filter: isActive ? 'none' : 'brightness(0.9)'
            }}>

            <img
              src={p.src}
              alt={p.alt}
              className="w-full aspect-[4/3] object-cover !shadow-sm" />

            <p className="font-caveat text-lg md:text-xl text-iris-text/70 text-center mt-3">
              {p.caption}
            </p>
          </motion.div>);

      })}
    </div>);

}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-testid="about-section"
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-iris-warm overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative squares */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16">

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
            className="lg:col-span-5">

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

          {/* Polaroid fan — click any card to bring it forward */}
          <div className="lg:col-span-7 relative flex justify-center items-end min-h-[500px] md:min-h-[560px]">
            <PolaroidFan inView={inView} />
          </div>
        </div>
      </div>
    </section>);

}