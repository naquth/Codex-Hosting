import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-5">
    <div className="fixed inset-0 grid-overlay pointer-events-none" />
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative text-center max-w-md"
    >
      {/* Big 404 */}
      <div className="relative mb-6">
        <p className="text-[120px] sm:text-[160px] font-bold text-white/[0.04] leading-none select-none">
          404
        </p>
        <p className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl font-bold text-white tracking-tight">
          404
        </p>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
        Page not found
      </h1>
      <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-xs mx-auto">
        The page you are looking for does not exist or has been moved. Head back home to get back on track.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            <Home size={15} />
            Back to Home
          </motion.button>
        </Link>
        <Link to="/support">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            Get support <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
