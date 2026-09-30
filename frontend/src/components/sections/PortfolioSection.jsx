import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Ruler, Calendar, MapPin, Palette, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const projects = [
  {
    id: 'volgograd',
    title: 'Проект «Волжские высоты»',
    area: '130 м²',
    year: '2025',
    location: 'Волгоград',
    style: 'Современная классика',
    img: '/photos/living-room.jpg',
    photos: ['/photos/living-room.jpg', '/photos/bedroom.jpg', '/photos/terrace-1.jpg', '/photos/terrace-2.jpg'],
    description: 'Двухэтажная квартира с двумя террасами для семьи, переехавшей в Волгоград. Просторная гостиная с панорамными окнами, уютная спальня в тёплых тонах и террасы с видом на город.',
    details: ['Двухуровневая планировка 130 м²', 'Две террасы с панорамным видом', 'Гостиная в стиле современной классики', 'Спальня с авторским текстильным оформлением'],
  },
  {
    id: 'harmony',
    title: 'Проект «Семейная гармония»',
    area: '125 м²',
    year: '2022',
    location: 'Волгоград',
    style: 'Неоклассика',
    img: '/photos/neo-living.jpg',
    photos: ['/photos/neo-living.jpg', '/photos/neo-kitchen.jpg', '/photos/neo-family-ny.jpg', '/photos/neo-family-table.jpg'],
    description: 'Квартира в стиле неоклассики для молодой семьи. Элегантная гостиная, функциональная кухня и тёплая атмосфера, где каждый уголок наполнен счастливыми моментами.',
    details: ['Неоклассический стиль с современными акцентами', 'Функциональная кухня с панорамным видом', 'Гостиная в тёплых тонах', 'Пространство для семейных вечеров'],
  },
  {
    id: 'psb-sukhum',
    title: 'Проект «Приморский офис»',
    area: '180 м²',
    year: '2026',
    location: 'Сухум, Абхазия',
    style: 'Современная корпоративная элегантность',
    img: '/psb_photos/psb-lobby.jpg',
    photos: [
      '/psb_photos/psb-lobby.jpg',
      '/psb_photos/psb-facade.jpg',
      '/psb_photos/psb-lounge.jpg',
      '/psb_photos/psb-meeting.jpg',
      '/psb_photos/psb-stairs.jpg',
    ],
    description: 'Офис в республике Абхазия. Пространство, где сочетаются надёжность и строгость финансового института с тёплой атмосферой южного побережья. Светлые тона, натуральное дерево и камень, панорамное остекление и биофильные элементы формируют образ современного офиса. В интерьере органично вплетены традиционные орнаментальные мотивы — от лазерной резки по металлу до световых и 3D-панелей.',
    details: [
      'Лобби с водопадом и озеленением',
      'Переговорная в мягком стиле с орнаментальными панелями',
      'Лестничный узел с панорамным зеркалом',
      'Фасад из светлого камня с панорамными витринами',
      'Реализация сложнейших инженерных решений по вентиляции, кондиционированию и системам безопасности',
    ],
  },
];

/* ─── Fullscreen Photo Viewer ─── */
function FullscreenViewer({ photos, title, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      data-testid="fullscreen-gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <button
        data-testid="fullscreen-close"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X size={22} />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={photos[idx]}
          alt={`${title} — фото ${idx + 1}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-full w-auto h-auto object-contain px-4 py-16"
        />
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            data-testid="fullscreen-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            data-testid="fullscreen-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-outfit text-sm text-white/70">
            {idx + 1} / {photos.length}
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ─── Photo Gallery ─── */
function PhotoGallery({ photos, title }) {
  const [idx, setIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);

  return (
    <>
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-black group">
        <button
          type="button"
          data-testid="gallery-open-fullscreen"
          onClick={() => setFullscreen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Открыть фото на весь экран"
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={photos[idx]}
            alt={`${title} — фото ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover pointer-events-none"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="absolute top-4 right-14 z-20 w-9 h-9 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors md:opacity-0 md:group-hover:opacity-100"
          aria-label="На весь экран"
        >
          <Maximize2 size={16} />
        </button>

        {photos.length > 1 && (
          <>
            <button
              data-testid="gallery-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              data-testid="gallery-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === i ? 'bg-white w-5' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-10 left-6 md:left-10 pointer-events-none z-10">
          <h2 className="font-caveat text-3xl md:text-5xl text-white">{title}</h2>
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <FullscreenViewer
            photos={photos}
            title={title}
            startIdx={idx}
            onClose={() => setFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 bg-iris-warm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          data-testid={`modal-close-${project.id}`}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-iris-dark/70 text-white flex items-center justify-center hover:bg-iris-dark transition-colors"
        >
          <X size={20} />
        </button>

        {/* Photo gallery */}
        <PhotoGallery photos={project.photos ?? [project.img]} title={project.title} />

        {/* Details */}
        <div className="p-6 md:p-10">
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

          <p className="font-manrope text-base md:text-lg text-iris-text/80 leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="border-t border-dashed border-iris-teal/20 pt-6">
            <h4 className="font-outfit text-sm uppercase tracking-widest text-iris-teal mb-4">Особенности проекта</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-iris-red mt-2 flex-shrink-0" />
                  <span className="font-manrope text-sm text-iris-text/70">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Portfolio Item ─── */
function PortfolioItem({ project, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      data-testid={`portfolio-item-${project.id}`}
      className="relative w-full h-[60svh] md:h-[80vh] overflow-hidden mb-4"
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
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </>
  );
}
