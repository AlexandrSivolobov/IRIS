import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, X, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setOpen(false);
    setTimeout(() => { setSent(false); setForm({ name: '', phone: '', email: '', message: '' }); setError(''); }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { setError('Заполните имя и телефон'); return; }
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        data-testid="contact-fab"
        onClick={() => setOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 120 }}
        className="fixed bottom-20 right-5 z-50 w-14 h-14 bg-iris-red text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(190,31,51,0.4)] hover:bg-iris-red-hover hover:-translate-y-1 transition-all duration-300"
      >
        <MessageSquarePlus size={22} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={reset}
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
              <button
                data-testid="contact-modal-close"
                onClick={reset}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-iris-dark/10 flex items-center justify-center hover:bg-iris-dark/20 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="p-8 md:p-10">
                {!sent ? (
                  <>
                    <h3 className="font-caveat text-3xl md:text-4xl text-iris-text mb-2">Оставить заявку</h3>
                    <p className="font-manrope text-sm text-iris-text/60 mb-6">
                      Расскажите о вашем проекте, и мы свяжемся с вами в ближайшее время
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Ваше имя *</label>
                        <input
                          data-testid="contact-name"
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
                          data-testid="contact-phone"
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
                          data-testid="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="font-outfit text-xs uppercase tracking-wider text-iris-text/50 block mb-1">Сообщение</label>
                        <textarea
                          data-testid="contact-message"
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full border border-iris-teal/20 px-4 py-3 font-manrope text-sm focus:outline-none focus:border-iris-teal transition-colors resize-none"
                          placeholder="Опишите ваш проект: площадь, пожелания по стилю, сроки..."
                        />
                      </div>

                      {error && <p className="text-iris-red text-sm font-manrope">{error}</p>}

                      <button
                        data-testid="contact-submit"
                        type="submit"
                        disabled={loading}
                        className="cta-btn w-full bg-iris-red text-white py-4 font-outfit text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-iris-red-hover disabled:opacity-60"
                      >
                        {loading ? 'Отправка...' : 'Отправить заявку'}
                        {!loading && <ArrowRight size={16} className="arrow-icon" />}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="text-iris-teal mx-auto mb-4" />
                    <h3 className="font-outfit text-2xl text-iris-text mb-2">Заявка отправлена</h3>
                    <p className="font-manrope text-sm text-iris-text/60 mb-6">
                      Спасибо! Мы свяжемся с вами в ближайшее время
                    </p>
                    <button
                      data-testid="contact-success-close"
                      onClick={reset}
                      className="font-outfit text-sm text-iris-teal underline underline-offset-4 hover:text-iris-teal/70 transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
