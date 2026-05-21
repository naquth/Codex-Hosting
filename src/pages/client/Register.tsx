import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [form, setForm]                 = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8)       { setError('Password must be at least 8 characters.'); return; }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate('/client/dashboard'); }, 1200);
  };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all";
  const labelClass = "block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide";

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-[#080b12] relative overflow-hidden py-16">
      <div className="fixed inset-0 grid-overlay pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link to="/">
            <img src="/codex.png" alt="CodeX" className="h-8 w-auto mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create account</h1>
          <p className="text-gray-500 text-sm mt-1.5">Get started with CodeX Hosting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7"
        >
          {error && (
            <div className="mb-5 bg-red-500/[0.08] border border-red-500/20 text-red-400 text-xs rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="John Doe" className={inputClass} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={inputClass} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Min. 8 characters" className={`${inputClass} pr-10`} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type={showPassword ? 'text' : 'password'} name="confirm" value={form.confirm}
                  onChange={handleChange} placeholder="••••••••" className={inputClass} required />
              </div>
            </div>

            <p className="text-[11px] text-gray-600 leading-relaxed">
              By registering you agree to our{' '}
              <Link to="/tos" className="text-blue-400 hover:text-blue-300 transition-colors">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</Link>.
            </p>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Create Account</span><ArrowRight size={15} /></>
              }
            </motion.button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/client/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-5 text-gray-600 text-xs"
        >
          <ShieldCheck size={13} className="text-blue-500" />
          256-bit SSL encryption
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
