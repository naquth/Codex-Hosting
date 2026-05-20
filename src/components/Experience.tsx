import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Server, Puzzle, Heart } from 'lucide-react';

const experienceData = [
  {
    icon: LayoutDashboard,
    title: 'Main Dashboard',
    description: 'View server status, player count, resource usage, and quick controls — all in one place for efficient management.',
    image: '/experience.png',
  },
  {
    icon: Server,
    title: 'Server Dashboard',
    description: 'Access detailed settings including world selection, server type, RAM allocation, and live console access.',
    image: '/experience.png',
  },
  {
    icon: Puzzle,
    title: 'One-Click Installer',
    description: 'Install plugins like EssentialsX, LuckPerms, or WorldEdit instantly — no uploads or manual config needed.',
    image: '/experience.png',
  },
  {
    icon: Heart,
    title: 'Version Changer',
    description: 'Switch between server versions or software types like Paper, Fabric, and more with just a few clicks.',
    image: '/experience.png',
  },
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experienceData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="experience" className="py-24 px-5 sm:px-8 section-divider overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Our Panel
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            A platform built for control.
          </h2>
          <p className="text-gray-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
            Powerful tools without the bloat. Manage everything from one clean interface.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Tab list */}
          <div className="space-y-2">
            {experienceData.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-full text-left p-5 rounded-xl border transition-all duration-250 overflow-hidden ${
                    isActive
                      ? 'border-blue-500/40 bg-blue-500/[0.06]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10]'
                  }`}
                >
                  {/* Progress bar */}
                  {isActive && (
                    <motion.div
                      key={activeIndex}
                      className="absolute top-0 left-0 h-[2px] bg-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      style={{ originX: 0, width: '100%' }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      isActive
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'bg-white/[0.05] text-gray-500'
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] aspect-video lg:aspect-auto lg:h-[360px]"
          >
            {/* Frosted top bar decoration */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-white/[0.03] border-b border-white/[0.05] flex items-center px-4 gap-1.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={experienceData[activeIndex].image}
                alt={experienceData[activeIndex].title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Bottom label */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="text-xs font-medium text-white/70 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
                {experienceData[activeIndex].title}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
