import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const regions = [
  'Москва',
  'Санкт-Петербург',
  'Ростов-на-Дону',
  'Краснодар',
  'Ярославль',
  'Сочи',
  'Волгоград',
];

export default function RegionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="regions-section"
      id="regions"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#21190f' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight" style={{ color: '#dbc7ad' }}>
            Регионы присутствия
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {regions.map((city, i) => (
            <motion.div
              key={city}
              data-testid={`region-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3 border border-[#dbc7ad]/15 px-6 py-5"
            >
              <MapPin size={18} className="text-iris-red flex-shrink-0" />
              <span className="font-outfit text-lg md:text-xl" style={{ color: '#dbc7ad' }}>{city}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
