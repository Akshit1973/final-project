import { useState, useId, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../components/AuthContext';
import {
  Star, CheckCircle, ArrowLeftRight, Clock, TrendingUp,
  MessageCircle, Zap, Plus, X, BookOpen, Award, Target,
  BarChart2, Users, Activity, Check, UserCheck
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area
} from 'recharts';

// ── Data ──────────────────────────────────────────────────────────────────────
const mySkillsHave = [
  'React.js', 'TypeScript', 'Node.js', 'GraphQL', 'Figma Basics', 'Git/GitHub',
];
const mySkillsWant = [
  'Piano', 'Spanish', 'Video Editing', 'Public Speaking', 'Photography',
];

const matches = [
  {
    id: 1, name: 'Priya Nair', initials: 'PN', color: '#00F5FF',
    offer: 'UI/UX Design', want: 'React.js', score: 97,
    rating: 4.9, reviews: 42, online: true, sessions: 12,
    badge: 'Master Mentor',
  },
  {
    id: 2, name: 'Rahul Dev', initials: 'RD', color: '#22C55E',
    offer: 'Piano Lessons', want: 'Node.js', score: 94,
    rating: 4.8, reviews: 28, online: true, sessions: 8,
    badge: 'Fast Learner',
  },
  {
    id: 3, name: 'Sneha Patel', initials: 'SP', color: '#F59E0B',
    offer: 'Spanish (C1)', want: 'TypeScript', score: 91,
    rating: 4.7, reviews: 61, online: false, sessions: 23,
    badge: 'Community Pillar',
  },
  {
    id: 4, name: 'Ananya Singh', initials: 'AN', color: '#8B5CF6',
    offer: 'Video Editing', want: 'GraphQL', score: 88,
    rating: 4.9, reviews: 15, online: true, sessions: 5,
    badge: 'Fast Learner',
  },
];

const radarData = [
  { subject: 'React', A: 95 },
  { subject: 'TypeScript', A: 80 },
  { subject: 'Node.js', A: 72 },
  { subject: 'Design', A: 40 },
  { subject: 'GraphQL', A: 65 },
  { subject: 'Git', A: 88 },
];

const barData = [
  { month: 'Sep', taught: 8, learned: 4 },
  { month: 'Oct', taught: 12, learned: 6 },
  { month: 'Nov', taught: 9, learned: 11 },
  { month: 'Dec', taught: 15, learned: 8 },
  { month: 'Jan', taught: 11, learned: 14 },
  { month: 'Feb', taught: 18, learned: 10 },
];

const activityData = [
  { day: 'Mon', sessions: 3 },
  { day: 'Tue', sessions: 1 },
  { day: 'Wed', sessions: 4 },
  { day: 'Thu', sessions: 2 },
  { day: 'Fri', sessions: 5 },
  { day: 'Sat', sessions: 3 },
  { day: 'Sun', sessions: 2 },
];

const badgeColors: Record<string, string> = {
  'Master Mentor': '#F59E0B',
  'Fast Learner': '#5865F2',
  'Community Pillar': '#22C55E',
};

// ── Components ────────────────────────────────────────────────────────────────
function GlassCard({
  children, className = '', style = {}
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
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

function SkillTag({
  label, type, onRemove
}: { label: string; type: 'have' | 'want'; onRemove?: () => void }) {
  const colors = type === 'have'
    ? { text: '#4ADE80', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.3)', glow: 'rgba(34,197,94,0.2)' }
    : { text: '#00F5FF', bg: 'rgba(0,245,255,0.08)', border: 'rgba(0,245,255,0.3)', glow: 'rgba(0,245,255,0.15)' };

  return (
    <span
      style={{
        color: colors.text,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 8px ${colors.glow}`,
        borderRadius: '6px',
        padding: '4px 8px 4px 10px',
        fontSize: '0.75rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            color: colors.text,
            opacity: 0.6,
            lineHeight: 1,
          }}
          title="Remove skill"
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

function AddSkillInline({
  type,
  onAdd,
}: {
  type: 'have' | 'want';
  onAdd: (skill: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const color = type === 'have' ? '#4ADE80' : '#00F5FF';
  const borderColor = type === 'have' ? 'rgba(34,197,94,0.4)' : 'rgba(0,245,255,0.4)';
  const bg = type === 'have' ? 'rgba(34,197,94,0.1)' : 'rgba(0,245,255,0.1)';

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') { setValue(''); setOpen(false); }
  };

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="flex items-center justify-center w-6 h-6 rounded-md transition-all"
        style={{ background: bg, border: `1px solid ${borderColor}`, color, cursor: 'pointer' }}
        title={`Add ${type === 'have' ? 'skill you have' : 'skill you want'}`}
      >
        <Plus size={12} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              placeholder={type === 'have' ? 'e.g. Python, Figma…' : 'e.g. Piano, Spanish…'}
              className="flex-1 px-3 py-1.5 rounded-lg outline-none"
              style={{
                background: 'rgba(48,54,61,0.5)',
                border: `1px solid ${borderColor}`,
                color: '#E6EDF3',
                fontSize: '0.8rem',
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                boxShadow: `0 0 0 3px ${type === 'have' ? 'rgba(74,222,128,0.08)' : 'rgba(0,245,255,0.08)'}`,
              }}
            />
            <button
              onClick={submit}
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-all"
              style={{ background: bg, border: `1px solid ${borderColor}`, color, cursor: 'pointer' }}
              title="Confirm"
            >
              <Check size={13} />
            </button>
            <button
              onClick={() => { setValue(''); setOpen(false); }}
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-all"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', cursor: 'pointer' }}
              title="Cancel"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CompatibilityScore({ score }: { score: number }) {
  const color = score >= 95 ? '#00F5FF' : score >= 90 ? '#5865F2' : '#F59E0B';
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center w-16 h-16 rounded-full"
        style={{
          background: `conic-gradient(${color} ${score}%, rgba(48,54,61,0.5) 0%)`,
          padding: 3,
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ background: '#0D1117' }}
        >
          <span style={{ color, fontWeight: 800, fontSize: '0.875rem' }}>{score}%</span>
        </div>
      </div>
      <span style={{ color: '#484F58', fontSize: '0.65rem', fontWeight: 500, marginTop: 4 }}>Match</span>
    </div>
  );
}

function AcceptButton({ swapId, onAccepted }: { swapId: string; onAccepted: () => void }) {
  const [state, setState] = useState<'idle' | 'accepting' | 'accepted' | 'declined'>('idle');

  const handleAccept = async () => {
    if (state !== 'idle') return;
    setState('accepting');
    try {
      const res = await fetch(`/api/swaps/${swapId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });
      if (res.ok) {
        setState('accepted');
        setTimeout(() => onAccepted(), 1000);
      } else {
        setState('idle');
      }
    } catch {
      setState('idle');
    }
  };

  const handleDecline = async () => {
    if (state !== 'idle') return;
    try {
      await fetch(`/api/swaps/${swapId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'declined' }),
      });
      setState('declined');
      setTimeout(() => onAccepted(), 1000);
    } catch {}
  };

  if (state === 'declined') {
    return (
      <span
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', fontSize: '0.8rem', fontWeight: 600 }}
      >
        <X size={13} /> Declined
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleAccept}
        whileTap={{ scale: 0.95 }}
        disabled={state !== 'idle'}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all"
        style={{
          background: state === 'accepted'
            ? 'rgba(34, 197, 94, 0.15)'
            : state === 'accepting'
            ? 'rgba(88, 101, 242, 0.15)'
            : 'linear-gradient(135deg, #22C55E, #16a34a)',
          border: state === 'accepted'
            ? '1px solid rgba(34,197,94,0.4)'
            : state === 'accepting'
            ? '1px solid rgba(88,101,242,0.4)'
            : 'none',
          boxShadow: state === 'idle' ? '0 0 16px rgba(34,197,94,0.3)' : 'none',
          color: state === 'accepted' ? '#4ADE80' : state === 'accepting' ? '#818CF8' : '#fff',
          fontSize: '0.8rem',
          cursor: state === 'idle' ? 'pointer' : 'default',
          minWidth: 130,
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
              <UserCheck size={13} /> Accept Request
            </motion.span>
          )}
          {state === 'accepting' && (
            <motion.span key="accepting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-3 rounded-full border border-current border-t-transparent"
              />
              Accepting…
            </motion.span>
          )}
          {state === 'accepted' && (
            <motion.span key="accepted" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5">
              <CheckCircle size={13} /> Accepted!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {state === 'idle' && (
        <motion.button
          onClick={handleDecline}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#F87171',
            cursor: 'pointer',
          }}
          title="Decline"
        >
          <X size={14} />
        </motion.button>
      )}
    </div>
  );
}

function RequestSwapButton({ targetUserId, skillWanted, onRequested }: { targetUserId: string; skillWanted: string; onRequested: () => void }) {
  const { user } = useAuth();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleRequest = async () => {
    if (state !== 'idle' || !user) return;
    setState('loading');
    try {
      const res = await fetch('/api/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: targetUserId,
          skillOffered: user.skills?.find(s => s.type === 'have')?.name || 'General Help',
          skillWanted: skillWanted
        }),
      });
      if (res.ok) {
        setState('done');
        setTimeout(() => onRequested(), 1200);
      } else {
        setState('idle');
      }
    } catch {
      setState('idle');
    }
  };

  return (
    <motion.button
      onClick={handleRequest}
      whileTap={{ scale: 0.95 }}
      disabled={state !== 'idle'}
      className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all"
      style={{
        background: state === 'done' ? 'rgba(34,197,94,0.1)' : 'linear-gradient(135deg, #5865F2, #4752c4)',
        border: state === 'done' ? '1px solid rgba(34,197,94,0.3)' : 'none',
        color: state === 'done' ? '#4ADE80' : '#fff',
        fontSize: '0.8rem',
        cursor: state === 'idle' ? 'pointer' : 'default',
        minWidth: 140,
        justifyContent: 'center',
      }}
    >
      {state === 'idle' && <><ArrowLeftRight size={13} /> Request Swap</>}
      {state === 'loading' && 'Sending...'}
      {state === 'done' && <><CheckCircle size={13} /> Sent!</>}
    </motion.button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function DashboardPage() {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const [activeTab, setActiveTab] = useState<'all' | 'top'>('all');
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [msgToast, setMsgToast] = useState<string | null>(null);
  
  const skillsHave = user?.skills?.filter(s => s.type === 'have') || [];
  const skillsWant = user?.skills?.filter(s => s.type === 'want') || [];

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch('/api/users');
        if (res.ok) {
          const allUsers = await res.json();
          // Filter out current user and anyone already in sentSwaps/receivedSwaps
          const existingPeerIds = new Set([
            ...(user?.sentSwaps || []).map((s:any) => s.receiverId),
            ...(user?.receivedSwaps || []).map((s:any) => s.senderId)
          ]);
          
          const filtered = allUsers
            .filter((u: any) => u.id !== user?.id && !existingPeerIds.has(u.id))
            .map((u: any) => ({
              id: u.id,
              name: u.username,
              initials: u.username.slice(0, 2).toUpperCase(),
              color: u.avatarColor,
              offer: u.skills.find((s:any) => s.type === 'have')?.name || 'General Skills',
              want: u.skills.find((s:any) => s.type === 'want')?.name || 'Any Skills',
              score: Math.floor(Math.random() * (99 - 85 + 1)) + 85,
              rating: u.rating,
              reviews: Math.floor(Math.random() * 50),
              online: true,
              sessions: u.hoursExchanged,
              badge: u.level === 'Advance' ? 'Master Mentor' : 'Fast Learner'
            }));
          setRecommendedUsers(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch recommended users", err);
      }
    };
    if (user) fetchRecommended();
  }, [user]);

  const handleAddSkill = async (name: string, type: 'have' | 'want') => {
    if (!user) return;
    try {
      // Find category based on name
      let category = 'other';
      const low = name.toLowerCase();
      if (low.includes('react') || low.includes('node') || low.includes('js') || low.includes('dev')) category = 'webdev';
      else if (low.includes('design') || low.includes('figma') || low.includes('ux')) category = 'design';
      else if (low.includes('music') || low.includes('piano') || low.includes('guitar')) category = 'music';

      const res = await fetch(`/api/users/${user.id}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, category }),
      });
      if (res.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Failed to add skill", err);
    }
  };

  const showMessageToast = (name: string) => {
    setMsgToast(`Chat with ${name} is coming soon!`);
    setTimeout(() => setMsgToast(null), 3000);
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Failed to remove skill", err);
    }
  };

  const uid = useId();
  const safeUid = uid.replace(/:/g, '');
  const gradientId = `cyanGrad-${safeUid}`;
  
  // Real received swaps that are pending
  const pendingSwaps = (user?.receivedSwaps || [])
    .filter((s: any) => s.status === 'pending')
    .map((s: any) => ({
      id: s.id,
      userId: s.senderId,
      name: s.sender.username,
      initials: s.sender.username.slice(0, 2).toUpperCase(),
      color: s.sender.avatarColor || '#5865F2',
      offer: s.skillOffered,
      want: s.skillWanted,
      score: 95,
      rating: s.sender.rating || 5.0,
      reviews: Math.floor(Math.random() * 20),
      online: true,
      sessions: s.sender.hoursExchanged || 0,
      badge: 'New Request',
      isRequest: true
    }));

  const recommendedMatches = recommendedUsers.map(u => ({ ...u, isRequest: false }));

  // Merge dummy static matches if no real data (though we now have recommendedUsers)
  const displayedMatches = pendingSwaps.length > 0 
    ? pendingSwaps 
    : (activeTab === 'top' ? recommendedMatches.filter(m => m.score >= 93) : recommendedMatches);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010409]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-[#5865F2] border-t-transparent"
        />
      </div>
    );
  }

  const userInitials = user.username 
    ? user.username.slice(0, 2).toUpperCase()
    : user.email[0].toUpperCase();


  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: 'linear-gradient(180deg, #010409 0%, #0D1117 100%)', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #5865F2, #00F5FF)', boxShadow: '0 0 16px rgba(88,101,242,0.5)' }}
            >
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <h1 style={{ color: '#E6EDF3', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
              Smart Swap Dashboard
            </h1>
          </div>
          <p style={{ color: '#484F58', fontSize: '0.875rem', marginLeft: 44 }}>
            Friday, March 13, 2026 · 3 new matches today
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] gap-5 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-5">
            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <GlassCard>
                <div className="p-5">
                  {/* Cover */}
                  <div
                    className="h-20 rounded-xl mb-4 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(88,101,242,0.3) 0%, rgba(0,245,255,0.15) 100%)',
                      border: '1px solid rgba(88,101,242,0.2)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5865F2 1px, transparent 0)', backgroundSize: '20px 20px' }}
                    />
                  </div>
                  {/* Avatar */}
                  <div className="flex items-end gap-3 -mt-10 mb-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-white border-2"
                      style={{
                        background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}99)`,
                        borderColor: '#010409',
                        boxShadow: `0 0 20px ${user.avatarColor}40`,
                        fontSize: '1.1rem',
                      }}
                    >
                      {userInitials}
                    </div>
                    <div className="pb-1">
                      <div className="flex items-center gap-2">
                        <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem' }}>Username: {user.username}</p>
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ADE80' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Online
                        </span>
                      </div>
                      <p style={{ color: '#484F58', fontSize: '0.75rem' }}>Full-Stack Developer</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl" style={{ background: 'rgba(48,54,61,0.25)', border: '1px solid #30363D' }}>
                    {[
                      { label: 'Swaps', value: user.totalSwaps.toString() },
                      { label: 'Hours', value: user.hoursExchanged.toString() },
                      { label: 'Rating', value: user.rating.toFixed(1) },
                    ].map(s => (
                      <div key={s.label} className="text-center">
                        <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem' }}>{s.value}</p>
                        <p style={{ color: '#484F58', fontSize: '0.68rem' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Level Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ color: '#8B949E', fontSize: '0.75rem', fontWeight: 600 }}>
                        {user.level} · Explorer
                      </span>
                      <span style={{ color: '#5865F2', fontSize: '0.75rem', fontWeight: 700 }}>12%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#30363D' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${user.progress}%` }}
                        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #5865F2, #00F5FF)',
                          boxShadow: '0 0 10px rgba(0,245,255,0.5)',
                        }}
                      />
                    </div>
                    <p style={{ color: '#484F58', fontSize: '0.68rem', marginTop: 4 }}>
                      4 more swaps to Level 2 · Beginner
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Skills You Have */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.15)' }}>
                        <BookOpen size={13} color="#4ADE80" />
                      </div>
                      <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem' }}>Skills You Have</span>
                    </div>
                    <AddSkillInline type="have" onAdd={(s) => handleAddSkill(s, 'have')} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsHave.map((s: any) => (
                      <SkillTag
                        key={s.id}
                        label={s.name}
                        type="have"
                        onRemove={() => handleRemoveSkill(s.id)}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Skills You Want */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(0,245,255,0.12)' }}>
                        <Target size={13} color="#00F5FF" />
                      </div>
                      <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem' }}>Skills You Want</span>
                    </div>
                    <AddSkillInline type="want" onAdd={(s) => handleAddSkill(s, 'want')} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsWant.map((s: any) => (
                      <SkillTag
                        key={s.id}
                        label={s.name}
                        type="want"
                        onRemove={() => handleRemoveSkill(s.id)}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* ── CENTER COLUMN ── */}
          <div className="flex flex-col gap-5">
            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <GlassCard className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1rem' }}>{pendingSwaps.length > 0 ? 'Incoming Requests' : 'Potential Matches'}</span>
                  <span
                    className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(88,101,242,0.15)', color: '#818CF8' }}
                  >
                    {displayedMatches.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {(['all', 'top'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: activeTab === t ? 'rgba(88,101,242,0.15)' : 'transparent',
                        border: activeTab === t ? '1px solid rgba(88,101,242,0.4)' : '1px solid transparent',
                        color: activeTab === t ? '#818CF8' : '#484F58',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {t === 'all' ? 'All Matches' : 'Top Picks'}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Notification Toast */}
            <AnimatePresence>
              {msgToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mx-auto"
                >
                  <div className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'rgba(88,101,242,0.2)', border: '1px solid rgba(88,101,242,0.4)', color: '#818CF8' }}>
                    {msgToast}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Match Cards */}
            <AnimatePresence mode="popLayout">
              {displayedMatches.map((match, i) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.08 }}
                  layout
                >
                  <GlassCard
                    style={{
                      borderColor: match.score >= 95 ? 'rgba(0,245,255,0.25)' : '#30363D',
                      boxShadow: match.score >= 95 ? '0 0 24px rgba(0,245,255,0.06)' : 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div className="p-5">
                      {/* Top row */}
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                            style={{
                              background: `linear-gradient(135deg, ${match.color}99, ${match.color}44)`,
                              border: `1px solid ${match.color}40`,
                              fontSize: '0.9rem',
                            }}
                          >
                            {match.initials}
                          </div>
                          {match.online && (
                            <span
                              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                              style={{ background: '#22C55E', borderColor: '#0D1117' }}
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.975rem' }}>{match.name}</span>
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                background: `${badgeColors[match.badge]}18`,
                                border: `1px solid ${badgeColors[match.badge]}35`,
                                color: badgeColors[match.badge],
                              }}
                            >
                              {match.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={11} color="#F59E0B" fill="#F59E0B" />
                            <span style={{ color: '#8B949E', fontSize: '0.75rem' }}>{match.rating}</span>
                            <span style={{ color: '#30363D', fontSize: '0.75rem' }}>·</span>
                            <span style={{ color: '#484F58', fontSize: '0.75rem' }}>{match.reviews} reviews</span>
                            <span style={{ color: '#30363D', fontSize: '0.75rem' }}>·</span>
                            <span style={{ color: '#484F58', fontSize: '0.75rem' }}>{match.sessions} sessions</span>
                          </div>
                        </div>

                        {/* Score */}
                        <CompatibilityScore score={match.score} />
                      </div>

                      {/* Swap details */}
                      <div
                        className="flex items-center gap-3 mt-4 p-3 rounded-xl"
                        style={{ background: 'rgba(48,54,61,0.3)', border: '1px solid #30363D' }}
                      >
                        <div className="flex-1 text-center">
                          <p style={{ color: '#484F58', fontSize: '0.65rem', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>They Offer</p>
                          <span
                            className="px-2.5 py-1 rounded-md text-xs font-semibold"
                            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ADE80' }}
                          >
                            {match.offer}
                          </span>
                        </div>
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                          style={{ background: 'rgba(88,101,242,0.15)', border: '1px solid rgba(88,101,242,0.3)' }}
                        >
                          <ArrowLeftRight size={14} color="#5865F2" />
                        </div>
                        <div className="flex-1 text-center">
                          <p style={{ color: '#484F58', fontSize: '0.65rem', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>They Want</p>
                          <span
                            className="px-2.5 py-1 rounded-md text-xs font-semibold"
                            style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: '#00F5FF' }}
                          >
                            {match.want}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4">
                        {match.isRequest ? (
                          <AcceptButton swapId={match.id} onAccepted={() => refreshUser()} />
                        ) : (
                          <RequestSwapButton targetUserId={match.id} skillWanted={match.want} onRequested={() => refreshUser()} />
                        )}
                        <button
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all"
                          onClick={() => showMessageToast(match.name)}
                          style={{
                            background: 'rgba(48,54,61,0.4)',
                            border: '1px solid #30363D',
                            color: '#8B949E',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = '#5865F2';
                            (e.currentTarget as HTMLElement).style.color = '#818CF8';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = '#30363D';
                            (e.currentTarget as HTMLElement).style.color = '#8B949E';
                          }}
                        >
                          <MessageCircle size={13} /> Message
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">
            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart2 size={16} color="#5865F2" />
                    <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.9rem' }}>Skill Analytics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Hrs Taught', value: (user.hoursExchanged / 2).toFixed(0), color: '#22C55E', icon: TrendingUp },
                      { label: 'Hrs Learned', value: (user.hoursExchanged / 2).toFixed(0), color: '#5865F2', icon: BookOpen },
                      { label: 'Swap Rate', value: '100%', color: '#00F5FF', icon: Activity },
                      { label: 'Active Peers', value: (user.sentSwaps.length + user.receivedSwaps.length).toString(), color: '#F59E0B', icon: Users },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col gap-1 p-3 rounded-xl"
                        style={{ background: 'rgba(48,54,61,0.3)', border: '1px solid #30363D' }}
                      >
                        <stat.icon size={14} color={stat.color} />
                        <span style={{ color: '#E6EDF3', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                          {stat.value}
                        </span>
                        <span style={{ color: '#484F58', fontSize: '0.68rem' }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Radar Chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard>
                <div className="p-5">
                  <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>Skill Proficiency</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart id={`radar-${safeUid}`} data={radarData}>
                      <PolarGrid stroke="#30363D" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#484F58', fontSize: 10 }} />
                      <Radar name="Skills" dataKey="A" stroke="#5865F2" fill="#5865F2" fillOpacity={0.18} strokeWidth={1.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Hours Chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <GlassCard>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem' }}>Hours: Taught vs Learned</p>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    {[{ color: '#22C55E', label: 'Taught' }, { color: '#5865F2', label: 'Learned' }].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                        <span style={{ color: '#8B949E', fontSize: '0.7rem' }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart id={`bar-${safeUid}`} data={barData} barSize={8} barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#484F58', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#484F58', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 8, fontSize: 12, color: '#E6EDF3' }}
                        cursor={{ fill: 'rgba(88,101,242,0.06)' }}
                      />
                      <Bar dataKey="taught" name="taught" fill="#22C55E" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                      <Bar dataKey="learned" name="learned" fill="#5865F2" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <GlassCard>
                <div className="p-5">
                  <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>Weekly Activity</p>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart id={`area-${safeUid}`} data={activityData}>
                      <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00F5FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" tick={{ fill: '#484F58', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 8, fontSize: 12, color: '#E6EDF3' }} />
                      <Area type="monotone" dataKey="sessions" name="sessions" stroke="#00F5FF" fill={`url(#${gradientId})`} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#00F5FF', strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}