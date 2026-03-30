import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'design',
    title: 'Дизайн-проект',
    specs: [
      { label: 'Площадь от', value: '30 м²' },
      { label: 'Сроки', value: '4–8 недель' },
      { label: 'Стоимость от', value: '3 000 ₽/м²' },
    ],
    description: 'Полный пакет чертежей, 3D-визуализации и спецификаций материалов. Мы продумываем каждую деталь — от расположения розеток до текстуры обоев.',
    rotation: -3,
    hasStamp: true,
    stampText: 'ХИТ',
  },
  {
    id: 'realization',
    title: 'Реализация',
    specs: [
      { label: 'Площадь от', value: '50 м²' },
      { label: 'Сроки', value: '3–6 месяцев' },
      { label: 'Стоимость от', value: '8 000 ₽/м²' },
    ],
    description: 'Воплощение проекта «под ключ»: от черновой отделки до расстановки мебели. Работаем с проверенными подрядчиками и гарантируем сроки.',
    rotation: 1,
    hasStamp: false,
  },
  {
    id: 'supervision',
    title: 'Авторский надзор',
    specs: [
      { label: 'Выезды', value: '2–3 в неделю' },
      { label: 'Сроки', value: 'весь период' },
      { label: 'Стоимость от', value: '1 500 ₽/м²' },
    ],
    description: 'Контроль качества на каждом этапе строительства. Регулярные выезды на объект, согласование материалов и решение нестандартных ситуаций.',
    rotation: -1,
    hasStamp: true,
    stampText: '360°',
  },
];

function DottedLine({ label, value }) {
  return (
    <div className="flex items-baseline gap-2 w-full">
      <span className="font-manrope text-sm text-iris-text/60 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-b border-dotted border-iris-teal/30 min-w-[40px] relative top-[-3px]" />
      <span className="font-outfit text-sm font-semibold text-iris-text whitespace-nowrap">{value}</span>
    </div>
  );
}

function ServiceCard({ service, index, inView }) {
  return (
    <motion.div
      data-testid={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 80, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate: service.rotation } : {}}
      transition={{
        duration: 0.8,
        delay: 0.15 * index,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
      whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
      className="relative cursor-pointer"
      style={{ transformOrigin: 'center bottom' }}
    >
      {/* Paper card */}
      <div
        className="bg-white relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.2)] transition-shadow duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Stamp */}
        {service.hasStamp && (
          <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-iris-red flex items-center justify-center transform rotate-12 opacity-80">
            <span className="font-outfit text-iris-red text-xs font-bold tracking-widest uppercase">
              {service.stampText}
            </span>
          </div>
        )}

        <div className="p-8 md:p-10">
          {/* Handwritten title */}
          <h3 className="font-caveat text-4xl md:text-5xl text-iris-text leading-tight mb-6">
            {service.title}
          </h3>

          {/* Dotted leader lines for specs */}
          <div className="space-y-3 mb-6">
            {service.specs.map((spec, i) => (
              <DottedLine key={i} label={spec.label} value={spec.value} />
            ))}
          </div>

          {/* Dashed separator */}
          <div className="w-full border-t-2 border-dashed border-iris-teal/20 my-6" />

          {/* Description */}
          <p className="font-manrope text-sm md:text-base text-iris-text/70 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* CTA button */}
          <button
            data-testid={`service-cta-${service.id}`}
            className="cta-btn w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-iris-red-hover transition-all duration-300"
          >
            Узнать стоимость
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="services-section"
      id="services"
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #2f8791 0%, #276e76 50%, #1d555c 100%)',
      }}
    >
      {/* Background calligraphic watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-caveat text-[6rem] md:text-[12rem] lg:text-[16rem] text-white/[0.04] leading-none whitespace-nowrap"
          style={{ transform: 'rotate(-8deg)' }}
        >
          Больше чем ремонт
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-3 h-3 border-2 border-iris-light-teal inline-block" />
            <span className="w-3 h-3 border-2 border-iris-light-teal inline-block" />
          </div>
          <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">
            Наши услуги
          </h2>
          <p className="font-manrope text-white/60 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Комплексный подход к созданию пространства вашей мечты
          </p>
        </motion.div>

        {/* Service cards — paper document style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto [perspective:1200px]">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
