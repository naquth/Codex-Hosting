import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, ChevronDown, Cpu, MemoryStick, HardDrive, Wifi, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ClientLayout from '../../components/ClientLayout';
import USFlag from '../../icons/flags/USFlag';
import NetherlandsFlag from '../../icons/flags/NetherlandsFlag';

const currencies = {
  USD: { symbol: '$',  name: 'USD', rate: 1     },
  INR: { symbol: '₹', name: 'INR', rate: 83.5  },
  EUR: { symbol: '€', name: 'EUR', rate: 0.92  },
};

// ─── Discord Plans ────────────────────────────────────────────
const discordPlans = [
  { id: 'd-lite',  name: 'Lite Plan',  priceUSD: 0.42, cpu: '100%', ram: '512 MB', storage: '2 GB',  popular: false },
  { id: 'd-plus',  name: 'Plus Plan',  priceUSD: 0.84, cpu: '100%', ram: '1 GB',   storage: '5 GB',  popular: true  },
  { id: 'd-pro',   name: 'Pro Plan',   priceUSD: 1.68, cpu: '100%', ram: '2 GB',   storage: '15 GB', popular: false },
  { id: 'd-ultra', name: 'Ultra Plan', priceUSD: 3.35, cpu: '150%', ram: '4 GB',   storage: '20 GB', popular: false },
  { id: 'd-elite', name: 'Elite Plan', priceUSD: 5.02, cpu: '200%', ram: '6 GB',   storage: '30 GB', popular: false },
];

// ─── Minecraft Plans ──────────────────────────────────────────
const minecraftPlans = [
  { id: 'mc-1',  name: 'GRASS PLAN',    location: 'USA',         type: 'AMD',   ram: 2,  cpu: 100, ssd: 16,  priceUSD: 13.99 },
  { id: 'mc-2',  name: 'PLANK PLAN',    location: 'USA',         type: 'AMD',   ram: 4,  cpu: 150, ssd: 16,  priceUSD: 27.99 },
  { id: 'mc-3',  name: 'STONE PLAN',    location: 'USA',         type: 'AMD',   ram: 6,  cpu: 200, ssd: 24,  priceUSD: 41.99 },
  { id: 'mc-4',  name: 'IRON PLAN',     location: 'USA',         type: 'Intel', ram: 8,  cpu: 250, ssd: 32,  priceUSD: 55.99 },
  { id: 'mc-5',  name: 'GOLD PLAN',     location: 'USA',         type: 'Intel', ram: 10, cpu: 300, ssd: 48,  priceUSD: 66.99 },
  { id: 'mc-6',  name: 'DIAMOND PLAN',  location: 'USA',         type: 'Intel', ram: 12, cpu: 350, ssd: 48,  priceUSD: 88.99 },
  { id: 'mc-7',  name: 'WOOD PLAN',     location: 'Netherlands', type: 'AMD',   ram: 2,  cpu: 100, ssd: 20,  priceUSD: 14.99 },
  { id: 'mc-8',  name: 'COBBLE PLAN',   location: 'Netherlands', type: 'AMD',   ram: 4,  cpu: 150, ssd: 20,  priceUSD: 29.99 },
  { id: 'mc-9',  name: 'OBSIDIAN PLAN', location: 'Netherlands', type: 'Intel', ram: 8,  cpu: 250, ssd: 40,  priceUSD: 59.99 },
  { id: 'mc-10', name: 'EMERALD PLAN',  location: 'Netherlands', type: 'Intel', ram: 12, cpu: 350, ssd: 60,  priceUSD: 92.99 },
];

// ─── VPS Plans ────────────────────────────────────────────────
const vpsPlans = [
  { id: 'v-1',  name: 'USA-INT-08GB', location: 'USA',         type: 'Intel', cores: 6,  ram: 8,  ssd: 300,  priceUSD: 45.99  },
  { id: 'v-2',  name: 'USA-INT-16GB', location: 'USA',         type: 'Intel', cores: 8,  ram: 16, ssd: 600,  priceUSD: 90.99  },
  { id: 'v-3',  name: 'USA-AMD-08GB', location: 'USA',         type: 'AMD',   cores: 8,  ram: 8,  ssd: 256,  priceUSD: 42.99  },
  { id: 'v-4',  name: 'USA-AMD-16GB', location: 'USA',         type: 'AMD',   cores: 12, ram: 16, ssd: 512,  priceUSD: 85.99  },
  { id: 'v-5',  name: 'NL-INT-08GB',  location: 'Netherlands', type: 'Intel', cores: 6,  ram: 8,  ssd: 300,  priceUSD: 48.99  },
  { id: 'v-6',  name: 'NL-INT-16GB',  location: 'Netherlands', type: 'Intel', cores: 8,  ram: 16, ssd: 600,  priceUSD: 97.99  },
  { id: 'v-7',  name: 'NL-INT-32GB',  location: 'Netherlands', type: 'Intel', cores: 12, ram: 32, ssd: 1200, priceUSD: 195.99 },
  { id: 'v-8',  name: 'NL-AMD-08GB',  location: 'Netherlands', type: 'AMD',   cores: 8,  ram: 8,  ssd: 256,  priceUSD: 46.99  },
  { id: 'v-9',  name: 'NL-AMD-16GB',  location: 'Netherlands', type: 'AMD',   cores: 12, ram: 16, ssd: 512,  priceUSD: 93.99  },
  { id: 'v-10', name: 'NL-AMD-32GB',  location: 'Netherlands', type: 'AMD',   cores: 16, ram: 32, ssd: 1024, priceUSD: 187.99 },
];

const TABS = ['Discord Bot', 'Minecraft', 'VPS'] as const;
type Tab = typeof TABS[number];

// ─── Component ────────────────────────────────────────────────
const ClientPricing = () => {
  const [activeTab, setActiveTab]   = useState<Tab>('Discord Bot');
  const [currency, setCurrency]     = useState<keyof typeof currencies>('USD');
  const [currencyOpen, setCurrencyOpen] = useState(false);

  // Minecraft filters
  const [mcLocation, setMcLocation] = useState<'USA' | 'Netherlands'>('USA');
  const [mcType, setMcType]         = useState<'AMD' | 'Intel'>('AMD');

  // VPS filters
  const [vpsLocation, setVpsLocation] = useState<'USA' | 'Netherlands'>('USA');
  const [vpsType, setVpsType]         = useState<'Intel' | 'AMD'>('Intel');

  const { addItem } = useCart();
  const navigate    = useNavigate();
  const cc          = currencies[currency];

  const handleOrder = (id: string, name: string, service: string, priceUSD: number, specs: { label: string; value: string }[]) => {
    addItem({ id, name, service, priceUSD, specs });
    navigate('/client/cart');
  };

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
      }`}
    >
      {children}
    </button>
  );

  const filteredMc  = minecraftPlans.filter(p => p.location === mcLocation && p.type === mcType);
  const filteredVps = vpsPlans.filter(p => p.location === vpsLocation && p.type === vpsType);

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Order New Service</h1>
            <p className="text-gray-400 mt-1 text-sm">Choose a plan and add it to your cart to get started.</p>
          </div>

          {/* Currency selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.07] transition-colors"
            >
              {cc.symbol} {currency}
              <ChevronDown size={14} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {currencyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute left-0 mt-1.5 w-36 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-xl p-1 z-20"
                >
                  {Object.entries(currencies).map(([code, { symbol }]) => (
                    <button
                      key={code}
                      onClick={() => { setCurrency(code as keyof typeof currencies); setCurrencyOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                        currency === code ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      {symbol} {code}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-1.5"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* ── Discord Bot Plans ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'Discord Bot' && (
            <motion.div
              key="discord"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {discordPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className={`relative rounded-2xl border flex flex-col transition-all duration-200 ${
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
                    <h3 className="text-sm font-semibold text-white mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-3xl font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toLocaleString('en', { maximumFractionDigits: 2 })}</span>
                      <span className="text-sm text-gray-500">/mo</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { icon: Cpu,        label: `${plan.cpu} CPU`      },
                        { icon: MemoryStick,label: `${plan.ram} RAM`      },
                        { icon: HardDrive,  label: `${plan.storage} SSD`  },
                        { icon: Wifi,       label: 'Unlimited Bandwidth'  },
                        { icon: Clock,      label: '99.9% Uptime'         },
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
                      onClick={() => handleOrder(plan.id, plan.name, 'Discord Bot Hosting', plan.priceUSD, [
                        { label: 'CPU',     value: plan.cpu     },
                        { label: 'RAM',     value: plan.ram     },
                        { label: 'Storage', value: plan.storage },
                      ])}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-white/[0.06] hover:bg-white/[0.10] text-white border border-white/[0.08]'
                      }`}
                    >
                      <ShoppingCart size={15} /> Order Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── Minecraft Plans ── */}
          {activeTab === 'Minecraft' && (
            <motion.div
              key="minecraft"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">1. Hardware</p>
                  <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
                    <FilterBtn active={mcType === 'AMD'}   onClick={() => setMcType('AMD')}>AMD</FilterBtn>
                    <FilterBtn active={mcType === 'Intel'} onClick={() => setMcType('Intel')}>Intel</FilterBtn>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">2. Location</p>
                  <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
                    <FilterBtn active={mcLocation === 'USA'} onClick={() => setMcLocation('USA')}>
                      <USFlag className="w-4 h-3 rounded-sm" /> USA
                    </FilterBtn>
                    <FilterBtn active={mcLocation === 'Netherlands'} onClick={() => setMcLocation('Netherlands')}>
                      <NetherlandsFlag className="w-4 h-3 rounded-sm" /> Netherlands
                    </FilterBtn>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMc.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {plan.location === 'USA'
                        ? <USFlag className="w-5 h-3.5 rounded-sm" />
                        : <NetherlandsFlag className="w-5 h-3.5 rounded-sm" />}
                      <h3 className="text-sm font-bold text-white tracking-wide">{plan.name}</h3>
                    </div>
                    <div className="space-y-2 mb-4 flex-grow">
                      {[
                        { label: `${plan.ram} GB RAM`  },
                        { label: `${plan.cpu}% CPU`    },
                        { label: `${plan.ssd} GB SSD`  },
                        { label: 'DDoS Protection'     },
                      ].map(({ label }) => (
                        <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check size={12} className="text-blue-400 flex-shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                      <div>
                        <span className="text-2xl font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toLocaleString('en', { maximumFractionDigits: 2 })}</span>
                        <span className="text-xs text-gray-500">/mo</span>
                      </div>
                      <button
                        onClick={() => handleOrder(plan.id, plan.name, 'Minecraft Hosting', plan.priceUSD, [
                          { label: 'RAM',      value: `${plan.ram} GB`  },
                          { label: 'CPU',      value: `${plan.cpu}%`    },
                          { label: 'SSD',      value: `${plan.ssd} GB`  },
                          { label: 'Location', value: plan.location      },
                        ])}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                      >
                        <ShoppingCart size={13} /> Order Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── VPS Plans ── */}
          {activeTab === 'VPS' && (
            <motion.div
              key="vps"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">1. Location</p>
                  <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
                    <FilterBtn active={vpsLocation === 'USA'} onClick={() => setVpsLocation('USA')}>
                      <USFlag className="w-4 h-3 rounded-sm" /> USA
                    </FilterBtn>
                    <FilterBtn active={vpsLocation === 'Netherlands'} onClick={() => setVpsLocation('Netherlands')}>
                      <NetherlandsFlag className="w-4 h-3 rounded-sm" /> Netherlands
                    </FilterBtn>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">2. CPU Type</p>
                  <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
                    <FilterBtn active={vpsType === 'Intel'} onClick={() => setVpsType('Intel')}>Intel</FilterBtn>
                    <FilterBtn active={vpsType === 'AMD'}   onClick={() => setVpsType('AMD')}>AMD</FilterBtn>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredVps.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-blue-500/30 transition-all"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{plan.type} · {plan.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {[
                        { icon: Cpu,         label: `${plan.cores} vCores`       },
                        { icon: MemoryStick, label: `${plan.ram} GB RAM`         },
                        { icon: HardDrive,   label: `${plan.ssd} GB NVMe SSD`   },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <Check size={12} className="text-blue-400" />
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toLocaleString('en', { maximumFractionDigits: 2 })}</p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                      <button
                        onClick={() => handleOrder(plan.id, plan.name, 'VPS Hosting', plan.priceUSD, [
                          { label: 'vCores',   value: `${plan.cores}`         },
                          { label: 'RAM',      value: `${plan.ram} GB`        },
                          { label: 'SSD',      value: `${plan.ssd} GB NVMe`  },
                          { label: 'Location', value: plan.location            },
                        ])}
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                      >
                        <ShoppingCart size={13} /> Order Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </ClientLayout>
  );
};

export default ClientPricing;
