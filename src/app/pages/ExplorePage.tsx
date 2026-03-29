import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Star, CheckCircle, ArrowLeftRight,
  Code2, Palette, Music, Languages, Mic, Camera,
  TrendingUp, Dumbbell, ChefHat, Cpu,
  SlidersHorizontal, Clock, Users, Sparkles, X, ChevronDown
} from 'lucide-react';

import React from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Skills', icon: Sparkles, color: '#5865F2' },
  { id: 'webdev', label: 'Web Dev', icon: Code2, color: '#5865F2' },
  { id: 'design', label: 'UI/UX', icon: Palette, color: '#EC4899' },
  { id: 'music', label: 'Music', icon: Music, color: '#F59E0B' },
  { id: 'language', label: 'Languages', icon: Languages, color: '#00F5FF' },
  { id: 'speaking', label: 'Speaking', icon: Mic, color: '#22C55E' },
  { id: 'ai', label: 'AI/ML', icon: Cpu, color: '#8B5CF6' },
  { id: 'photo', label: 'Photography', icon: Camera, color: '#F97316' },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: '#EF4444' },
  { id: 'cooking', label: 'Cooking', icon: ChefHat, color: '#84CC16' },
];

// ── State for real data ──────────────────────────────────────────────────────
let skillCards: any[] = [];

const levelColors: Record<string, { text: string; bg: string; border: string }> = {
  Advance: { text: '#00F5FF', bg: 'rgba(0,245,255,0.08)', border: 'rgba(0,245,255,0.25)' },
  Pro: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)' },
  Intermediate: { text: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  Rookie: { text: '#5865F2', bg: 'rgba(88,101,242,0.08)', border: 'rgba(88,101,242,0.25)' },
  Noob: { text: '#22C55E', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
};

// ── Filter Panel Component ────────────────────────────────────────────────────
const LEVELS = ['Advance', 'Pro', 'Intermediate', 'Rookie', 'Noob'];
const RATINGS = [
  { label: '4.9+', value: 4.9 },
  { label: '4.7+', value: 4.7 },
  { label: '4.5+', value: 4.5 },
  { label: 'Any', value: 0 },
];

interface FilterState {
  levels: string[];
  onlineOnly: boolean;
  minRating: number;
  minHours: number;
}

const defaultFilters: FilterState = {
  levels: [],
  onlineOnly: false,
  minRating: 0,
  minHours: 0,
};

function FilterPanel({
  filters,
  onApply,
  onClose,
}: {
  filters: FilterState;
  onApply: (f: FilterState) => void;
  onClose: () => void;
}) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const toggleLevel = (lvl: string) => {
    const next = localFilters.levels.includes(lvl)
      ? localFilters.levels.filter((l) => l !== lvl)
      : [...localFilters.levels, lvl];
    setLocalFilters({ ...localFilters, levels: next });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 rounded-2xl p-5 flex flex-col gap-5"
      style={{
        background: 'rgba(13, 17, 23, 0.97)',
        backdropFilter: 'blur(20px)',
        border: '1px solid #30363D',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(88,101,242,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} color="#5865F2" />
          <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.9rem' }}>Filters</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(48,54,61,0.5)', border: '1px solid #30363D', cursor: 'pointer' }}
        >
          <X size={12} color="#8B949E" />
        </button>
      </div>

      {/* Skill Level */}
      <div>
        <p style={{ color: '#8B949E', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10 }}>
          SKILL LEVEL
        </p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((lvl) => {
            const active = localFilters.levels.includes(lvl);
            return (
              <button
                key={lvl}
                onClick={() => toggleLevel(lvl)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: active ? 'rgba(88,101,242,0.15)' : 'rgba(22,27,34,0.8)',
                  border: `1px solid ${active ? 'rgba(88,101,242,0.5)' : '#30363D'}`,
                  color: active ? '#818CF8' : '#8B949E',
                  cursor: 'pointer',
                  boxShadow: active ? '0 0 10px rgba(88,101,242,0.2)' : 'none',
                }}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <p style={{ color: '#8B949E', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10 }}>
          MINIMUM RATING
        </p>
        <div className="flex gap-2">
          {RATINGS.map((r) => {
            const active = localFilters.minRating === r.value;
            return (
              <button
                key={r.label}
                onClick={() => setLocalFilters({ ...localFilters, minRating: r.value })}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                style={{
                  background: active ? 'rgba(245,158,11,0.12)' : 'rgba(22,27,34,0.8)',
                  border: `1px solid ${active ? 'rgba(245,158,11,0.4)' : '#30363D'}`,
                  color: active ? '#F59E0B' : '#8B949E',
                  cursor: 'pointer',
                }}
              >
                {r.value > 0 && <Star size={10} fill={active ? '#F59E0B' : 'none'} color={active ? '#F59E0B' : '#8B949E'} />}
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min Hours */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p style={{ color: '#8B949E', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' }}>
            MIN AVAILABILITY
          </p>
          <span style={{ color: '#5865F2', fontSize: '0.75rem', fontWeight: 700 }}>
            {localFilters.minHours === 0 ? 'Any' : `${localFilters.minHours}h/wk`}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={8}
          step={1}
          value={localFilters.minHours}
          onChange={(e) => setLocalFilters({ ...localFilters, minHours: Number(e.target.value) })}
          className="w-full"
          style={{ accentColor: '#5865F2', cursor: 'pointer' }}
        />
        <div className="flex justify-between mt-1">
          <span style={{ color: '#484F58', fontSize: '0.65rem' }}>Any</span>
          <span style={{ color: '#484F58', fontSize: '0.65rem' }}>8h+</span>
        </div>
      </div>

      {/* Online Only Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p style={{ color: '#E6EDF3', fontSize: '0.82rem', fontWeight: 600 }}>Online Now</p>
          <p style={{ color: '#484F58', fontSize: '0.72rem' }}>Show only available swappers</p>
        </div>
        <button
          onClick={() => setLocalFilters({ ...localFilters, onlineOnly: !localFilters.onlineOnly })}
          className="relative w-10 h-5 rounded-full transition-all"
          style={{
            background: localFilters.onlineOnly ? '#22C55E' : '#30363D',
            border: `1px solid ${localFilters.onlineOnly ? '#22C55E' : '#484F58'}`,
            cursor: 'pointer',
            boxShadow: localFilters.onlineOnly ? '0 0 12px rgba(34,197,94,0.35)' : 'none',
          }}
        >
          <motion.span
            animate={{ x: localFilters.onlineOnly ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white"
            style={{ display: 'block' }}
          />
        </button>
      </div>

      {/* Footer */}
      <div className="flex gap-2 pt-1 border-t" style={{ borderColor: '#30363D' }}>
        <button
          onClick={() => setLocalFilters(defaultFilters)}
          className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: 'rgba(22,27,34,0.8)',
            border: '1px solid #30363D',
            color: '#8B949E',
            cursor: 'pointer',
          }}
        >
          Reset All
        </button>
        <button
          onClick={() => {
            onApply(localFilters);
            onClose();
          }}
          className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, #5865F2, #4752c4)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(88,101,242,0.3)',
          }}
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
}

import { useAuth } from '../components/AuthContext';

// ── Skill Card Component ──────────────────────────────────────────────────────
const SkillCard = React.forwardRef<HTMLDivElement, { card: any; onToast: (m: string, t?: 'success' | 'error') => void; isAlreadySent: boolean }>(
  function SkillCard({ card, onToast, isAlreadySent }, ref) {
  const { user, refreshUser } = useAuth();
  const [swapState, setSwapState] = useState<'idle' | 'loading' | 'success'>(isAlreadySent ? 'success' : 'idle');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isAlreadySent) setSwapState('success');
  }, [isAlreadySent]);

  const level = levelColors[card.level] || levelColors.Intermediate;

  const handleSwap = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (swapState === 'loading') return;
    if (!user) {
      onToast('Please sign in to request a swap!', 'error');
      return;
    }

    try {
      if (swapState === 'success') {
        setSwapState('loading');
        const res = await fetch(`/api/swaps?senderId=${user.id}&receiverId=${card.userId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setSwapState('idle');
          onToast(`Swap request to ${card.name} cancelled.`, 'success');
          setTimeout(() => refreshUser(), 500);
        } else {
          onToast('Failed to cancel request.', 'error');
          setSwapState('success');
        }
        return;
      }

      setSwapState('loading');
      
      // Find a skill the current user can offer
      const offer = user.skills?.find((s: any) => s.type === 'have')?.name || 'General Help';
      
      const res = await fetch('/api/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: card.userId,
          skillOffered: offer,
          skillWanted: card.skill
        }),
      });

      if (res.ok) {
        setSwapState('success');
        onToast(`Swap requested with ${card.name}!`, 'success');
        // Wait a bit before refreshing to ensure DB has committed
        setTimeout(() => refreshUser(), 500);
      } else {
        const errData = await res.json().catch(() => ({}));
        onToast(errData.error || 'Failed to send request.', 'error');
        setSwapState('idle');
      }
    } catch (err) {
      onToast('Network error. Check your connection.', 'error');
      setSwapState('idle');
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col"
      style={{
        background: 'rgba(22, 27, 34, 0.8)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? card.color + '40' : '#30363D'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${card.color}12` : 'none',
      }}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${card.color}, transparent)`
            : 'transparent',
          transition: 'background 0.3s',
        }}
      />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              {card.avatarUrl ? (
                <img
                  src={card.avatarUrl}
                  alt={card.name}
                  className="w-11 h-11 rounded-xl object-cover"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}40, ${card.color}10)`,
                    border: `1px solid ${card.color}40`,
                    boxShadow: `0 0 12px ${card.color}20`,
                  }}
                />
              ) : (
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}99, ${card.color}44)`,
                    border: `1px solid ${card.color}40`,
                    boxShadow: `0 0 12px ${card.color}20`,
                  }}
                >
                  {card.initials}
                </div>
              )}
              {card.online && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{ background: '#22C55E', borderColor: '#161B22' }}
                />
              )}
            </div>
            <div>
              <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.875rem' }}>{card.name}</p>
              <div className="flex items-center gap-1">
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <span style={{ color: '#8B949E', fontSize: '0.72rem', fontWeight: 500 }}>{card.rating}</span>
                <span style={{ color: '#30363D', fontSize: '0.72rem' }}>·</span>
                <span style={{ color: '#484F58', fontSize: '0.72rem' }}>{card.reviews} reviews</span>
              </div>
            </div>
          </div>

          <span
            className="shrink-0 px-2 py-1 rounded-md text-xs font-semibold"
            style={{ background: level.bg, border: `1px solid ${level.border}`, color: level.text }}
          >
            {card.level}
          </span>
        </div>

        {/* Skill name */}
        <div>
          <h3 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3, marginBottom: 8 }}>
            {card.skill}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  background: 'rgba(48,54,61,0.5)',
                  border: '1px solid #30363D',
                  color: '#8B949E',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock size={12} color="#484F58" />
            <span style={{ color: '#484F58', fontSize: '0.72rem' }}>{card.hours}h/week</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} color="#484F58" />
            <span style={{ color: '#484F58', fontSize: '0.72rem' }}>{card.swaps} swaps done</span>
          </div>
        </div>

        {/* Swap Button */}
        <motion.button
          type="button"
          onClick={handleSwap}
          whileTap={{ scale: 0.96 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-all"
          style={{
            background: swapState === 'success'
              ? 'rgba(34,197,94,0.12)'
              : swapState === 'loading'
              ? 'rgba(88,101,242,0.12)'
              : 'linear-gradient(135deg, #5865F2, #4752c4)',
            border: swapState !== 'idle' ? `1px solid ${swapState === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(88,101,242,0.3)'}` : 'none',
            boxShadow: swapState === 'idle' ? '0 0 16px rgba(88,101,242,0.3)' : 'none',
            color: swapState === 'success' ? '#4ADE80' : swapState === 'loading' ? '#818CF8' : '#fff',
            fontSize: '0.82rem',
            cursor: swapState === 'loading' ? 'default' : 'pointer',
          }}
        >
          <AnimatePresence mode="wait">
            {swapState === 'idle' && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <ArrowLeftRight size={14} />
                Request Swap
              </motion.span>
            )}
            {swapState === 'loading' && (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-indigo-400 border-t-transparent"
                />
                Processing…
              </motion.span>
            )}
            {swapState === 'success' && (
              <motion.span key="success" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                {hovered ? <X size={14} /> : <CheckCircle size={14} />}
                {hovered ? 'Cancel Request' : 'Swap Requested!'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
});
SkillCard.displayName = 'SkillCard';

// ── Page ──────────────────────────────────────────────────────────────────────
export function ExplorePage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('all');
  const [focused, setFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Transform raw users into skill cards
  const allCards = users
    .filter(u => u.id !== user?.id) // Don't show current user
    .flatMap(u => (u.skills || []).filter((s:any) => s.type === 'have').map((s:any) => ({
      id: s.id,
      userId: u.id,
      name: u.name || u.username,
      initials: (u.name || u.username).slice(0, 2).toUpperCase(),
      color: u.avatarColor || '#5865F2',
      avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`,
      skill: s.name,
      category: s.category || 'other',
      rating: u.rating || 5.0,
      reviews: u.totalSwaps * 3 + (u.username.length % 5) + 2,
      hours: u.hoursExchanged || 4,
      level: u.level || 'Noob',
      tags: [s.name, s.category || 'skill'],
      online: u.isOnline ?? true,
      swaps: u.totalSwaps || 0,
    })));

  // Close filter panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    };
    if (showFilters) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showFilters]);

  const activeFilterCount = [
    filters.levels.length > 0,
    filters.onlineOnly,
    filters.minRating > 0,
    filters.minHours > 0,
  ].filter(Boolean).length;

  const filtered = allCards.filter((c) => {
    const matchCat = active === 'all' || c.category === active;
    const matchQ = !query || c.skill.toLowerCase().includes(query.toLowerCase()) || c.name.toLowerCase().includes(query.toLowerCase());
    const matchLevel = filters.levels.length === 0 || filters.levels.includes(c.level);
    const matchOnline = !filters.onlineOnly || c.online;
    const matchRating = c.rating >= filters.minRating;
    const matchHours = c.hours >= filters.minHours;
    return matchCat && matchQ && matchLevel && matchOnline && matchRating && matchHours;
  });

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: 'linear-gradient(180deg, #010409 0%, #0D1117 100%)', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} color="#00F5FF" />
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', color: '#00F5FF', letterSpacing: '0.06em' }}
            >
              EXPLORE
            </span>
          </div>
          <h1 style={{ color: '#E6EDF3', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Discover Your Next Skill Swap
          </h1>
          <p style={{ color: '#484F58', marginTop: 8, fontSize: '0.95rem', lineHeight: 1.7 }}>
            Browse 1.2M+ skills from verified swappers worldwide. Zero cost. Pure growth.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
          ref={filterRef}
        >
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl transition-all"
            style={{
              background: 'rgba(22, 27, 34, 0.9)',
              border: `1px solid ${focused ? '#5865F2' : '#30363D'}`,
              boxShadow: focused ? '0 0 0 3px rgba(88,101,242,0.15), 0 0 40px rgba(88,101,242,0.12)' : 'none',
              transition: 'all 0.25s',
            }}
          >
            <Search size={20} color={focused ? '#5865F2' : '#484F58'} style={{ flexShrink: 0, transition: 'color 0.2s' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
              placeholder="Search by skill, name, or keyword..."
              className="flex-1 bg-transparent outline-none"
              style={{
                color: '#E6EDF3',
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{ color: '#484F58', cursor: 'pointer', background: 'rgba(48,54,61,0.6)', border: '1px solid #30363D' }}
              >
                <X size={11} />
              </button>
            )}

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: '#30363D' }} className="hidden sm:block" />

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all relative"
              style={{
                background: showFilters || activeFilterCount > 0 ? 'rgba(88,101,242,0.12)' : 'rgba(48,54,61,0.5)',
                border: `1px solid ${showFilters || activeFilterCount > 0 ? 'rgba(88,101,242,0.4)' : '#30363D'}`,
                color: showFilters || activeFilterCount > 0 ? '#818CF8' : '#484F58',
                cursor: 'pointer',
                boxShadow: showFilters ? '0 0 14px rgba(88,101,242,0.2)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <SlidersHorizontal size={14} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Filters</span>
              {activeFilterCount > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                  style={{ background: '#5865F2', fontSize: '0.6rem', fontWeight: 700 }}
                >
                  {activeFilterCount}
                </span>
              )}
              <motion.div animate={{ rotate: showFilters ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={12} />
              </motion.div>
            </button>
          </div>

          {/* Active Filter Badges */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-3 overflow-hidden"
              >
                {filters.levels.map((lvl) => (
                  <span
                    key={lvl}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.3)', color: '#818CF8' }}
                  >
                    {lvl}
                    <button
                      onClick={() => setFilters((f) => ({ ...f, levels: f.levels.filter((l) => l !== lvl) }))}
                      style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, lineHeight: 1 }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                {filters.minRating > 0 && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}
                  >
                    <Star size={9} fill="#F59E0B" />
                    {filters.minRating}+
                    <button
                      onClick={() => setFilters((f) => ({ ...f, minRating: 0 }))}
                      style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, lineHeight: 1 }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                {filters.minHours > 0 && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)', color: '#00F5FF' }}
                  >
                    <Clock size={9} />
                    {filters.minHours}h/wk min
                    <button
                      onClick={() => setFilters((f) => ({ ...f, minHours: 0 }))}
                      style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, lineHeight: 1 }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                {filters.onlineOnly && (
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online Only
                    <button
                      onClick={() => setFilters((f) => ({ ...f, onlineOnly: false }))}
                      style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, lineHeight: 1 }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{ background: 'rgba(48,54,61,0.5)', border: '1px solid #30363D', color: '#8B949E', cursor: 'pointer' }}
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Dropdown Panel */}
          <AnimatePresence>
            {showFilters && (
              <FilterPanel
                filters={filters}
                onApply={setFilters}
                onClose={() => setShowFilters(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Notification Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, x: '-50%' }}
              style={{ position: 'fixed', bottom: 24, left: '50%', zIndex: 1000 }}
            >
              <div 
                className="px-6 py-3 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2" 
                style={{ 
                  background: toast.type === 'success' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)', 
                  border: `1px solid ${toast.type === 'success' ? '#22C55E' : '#EF4444'}`,
                  color: '#fff',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {toast.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
                {toast.msg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto pb-3 mb-8"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all"
                style={{
                  background: isActive ? `${cat.color}15` : 'rgba(22,27,34,0.8)',
                  border: `1px solid ${isActive ? cat.color + '50' : '#30363D'}`,
                  color: isActive ? cat.color : '#8B949E',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? `0 0 16px ${cat.color}18` : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <cat.icon size={15} />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-5">
          <p style={{ color: '#484F58', fontSize: '0.85rem' }}>
            <span style={{ color: '#E6EDF3', fontWeight: 600 }}>{filtered.length}</span> skills found
            {activeFilterCount > 0 && (
              <span style={{ color: '#484F58' }}> · <span style={{ color: '#818CF8' }}>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span></span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <span style={{ color: '#484F58', fontSize: '0.8rem' }}>Sort by:</span>
            <select
              style={{
                background: 'rgba(22,27,34,0.8)',
                border: '1px solid #30363D',
                color: '#8B949E',
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: '0.8rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="match">Best Match</option>
              <option value="rating">Top Rated</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((card) => (
              <SkillCard
                key={card.id}
                card={card}
                onToast={showToast}
                isAlreadySent={user?.sentSwaps?.some((s: any) => s.receiverId === card.userId)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.2)' }}
            >
              <Search size={28} color="#5865F2" />
            </div>
            <p style={{ color: '#8B949E', fontSize: '1rem', fontWeight: 600 }}>No skills match your search</p>
            <p style={{ color: '#484F58', fontSize: '0.85rem', marginTop: 6 }}>Try a different keyword or category</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}