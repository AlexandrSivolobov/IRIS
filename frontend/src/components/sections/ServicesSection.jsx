import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
    pricePerM2: 3000,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
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
    pricePerM2: 8000,
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
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
    pricePerM2: 1500,
    img: 'https://images.pexels.com/photos/3705537/pexels-photo-3705537.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    pricePerM2: 500,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
];

/* ─── Cost Calculator Modal ─── */
function CostModal({ service, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', area: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const liveEstimate = form.area ? Math.round(Number(form.area) * service.pricePerM2) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.area) { setError('Заполните обязательные поля'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/cost-request`, {
        name: form.name, phone: form.phone, email: form.email,
        service: service.id, area: Number(form.area), message: '',
      });
      setResult(res.data);
    } catch { setError('Ошибка отправки. Попробуйте ещё раз.'); }
    finally { setLoading(false); }
  };

  return (
    <motion.div data-testid={`cost-modal-${service.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 16 }} onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-white max-w-lg w-full shadow-2xl">
        <button data-testid={`cost-modal-close-${service.id}`} onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors">
          <X size={16} />
        </button>
        <div className="p-8 md:p-10">
          {!result ? (
            <>
              <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-1">{service.title}</h3>
              <p className="font-outfit text-sm text-iris-teal tracking-wider mb-6">от {service.pricePerM2.toLocaleString('ru-RU')} ₽/м²</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Площадь (м²) *</label>
                  <input data-testid={`cost-area-${service.id}`} type="number" min="1" value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="Например, 80" />
                </div>
                {liveEstimate > 0 && (
                  <div className="bg-iris-warm p-4 border border-iris-teal/10">
                    <p className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 mb-1">Предварительная стоимость</p>
                    <p className="font-outfit text-2xl md:text-3xl text-iris-red font-medium">{liveEstimate.toLocaleString('ru-RU')} ₽</p>
                  </div>
                )}
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Ваше имя *</label>
                  <input data-testid={`cost-name-${service.id}`} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Телефон *</label>
                  <input data-testid={`cost-phone-${service.id}`} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Email</label>
                  <input data-testid={`cost-email-${service.id}`} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="email@example.com" />
                </div>
                {error && <p className="text-iris-red text-sm font-manrope">{error}</p>}
                <button data-testid={`cost-submit-${service.id}`} type="submit" disabled={loading}
                  className="cta-btn w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover disabled:opacity-60">
                  {loading ? 'Отправка...' : 'Рассчитать и отправить'}
                  {!loading && <ArrowRight size={16} className="arrow-icon" />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-iris-teal mx-auto mb-4" />
              <h3 className="font-outfit text-2xl text-iris-text mb-2">Заявка отправлена</h3>
              <div className="bg-iris-warm p-5 my-6 border border-iris-teal/10">
                <p className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 mb-1">Стоимость {service.title.toLowerCase()}</p>
                <p className="font-outfit text-3xl text-iris-red font-medium">{result.estimated_cost.toLocaleString('ru-RU')} ₽</p>
                <p className="font-manrope text-xs text-iris-text/40 mt-1">{result.price_per_m2.toLocaleString('ru-RU')} ₽/м² × {form.area} м²</p>
              </div>
              <p className="font-manrope text-sm text-iris-text/60">Мы свяжемся с вами для уточнения деталей</p>
              <button data-testid={`cost-close-${service.id}`} onClick={onClose}
                className="mt-6 font-outfit text-sm text-iris-teal underline underline-offset-4 hover:text-iris-teal/70 transition-colors">Закрыть</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Expanding Service Card ─── */
function ServicePanel({ service, isHovered, onHover, onLeave, onOpenCost, inView, index }) {
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
          onClick={(e) => { e.stopPropagation(); onOpenCost(service); }}
          className="cta-btn bg-iris-red text-white py-3 px-6 font-outfit text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover transition-all duration-300 w-fit"
        >
          Узнать стоимость
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
                onOpenCost={setActiveService}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeService && <CostModal service={activeService} onClose={() => setActiveService(null)} />}
      </AnimatePresence>
    </>
  );
}
