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
    rotation: -3,
    hasStamp: true,
    stampText: 'ХИТ',
    pricePerM2: 3000,
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
    pricePerM2: 8000,
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
    pricePerM2: 1500,
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
    if (!form.name || !form.phone || !form.area) {
      setError('Заполните обязательные поля');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/cost-request`, {
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: service.id,
        area: Number(form.area),
        message: '',
      });
      setResult(res.data);
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      data-testid={`cost-modal-${service.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-white max-w-lg w-full shadow-2xl"
      >
        <button
          data-testid={`cost-modal-close-${service.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="p-8 md:p-10">
          {!result ? (
            <>
              <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-1">{service.title}</h3>
              <p className="font-outfit text-sm text-iris-teal tracking-wider mb-6">
                от {service.pricePerM2.toLocaleString('ru-RU')} ₽/м²
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Площадь (м²) *</label>
                  <input
                    data-testid={`cost-area-${service.id}`}
                    type="number"
                    min="1"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors"
                    placeholder="Например, 80"
                  />
                </div>

                {/* Live estimate */}
                {liveEstimate > 0 && (
                  <div className="bg-iris-warm p-4 border border-iris-teal/10">
                    <p className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 mb-1">Предварительная стоимость</p>
                    <p className="font-outfit text-2xl md:text-3xl text-iris-red font-medium">
                      {liveEstimate.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                )}

                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Ваше имя *</label>
                  <input
                    data-testid={`cost-name-${service.id}`}
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Телефон *</label>
                  <input
                    data-testid={`cost-phone-${service.id}`}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Email</label>
                  <input
                    data-testid={`cost-email-${service.id}`}
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                {error && <p className="text-iris-red text-sm font-manrope">{error}</p>}

                <button
                  data-testid={`cost-submit-${service.id}`}
                  type="submit"
                  disabled={loading}
                  className="cta-btn w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover disabled:opacity-60"
                >
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
                <p className="font-outfit text-3xl text-iris-red font-medium">
                  {result.estimated_cost.toLocaleString('ru-RU')} ₽
                </p>
                <p className="font-manrope text-xs text-iris-text/40 mt-1">
                  {result.price_per_m2.toLocaleString('ru-RU')} ₽/м² &times; {form.area} м²
                </p>
              </div>
              <p className="font-manrope text-sm text-iris-text/60">Мы свяжемся с вами для уточнения деталей</p>
              <button
                data-testid={`cost-close-${service.id}`}
                onClick={onClose}
                className="mt-6 font-outfit text-sm text-iris-teal underline underline-offset-4 hover:text-iris-teal/70 transition-colors"
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Dotted Line ─── */
function DottedLine({ label, value }) {
  return (
    <div className="flex items-baseline gap-2 w-full">
      <span className="font-manrope text-sm text-iris-text/60 whitespace-nowrap">{label}</span>
      <span className="flex-1 border-b border-dotted border-iris-teal/30 min-w-[40px] relative top-[-3px]" />
      <span className="font-outfit text-sm font-semibold text-iris-text whitespace-nowrap">{value}</span>
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index, inView, onOpenCost }) {
  return (
    <motion.div
      data-testid={`service-card-${service.id}`}
      initial={{ opacity: 0, y: 80, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate: service.rotation } : {}}
      transition={{ duration: 0.8, delay: 0.15 * index, type: 'spring', stiffness: 80, damping: 15 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
      className="relative cursor-pointer"
      style={{ transformOrigin: 'center bottom' }}
    >
      <div
        className="bg-white relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.2)] transition-shadow duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      >
        {service.hasStamp && (
          <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-iris-red flex items-center justify-center transform rotate-12 opacity-80">
            <span className="font-outfit text-iris-red text-xs font-bold tracking-widest uppercase">{service.stampText}</span>
          </div>
        )}

        <div className="p-8 md:p-10">
          <h3 className="font-caveat text-4xl md:text-5xl text-iris-text leading-tight mb-6">{service.title}</h3>

          <div className="space-y-3 mb-6">
            {service.specs.map((spec, i) => (
              <DottedLine key={i} label={spec.label} value={spec.value} />
            ))}
          </div>

          <div className="w-full border-t-2 border-dashed border-iris-teal/20 my-6" />

          <p className="font-manrope text-sm md:text-base text-iris-text/70 leading-relaxed mb-8">{service.description}</p>

          <button
            data-testid={`service-cta-${service.id}`}
            onClick={() => onOpenCost(service)}
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

/* ─── Section ─── */
export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <section
        data-testid="services-section"
        id="services"
        ref={ref}
        className="py-24 md:py-36 relative overflow-hidden"
        style={{ background: 'linear-gradient(165deg, #2f8791 0%, #276e76 50%, #1d555c 100%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-caveat text-[6rem] md:text-[12rem] lg:text-[16rem] text-white/[0.04] leading-none whitespace-nowrap" style={{ transform: 'rotate(-8deg)' }}>
            Больше чем ремонт
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">Наши услуги</h2>
            <p className="font-manrope text-white/60 mt-4 text-base md:text-lg max-w-xl mx-auto">Комплексный подход к созданию пространства вашей мечты</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto [perspective:1200px]">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} inView={inView} onOpenCost={setActiveService} />
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
