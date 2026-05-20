import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DiscordLogo from '../icons/DiscordLogo';

const Cta = () => (
  <section className="py-24 px-5 sm:px-8 section-divider">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02]"
      >
        {/* Background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10 md:p-14">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#5865F2]/15 rounded-xl border border-[#5865F2]/20">
                <DiscordLogo className="w-6 h-6 text-[#5865F2]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7289da]">Discord Community</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Join our community.<br />
              <span className="text-gray-400 font-medium text-2xl sm:text-3xl">Get help, stay updated.</span>
            </h2>

            <p className="text-sm text-gray-400 mt-5 leading-relaxed max-w-sm">
              Connect with thousands of developers and server owners. Get instant support and be first to hear about new features.
            </p>

            <a
              href="https://discord.gg/FnEe7xcYZQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <DiscordLogo className="w-4 h-4" />
              Join Discord Server
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Right */}
          <div className="flex justify-center md:justify-end">
            <a
              href="https://discord.gg/FnEe7xcYZQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.img
                whileHover={{ scale: 1.04, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                src="/joinus.png"
                alt="Join us on Discord"
                className="w-56 h-auto cursor-pointer drop-shadow-2xl"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Cta;
