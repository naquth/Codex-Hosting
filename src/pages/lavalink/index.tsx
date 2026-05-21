import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Cpu, MemoryStick, HardDrive, Wifi, Clock, ShieldCheck, Check, ChevronDown } from 'lucide-react';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 },
};

const lavaPlans = [
  { name: 'Starter',    priceUSD: 0.96, cpu: '100%', ram: '1 GB',  storage: '5 GB',  popular: false },
  { name: 'Standard',   priceUSD: 1.92, cpu: '100%', ram: '2 GB',  storage: '10 GB', popular: true  },
  { name: 'Advanced',   priceUSD: 3.35, cpu: '150%', ram: '4 GB',  storage: '20 GB', popular: false },
  { name: 'Professional', priceUSD: 5.75, cpu: '200%', ram: '6 GB', storage: '30 GB', popular: false },
];

const features = [
  { icon: Music,       title: 'Crystal-Clear Audio',   description: 'Lossless audio streaming so your music bot never sounds distorted.' },
  { icon: Cpu,         title: 'Low CPU Overhead',      description: 'Optimised process management keeps CPU usage minimal at all times.' },
  { icon: ShieldCheck, title: 'DDoS Protection',       description: 'Enterprise-grade mitigation keeps your node online during attacks.' },
  { icon: Clock,       title: '99.9% Uptime',          description: 'Guaranteed availability so your music never stops playing.' },
];

const LavaLinkPricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cc = currencies[selectedCurrency as keyof typeof currencies];

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Lavalink Hosting
            </h1>
            <p className="text-gray-400 text-sm mt-3 max-w-md leading-relaxed">
              High-performance Lavalink nodes for Discord music bots. Crystal-clear audio, zero downtime.
            </p>
          </div>

          {/* Currency selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/[0.07] transition-colors"
            >
              {cc.symbol} {selectedCurrency}
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-1.5 w-40 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-xl p-1 z-20"
              >
                {Object.entries(currencies).map(([code, { symbol }]) => (
                  <button
                    key={code}
                    onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCurrency === code ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    {symbol} {code}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {lavaPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative rounded-2xl border transition-all duration-300 flex flex-col ${
                plan.popular
                  ? 'border-blue-500/50 bg-blue-600/[0.05]'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 text-[11px] font-bold text-blue-300 bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="p-5 flex-grow">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl border ${
                    plan.popular ? 'bg-blue-500/15 border-blue-500/20' : 'bg-white/[0.05] border-white/[0.07]'
                  }`}>
                    <Music size={18} className={plan.popular ? 'text-blue-400' : 'text-gray-400'} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-500">Lavalink v4</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {cc.symbol}{(plan.priceUSD * cc.rate).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-2.5">
                  {[
                    { icon: Cpu,         label: `${plan.cpu} CPU`          },
                    { icon: MemoryStick, label: `${plan.ram} RAM`          },
                    { icon: HardDrive,   label: `${plan.storage} SSD`      },
                    { icon: Wifi,        label: 'Unlimited Bandwidth'      },
                    { icon: Clock,       label: '24/7 Uptime'              },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                      <Check size={13} className="text-blue-400 flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 pt-0">
                <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.08]'
                }`}>
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Why CodeX Lavalink
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Built for music bots.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#080b12] p-6 hover:bg-[#0d1220] transition-colors"
              >
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/15 w-fit mb-4">
                  <f.icon size={16} className="text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LavaLinkPricing;
