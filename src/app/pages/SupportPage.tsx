import { useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle, Search, ChevronDown, MessageCircle, Mail, BookOpen,
  Zap, CheckCircle, ExternalLink, Shield,
  FileText, Video, Users, Send, X, ChevronRight, Sparkles
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: 1,
    category: 'Getting Started',
    q: 'How does SwapSkills work?',
    a: 'SwapSkills is a peer-to-peer skill exchange platform. You list skills you have and skills you want to learn. Our AI-powered matching engine connects you with people who have complementary skill sets — you teach them something, they teach you something back. No money changes hands.',
  },
  {
    id: 2,
    category: 'Getting Started',
    q: 'How do I create a swap request?',
    a: 'Head to the Explore page, find a match you like, and click "Accept Request" on their card. Once both parties confirm, a swap session is created. You\'ll get a notification and can schedule your first session directly in the app.',
  },
  {
    id: 3,
    category: 'Account',
    q: 'How is my compatibility score calculated?',
    a: 'Our matching algorithm considers skill complementarity (do you have what they want and vice versa?), proficiency levels, teaching style preferences, availability overlap, past session ratings, and badge achievements. Scores above 90% indicate an excellent mutual fit.',
  },
  {
    id: 4,
    category: 'Account',
    q: 'Can I edit or remove skills from my profile?',
    a: 'Yes! On your Dashboard, each skill tag has a small × button to remove it. To add new skills, click the green + button next to "Skills You Have" or the cyan + button next to "Skills You Want". Changes are reflected in your match feed immediately.',
  },
  {
    id: 5,
    category: 'Swaps & Sessions',
    q: 'What happens if someone cancels a session?',
    a: 'Cancellations within 2 hours of a session affect the canceller\'s reliability score. Repeated cancellations may reduce your visibility in match feeds. We recommend rescheduling rather than cancelling — use the "Reschedule" option in your active swaps.',
  },
  {
    id: 6,
    category: 'Swaps & Sessions',
    q: 'How do I leave a review after a session?',
    a: 'After each completed session, you\'ll receive an in-app prompt to rate your partner (1–5 stars) and leave a short comment. Reviews are visible on profiles and factor into the compatibility scoring algorithm.',
  },
  {
    id: 7,
    category: 'Achievements',
    q: 'How do I earn badges and level up?',
    a: 'Badges are earned through milestones: completing swaps, maintaining high ratings, teaching for cumulative hours, and community contributions. Your level (1–10) progresses with XP earned from completed sessions, reviews received, and referrals.',
  },
  {
    id: 8,
    category: 'Privacy & Safety',
    q: 'Is my personal information safe?',
    a: 'SwapSkills does not store passwords — we use OAuth (Google) for authentication. Your email is never shared with other users. All messages are encrypted in transit. You control what appears on your public profile. See our full Privacy Policy for details.',
  },
];

const categories = ['All', 'Getting Started', 'Account', 'Swaps & Sessions', 'Achievements', 'Privacy & Safety'];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    desc: 'Get instant help from our support team',
    badge: 'Online · ~2 min',
    badgeColor: '#22C55E',
    color: '#00F5FF',
    action: 'Start Chat',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Detailed help for complex issues',
    badge: 'Replies in ~4 hrs',
    badgeColor: '#5865F2',
    color: '#5865F2',
    action: 'Send Email',
  },
  {
    icon: Users,
    title: 'Community Forum',
    desc: 'Connect with the SwapSkills community',
    badge: '2.4k members',
    badgeColor: '#F59E0B',
    color: '#F59E0B',
    action: 'Visit Forum',
  },
];

const resources = [
  { icon: BookOpen, label: 'Documentation', desc: 'Full platform guide', color: '#5865F2' },
  { icon: Video, label: 'Video Tutorials', desc: 'Step-by-step walkthroughs', color: '#00F5FF' },
  { icon: FileText, label: 'Release Notes', desc: 'Latest updates & changes', color: '#22C55E' },
  { icon: Shield, label: 'Privacy Policy', desc: 'How we protect your data', color: '#F59E0B' },
];

const statusItems = [
  { label: 'API & Matching Engine', ok: true },
  { label: 'Live Chat System', ok: true },
  { label: 'Notification Service', ok: true },
  { label: 'Authentication (OAuth)', ok: true },
];

// ── Subcomponents ─────────────────────────────────────────────────────────────
function GlassCard({
  children, className = '', style = {},
}: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(22, 27, 34, 0.75)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #30363D',
        borderRadius: '16px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function FaqItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? 'rgba(88,101,242,0.35)' : '#30363D'}`,
        borderRadius: 12,
        overflow: 'hidden',
        background: isOpen ? 'rgba(88,101,242,0.04)' : 'rgba(22,27,34,0.5)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="shrink-0 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(88,101,242,0.12)', border: '1px solid rgba(88,101,242,0.2)', color: '#818CF8', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
          >
            {faq.category}
          </span>
          <span style={{ color: '#E6EDF3', fontSize: '0.875rem', fontWeight: 600 }}>{faq.q}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={16} color={isOpen ? '#818CF8' : '#484F58'} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div
              className="px-5 pb-5"
              style={{ borderTop: '1px solid rgba(48,54,61,0.6)', paddingTop: 14 }}
            >
              <p style={{ color: '#8B949E', fontSize: '0.85rem', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function SupportPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatSent, setChatSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const filteredFaqs = faqs.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = !search.trim() || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleChatSend = () => {
    if (!chatMsg.trim()) return;
    setChatSent(true);
  };

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: 'linear-gradient(180deg, #010409 0%, #0D1117 100%)', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ background: 'linear-gradient(135deg, rgba(88,101,242,0.2), rgba(0,245,255,0.1))', border: '1px solid rgba(88,101,242,0.3)', boxShadow: '0 0 32px rgba(88,101,242,0.2)' }}
          >
            <HelpCircle size={26} color="#818CF8" />
          </div>
          <h1 style={{ color: '#E6EDF3', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', marginBottom: 10 }}>
            Help & Support
          </h1>
          <p style={{ color: '#8B949E', fontSize: '1rem', maxWidth: 480, margin: '0 auto 28px' }}>
            Find answers, reach our team, or browse the knowledge base — we're here to help.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search
              size={16}
              color="#484F58"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs, topics, or keywords…"
              className="w-full pl-11 pr-4 py-3.5 outline-none rounded-xl"
              style={{
                background: 'rgba(22,27,34,0.9)',
                border: '1px solid #30363D',
                color: '#E6EDF3',
                fontSize: '0.875rem',
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#5865F2';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(88,101,242,0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#30363D';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#484F58', display: 'flex' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── System Status ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <GlassCard className="flex items-center justify-between flex-wrap gap-4 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }} />
              <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.82rem' }}>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              {statusItems.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <CheckCircle size={12} color="#4ADE80" />
                  <span style={{ color: '#8B949E', fontSize: '0.75rem' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* ── Contact Options ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {contactOptions.map((opt, i) => (
            <GlassCard
              key={opt.title}
              style={{ border: `1px solid rgba(48,54,61,0.8)`, cursor: 'default', transition: 'all 0.25s' }}
            >
              <div className="p-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${opt.color}15`, border: `1px solid ${opt.color}25` }}
                >
                  <opt.icon size={18} color={opt.color} />
                </div>
                <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{opt.title}</p>
                <p style={{ color: '#8B949E', fontSize: '0.78rem', marginBottom: 10, lineHeight: 1.5 }}>{opt.desc}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: opt.badgeColor, boxShadow: `0 0 6px ${opt.badgeColor}` }}
                  />
                  <span style={{ color: opt.badgeColor, fontSize: '0.72rem', fontWeight: 600 }}>{opt.badge}</span>
                </div>
                <button
                  onClick={() => {
                    if (opt.title === 'Live Chat') setChatOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all"
                  style={{
                    background: `${opt.color}12`,
                    border: `1px solid ${opt.color}25`,
                    color: opt.color,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${opt.color}20`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${opt.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${opt.color}12`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {opt.action} <ChevronRight size={13} />
                </button>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* ── FAQ Section ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(88,101,242,0.15)' }}>
              <Zap size={13} color="#818CF8" />
            </div>
            <h2 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.05rem' }}>Frequently Asked Questions</h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: activeCategory === cat ? 'rgba(88,101,242,0.15)' : 'rgba(22,27,34,0.6)',
                  border: `1px solid ${activeCategory === cat ? 'rgba(88,101,242,0.4)' : '#30363D'}`,
                  color: activeCategory === cat ? '#818CF8' : '#8B949E',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaq === faq.id}
                  onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Search size={32} color="#30363D" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: '#484F58', fontSize: '0.9rem' }}>No results found for "{search}"</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  style={{ color: '#818CF8', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Resources ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(0,245,255,0.12)' }}>
              <BookOpen size={13} color="#00F5FF" />
            </div>
            <h2 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.05rem' }}>Resources & Docs</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {resources.map((r) => (
              <GlassCard
                key={r.label}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div
                  className="p-4"
                  onMouseEnter={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.borderColor = `${r.color}40`;
                    (e.currentTarget.parentElement as HTMLElement).style.boxShadow = `0 0 20px ${r.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.borderColor = '#30363D';
                    (e.currentTarget.parentElement as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${r.color}15`, border: `1px solid ${r.color}25` }}
                  >
                    <r.icon size={16} color={r.color} />
                  </div>
                  <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.82rem', marginBottom: 3 }}>{r.label}</p>
                  <p style={{ color: '#484F58', fontSize: '0.72rem' }}>{r.desc}</p>
                  <ExternalLink size={11} color="#484F58" style={{ marginTop: 8 }} />
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* ── Still need help ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GlassCard style={{ border: '1px solid rgba(88,101,242,0.2)', overflow: 'hidden', position: 'relative' }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 80% at 90% 50%, rgba(88,101,242,0.07) 0%, transparent 70%)' }}
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={15} color="#818CF8" />
                  <span style={{ color: '#818CF8', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em' }}>STILL NEED HELP?</span>
                </div>
                <h3 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>Can't find what you're looking for?</h3>
                <p style={{ color: '#8B949E', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Our support team is available 7 days a week. Average response time is under 4 hours.
                </p>
              </div>
              {!emailSent ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 sm:w-52 px-4 py-2.5 rounded-lg outline-none"
                    style={{
                      background: 'rgba(48,54,61,0.5)',
                      border: '1px solid #30363D',
                      color: '#E6EDF3',
                      fontSize: '0.82rem',
                      fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#5865F2'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#30363D'; }}
                  />
                  <button
                    onClick={() => { if (emailValue.trim()) setEmailSent(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                      boxShadow: '0 0 16px rgba(88,101,242,0.35)',
                    }}
                  >
                    <Send size={13} /> Contact Us
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  <CheckCircle size={16} color="#4ADE80" />
                  <span style={{ color: '#4ADE80', fontWeight: 600, fontSize: '0.85rem' }}>Message sent! We'll be in touch soon.</span>
                </motion.div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── Live Chat Widget ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(13,17,23,0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,245,255,0.06)',
              zIndex: 200,
            }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #30363D', background: 'rgba(0,245,255,0.04)' }}>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00F5FF, #5865F2)' }}>
                    <Zap size={14} color="#fff" fill="#fff" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: '#22C55E', border: '2px solid #0D1117' }} />
                </div>
                <div>
                  <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.82rem' }}>SwapSkills Support</p>
                  <p style={{ color: '#4ADE80', fontSize: '0.68rem', fontWeight: 600 }}>● Online · Typically replies in 2 min</p>
                </div>
              </div>
              <button
                onClick={() => { setChatOpen(false); setChatSent(false); setChatMsg(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#484F58', display: 'flex' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4" style={{ minHeight: 160 }}>
              {!chatSent ? (
                <>
                  <div
                    className="p-3 rounded-xl rounded-tl-sm mb-3"
                    style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.15)', maxWidth: '85%' }}
                  >
                    <p style={{ color: '#C9D1D9', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      👋 Hey! Welcome to SwapSkills support. How can we help you today?
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[0.1, 0.2, 0.3].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#484F58' }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div
                    className="p-3 rounded-xl rounded-tl-sm mb-3"
                    style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.15)', maxWidth: '85%' }}
                  >
                    <p style={{ color: '#C9D1D9', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      👋 Hey! Welcome to SwapSkills support. How can we help you today?
                    </p>
                  </div>
                  <div
                    className="ml-auto p-3 rounded-xl rounded-tr-sm mb-3"
                    style={{ background: 'rgba(88,101,242,0.2)', border: '1px solid rgba(88,101,242,0.3)', maxWidth: '85%' }}
                  >
                    <p style={{ color: '#E6EDF3', fontSize: '0.8rem', lineHeight: 1.6 }}>{chatMsg}</p>
                  </div>
                  <div
                    className="p-3 rounded-xl rounded-tl-sm"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', maxWidth: '85%' }}
                  >
                    <p style={{ color: '#C9D1D9', fontSize: '0.8rem', lineHeight: 1.6 }}>
                      Thanks! A support agent will connect with you shortly. Expected wait: <span style={{ color: '#4ADE80', fontWeight: 600 }}>~2 minutes</span>.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 p-3" style={{ borderTop: '1px solid #30363D' }}>
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Type your message…"
                disabled={chatSent}
                className="flex-1 px-3 py-2 rounded-lg outline-none"
                style={{
                  background: 'rgba(48,54,61,0.5)',
                  border: '1px solid #30363D',
                  color: '#E6EDF3',
                  fontSize: '0.8rem',
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  opacity: chatSent ? 0.5 : 1,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#00F5FF'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#30363D'; }}
              />
              <button
                onClick={handleChatSend}
                disabled={chatSent || !chatMsg.trim()}
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                style={{
                  background: chatSent || !chatMsg.trim() ? 'rgba(48,54,61,0.4)' : 'linear-gradient(135deg, #00F5FF, #0891b2)',
                  border: 'none',
                  cursor: chatSent || !chatMsg.trim() ? 'default' : 'pointer',
                  color: '#fff',
                  boxShadow: chatSent || !chatMsg.trim() ? 'none' : '0 0 12px rgba(0,245,255,0.35)',
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}