import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle, Handshake, TrendingUp, Users, Star } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const partnerProjects = [
  { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', label: 'Продано' },
  { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', label: null },
  { img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', label: 'Награда года' },
];

/* ─── Partner Form Modal ─── */
function PartnerFormModal({ onClose }) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.phone || !form.email) {
      setError('Заполните обязательные поля');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API}/partner-request`, form);
      setSent(true);
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      data-testid="partner-form-modal"
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
        className="relative z-10 bg-white max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button data-testid="partner-form-close" onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors">
          <X size={16} />
        </button>

        <div className="p-8 md:p-10">
          {!sent ? (
            <>
              <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-2">Стать партнёром</h3>
              <p className="font-manrope text-sm text-iris-text/60 mb-6">Заполните форму, и мы свяжемся с вами для обсуждения сотрудничества</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Ваше имя *</label>
                  <input data-testid="partner-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Компания *</label>
                  <input data-testid="partner-company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="ООО «Строй Групп»" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Телефон *</label>
                  <input data-testid="partner-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Email *</label>
                  <input data-testid="partner-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors" placeholder="email@company.ru" />
                </div>
                <div>
                  <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Сообщение</label>
                  <textarea data-testid="partner-message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors resize-none" placeholder="Расскажите о вашей компании и интересах" />
                </div>

                {error && <p className="text-iris-red text-sm font-manrope">{error}</p>}

                <button data-testid="partner-submit" type="submit" disabled={loading} className="cta-btn w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover disabled:opacity-60">
                  {loading ? 'Отправка...' : 'Отправить заявку'}
                  {!loading && <ArrowRight size={16} className="arrow-icon" />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-iris-teal mx-auto mb-4" />
              <h3 className="font-outfit text-2xl text-iris-text mb-2">Заявка отправлена</h3>
              <p className="font-manrope text-sm text-iris-text/60 mb-6">Мы свяжемся с вами в ближайшее время</p>
              <button data-testid="partner-success-close" onClick={onClose} className="font-outfit text-sm text-iris-teal underline underline-offset-4 hover:text-iris-teal/70 transition-colors">Закрыть</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Details Modal ─── */
function DetailsModal({ onClose }) {
  const benefits = [
    { icon: Handshake, title: 'Совместные проекты', desc: 'Реализация проектов с эксклюзивными условиями для партнёров' },
    { icon: TrendingUp, title: 'Рост продаж', desc: 'Увеличение потока клиентов через кросс-рекомендации' },
    { icon: Users, title: 'Нетворкинг', desc: 'Доступ к закрытым мероприятиям и профессиональному сообществу' },
    { icon: Star, title: 'Приоритет', desc: 'Приоритетное размещение в каталоге и на сайте студии' },
  ];

  return (
    <motion.div
      data-testid="partner-details-modal"
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
        className="relative z-10 bg-white max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button data-testid="details-modal-close" onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors">
          <X size={16} />
        </button>

        <div className="p-8 md:p-10">
          <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-2">Программа партнёрства</h3>
          <p className="font-manrope text-sm text-iris-text/60 mb-8">Мы ищем партнёров, которые разделяют нашу страсть к качественному дизайну</p>

          <div className="space-y-6 mb-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-iris-teal/10 flex items-center justify-center flex-shrink-0">
                  <b.icon size={18} className="text-iris-teal" />
                </div>
                <div>
                  <h4 className="font-outfit text-base font-medium text-iris-text">{b.title}</h4>
                  <p className="font-manrope text-sm text-iris-text/60 mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-iris-teal/20 pt-6">
            <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-3">Кого мы ищем</h4>
            <ul className="space-y-2">
              {['Застройщики и девелоперы', 'Архитектурные бюро', 'Поставщики мебели и материалов', 'Ландшафтные дизайнеры'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-iris-red flex-shrink-0" />
                  <span className="font-manrope text-sm text-iris-text/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function PartnershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <section data-testid="partnership-section" id="partnership" ref={ref} className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#21190f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 p-12 md:p-20" style={{ borderColor: '#dbc7ad' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight" style={{ color: '#dbc7ad' }}>Станьте частью нашей истории</h2>
            <p className="font-manrope mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(219,199,173,0.6)' }}>Мы открыты для сотрудничества с застройщиками, архитекторами и поставщиками</p>
            <div className="mx-auto mt-8 w-24 h-1" style={{ backgroundColor: '#dbc7ad', opacity: 0.3 }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {partnerProjects.map((project, i) => (
              <motion.div key={i} data-testid={`partner-project-${i}`} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * i }} className="relative group overflow-hidden aspect-[4/3]">
                <img src={project.img} alt={`Проект ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button data-testid="partner-cta-btn" onClick={() => setShowForm(true)} className="cta-btn bg-iris-red text-white px-10 py-4 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-iris-red-hover">
              Стать партнёром
              <ArrowRight size={16} className="arrow-icon" />
            </button>
            <button data-testid="partner-details-btn" onClick={() => setShowDetails(true)} className="cta-btn border-2 px-10 py-4 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:text-white transition-all duration-300" style={{ borderColor: '#dbc7ad', color: '#dbc7ad' }}>
              Подробнее
              <ArrowRight size={16} className="arrow-icon" />
            </button>
          </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showForm && <PartnerFormModal onClose={() => setShowForm(false)} />}
        {showDetails && <DetailsModal onClose={() => setShowDetails(false)} />}
      </AnimatePresence>
    </>
  );
}
