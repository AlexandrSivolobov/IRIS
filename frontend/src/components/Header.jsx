import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'about', label: 'О нас' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'team', label: 'Команда' },
  { id: 'faq', label: 'FAQ' },
  { id: 'footer', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-iris-dark/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Marquee tagline */}
          <div className="flex-1 overflow-hidden mr-4">
            <div className="marquee-track whitespace-nowrap">
              <span className="text-white/70 text-sm font-manrope tracking-widest uppercase mx-8">
                Мы создаём истории, а не просто пространства
              </span>
              <span className="text-iris-light-teal/50 text-sm mx-4">&#9670;</span>
              <span className="text-white/70 text-sm font-manrope tracking-widest uppercase mx-8">
                Дизайн интерьеров с душой
              </span>
              <span className="text-iris-light-teal/50 text-sm mx-4">&#9670;</span>
              <span className="text-white/70 text-sm font-manrope tracking-widest uppercase mx-8">
                Мы создаём истории, а не просто пространства
              </span>
              <span className="text-iris-light-teal/50 text-sm mx-4">&#9670;</span>
              <span className="text-white/70 text-sm font-manrope tracking-widest uppercase mx-8">
                Дизайн интерьеров с душой
              </span>
              <span className="text-iris-light-teal/50 text-sm mx-4">&#9670;</span>
            </div>
          </div>

          {/* Hamburger */}
          <button
            data-testid="hamburger-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 w-10 h-10 flex items-center justify-center text-white hover:text-iris-light-teal transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 mobile-menu-overlay bg-iris-dark/95 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  data-testid={`nav-link-${link.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-3xl font-outfit font-light text-white hover:text-iris-light-teal transition-colors tracking-wide"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
