import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export default function FooterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer
      data-testid="footer-section"
      id="footer"
      ref={ref}
      className="py-8 md:py-10 bg-iris-warm border-t border-iris-teal/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Logo */}
            <div>
              <h3 className="font-outfit text-2xl text-iris-text tracking-[0.1em]">
                Ирис <span className="font-caveat text-iris-red">Design</span>
              </h3>
              <p className="font-manrope text-iris-text/50 text-xs mt-1">
                Ваше доверие – наша ответственность
              </p>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-outfit text-xs uppercase tracking-widest text-iris-teal mb-3">
                Контакты
              </h4>
              <div className="space-y-2">
                <a
                  href="tel:+79053917653"
                  data-testid="footer-phone"
                  className="flex items-center gap-2 font-manrope text-sm text-iris-text/70 hover:text-iris-red transition-colors"
                >
                  <Phone size={14} className="text-iris-teal" />
                  +7 (905) 391-76-53
                </a>
                <a
                  href="mailto:iris_design@bk.ru"
                  data-testid="footer-email"
                  className="flex items-center gap-2 font-manrope text-sm text-iris-text/70 hover:text-iris-red transition-colors"
                >
                  <Mail size={14} className="text-iris-teal" />
                  iris_design@bk.ru
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-outfit text-xs uppercase tracking-widest text-iris-teal mb-3">
                Навигация
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {['О нас', 'Компетенции', 'Портфолио', 'Регионы'].map((link) => (
                  <button
                    key={link}
                    data-testid={`footer-nav-${link}`}
                    onClick={() => {
                      const ids = { 'О нас': 'about', 'Компетенции': 'services', 'Портфолио': 'portfolio', 'Регионы': 'regions' };
                      document.getElementById(ids[link])?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block font-manrope text-sm text-iris-text/70 hover:text-iris-red transition-colors text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-5 border-t border-iris-teal/10 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-manrope text-iris-text/40 text-xs">
              &copy; 2024 Ирис Design. Все права защищены.
            </p>
            <p className="font-caveat text-iris-teal/50 text-base">
              Создаём истории с душой
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
