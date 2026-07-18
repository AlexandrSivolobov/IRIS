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
    </section>
  );
}
