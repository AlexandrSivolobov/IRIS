import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqData = [
  {
    q: 'Сколько стоит дизайн-проект?',
    a: 'Стоимость дизайн-проекта зависит от площади помещения и сложности задачи. Базовый пакет начинается от 3 000 ₽/м². На первой консультации мы подробно обсудим ваши пожелания и предоставим точный расчёт.',
  },
  {
    q: 'Какие сроки реализации проекта?',
    a: 'Дизайн-проект для квартиры обычно занимает 4–8 недель. Реализация «под ключ» — от 3 до 6 месяцев в зависимости от объёма работ. Мы фиксируем сроки в договоре и несём ответственность за их соблюдение.',
  },
  {
    q: 'Можно ли вносить изменения в проект?',
    a: 'Конечно! Мы работаем в тесном сотрудничестве с клиентом. В процессе проектирования предусмотрено несколько этапов согласования, на каждом из которых можно внести корректировки.',
  },
  {
    q: 'Работаете ли вы с коммерческими помещениями?',
    a: 'Да, мы проектируем интерьеры для офисов, ресторанов, отелей и торговых пространств. У нас есть отдельная команда, специализирующаяся на коммерческих проектах.',
  },
  {
    q: 'Что входит в авторский надзор?',
    a: 'Авторский надзор включает регулярные выезды дизайнера на объект, контроль соответствия работ проекту, согласование материалов и оперативное решение вопросов, возникающих в процессе строительства.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <div className="faq-item" data-testid={`faq-item-${index}`}>
      <button
        data-testid={`faq-toggle-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-8 px-2 text-left group"
      >
        <span className={`font-outfit text-lg md:text-xl transition-colors duration-300 ${
          isOpen ? 'text-[#dbc7ad]' : 'text-[#dbc7ad]/80'
        }`}>
          {item.q}
        </span>
        <div className={`faq-icon flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center ${
          isOpen ? 'open' : ''
        }`}>
          <Plus size={20} className={`transition-colors duration-300 ${
            isOpen ? 'text-[#dbc7ad]' : 'text-iris-red'
          }`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="font-manrope text-base md:text-lg leading-relaxed pb-6 px-2" style={{ color: 'rgba(219,199,173,0.6)' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-testid="faq-section"
      id="faq"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#21190f' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="deco-square" style={{ borderColor: '#be1f33' }} />
            <span className="deco-square" style={{ borderColor: '#be1f33' }} />
            <span className="deco-square" style={{ borderColor: '#be1f33' }} />
          </div>
          <h2 className="font-outfit font-medium text-4xl md:text-5xl tracking-tight" style={{ color: '#dbc7ad' }}>
            Частые вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
