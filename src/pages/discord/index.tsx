import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, HardDrive, Wifi, ShieldCheck, LifeBuoy, Clock, Check, ChevronDown, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import nodejsImg from '@/assets/nodejs.jpg';

const currencies = {
  USD: { symbol: '$',  name: 'USD', rate: 1     },
  INR: { symbol: '₹', name: 'INR', rate: 83.5  },
  EUR: { symbol: '€', name: 'EUR', rate: 0.92  },
};

const discordPlans = [
  { name: 'Lite Plan',    priceUSD: 0.42, cpu: '100%', ram: '512 MB', storage: '2 GB',  popular: false },
  { name: 'Plus Plan',    priceUSD: 0.84, cpu: '100%', ram: '1 GB',   storage: '5 GB',  popular: true  },
  { name: 'Pro Plan',     priceUSD: 1.68, cpu: '100%', ram: '2 GB',   storage: '15 GB', popular: false },
  { name: 'Ultra Plan',   priceUSD: 3.35, cpu: '150%', ram: '4 GB',   storage: '20 GB', popular: false },
  { name: 'Elite Plan',   priceUSD: 5.02, cpu: '200%', ram: '6 GB',   storage: '30 GB', popular: false },
];

const features = [
  { icon: Zap,        title: 'Instant Activation',  description: 'Your service is activated instantly after payment confirmation.' },
  { icon: ShieldCheck,title: 'DDoS Protection',     description: 'Advanced protection to keep your bot online during attacks.' },
  { icon: LifeBuoy,   title: '24/7 Support',        description: 'Our expert team is always ready to help you with any issue.' },
  { icon: Clock,      title: '99.9% Uptime',        description: 'Guaranteed availability so your bot never goes offline.' },
];

const DiscordBotPricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cc = currencies[selectedCurrency as keyof typeof currencies];
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleOrder = (plan: typeof discordPlans[0]) => {
    addItem({
      id: `discord-${plan.name}`,
      name: plan.name,
      service: 'Discord Bot Hosting',
      priceUSD: plan.priceUSD,
      specs: [
        { label: 'CPU', value: plan.cpu },
        { label: 'RAM', value: plan.ram },
        { label: 'Storage', value: plan.storage },
      ],
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen">
      {/* Subtle grid */}
      {/* Top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
                Services
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Discord Bot Hosting
              </h1>
              <p className="text-gray-400 text-sm mt-3 max-w-md leading-relaxed">
                Reliable, affordable bot hosting with Node.js support, 24/7 uptime, and instant deployment.
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
                  className="absolute left-0 mt-1.5 w-40 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-xl p-1 z-20"
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
          </div>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {discordPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={`relative rounded-2xl border transition-all duration-300 flex flex-col group ${
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
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/[0.07] flex-shrink-0">
                    <img src={nodejsImg} alt="Node.js" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-500">Discord Bot Hosting</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toFixed(2)}</span>
                    <span className="text-sm text-gray-500">/mo</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-2.5">
                  {[
                    { icon: Cpu,       label: `${plan.cpu} CPU`          },
                    { icon: Zap,       label: `${plan.ram} RAM`          },
                    { icon: HardDrive, label: `${plan.storage} SSD`      },
                    { icon: Wifi,      label: 'Unlimited Bandwidth'      },
                    { icon: Clock,     label: '24/7 Uptime'              },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                      <Check size={13} className="text-blue-400 flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOrder(plan)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.08]'
                  }`}>
                  <ShoppingCart size={15} /> Order Now
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
              Why choose us
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Built for bots.</h2>
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

export default DiscordBotPricing;