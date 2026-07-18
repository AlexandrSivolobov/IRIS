import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf } from 'lucide-react';

const advantages = [
  { num: '01', title: 'Внимание к деталям', desc: 'Каждый элемент интерьера продуман до мельчайших подробностей' },
  { num: '02', title: 'Экологичные материалы', desc: 'Используем только безопасные и сертифицированные материалы', hasLeaf: true },
  { num: '03', title: 'Индивидуальный подход', desc: 'Проект создаётся с учётом вашего стиля жизни и привычек' },
  { num: '04', title: 'Сервис 360°', desc: 'Полный цикл: от идеи до финальной расстановки декора', hasStamp: true },
  { num: '05', title: 'Современные технологии', desc: '3D-визуализация и VR-туры для максимальной реалистичности' },
  { num: '06', title: 'Гарантия качества', desc: 'Гарантия на все работы и материалы до 5 лет' },
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="philosophy-section"
      id="philosophy"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#21190f' }}
    >
      {/* Stamp badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
        className="absolute top-8 right-8 md:top-12 md:right-12 w-28 h-28 md:w-36 md:h-36 border-2 border-[#dbc7ad] text-[#dbc7ad] rounded-full flex items-center justify-center z-10"
      >
        <div className="text-center">
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-outfit block">Сервис</span>
          <span className="text-2xl md:text-3xl font-outfit font-bold block leading-none">360°</span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-left"
        >
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight" style={{ color: '#dbc7ad' }}>
            Наша философия
          </h2>
          <p className="font-manrope mt-4 text-base md:text-lg max-w-xl" style={{ color: 'rgba(219,199,173,0.6)' }}>
            Принципы, которые делают каждый проект особенным
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 text-left">
          {advantages.map((item, i) => (
            <motion.div
              key={item.num}
              data-testid={`advantage-${item.num}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group"
            >
              <div className="flex items-start gap-4">
                <span className="font-outfit text-5xl md:text-6xl font-extralight leading-none select-none group-hover:text-[#dbc7ad]/40 transition-colors duration-500" style={{ color: 'rgba(219,199,173,0.2)' }}>
                  {item.num}
                </span>
                <div className="pt-2">
                  <h3 className="font-outfit text-xl md:text-2xl font-medium flex items-center gap-2" style={{ color: '#dbc7ad' }}>
                    {item.title}
                    {item.hasLeaf && (
                      <Leaf size={18} className="text-[#dbc7ad]" />
                    )}
                  </h3>
                  <p className="font-manrope text-sm md:text-base mt-2 leading-relaxed" style={{ color: 'rgba(219,199,173,0.6)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
