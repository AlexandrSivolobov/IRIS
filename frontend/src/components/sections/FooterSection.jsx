import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer
      data-testid="footer-section"
      id="footer"
      ref={ref}
      className="py-16 md:py-20 bg-iris-warm border-t border-iris-teal/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Logo */}
          <div className="mb-12">
            <h3 className="font-outfit text-3xl md:text-4xl text-iris-text tracking-[0.1em]">
              Ирис <span className="font-caveat text-iris-red">Design</span>
            </h3>
            <p className="font-manrope text-iris-text/50 text-sm mt-2">
              Студия дизайна интерьеров
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {/* Contacts */}
            <div>
              <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-6">
                Контакты
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+74951234567"
                  data-testid="footer-phone"
                  className="flex items-center gap-3 font-manrope text-iris-text/70 hover:text-iris-red transition-colors"
                >
                  <Phone size={16} className="text-iris-teal" />
                  +7 (495) 123-45-67
                </a>
                <a
                  href="mailto:hello@iris-design.ru"
                  data-testid="footer-email"
                  className="flex items-center gap-3 font-manrope text-iris-text/70 hover:text-iris-red transition-colors"
                >
                  <Mail size={16} className="text-iris-teal" />
                  hello@iris-design.ru
                </a>
                <div className="flex items-start gap-3 font-manrope text-iris-text/70">
                  <MapPin size={16} className="text-iris-teal mt-1 flex-shrink-0" />
                  <span>Москва, ул. Примерная, д. 12, офис 301</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-6">
                Навигация
              </h4>
              <div className="space-y-3">
                {['О нас', 'Услуги', 'Портфолио', 'Команда', 'FAQ'].map((link) => (
                  <button
                    key={link}
                    data-testid={`footer-nav-${link}`}
                    onClick={() => {
                      const ids = { 'О нас': 'about', 'Услуги': 'services', 'Портфолио': 'portfolio', 'Команда': 'team', 'FAQ': 'faq' };
                      document.getElementById(ids[link])?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block font-manrope text-iris-text/70 hover:text-iris-red transition-colors text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-6">
                Информация
              </h4>
              <div className="space-y-3">
                <button
                  data-testid="footer-privacy"
                  className="block font-manrope text-iris-text/70 hover:text-iris-red transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
                <button
                  data-testid="footer-terms"
                  className="block font-manrope text-iris-text/70 hover:text-iris-red transition-colors text-left"
                >
                  Условия использования
                </button>
              </div>

              {/* Partner logos */}
              <div className="mt-8 flex items-center gap-6">
                <div className="w-16 h-8 bg-iris-teal/10 rounded flex items-center justify-center">
                  <span className="font-outfit text-xs text-iris-teal/60 tracking-wider">PARTNER</span>
                </div>
                <div className="w-16 h-8 bg-iris-teal/10 rounded flex items-center justify-center">
                  <span className="font-outfit text-xs text-iris-teal/60 tracking-wider">BRAND</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-iris-teal/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-manrope text-iris-text/40 text-sm">
              &copy; 2024 Ирис Design. Все права защищены.
            </p>
            <p className="font-caveat text-iris-teal/50 text-lg">
              Создаём истории с душой
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
