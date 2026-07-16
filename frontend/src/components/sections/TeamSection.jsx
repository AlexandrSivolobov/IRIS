import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Award, Users, X, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TEAM_IMG = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80';

const benefits = [
  { icon: BookOpen, text: 'Обучение за счёт компании' },
  { icon: Clock, text: 'Гибкий график и удалённая работа' },
  { icon: Award, text: 'Участие в международных конкурсах' },
  { icon: Users, text: 'Дружная команда профессионалов' },
];

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section data-testid="team-section" id="team" ref={ref}>
      {/* Team photo with torn paper overlay */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={TEAM_IMG}
          alt="Наша команда"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-iris-dark/90" />

        {/* Torn paper overlay */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="torn-paper absolute bottom-0 left-0 right-0 bg-iris-warm px-6 md:px-16 pt-12 pb-8"
        >
          <div className="max-w-3xl">
            <h2 className="font-outfit font-medium text-3xl md:text-4xl text-iris-text mb-4">
              Наша команда
            </h2>
            <p className="font-manrope text-iris-text/70 text-base md:text-lg mb-6 leading-relaxed">
              Мы — команда единомышленников, объединённых страстью к дизайну. 
              Каждый из нас привносит уникальный взгляд и опыт, создавая интерьеры, 
              которые рассказывают истории.
            </p>
            <button
              data-testid="team-join-btn"
              className="cta-btn bg-iris-teal text-white px-8 py-3 font-outfit text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-iris-teal/90"
            >
              Присоединиться
              <ArrowRight size={16} className="arrow-icon" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Benefits list on dark background */}
      <div className="bg-iris-dark py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="font-outfit text-2xl md:text-3xl text-white mb-10">
              Преимущества работы с нами
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  data-testid={`team-benefit-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-iris-teal/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon size={18} className="text-iris-light-teal" />
                  </div>
                  <span className="font-manrope text-white/80 text-base md:text-lg">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
