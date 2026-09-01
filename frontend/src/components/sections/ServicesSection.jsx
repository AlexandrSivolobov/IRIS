import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

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
    details: [
      'Обмерный план и планировочные решения',
      '3D-визуализация ключевых зон',
      'Рабочие чертежи и спецификация материалов',
      'Подбор мебели, света и декора',
    ],
    img: '/photos/living-room.jpg',
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
    details: [
      'Организация и координация всех подрядчиков',
      'Черновая и чистовая отделка',
      'Закупка и монтаж материалов по проекту',
      'Финальная расстановка мебели и декора',
    ],
    img: '/photos/neo-kitchen.jpg',
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
    details: [
      'Регулярные выезды на объект',
      'Контроль соответствия проекту',
      'Согласование замен материалов и решений',
      'Оперативное решение нестандартных ситуаций',
    ],
    img: '/psb_photos/psb-stairs.jpg',
  },
  {
    id: 'service',
    title: 'Сервис',
    specs: [
      { label: 'Гарантия', value: 'до 5 лет' },
      { label: 'Реакция', value: '24 часа' },
      { label: 'Стоимость от', value: 'индивид.' },
    ],
    description: 'Гарантийное и постгарантийное обслуживание объекта. Оперативное решение любых вопросов, техническая поддержка и сезонное обновление интерьера.',
    details: [
      'Гарантийное обслуживание объекта',
      'Техническая поддержка и мелкий ремонт',
      'Сезонное обновление интерьера',
      'Консультации по эксплуатации материалов',
    ],
    img: '/psb_photos/psb-lounge.jpg',
  },
];

/* ─── Service Detail Modal ─── */
function ServiceDetailModal({ service, onClose }) {
  return (
    <motion.div data-testid={`service-modal-${service.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 16 }} onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button data-testid={`service-modal-close-${service.id}`} onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors">
          <X size={16} />
        </button>
        <div className="p-8 md:p-10">
          <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-1">{service.title}</h3>
          <p className="font-outfit text-sm text-iris-teal tracking-wider mb-6">Подробное описание услуги</p>

          <p className="font-manrope text-base text-iris-text/80 leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="space-y-2 mb-6">
            {service.specs.map((spec, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="font-manrope text-sm text-iris-text/50 whitespace-nowrap">{spec.label}</span>
                <span className="flex-1 border-b border-dotted border-iris-teal/20 min-w-[20px] relative top-[-2px]" />
                <span className="font-outfit text-sm font-semibold text-iris-text whitespace-nowrap">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-iris-teal/20 pt-6">
            <h4 className="font-outfit text-xs uppercase tracking-widest text-iris-teal mb-4">Что входит в услугу</h4>
            <ul className="space-y-3">
              {service.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-iris-red mt-2 flex-shrink-0" />
                  <span className="font-manrope text-sm text-iris-text/70">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <button data-testid={`service-modal-close-btn-${service.id}`} onClick={onClose}
            className="mt-8 w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase hover:bg-iris-red-hover transition-colors">
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Expanding Service Card ─── */
function ServicePanel({ service, isHovered, onHover, onLeave, onOpenDetail, inView, index }) {
  return (
    <motion.div
      data-testid={`service-card-${service.id}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0 }}
      animate={inView ? {
        opacity: 1,
        flex: isHovered ? 4 : 1,
      } : { opacity: 0 }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.12 },
        flex: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className="relative overflow-hidden cursor-pointer group"
      style={{ minWidth: 0 }}
    >
      {/* Background image */}
      <img src={service.img} alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className={`absolute inset-0 transition-colors duration-500 ${isHovered ? 'bg-black/50' : 'bg-black/60'}`} />

      {/* Vertical title — shown when collapsed */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <span
          className="font-caveat text-3xl md:text-4xl text-white whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
        >
          {service.title}
        </span>
      </div>

      {/* Full content — shown when expanded */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <h3 className="font-caveat text-3xl md:text-4xl text-white mb-4">{service.title}</h3>

        <div className="space-y-2 mb-4">
          {service.specs.map((spec, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-manrope text-xs text-white/60 whitespace-nowrap">{spec.label}</span>
              <span className="flex-1 border-b border-dotted border-white/20 min-w-[20px] relative top-[-2px]" />
              <span className="font-outfit text-xs font-semibold text-white whitespace-nowrap">{spec.value}</span>
            </div>
          ))}
        </div>

        <p className="font-manrope text-sm text-white/70 leading-relaxed mb-5 line-clamp-3">{service.description}</p>

        <button
          data-testid={`service-cta-${service.id}`}
          onClick={(e) => { e.stopPropagation(); onOpenDetail(service); }}
          className="cta-btn bg-iris-red text-white py-3 px-6 font-outfit text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover transition-all duration-300 w-fit"
        >
          Узнать подробнее
          <ArrowRight size={14} className="arrow-icon" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeService, setActiveService] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <>
      <section
        data-testid="services-section"
        id="services"
        ref={ref}
        className="py-24 md:py-36 relative overflow-hidden"
        style={{ backgroundColor: '#21190f' }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-caveat text-[6rem] md:text-[12rem] lg:text-[16rem] text-white/[0.03] leading-none whitespace-nowrap" style={{ transform: 'rotate(-8deg)' }}>
            Больше чем ремонт
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ color: '#dbc7ad' }}>Наши услуги</h2>
            <p className="font-manrope mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(219,199,173,0.6)' }}>Комплексный подход к созданию пространства вашей мечты</p>
          </motion.div>

          <div className="flex h-[500px] md:h-[560px] gap-3 w-full">
            {services.map((service, i) => (
              <ServicePanel
                key={service.id}
                service={service}
                index={i}
                inView={inView}
                isHovered={hoveredIdx === i}
                onHover={() => setHoveredIdx(i)}
                onLeave={() => setHoveredIdx(null)}
                onOpenDetail={setActiveService}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeService && <ServiceDetailModal service={activeService} onClose={() => setActiveService(null)} />}
      </AnimatePresence>
    </>
  );
}
