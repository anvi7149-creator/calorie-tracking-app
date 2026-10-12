import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function AuthPage({
  onAuthenticate,
  onDemoMode
}: {
  onAuthenticate: (email: string, password: string) => void;
  onDemoMode: () => void;
}) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!email.trim()) nextErrors.email = 'Email is required.';
    if (!email.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (mode === 'signup' && password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      onAuthenticate(email, password);
      setLoading(false);
      navigate('/onboarding');
    }, 600);
  };

  const handleDemoMode = () => {
    onDemoMode();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-8 text-ink sm:px-6">
      <div className="mx-auto max-w-md">
        <button onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-forest">
              <span className="text-xl font-bold">N</span>
            </div>
            <h2 className="text-3xl font-bold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="mt-2 text-sm text-slate-600">Demo mode is available if your auth provider is not configured.</p>
          </div>

          <div className="mb-6 flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'signup' ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'login' ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}
            >
              Log In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 my-auto flex items-center text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Confirm password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === 'login' && (
              <button type="button" className="text-sm font-medium text-forest underline-offset-2 hover:underline">
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-forest px-4 py-3 font-semibold text-white shadow-soft disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted">or</div>

          <button
            type="button"
            onClick={handleDemoMode}
            className="mt-4 w-full rounded-2xl border border-forest/20 bg-mint px-4 py-3 font-semibold text-forest"
          >
            Continue in demo mode
          </button>
        </div>
      </div>
    </div>
  );
}

