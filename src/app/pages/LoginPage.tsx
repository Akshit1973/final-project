import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Sparkles, Eye, EyeOff, ArrowRight,
  Mail, Lock, User, CheckCircle, Zap, Send, Inbox, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';

type Mode = 'login' | 'signup';
type ForgotStep = 'idle' | 'sending' | 'sent';

const features = [
  'Exchange skills with 48,000+ learners worldwide',
  'AI-powered matching finds your perfect swap partner',
  'Zero cost — free forever, no credit card required',
  'Earn badges and level up as you grow',
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof form & { general?: string }>>({});

  // Forgot password state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
  const [forgotEmailFocused, setForgotEmailFocused] = useState(false);
  const [forgotStep, setForgotStep] = useState<ForgotStep>('idle');

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (mode === 'signup' && !form.username.trim()) e.username = 'Username is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    
    try {
      if (mode === 'login') {
        await login(form.email);
      } else {
        await signup(form.username, form.email);
      }
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      setLoading(false);
      setErrors({ general: err.message });
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // Simulate Google OAuth dynamic user creation/login
      const demoEmail = 'google_explorer@gmail.com';
      const demoUsername = 'google_explorer';
      
      try {
        await signup(demoUsername, demoEmail);
      } catch (err: any) {
        // If user already exists, just login
        await login(demoEmail);
      }

      setGoogleLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err: any) {
      setGoogleLoading(false);
      setErrors({ general: 'Google Login failed. Please try again.' });
    }
  };

  const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotEmailError('Please enter a valid email address');
      return;
    }
    setForgotEmailError('');
    setForgotStep('sending');
    setTimeout(() => setForgotStep('sent'), 1600);
  };

  const handleBackToLogin = () => {
    setForgotOpen(false);
    setForgotEmail('');
    setForgotEmailError('');
    setForgotStep('idle');
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #010409 0%, #0D1117 60%, #010409 100%)',
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      }}
    >
      {/* ── Left Panel (Branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(88,101,242,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
                boxShadow: '0 0 24px rgba(88,101,242,0.5)',
              }}
            >
              <Zap size={20} color="#fff" fill="#fff" />
            </div>
            <span style={{ color: '#E6EDF3', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
              SwapSkills
            </span>
          </Link>
        </div>

        {/* Main copy */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: 'rgba(88,101,242,0.1)',
                border: '1px solid rgba(88,101,242,0.3)',
              }}
            >
              <Sparkles size={13} color="#5865F2" />
              <span style={{ color: '#5865F2', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                PEER-TO-PEER SKILL EXCHANGE
              </span>
            </div>

            <h1
              style={{
                color: '#E6EDF3',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Trade knowledge,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #5865F2, #00F5FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                grow together
              </span>
            </h1>
            <p style={{ color: '#8B949E', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 32 }}>
              Learn any skill from real people by teaching what you already know. No money involved.
            </p>

            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={16} color="#22C55E" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: '#8B949E', fontSize: '0.875rem', lineHeight: 1.6 }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Mobile back link */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
            style={{ color: '#484F58', fontSize: '0.85rem', fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #5865F2, #00F5FF)', boxShadow: '0 0 20px rgba(88,101,242,0.5)' }}
            >
              <Zap size={17} color="#fff" fill="#fff" />
            </div>
            <span style={{ color: '#E6EDF3', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.03em' }}>
              SwapSkills
            </span>
          </div>

          <AnimatePresence mode="wait">
            {forgotOpen ? (
              /* ── Forgot Password Panel ── */
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.25 }}
              >
                <AnimatePresence mode="wait">
                  {forgotStep === 'sent' ? (
                    /* Success state */
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 flex flex-col items-center gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                        className="relative flex items-center justify-center w-20 h-20 rounded-2xl"
                        style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.3)' }}
                      >
                        <Inbox size={36} color="#5865F2" />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 18 }}
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: '#22C55E', boxShadow: '0 0 12px rgba(34,197,94,0.5)' }}
                        >
                          <CheckCircle size={14} color="#fff" />
                        </motion.div>
                      </motion.div>

                      <div>
                        <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', marginBottom: 8 }}>
                          Check your inbox!
                        </p>
                        <p style={{ color: '#8B949E', fontSize: '0.875rem', lineHeight: 1.7 }}>
                          We sent a password reset link to
                        </p>
                        <p style={{ color: '#5865F2', fontWeight: 700, fontSize: '0.9rem', marginTop: 2 }}>
                          {forgotEmail}
                        </p>
                      </div>

                      <div
                        className="w-full p-4 rounded-xl flex items-start gap-3"
                        style={{ background: 'rgba(88,101,242,0.06)', border: '1px solid rgba(88,101,242,0.15)' }}
                      >
                        <Mail size={15} color="#5865F2" style={{ marginTop: 2, flexShrink: 0 }} />
                        <p style={{ color: '#8B949E', fontSize: '0.8rem', lineHeight: 1.6 }}>
                          Didn't receive it? Check your spam folder or{' '}
                          <button
                            type="button"
                            onClick={() => { setForgotStep('idle'); }}
                            style={{ background: 'none', border: 'none', color: '#5865F2', fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}
                          >
                            try a different email
                          </button>.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #5865F2, #4752c4)',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontFamily: 'inherit',
                          boxShadow: '0 0 28px rgba(88,101,242,0.4)',
                        }}
                      >
                        Back to Sign In
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    /* Email input state */
                    <motion.form
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleForgotSubmit}
                      className="flex flex-col gap-5"
                    >
                      {/* Back button */}
                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="flex items-center gap-2 self-start transition-all"
                        style={{ background: 'none', border: 'none', color: '#484F58', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#E6EDF3'}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#484F58'}
                      >
                        <ArrowLeft size={15} />
                        Back to Sign In
                      </button>

                      {/* Header */}
                      <div>
                        <div
                          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                          style={{ background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.25)' }}
                        >
                          <Lock size={20} color="#5865F2" />
                        </div>
                        <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.03em', marginBottom: 6 }}>
                          Reset your password
                        </p>
                        <p style={{ color: '#8B949E', fontSize: '0.875rem', lineHeight: 1.6 }}>
                          Enter the email address linked to your account and we'll send you a reset link.
                        </p>
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label style={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>Email address</label>
                        <div
                          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                          style={{
                            background: 'rgba(22,27,34,0.9)',
                            border: `1px solid ${forgotEmailError ? 'rgba(239,68,68,0.5)' : forgotEmailFocused ? '#5865F2' : '#30363D'}`,
                            boxShadow: forgotEmailFocused
                              ? forgotEmailError
                                ? '0 0 0 3px rgba(239,68,68,0.1)'
                                : '0 0 0 3px rgba(88,101,242,0.15)'
                              : 'none',
                            transition: 'all 0.2s',
                          }}
                        >
                          <Mail size={16} color="#484F58" />
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={forgotEmail}
                            onChange={(e) => { setForgotEmail(e.target.value); if (forgotEmailError) setForgotEmailError(''); }}
                            onFocus={() => setForgotEmailFocused(true)}
                            onBlur={() => setForgotEmailFocused(false)}
                            className="flex-1 bg-transparent outline-none"
                            style={{ color: '#E6EDF3', fontSize: '0.9rem', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
                            autoFocus
                          />
                        </div>
                        {forgotEmailError && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 500 }}
                          >
                            {forgotEmailError}
                          </motion.p>
                        )}
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.98 }}
                        disabled={forgotStep === 'sending'}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold transition-all"
                        style={{
                          background: forgotStep === 'sending' ? 'rgba(88,101,242,0.6)' : 'linear-gradient(135deg, #5865F2, #4752c4)',
                          color: '#fff',
                          border: 'none',
                          cursor: forgotStep === 'sending' ? 'default' : 'pointer',
                          fontSize: '0.95rem',
                          fontFamily: 'inherit',
                          boxShadow: forgotStep === 'sending' ? 'none' : '0 0 28px rgba(88,101,242,0.4)',
                        }}
                      >
                        {forgotStep === 'sending' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                            />
                            Sending link…
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Reset Link
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* ── Normal Login / Signup Panel ── */
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 32 }}
                transition={{ duration: 0.25 }}
              >
                {/* Mode toggle */}
                <div
                  className="flex p-1 rounded-xl mb-8"
                  style={{ background: 'rgba(22,27,34,0.8)', border: '1px solid #30363D' }}
                >
                  {(['login', 'signup'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setErrors({}); setSuccess(false); }}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        background: mode === m ? 'linear-gradient(135deg, #5865F2, #4752c4)' : 'transparent',
                        color: mode === m ? '#fff' : '#484F58',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: mode === m ? '0 0 20px rgba(88,101,242,0.35)' : 'none',
                      }}
                    >
                      {m === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
                      >
                        <CheckCircle size={32} color="#22C55E" />
                      </motion.div>
                      <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.15rem' }}>
                        {mode === 'signup' ? 'Account created!' : 'Welcome back!'}
                      </p>
                      <p style={{ color: '#484F58', fontSize: '0.875rem', marginTop: 6 }}>
                        Taking you to your dashboard…
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={mode}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <p style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.03em', marginBottom: 4 }}>
                          {mode === 'login' ? 'Sign in to SwapSkills' : 'Create your account'}
                        </p>
                        <p style={{ color: '#484F58', fontSize: '0.875rem' }}>
                          {mode === 'login'
                            ? 'Enter your credentials to continue.'
                            : 'Start swapping skills for free today.'}
                        </p>
                      </div>

                      {errors.general && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 p-3 rounded-lg"
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}
                        >
                          <AlertTriangle size={16} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{errors.general}</span>
                        </motion.div>
                      )}



                      {/* Name (signup only) */}
                      <AnimatePresence>
                        {mode === 'signup' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <InputField
                              label="Username"
                              type="text"
                              icon={<User size={16} color="#484F58" />}
                              placeholder="Username"
                              value={form.username}
                              onChange={setField('username')}
                              error={errors.username}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Email */}
                      <InputField
                        label="Email address"
                        type="email"
                        icon={<Mail size={16} color="#484F58" />}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={setField('email')}
                        error={errors.email}
                      />

                      {/* Password */}
                      <InputField
                        label="Password"
                        type={showPass ? 'text' : 'password'}
                        icon={<Lock size={16} color="#484F58" />}
                        placeholder={mode === 'signup' ? 'Min. 6 characters' : '••••••••'}
                        value={form.password}
                        onChange={setField('password')}
                        error={errors.password}
                        suffix={
                          <button
                            type="button"
                            onClick={() => setShowPass((p) => !p)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                          >
                            {showPass ? <EyeOff size={16} color="#484F58" /> : <Eye size={16} color="#484F58" />}
                          </button>
                        }
                      />

                      {mode === 'login' && (
                        <div className="flex justify-end">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setForgotEmail(form.email);
                              setForgotEmailError('');
                              setForgotStep('idle');
                              setForgotOpen(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#5865F2',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              padding: 0,
                              fontFamily: 'inherit',
                              textDecoration: 'none',
                            }}
                          >
                            Forgot password?
                          </motion.button>
                        </div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-semibold transition-all"
                        style={{
                          background: loading ? 'rgba(88,101,242,0.6)' : 'linear-gradient(135deg, #5865F2, #4752c4)',
                          color: '#fff',
                          border: 'none',
                          cursor: loading ? 'default' : 'pointer',
                          fontSize: '0.95rem',
                          boxShadow: loading ? 'none' : '0 0 28px rgba(88,101,242,0.4)',
                          fontFamily: 'inherit',
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                            />
                            {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                          </>
                        ) : (
                          <>
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={16} />
                          </>
                        )}
                      </motion.button>

                      <p style={{ color: '#484F58', fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.7 }}>
                        By continuing, you agree to our{' '}
                        <span style={{ color: '#5865F2', cursor: 'pointer' }}>Terms of Service</span>
                        {' '}and{' '}
                        <span style={{ color: '#5865F2', cursor: 'pointer' }}>Privacy Policy</span>.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ── Input Field Sub-component ──────────────────────────────────────────────────
function InputField({
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  error,
  suffix,
}: {
  label: string;
  type: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  suffix?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.01em' }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        style={{
          background: 'rgba(22,27,34,0.9)',
          border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : focused ? '#5865F2' : '#30363D'}`,
          boxShadow: focused
            ? error
              ? '0 0 0 3px rgba(239,68,68,0.1)'
              : '0 0 0 3px rgba(88,101,242,0.15)'
            : 'none',
          transition: 'all 0.2s',
        }}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none"
          style={{
            color: '#E6EDF3',
            fontSize: '0.9rem',
            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
          }}
        />
        {suffix}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 500 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}