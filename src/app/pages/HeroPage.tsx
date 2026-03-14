import { useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight, Sparkles, Users, BookOpen, Star, TrendingUp,
  Zap, Globe, ChevronRight, Play, Code2, Palette,
  Music, Languages, Mic, Brain
} from 'lucide-react';
import { SkillBridgeCanvas } from '../components/SkillBridgeCanvas';

const stats = [
  { label: 'Active Swappers', value: '48K+', icon: Users, color: '#5865F2' },
  { label: 'Skills Listed', value: '1.2M+', icon: BookOpen, color: '#00F5FF' },
  { label: 'Swaps Completed', value: '320K+', icon: TrendingUp, color: '#22C55E' },
  { label: 'Avg. Rating', value: '4.9 ★', icon: Star, color: '#F59E0B' },
];

const howItWorks = [
  {
    step: '01',
    title: 'List Your Skills',
    desc: 'Add what you know and what you want to learn. Our AI suggests the best pairings.',
    icon: Zap,
    color: '#5865F2',
  },
  {
    step: '02',
    title: 'Get Matched Instantly',
    desc: 'Our algorithm finds your perfect skill-swap partner based on compatibility scores.',
    icon: Brain,
    color: '#00F5FF',
  },
  {
    step: '03',
    title: 'Swap & Grow Together',
    desc: 'Schedule sessions, track progress, earn badges, and level up — no money involved.',
    icon: TrendingUp,
    color: '#22C55E',
  },
];

const featuredCategories = [
  { label: 'Web Dev', icon: Code2, color: '#5865F2', count: '12.4K' },
  { label: 'UI/UX Design', icon: Palette, color: '#EC4899', count: '8.1K' },
  { label: 'Music', icon: Music, color: '#F59E0B', count: '6.3K' },
  { label: 'Languages', icon: Languages, color: '#00F5FF', count: '9.7K' },
  { label: 'Public Speaking', icon: Mic, color: '#22C55E', count: '4.2K' },
  { label: 'Global Network', icon: Globe, color: '#8B5CF6', count: '3.8K' },
];

const testimonials = [
  {
    name: 'Arjun Sharma',
    initials: 'AS',
    color: '#5865F2',
    role: 'Full-Stack Dev → Learned Guitar',
    quote: 'I traded React knowledge for guitar lessons. Best decision ever. Zero rupees spent, infinite value gained.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    initials: 'PN',
    color: '#00F5FF',
    role: 'UI Designer → Learned Python',
    quote: 'SwapSkills matched me with the perfect Python mentor in under 24 hours. The compatibility score was spot-on!',
    rating: 5,
  },
  {
    name: 'Vikram Kumar',
    initials: 'VK',
    color: '#EC4899',
    role: 'French Tutor → Learned Figma',
    quote: 'Teaching French while learning design tools — this platform completely changed my career trajectory.',
    rating: 5,
  },
];

export function HeroPage() {
  const howItWorksRef = useRef<HTMLElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", overflowX: 'hidden' }}>
      {/* ─── Hero Section ─── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-24"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88,101,242,0.12) 0%, transparent 70%), #010409' }}
      >
        {/* Background canvas */}
        <div className="absolute inset-0 opacity-70" style={{ zIndex: 0 }}>
          <SkillBridgeCanvas />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(88, 101, 242, 0.12)',
              border: '1px solid rgba(88, 101, 242, 0.35)',
            }}
          >
            <Sparkles size={14} color="#5865F2" />
            <span style={{ color: '#818CF8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em' }}>
              THE FUTURE OF KNOWLEDGE EXCHANGE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #E6EDF3 0%, #8B949E 60%, #5865F2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Skills are the<br />
            <span
              style={{
                background: 'linear-gradient(90deg, #5865F2, #00F5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              New Currency.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: '#8B949E',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 1.8,
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
            }}
          >
            Exchange knowledge, bridge the gap, and grow together without spending a rupee.
            Connect with experts across 500+ skill categories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                boxShadow: '0 0 30px rgba(88, 101, 242, 0.45)',
                textDecoration: 'none',
                fontSize: '1rem',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(88, 101, 242, 0.7)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(88, 101, 242, 0.45)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <Sparkles size={18} />
              Start Swapping Free
              <ArrowRight size={18} />
            </Link>

            <button
              className="flex items-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all"
              style={{
                background: 'rgba(22, 27, 34, 0.8)',
                border: '1px solid #30363D',
                color: '#E6EDF3',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
              onClick={scrollToHowItWorks}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ background: 'rgba(88, 101, 242, 0.2)', border: '1px solid rgba(88,101,242,0.4)' }}
              >
                <Play size={12} color="#5865F2" fill="#5865F2" />
              </div>
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto w-full"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl"
              style={{
                background: 'rgba(22, 27, 34, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #30363D',
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-lg"
                style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}35` }}
              >
                <stat.icon size={16} color={stat.color} />
              </div>
              <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
                {stat.value}
              </span>
              <span style={{ color: '#484F58', fontSize: '0.73rem', fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── How It Works ─── */}
      <section
        ref={howItWorksRef}
        className="py-24 px-4"
        style={{ background: 'linear-gradient(180deg, #010409 0%, #0D1117 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: 'rgba(0, 245, 255, 0.1)',
                border: '1px solid rgba(0, 245, 255, 0.25)',
                color: '#00F5FF',
                letterSpacing: '0.08em',
              }}
            >
              HOW IT WORKS
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#E6EDF3',
                lineHeight: 1.1,
              }}
            >
              Three steps to your first swap
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative p-6 rounded-2xl group"
                style={{
                  background: 'rgba(22, 27, 34, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #30363D',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = step.color + '60';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${step.color}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#30363D';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}35`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <step.icon size={22} color={step.color} />
                  </div>
                  <span
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#30363D',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3 style={{ color: '#E6EDF3', fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#8B949E', fontSize: '0.9rem', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="py-20 px-4" style={{ background: '#0D1117' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#E6EDF3',
                }}
              >
                Explore by Category
              </h2>
              <p style={{ color: '#484F58', marginTop: 4, fontSize: '0.9rem' }}>
                500+ skill categories. Something for everyone.
              </p>
            </div>
            <Link
              to="/explore"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                color: '#5865F2',
                border: '1px solid rgba(88,101,242,0.35)',
                background: 'rgba(88,101,242,0.08)',
                textDecoration: 'none',
              }}
            >
              View All <ChevronRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl cursor-pointer"
                style={{
                  background: 'rgba(22, 27, 34, 0.8)',
                  border: '1px solid #30363D',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = cat.color + '50';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${cat.color}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#30363D';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                >
                  <cat.icon size={22} color={cat.color} />
                </div>
                <div className="text-center">
                  <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.82rem' }}>{cat.label}</p>
                  <p style={{ color: '#484F58', fontSize: '0.72rem', marginTop: 2 }}>{cat.count} skills</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section
        className="py-24 px-4"
        style={{ background: 'linear-gradient(180deg, #0D1117, #010409)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#E6EDF3',
                lineHeight: 1.1,
              }}
            >
              Real Swaps. Real Growth.
            </h2>
            <p style={{ color: '#484F58', marginTop: 8, fontSize: '0.95rem' }}>
              Hear from people who've already made the exchange.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(22, 27, 34, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #30363D',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <p style={{ color: '#8B949E', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
                    <p style={{ color: '#484F58', fontSize: '0.75rem' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA Banner ─── */}
      <section className="py-20 px-4" style={{ background: '#010409' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(88,101,242,0.15) 0%, rgba(0,245,255,0.08) 100%)',
              border: '1px solid rgba(88,101,242,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
                boxShadow: '0 0 40px rgba(88,101,242,0.5)',
              }}
            >
              <Zap size={28} color="#fff" fill="#fff" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#E6EDF3',
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              Ready to make your first swap?
            </h2>
            <p style={{ color: '#8B949E', fontSize: '1rem', lineHeight: 1.7, marginBottom: 28 }}>
              Join 48,000+ learners already exchanging skills. Free forever. No credit card needed.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                boxShadow: '0 0 30px rgba(88, 101, 242, 0.5)',
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              <Sparkles size={18} />
              Get Started — It's Free
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}