import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Zap, Bell, Menu, X, ChevronDown, Sparkles, User, Settings, Trophy, LogOut, HelpCircle, Star, ArrowLeftRight, BookOpen, Shield, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Explore', path: '/explore' },
  { label: 'Achievements', path: '/achievements' },
];

const profileMenuItems = [
  { icon: User, label: 'My Profile', sub: 'View & edit your profile', color: '#5865F2', path: '/dashboard' },
  { icon: ArrowLeftRight, label: 'My Swaps', sub: '3 active exchanges', color: '#00F5FF', path: '/explore' },
  { icon: Trophy, label: 'Achievements', sub: '12 badges earned', color: '#F59E0B', path: '/achievements' },
  { icon: BookOpen, label: 'My Skills', sub: '8 skills listed', color: '#22C55E', path: '/dashboard' },
  { icon: Settings, label: 'Settings', sub: 'Preferences & privacy', color: '#8B949E', path: '/dashboard' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'Docs, FAQs', color: '#8B949E', path: '/support' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const initials = user?.username 
    ? user.username.slice(0, 2).toUpperCase()
    : user?.email ? user.email[0].toUpperCase() : '??';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #30363D',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
              boxShadow: '0 0 16px rgba(88, 101, 242, 0.5)',
            }}
          >
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span
            style={{
              background: 'linear-gradient(90deg, #E6EDF3, #8B949E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
            }}
          >
            SwapSkills
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive ? '#00F5FF' : '#8B949E',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 245, 255, 0.2)' : '1px solid transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notification Bell */}
              <div className="relative hidden sm:block" ref={notifRef}>
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                  className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all"
                  style={{
                    background: 'rgba(48, 54, 61, 0.5)',
                    border: '1px solid #30363D',
                    color: '#8B949E',
                  }}
                >
                  <Bell size={16} />
                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ background: '#5865F2', boxShadow: '0 0 6px rgba(88,101,242,0.8)' }}
                  />
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-80 rounded-xl p-4"
                      style={{
                        background: 'rgba(22, 27, 34, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid #30363D',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      }}
                    >
                      <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '0.875rem', marginBottom: 12 }}>Notifications</p>
                      {[
                        { msg: 'Priya wants to swap React for Figma', time: '2m ago', dot: '#00F5FF' },
                        { msg: 'You have a new match! 94% compatibility', time: '15m ago', dot: '#5865F2' },
                        { msg: 'Rahul left a 5-star review', time: '1h ago', dot: '#22C55E' },
                      ].map((n, i) => (
                        <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < 2 ? '1px solid #30363D' : 'none' }}>
                          <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.dot, boxShadow: `0 0 6px ${n.dot}` }} />
                          <div>
                            <p style={{ color: '#8B949E', fontSize: '0.8rem', lineHeight: 1.5 }}>{n.msg}</p>
                            <p style={{ color: '#484F58', fontSize: '0.72rem', marginTop: 2 }}>{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Avatar / Profile Toggle */}
              <div className="relative hidden sm:block" ref={profileRef}>
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all"
                  style={{
                    border: profileOpen ? '1px solid #5865F2' : '1px solid #30363D',
                    background: profileOpen ? 'rgba(88,101,242,0.08)' : 'rgba(48, 54, 61, 0.3)',
                    cursor: 'pointer',
                    boxShadow: profileOpen ? '0 0 0 3px rgba(88,101,242,0.12)' : 'none',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
                      color: '#fff',
                      fontSize: '0.7rem',
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{ color: '#E6EDF3', fontSize: '0.8rem', fontWeight: 500 }}>
                    {user.username}
                  </span>
                  <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={12} color="#8B949E" />
                  </motion.div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 top-12 w-72 rounded-2xl overflow-hidden"
                      style={{
                        background: 'rgba(13, 17, 23, 0.97)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid #30363D',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(88,101,242,0.08)',
                      }}
                    >
                      {/* Profile Header */}
                      <div
                        className="p-4 relative overflow-hidden"
                        style={{ borderBottom: '1px solid #30363D' }}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(88,101,242,0.12) 0%, transparent 70%)',
                          }}
                        />
                        <div className="relative flex items-center gap-3">
                          <div className="relative">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                              style={{
                                background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
                                color: '#fff',
                                fontSize: '1rem',
                                boxShadow: '0 0 20px rgba(88,101,242,0.4)',
                              }}
                            >
                              {initials}
                            </div>
                            <span
                              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                              style={{ background: '#22C55E', borderColor: '#0D1117', boxShadow: '0 0 6px rgba(34,197,94,0.7)' }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>
                              Username: {user.username}
                            </p>
                            <p style={{ color: '#484F58', fontSize: '0.75rem', marginTop: 1 }}>
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* Stats row */}
                        <div
                          className="flex items-center gap-2 mt-3 p-2.5 rounded-xl"
                          style={{ background: 'rgba(48,54,61,0.4)', border: '1px solid #30363D' }}
                        >
                          {[
                            { label: 'Swaps', value: '14', color: '#00F5FF' },
                            { label: 'Skills', value: '8', color: '#5865F2' },
                            { label: 'Rating', value: '4.9', color: '#F59E0B' },
                          ].map((stat, i) => (
                            <div key={i} className="flex-1 text-center" style={{ borderRight: i < 2 ? '1px solid #30363D' : 'none' }}>
                              <p style={{ color: stat.color, fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>
                                {stat.value}
                              </p>
                              <p style={{ color: '#484F58', fontSize: '0.68rem', marginTop: 3, fontWeight: 500 }}>{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {profileMenuItems.map((item, i) => (
                          <Link
                            key={i}
                            to={item.path}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                              display: 'flex',
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${item.color}18`, border: `1px solid ${item.color}28` }}
                            >
                              <item.icon size={15} color={item.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p style={{ color: '#E6EDF3', fontSize: '0.82rem', fontWeight: 600 }}>{item.label}</p>
                              <p style={{ color: '#484F58', fontSize: '0.72rem', marginTop: 1 }}>{item.sub}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="p-2 pt-0" style={{ borderTop: '1px solid #30363D' }}>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                            marginTop: 4,
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                          >
                            <LogOut size={15} color="#EF4444" />
                          </div>
                          <div className="text-left">
                            <p style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: 600 }}>Sign Out</p>
                            <p style={{ color: '#484F58', fontSize: '0.72rem', marginTop: 1 }}>See you next time!</p>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/explore"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                  boxShadow: '0 0 20px rgba(88, 101, 242, 0.35)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                }}
              >
                <Sparkles size={13} />
                Find a Swap
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                boxShadow: '0 0 20px rgba(88, 101, 242, 0.35)',
                textDecoration: 'none',
                fontSize: '0.82rem',
              }}
            >
              <LogIn size={13} />
              Sign In
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: 'rgba(48, 54, 61, 0.5)', border: '1px solid #30363D', color: '#8B949E' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid #30363D' }}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: isActive ? '#00F5FF' : '#8B949E',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      background: isActive ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(0, 245, 255, 0.2)' : '1px solid transparent',
                      textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}