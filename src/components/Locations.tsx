import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import USFlag from '../icons/flags/USFlag';
import NetherlandsFlag from '../icons/flags/NetherlandsFlag';

const serverLocations = [
  {
    country: 'United States',
    city: 'New York',
    specs: 'AMD EPYC™ 9634 / Ampere Altra',
    flag: USFlag,
    position: { top: '35%', left: '18%' },
    ping: '8ms',
  },
  {
    country: 'Netherlands',
    city: 'Amsterdam',
    specs: 'AMD Ryzen™ 9 5900X / Intel® Xeon®',
    flag: NetherlandsFlag,
    position: { top: '25%', left: '49%' },
    ping: '4ms',
  },
];

const Locations = () => (
  <section id="locations" className="py-24 px-5 sm:px-8 section-divider">
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
          Global Infrastructure
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Servers where you need them.
        </h2>
        <p className="text-gray-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
          Strategically positioned nodes for minimal latency wherever your players are.
        </p>
      </motion.div>

      {/* Location cards */}
      <div className="flex justify-center gap-4 flex-wrap mb-12">
        {serverLocations.map((loc) => (
          <motion.div
            key={loc.country}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl px-6 py-4 hover:border-blue-500/30 transition-colors"
          >
            <loc.flag className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{loc.country}</h3>
                <span className="text-[11px] text-green-400 bg-green-400/10 border border-green-400/15 px-2 py-0.5 rounded-full font-medium">
                  {loc.ping} avg
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <MapPin size={10} /> {loc.city} · {loc.specs}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
      >
        <img
          src="/map.svg"
          alt="Global Server Locations"
          className="absolute inset-0 w-full h-full object-contain opacity-30"
        />

        {/* Soft glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080b12]/60" />

        {serverLocations.map((loc) => (
          <div
            key={loc.country}
            className="absolute"
            style={{ top: loc.position.top, left: loc.position.left }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-5 h-5 rounded-full bg-blue-500/40 animate-ping" />
              <div className="absolute w-3 h-3 rounded-full bg-blue-500/20 animate-ping" style={{ animationDelay: '0.3s' }} />
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Locations;
