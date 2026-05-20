import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Shield, Check, ChevronDown } from 'lucide-react';
import minecraftLogo from '@/assets/minecraft.png';
import USFlag from '@/icons/flags/USFlag';
import NetherlandsFlag from '@/icons/flags/NetherlandsFlag';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 },
};

const gamePlans = [
  { id: 1,  name: 'GRASS PLAN',    location: 'USA',         planType: 'Ampere', ram: 2,  cpu: 100, ssd: 16, priceUSD: 13.99 },
  { id: 2,  name: 'PLANK PLAN',    location: 'USA',         planType: 'Ampere', ram: 4,  cpu: 150, ssd: 16, priceUSD: 27.99 },
  { id: 3,  name: 'STONE PLAN',    location: 'USA',         planType: 'Ampere', ram: 6,  cpu: 200, ssd: 24, priceUSD: 41.99 },
  { id: 4,  name: 'IRON PLAN',     location: 'USA',         planType: 'Intel',  ram: 8,  cpu: 250, ssd: 32, priceUSD: 55.99 },
  { id: 5,  name: 'GOLD PLAN',     location: 'USA',         planType: 'Intel',  ram: 10, cpu: 300, ssd: 48, priceUSD: 66.99 },
  { id: 6,  name: 'DIAMOND PLAN',  location: 'USA',         planType: 'Intel',  ram: 12, cpu: 350, ssd: 48, priceUSD: 88.99 },
  { id: 7,  name: 'WOOD PLAN',     location: 'Netherlands', planType: 'Ampere', ram: 2,  cpu: 100, ssd: 20, priceUSD: 14.99 },
  { id: 8,  name: 'COBBLE PLAN',   location: 'Netherlands', planType: 'Ampere', ram: 4,  cpu: 150, ssd: 20, priceUSD: 29.99 },
  { id: 9,  name: 'OBSIDIAN PLAN', location: 'Netherlands', planType: 'Intel',  ram: 8,  cpu: 250, ssd: 40, priceUSD: 59.99 },
  { id: 10, name: 'EMERALD PLAN',  location: 'Netherlands', planType: 'Intel',  ram: 12, cpu: 350, ssd: 60, priceUSD: 92.99 },
];

const MinecraftPricing = () => {
  const [planType, setPlanType] = useState('Ampere');
  const [location, setLocation] = useState('USA');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cc = currencies[selectedCurrency as keyof typeof currencies];
  const filtered = gamePlans.filter(p => p.location === location && p.planType === planType);

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 grid-overlay pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Services</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Minecraft Hosting</h1>
            <p className="text-gray-400 text-sm mt-3 max-w-md leading-relaxed">
              High-performance game servers optimised for Minecraft. Choose your region and hardware.
            </p>
          </div>
          {/* Currency */}
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
                  <button key={code} onClick={() => { setSelectedCurrency(code); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedCurrency === code ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:bg-white/[0.05]'}`}>
                    {symbol} {code}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
          {/* Plan type */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">1. Hardware</p>
            <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
              <FilterBtn active={planType === 'Ampere'} onClick={() => setPlanType('Ampere')}>Ampere Altra</FilterBtn>
              <FilterBtn active={planType === 'Intel'} onClick={() => setPlanType('Intel')}>Intel Xeon</FilterBtn>
            </div>
          </div>
          {/* Location */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">2. Location</p>
            <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
              <FilterBtn active={location === 'USA'} onClick={() => setLocation('USA')}>
                <USFlag className="w-4 h-3 rounded-sm" /> USA
              </FilterBtn>
              <FilterBtn active={location === 'Netherlands'} onClick={() => setLocation('Netherlands')}>
                <NetherlandsFlag className="w-4 h-3 rounded-sm" /> Netherlands
              </FilterBtn>
            </div>
          </div>
        </motion.div>

        {/* Software badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl w-fit"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/[0.07]">
            <img src={minecraftLogo} alt="Minecraft" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white flex items-center gap-2">
              Minecraft
              <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">POPULAR</span>
            </p>
            <p className="text-xs text-gray-500">Starting at {cc.symbol}{(gamePlans[0].priceUSD * cc.rate).toFixed(2)}/mo</p>
          </div>
        </motion.div>

        {/* Plan cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location}-${planType}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filtered.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  {plan.location === 'USA'
                    ? <USFlag className="w-5 h-3.5 rounded-sm" />
                    : <NetherlandsFlag className="w-5 h-3.5 rounded-sm" />}
                  <h3 className="text-sm font-bold text-white tracking-wide">{plan.name}</h3>
                </div>

                <div className="space-y-2 mb-5 flex-grow">
                  {[
                    { icon: MemoryStick, label: `${plan.ram} GB RAM` },
                    { icon: Cpu,         label: `${plan.cpu}% CPU`   },
                    { icon: HardDrive,   label: `${plan.ssd} GB SSD` },
                    { icon: Shield,      label: 'DDoS Protection'    },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                      <Check size={12} className="text-blue-400 flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <div>
                    <span className="text-2xl font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toFixed(2)}</span>
                    <span className="text-xs text-gray-500">/mo</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-14 text-gray-600 border border-white/[0.05] rounded-2xl">
                No plans available for this selection.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinecraftPricing;
