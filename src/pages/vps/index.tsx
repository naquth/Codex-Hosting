import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, ChevronLeft, ChevronRight, ChevronDown, Check, Monitor } from 'lucide-react';
import ubuntuLogo  from '@/assets/ubuntu.png';
import windowsLogo from '@/assets/windows.png';
import fedoraLogo  from '@/assets/fedora.png';
import debianLogo  from '@/assets/debian.png';
import kaliLogo    from '@/assets/kali.png';
import USFlag from '@/icons/flags/USFlag';
import NetherlandsFlag from '@/icons/flags/NetherlandsFlag';

const currencies = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 },
};

const vpsPlans = [
  { id: 4,  name: 'USA-INT-08GB', location: 'USA',         cpuType: 'Intel',  cores: 6,  ram: 8,  ssd: 300,  priceUSD: 45.99  },
  { id: 5,  name: 'USA-INT-16GB', location: 'USA',         cpuType: 'Intel',  cores: 8,  ram: 16, ssd: 600,  priceUSD: 90.99  },
  { id: 6,  name: 'USA-AMD-08GB', location: 'USA',         cpuType: 'AMD',    cores: 8,  ram: 8,  ssd: 256,  priceUSD: 42.99  },
  { id: 7,  name: 'USA-AMD-16GB', location: 'USA',         cpuType: 'AMD',    cores: 12, ram: 16, ssd: 512,  priceUSD: 85.99  },
  { id: 10, name: 'NL-INT-08GB',  location: 'Netherlands', cpuType: 'Intel',  cores: 6,  ram: 8,  ssd: 300,  priceUSD: 48.99  },
  { id: 11, name: 'NL-INT-16GB',  location: 'Netherlands', cpuType: 'Intel',  cores: 8,  ram: 16, ssd: 600,  priceUSD: 97.99  },
  { id: 12, name: 'NL-INT-32GB',  location: 'Netherlands', cpuType: 'Intel',  cores: 12, ram: 32, ssd: 1200, priceUSD: 195.99 },
  { id: 13, name: 'NL-AMD-08GB',  location: 'Netherlands', cpuType: 'AMD',    cores: 8,  ram: 8,  ssd: 256,  priceUSD: 46.99  },
  { id: 14, name: 'NL-AMD-16GB',  location: 'Netherlands', cpuType: 'AMD',    cores: 12, ram: 16, ssd: 512,  priceUSD: 93.99  },
  { id: 15, name: 'NL-AMD-32GB',  location: 'Netherlands', cpuType: 'AMD',    cores: 16, ram: 32, ssd: 1024, priceUSD: 187.99 },
];

const operatingSystems = [
  { name: 'Ubuntu',     logo: ubuntuLogo  },
  { name: 'Windows',    logo: windowsLogo },
  { name: 'Fedora',     logo: fedoraLogo  },
  { name: 'Debian',     logo: debianLogo  },
  { name: 'Kali Linux', logo: kaliLogo    },
];

const PLANS_PER_PAGE = 4;

const VpsPricing = () => {
  const [location, setLocation]           = useState('USA');
  const [cpuType, setCpuType]             = useState('Intel');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage]     = useState(1);
  const cc = currencies[selectedCurrency as keyof typeof currencies];

  const filtered = vpsPlans.filter(p => p.location === location && p.cpuType === cpuType);
  const totalPages = Math.ceil(filtered.length / PLANS_PER_PAGE);
  const current = filtered.slice((currentPage - 1) * PLANS_PER_PAGE, currentPage * PLANS_PER_PAGE);

  const resetPage = () => setCurrentPage(1);
  const setLoc = (l: string) => { setLocation(l); resetPage(); };
  const setCpu = (c: string) => { setCpuType(c); resetPage(); };

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">VPS Hosting</h1>
            <p className="text-gray-400 text-sm mt-3 max-w-md leading-relaxed">
              Full root access, NVMe SSD, and 99.9% uptime SLA. Scale on demand.
            </p>
          </div>
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
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">1. Location</p>
            <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
              <FilterBtn active={location === 'USA'} onClick={() => setLoc('USA')}>
                <USFlag className="w-4 h-3 rounded-sm" /> USA
              </FilterBtn>
              <FilterBtn active={location === 'Netherlands'} onClick={() => setLoc('Netherlands')}>
                <NetherlandsFlag className="w-4 h-3 rounded-sm" /> Netherlands
              </FilterBtn>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">2. CPU Type</p>
            <div className="flex gap-1 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1">
              <FilterBtn active={cpuType === 'Intel'}  onClick={() => setCpu('Intel')}>Intel</FilterBtn>
              <FilterBtn active={cpuType === 'AMD'}    onClick={() => setCpu('AMD')}>AMD</FilterBtn>
            </div>
          </div>
        </motion.div>

        {/* Plans list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location}-${cpuType}-${currentPage}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 mb-6"
          >
            {current.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.07] rounded-xl px-5 py-4 hover:border-blue-500/30 transition-all"
              >
                <div>
                  <h3 className="text-sm font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{plan.cpuType} · {plan.location}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  {[
                    { icon: Cpu,         label: `${plan.cores} vCores`     },
                    { icon: MemoryStick, label: `${plan.ram} GB RAM`       },
                    { icon: HardDrive,   label: `${plan.ssd} GB NVMe SSD` },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Check size={12} className="text-blue-400" />
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{cc.symbol}{(plan.priceUSD * cc.rate).toFixed(2)}</p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
            {current.length === 0 && (
              <div className="text-center py-14 text-gray-600 border border-white/[0.05] rounded-2xl">
                No plans available for this selection.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-20">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-gray-400 hover:text-white transition-colors disabled:opacity-30">
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white/[0.04] border border-white/[0.07] text-gray-400 hover:text-white'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-gray-400 hover:text-white transition-colors disabled:opacity-30">
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* OS Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Operating Systems</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">Your choice of OS.</h2>
            <p className="text-gray-400 text-sm mt-2">Deploy with any popular Linux distribution or Windows.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {operatingSystems.map((os, i) => (
              <motion.div
                key={os.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/30 rounded-xl px-4 py-3 transition-colors cursor-pointer"
              >
                <img src={os.logo} alt={os.name} className="w-7 h-7 object-contain" />
                <span className="text-sm font-medium text-gray-300">{os.name}</span>
                <Monitor size={13} className="text-gray-600 ml-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default VpsPricing;
