import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const currencies = {
  USD: { symbol: '$', name: 'USD', rate: 1 },
  INR: { symbol: '₹', name: 'INR', rate: 83.5 },
  EUR: { symbol: '€', name: 'EUR', rate: 0.92 },
};

const pricingPlans = [
  {
    title: 'Bot Hosting',
    image: '/discord.jpeg',
    priceUSD: 0.39,
    features: ['ECC Memory', 'Fast Performance', 'Low Latency', 'Advanced security', 'Managed services'],
    buttonText: 'View plans',
    popular: true,
    link: '/discord',
    badge: 'Most Popular',
  },
  {
    title: 'Game Servers',
    image: '/minecraft.jpeg',
    priceUSD: 1.57,
    features: ['Instant deployment', 'DDoS protection', '24/7 support', 'Custom configurations', 'Mod support'],
    buttonText: 'View plans',
    popular: false,
    link: '/minecraft',
    badge: null,
  },
  {
    title: 'VPS Hosting',
    image: '/vps.jpeg',
    priceUSD: 4.49,
    features: ['Full root access', 'NVMe SSD storage', '99.9% uptime SLA', 'Multiple OS options', 'Daily backups'],
    buttonText: 'Get started',
    popular: false,
    link: '/vps',
    badge: null,
  },
];

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cc = currencies[selectedCurrency as keyof typeof currencies];

  return (
    <section id="pricing" className="py-24 px-5 sm:px-8 section-divider">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Simple, honest pricing.
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-sm leading-relaxed">
              No hidden fees, no surprises. Start small, scale when ready.
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
                className="absolute right-0 mt-1.5 w-36 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-xl p-1 z-10"
              >
                {Object.entries(currencies).map(([code, { symbol, name }]) => (
                  <button
                    key={code}
                    onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCurrency === code
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-gray-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    {symbol} {code} – {name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 group ${
                plan.popular
                  ? 'border-blue-500/50 bg-blue-600/[0.05]'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 z-10 text-[11px] font-bold text-blue-300 bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Image header */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-[#080b12]/40 to-transparent" />
                <h3 className="absolute bottom-4 left-5 text-lg font-bold text-white">{plan.title}</h3>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-1">Starting at</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {cc.symbol}{(plan.priceUSD * cc.rate).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <Check size={13} className="text-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={plan.link}>
                  <button
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.08]'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
