import { useState, useId } from 'react';
import { motion } from 'motion/react';
import {
  Trophy, Star, Zap, Users, BookOpen, TrendingUp,
  Clock, Shield, Award, Target, Flame, Heart, CheckCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// ── Badge Data ────────────────────────────────────────────────────────────────
const badges = [
  {
    id: 'master-mentor',
    title: 'Master Mentor',
    desc: 'Taught 50+ hours of skills to the community',
    icon: Trophy,
    gradient: ['#F59E0B', '#F97316'],
    glow: '#F59E0B',
    earned: true,
    earnedDate: 'Feb 14, 2026',
    xp: 500,
    rarity: 'Legendary',
    rarityColor: '#F59E0B',
    progress: 100,
    progressLabel: '73 / 50 hrs taught',
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    desc: 'Completed 5 swaps within the first month of joining',
    icon: Zap,
    gradient: ['#5865F2', '#818CF8'],
    glow: '#5865F2',
    earned: true,
    earnedDate: 'Jan 9, 2026',
    xp: 250,
    rarity: 'Rare',
    rarityColor: '#5865F2',
    progress: 100,
    progressLabel: '5 / 5 swaps',
  },
  {
    id: 'community-pillar',
    title: 'Community Pillar',
    desc: 'Referred 10+ users and maintain a 4.8+ average rating',
    icon: Users,
    gradient: ['#22C55E', '#10B981'],
    glow: '#22C55E',
    earned: true,
    earnedDate: 'Mar 1, 2026',
    xp: 400,
    rarity: 'Epic',
    rarityColor: '#22C55E',
    progress: 100,
    progressLabel: '12 referrals · 4.9 rating',
  },
  {
    id: 'skill-collector',
    title: 'Skill Collector',
    desc: 'List 10+ unique skills in your profile',
    icon: BookOpen,
    gradient: ['#00F5FF', '#06B6D4'],
    glow: '#00F5FF',
    earned: false,
    earnedDate: null,
    xp: 200,
    rarity: 'Uncommon',
    rarityColor: '#00F5FF',
    progress: 55,
    progressLabel: '6 / 10 skills listed',
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    desc: 'Maintain a 30-day active streak',
    icon: Flame,
    gradient: ['#EF4444', '#F97316'],
    glow: '#EF4444',
    earned: false,
    earnedDate: null,
    xp: 300,
    rarity: 'Rare',
    rarityColor: '#EF4444',
    progress: 73,
    progressLabel: '22 / 30 days',
  },
  {
    id: 'perfect-swap',
    title: 'Perfect Swap',
    desc: 'Receive 5 five-star reviews in a row',
    icon: Star,
    gradient: ['#8B5CF6', '#A78BFA'],
    glow: '#8B5CF6',
    earned: false,
    earnedDate: null,
    xp: 350,
    rarity: 'Epic',
    rarityColor: '#8B5CF6',
    progress: 60,
    progressLabel: '3 / 5 consecutive 5-star reviews',
  },
  {
    id: 'time-keeper',
    title: 'Time Keeper',
    desc: 'Never miss or cancel a scheduled session',
    icon: Clock,
    gradient: ['#EC4899', '#F472B6'],
    glow: '#EC4899',
    earned: false,
    earnedDate: null,
    xp: 150,
    rarity: 'Uncommon',
    rarityColor: '#EC4899',
    progress: 88,
    progressLabel: '22 / 25 perfect sessions',
  },
  {
    id: 'trailblazer',
    title: 'Trailblazer',
    desc: 'First to swap a skill in a brand-new category',
    icon: Shield,
    gradient: ['#84CC16', '#4ADE80'],
    glow: '#84CC16',
    earned: false,
    earnedDate: null,
    xp: 600,
    rarity: 'Legendary',
    rarityColor: '#84CC16',
    progress: 0,
    progressLabel: 'Not started',
  },
];

const activityData = [
  { month: 'Sep', xp: 120 },
  { month: 'Oct', xp: 280 },
  { month: 'Nov', xp: 410 },
  { month: 'Dec', xp: 620 },
  { month: 'Jan', xp: 850 },
  { month: 'Feb', xp: 1150 },
  { month: 'Mar', xp: 1320 },
];

const levelThresholds = [
  { level: 1, xp: 0, title: 'Beginner' },
  { level: 2, xp: 100, title: 'Explorer' },
  { level: 3, xp: 250, title: 'Learner' },
  { level: 4, xp: 500, title: 'Practitioner' },
  { level: 5, xp: 800, title: 'Specialist' },
  { level: 6, xp: 1100, title: 'Expert' },
  { level: 7, xp: 1150, title: 'Skill Veteran' },
  { level: 8, xp: 1600, title: 'Master' },
  { level: 9, xp: 2200, title: 'Grandmaster' },
  { level: 10, xp: 3000, title: 'Legend' },
];

const totalXP = 1320;
const currentLevel = levelThresholds.filter(l => l.xp <= totalXP).pop()!;
const nextLevel = levelThresholds.find(l => l.xp > totalXP)!;
const levelProgress = ((totalXP - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100;

const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Uncommon'];
const rarityBg: Record<string, string> = {
  Legendary: 'rgba(245,158,11,0.06)',
  Epic: 'rgba(139,92,246,0.06)',
  Rare: 'rgba(88,101,242,0.06)',
  Uncommon: 'rgba(0,245,255,0.06)',
};

// ── Badge Card ────────────────────────────────────────────────────────────────
function BadgeCard({ badge, i }: { badge: typeof badges[0]; i: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 }}
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer"
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', minHeight: 240 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-between p-5 rounded-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: badge.earned
              ? `radial-gradient(ellipse at top, ${badge.glow}14 0%, rgba(22,27,34,0.9) 60%)`
              : 'rgba(22, 27, 34, 0.7)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${badge.earned ? badge.glow + '35' : '#30363D'}`,
            boxShadow: badge.earned ? `0 0 30px ${badge.glow}15` : 'none',
          }}
        >
          {/* Rarity badge */}
          <div className="w-full flex justify-between items-start">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: rarityBg[badge.rarity],
                border: `1px solid ${badge.rarityColor}30`,
                color: badge.rarityColor,
                letterSpacing: '0.04em',
              }}
            >
              {badge.rarity}
            </span>
            {badge.earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: i * 0.07 + 0.3 }}
              >
                <CheckCircle size={16} color="#22C55E" />
              </motion.div>
            )}
          </div>

          {/* 3D Icon */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl"
              style={{
                background: badge.earned
                  ? `linear-gradient(135deg, ${badge.gradient[0]}, ${badge.gradient[1]})`
                  : 'rgba(48,54,61,0.5)',
                boxShadow: badge.earned
                  ? `0 8px 32px ${badge.glow}40, 0 0 0 1px ${badge.glow}20, inset 0 1px 0 rgba(255,255,255,0.15)`
                  : '0 4px 12px rgba(0,0,0,0.3)',
                transform: 'perspective(200px) rotateX(5deg)',
                filter: badge.earned ? 'none' : 'grayscale(0.8)',
              }}
            >
              {/* Shine effect */}
              {badge.earned && (
                <div
                  className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)' }}
                />
              )}
              <badge.icon size={36} color={badge.earned ? '#fff' : '#484F58'} />
            </div>

            <div className="text-center">
              <h3 style={{ color: badge.earned ? '#E6EDF3' : '#484F58', fontWeight: 700, fontSize: '0.975rem' }}>
                {badge.title}
              </h3>
              <p style={{ color: '#484F58', fontSize: '0.72rem', marginTop: 2 }}>
                {badge.earned ? `Earned ${badge.earnedDate}` : `+${badge.xp} XP`}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#30363D' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${badge.progress}%` }}
                transition={{ duration: 1, delay: i * 0.07 + 0.2, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: badge.earned
                    ? `linear-gradient(90deg, ${badge.gradient[0]}, ${badge.gradient[1]})`
                    : `linear-gradient(90deg, ${badge.gradient[0]}80, ${badge.gradient[1]}80)`,
                  boxShadow: badge.earned ? `0 0 8px ${badge.glow}60` : 'none',
                }}
              />
            </div>
            <p style={{ color: '#484F58', fontSize: '0.65rem', marginTop: 4, textAlign: 'center' }}>
              {badge.progressLabel}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5 rounded-2xl text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `radial-gradient(ellipse at center, ${badge.glow}20 0%, rgba(13,17,23,0.98) 70%)`,
            border: `1px solid ${badge.glow}40`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <badge.icon size={32} color={badge.gradient[0]} />
          <div>
            <h3 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{badge.title}</h3>
            <p style={{ color: '#8B949E', fontSize: '0.82rem', lineHeight: 1.6 }}>{badge.desc}</p>
          </div>
          <div
            className="px-4 py-2 rounded-lg"
            style={{ background: `${badge.glow}15`, border: `1px solid ${badge.glow}30` }}
          >
            <span style={{ color: badge.gradient[0], fontWeight: 700, fontSize: '1.1rem' }}>+{badge.xp} XP</span>
          </div>
          <p style={{ color: '#30363D', fontSize: '0.7rem' }}>Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const filtered = badges.filter(b =>
    filter === 'all' ? true : filter === 'earned' ? b.earned : !b.earned
  );

  const uid = useId();
  const xpGradId = `xpGrad-${uid.replace(/:/g, '')}`;

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{ background: 'linear-gradient(180deg, #010409 0%, #0D1117 100%)', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} color="#F59E0B" />
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B', letterSpacing: '0.06em' }}
            >
              ACHIEVEMENTS
            </span>
          </div>
          <h1 style={{ color: '#E6EDF3', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Your Achievement Hall
          </h1>
          <p style={{ color: '#484F58', marginTop: 8, fontSize: '0.95rem', lineHeight: 1.7 }}>
            Collect badges, earn XP, and level up as you swap and grow.
          </p>
        </motion.div>

        {/* Top Stats + Level Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 mb-10">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(88,101,242,0.15) 0%, rgba(0,245,255,0.08) 100%)',
              border: '1px solid rgba(88,101,242,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* BG dots */}
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5865F2 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p style={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>CURRENT LEVEL</p>
                  <div className="flex items-baseline gap-3">
                    <span style={{ color: '#E6EDF3', fontWeight: 800, fontSize: '3rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {currentLevel.level}
                    </span>
                    <div>
                      <p style={{ color: '#5865F2', fontWeight: 700, fontSize: '1.1rem' }}>{currentLevel.title}</p>
                      <p style={{ color: '#484F58', fontSize: '0.75rem' }}>→ {nextLevel.title} at {nextLevel.xp} XP</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p style={{ color: '#484F58', fontSize: '0.75rem', fontWeight: 600 }}>Total XP</p>
                  <p style={{ color: '#00F5FF', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.03em' }}>
                    {totalXP.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Level Progress */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#484F58' }}>
                  <span>{currentLevel.xp} XP</span>
                  <span style={{ color: '#5865F2', fontWeight: 600 }}>{Math.round(levelProgress)}% to Level {nextLevel.level}</span>
                  <span>{nextLevel.xp} XP</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden relative" style={{ background: 'rgba(48,54,61,0.6)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: 'linear-gradient(90deg, #5865F2, #00F5FF)', boxShadow: '0 0 12px rgba(0,245,255,0.5)' }}
                  >
                    {/* Shimmer */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 w-1/2"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                    />
                  </motion.div>
                </div>
              </div>

              <p style={{ color: '#484F58', fontSize: '0.72rem' }}>
                {nextLevel.xp - totalXP} XP needed for Level {nextLevel.level} · {nextLevel.title}
              </p>
            </div>
          </motion.div>

          {/* XP Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 rounded-2xl"
            style={{
              background: 'rgba(22, 27, 34, 0.8)',
              border: '1px solid #30363D',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>XP Growth Over Time</p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id={xpGradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5865F2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5865F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#484F58', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 8, fontSize: 12, color: '#E6EDF3' }}
                  formatter={(v) => [`${v} XP`, 'Total XP']}
                />
                <Area type="monotone" dataKey="xp" stroke="#5865F2" fill={`url(#${xpGradId})`} strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#00F5FF', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Stat Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Award, label: 'Badges Earned', value: `${badges.filter(b => b.earned).length}/${badges.length}`, color: '#F59E0B' },
            { icon: TrendingUp, label: 'Current Streak', value: '22 days', color: '#EF4444' },
            { icon: Heart, label: 'Endorsements', value: '87', color: '#EC4899' },
            { icon: Target, label: 'Goals Hit', value: '15 / 18', color: '#22C55E' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(22,27,34,0.7)', border: '1px solid #30363D', backdropFilter: 'blur(8px)' }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              >
                <s.icon size={18} color={s.color} />
              </div>
              <div>
                <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem' }}>{s.value}</p>
                <p style={{ color: '#484F58', fontSize: '0.7rem' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'earned', 'locked'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: filter === f ? 'rgba(88,101,242,0.15)' : 'rgba(22,27,34,0.7)',
                border: filter === f ? '1px solid rgba(88,101,242,0.4)' : '1px solid #30363D',
                color: filter === f ? '#818CF8' : '#484F58',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {f} {f === 'earned' ? `(${badges.filter(b => b.earned).length})` : f === 'locked' ? `(${badges.filter(b => !b.earned).length})` : ''}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((badge, i) => (
            <BadgeCard key={badge.id} badge={badge} i={i} />
          ))}
        </div>

        {/* Leaderboard teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(249,115,22,0.06) 100%)',
            border: '1px solid rgba(245,158,11,0.25)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)', boxShadow: '0 0 24px rgba(245,158,11,0.4)' }}
              >
                <Trophy size={26} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.1rem' }}>Community Leaderboard</h3>
                <p style={{ color: '#8B949E', fontSize: '0.85rem', marginTop: 2 }}>
                  You're ranked <span style={{ color: '#F59E0B', fontWeight: 700 }}>#47</span> out of 48,291 swappers.
                  Earn 280 more XP to enter the Top 40!
                </p>
              </div>
            </div>
            <button
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                color: '#fff',
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(245,158,11,0.35)',
                border: 'none',
              }}
            >
              <TrendingUp size={15} /> View Leaderboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}