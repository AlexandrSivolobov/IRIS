import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Ruler, Calendar, MapPin, Palette } from 'lucide-react';

const projects = [
  {
    id: 'forest',
    title: 'Проект «Лесной дом»',
    area: '240 м²',
    year: '2024',
    location: 'Московская область, Истринский район',
    style: 'Современная классика',
    duration: '8 месяцев',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
    description: 'Загородный дом в окружении соснового леса. Основная идея — максимально связать интерьер с природой: панорамные окна, натуральные материалы, тёплая палитра. Гостиная с камином плавно переходит в открытую террасу, а спальни ориентированы на восход.',
    details: [
      'Панорамное остекление с видом на лес',
      'Камин из натурального камня',
      'Система «умный дом»',
      'Авторская мебель из массива дуба',
    ],
  },
  {
    id: 'terrace',
    title: 'Проект «Солнечная терраса»',
    area: '180 м²',
    year: '2024',
    location: 'Москва, Хамовники',
    style: 'Скандинавский минимализм',
    duration: '5 месяцев',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80',
    description: 'Квартира с просторной террасой в центре Москвы. Светлые тона, обилие естественного света и функциональная планировка. Кухня-гостиная стала сердцем дома, а терраса — продолжением жилого пространства с зоной отдыха и зелёным садом.',
    details: [
      'Объединённая кухня-гостиная 60 м²',
      'Озеленённая терраса с системой полива',
      'Скрытые системы хранения',
      'Итальянская керамика и датская мебель',
    ],
  },
  {
    id: 'oasis',
    title: 'Проект «Городской оазис»',
    area: '120 м²',
    year: '2023',
    location: 'Санкт-Петербург, Петроградская сторона',
    style: 'Современный эклектизм',
    duration: '4 месяца',
    img: 'https://images.pexels.com/photos/3705537/pexels-photo-3705537.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Компактная квартира, превращённая в уютный оазис. Грамотное зонирование позволило разместить спальню, кабинет и гостиную в открытом пространстве. Акцент на текстуры: дерево, латунь, натуральный текстиль — создают ощущение тепла и уюта.',
    details: [
      'Зонирование без перегородок',
      'Встроенный кабинет в нише',
      'Декоративная штукатурка ручной работы',
      'Латунные акценты и тёплый свет',
    ],
  },
];

/* ─── Modal ─── */
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      data-testid={`project-modal-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-iris-warm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Close button */}
        <button
          data-testid={`modal-close-${project.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-iris-dark/70 text-white flex items-center justify-center hover:bg-iris-dark transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-10">
            <h2 className="font-caveat text-3xl md:text-5xl text-white">{project.title}</h2>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 md:p-10">
          {/* Specs grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Ruler, label: 'Площадь', value: project.area },
              { icon: Calendar, label: 'Год', value: project.year },
              { icon: MapPin, label: 'Локация', value: project.location },
              { icon: Palette, label: 'Стиль', value: project.style },
            ].map((spec) => (
              <div key={spec.label} className="bg-white p-4 border border-iris-teal/10">
                <spec.icon size={16} className="text-iris-teal mb-2" />
                <p className="font-outfit text-xs text-iris-text/50 uppercase tracking-wider">{spec.label}</p>
                <p className="font-manrope text-sm text-iris-text font-medium mt-1">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="font-manrope text-base md:text-lg text-iris-text/80 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="border-t border-dashed border-iris-teal/20 pt-6">
            <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-4">
              Особенности проекта
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-iris-red mt-2 flex-shrink-0" />
                  <span className="font-manrope text-sm text-iris-text/70">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Duration */}
          <div className="mt-8 flex items-center gap-2">
            <span className="font-outfit text-xs uppercase tracking-widest text-iris-text/40">Срок реализации:</span>
            <span className="font-outfit text-sm text-iris-text font-medium">{project.duration}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Portfolio Item ─── */
function PortfolioItem({ project, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      data-testid={`portfolio-item-${project.id}`}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden mb-4"
    >
      <motion.div style={{ y }} className="absolute inset-0 parallax-img">
        <img src={project.img} alt={project.title} className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-outfit text-white/50 text-sm tracking-widest uppercase">{project.area}</span>
            <span className="text-white/30">|</span>
            <span className="font-outfit text-white/50 text-sm tracking-widest">{project.year}</span>
          </div>

          <h3 className="font-caveat text-4xl md:text-5xl lg:text-6xl text-white mb-6">{project.title}</h3>

          <button
            data-testid={`portfolio-cta-${project.id}`}
            onClick={() => onOpen(project)}
            className="cta-btn inline-flex items-center gap-2 border border-white/40 text-white px-8 py-3 font-outfit text-sm tracking-widest uppercase hover:bg-white hover:text-iris-dark transition-all duration-300"
          >
            Смотреть проект
            <ArrowRight size={16} className="arrow-icon" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section data-testid="portfolio-section" id="portfolio" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: '#21190f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="deco-square" style={{ borderColor: '#9ed5dc' }} />
              <span className="deco-square" style={{ borderColor: '#9ed5dc' }} />
            </div>
            <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight text-white">Портфолио</h2>
            <p className="font-manrope text-white/50 mt-4 text-base md:text-lg">Избранные проекты студии</p>
          </motion.div>
        </div>

        <div>
          {projects.map((project, i) => (
            <PortfolioItem key={project.id} project={project} index={i} onOpen={setActiveProject} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
