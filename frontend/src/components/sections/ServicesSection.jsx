import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'design',
    title: 'Дизайн-проект',
    description: 'Полный пакет чертежей, 3D-визуализации и спецификаций материалов. Мы продумываем каждую деталь — от расположения розеток до текстуры обоев.',
    rotation: '-rotate-2',
  },
  {
    id: 'realization',
    title: 'Реализация',
    description: 'Воплощение проекта «под ключ»: от черновой отделки до расстановки мебели. Работаем с проверенными подрядчиками и гарантируем сроки.',
    rotation: 'rotate-1',
  },
  {
    id: 'supervision',
    title: 'Авторский надзор',
    description: 'Контроль качества на каждом этапе строительства. Регулярные выезды на объект, согласование материалов и решение нестандартных ситуаций.',
    rotation: '-rotate-1',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="services-section"
      id="services"
      ref={ref}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-caveat text-[8rem] md:text-[14rem] lg:text-[18rem] text-iris-teal/[0.04] leading-none whitespace-nowrap">
          Больше чем ремонт
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight text-iris-text">
            Наши услуги
          </h2>
          <p className="font-manrope text-iris-text/60 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Комплексный подход к созданию пространства вашей мечты
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              data-testid={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`service-card bg-white p-8 md:p-10 border-2 border-dashed border-iris-teal/30 flex flex-col items-start gap-5 ${service.rotation}`}
            >
              {/* Dashed number line */}
              <div className="w-full border-b border-dashed border-iris-teal/20 pb-3">
                <span className="font-outfit text-iris-teal/40 text-sm tracking-widest">
                  0{i + 1} /
                </span>
              </div>

              <h3 className="font-caveat text-3xl md:text-4xl text-iris-text">
                {service.title}
              </h3>

              <p className="font-manrope text-sm md:text-base text-iris-text/70 leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Dashed separator */}
              <div className="w-full border-t border-dashed border-iris-teal/20" />

              <button
                data-testid={`service-cta-${service.id}`}
                className="cta-btn bg-iris-red text-white px-6 py-3 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-iris-red-hover"
              >
                Узнать стоимость
                <ArrowRight size={16} className="arrow-icon" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
