import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Headset, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Intel from '../icons/Intel';
import Amd from '../icons/Amd';
import CloudFlare from '../icons/CloudFlare';
import Amazon from '../icons/Amazon';

const animatedWords = ['Discord Bot', 'Minecraft Server', 'Lavalink Node', 'VPS'];

const featureCards = [
  { icon: TerminalSquare, title: 'Instant Setup', description: 'Running in under 60 seconds' },
  { icon: ShieldCheck, title: 'DDoS Protection', description: 'Enterprise-grade security' },
  { icon: Clock, title: '99.9% Uptime', description: 'Guaranteed availability' },
  { icon: Headset, title: '24/7 Support', description: 'Expert help anytime' },
];

const partners = [
  { name: 'Intel', component: Intel },
  { name: 'AMD', component: Amd },
  { name: 'Cloudflare', component: CloudFlare },
  { name: 'Amazon AWS', component: Amazon },
];
const duplicatedPartners = [...partners, ...partners, ...partners];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-5 sm:px-8 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />

      {/* Radial glow – top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium text-gray-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems operational · 99.9% uptime
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.08] tracking-tight">
              Host your own
              <br />
              <span className="relative inline-block h-[1.15em] overflow-hidden w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-blue-400"
                  >
                    {animatedWords[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="mt-6 text-base text-gray-400 leading-relaxed max-w-md">
              Lightning-fast performance, unbeatable reliability, and round-the-clock
              support for all your favourite games and applications.
            </p>

            <div className="mt-9 flex items-center gap-4">
              <Link to="/#pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
                >
                  Get Started
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
                Learn more →
              </a>
            </div>

            <p className="mt-5 text-xs text-gray-600">No credit card required · Free tier available</p>
          </motion.div>

          {/* Right column – stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <card.icon
                  size={20}
                  className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-200"
                />
                <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partner marquee */}
        <div className="mt-20 pt-10 border-t border-white/[0.05]">
          <p className="text-xs text-center text-gray-600 uppercase tracking-widest mb-8 font-medium">
            Powered by industry-leading technology
          </p>
          <div className="marquee-fade overflow-hidden">
            <div className="marquee-track">
              {duplicatedPartners.map((p, i) => {
                const Icon = p.component;
                return (
                  <div key={`${p.name}-${i}`} className="flex-shrink-0 flex items-center justify-center w-36 h-10 mx-4 opacity-30 hover:opacity-60 transition-opacity">
                    <Icon className="h-7 w-auto text-gray-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
