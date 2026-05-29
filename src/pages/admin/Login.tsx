import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@codex.host' && password === 'admin123') {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[#080b12] relative overflow-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-red-600/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <img src="/codex.png" alt="CodeX" className="h-10 w-auto mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <ShieldAlert size={13} /> Admin Access Only
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1.5">Sign in with your admin credentials</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7"
        >
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@codex.host"
                  className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/50 transition-all"
                  required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-11 text-sm focus:outline-none focus:border-red-500/50 transition-all"
                  required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors disabled:opacity-60"
            >
              {isLoading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><span>Sign In to Admin</span><ArrowRight size={15} /></>}
            </motion.button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-gray-700 mt-6">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
