import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Server, Play, Square, RotateCcw, ExternalLink,
  Search, Plus, Cpu, MemoryStick, HardDrive,
} from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const services = [
  { id: 1, name: 'Discord Bot - Starter', type: 'Bot Hosting',  status: 'active',    plan: 'Starter Plan',     expires: '2025-07-15', ram: '512MB', cpu: '50%',     disk: '5GB',  ipPort: 'panel.codex.host', created: '2025-01-15' },
  { id: 2, name: 'Minecraft SMP',         type: 'Game Server',  status: 'active',    plan: 'Pro Plan',         expires: '2025-08-01', ram: '4GB',   cpu: '200%',    disk: '20GB', ipPort: 'mc.myserver.net',  created: '2025-02-01' },
  { id: 3, name: 'VPS NL-01',             type: 'VPS',          status: 'suspended', plan: 'VPS Basic',        expires: '2025-06-01', ram: '2GB',   cpu: '2 vCores',disk: '40GB', ipPort: '185.123.45.67',    created: '2024-12-10' },
  { id: 4, name: 'Lavalink Node EU',      type: 'Lavalink',     status: 'pending',   plan: 'Lavalink Starter', expires: '2025-07-30', ram: '1GB',   cpu: '100%',    disk: '10GB', ipPort: 'lava.codex.host',  created: '2025-06-01' },
];

const statusStyle: Record<string, { badge: string; dot: string }> = {
  active:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',    dot: 'bg-green-400'  },
  suspended: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',          dot: 'bg-red-400'    },
  pending:   { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', dot: 'bg-yellow-400' },
};

const FILTERS = ['all', 'active', 'suspended', 'pending'];

const Services = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || s.status === filter)
  );

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">My Services</h1>
            <p className="text-gray-400 mt-1 text-sm">Manage and monitor all your hosted services.</p>
          </div>
          <Link
            to="/#pricing"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto"
          >
            <Plus size={16} /> Order New Service
          </Link>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-500 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          {/* Filter pills — scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-3">
          {filtered.map((svc, index) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6 hover:border-blue-500/30 transition-all duration-200"
            >
              {/* Top row: icon + name + status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 flex-shrink-0">
                    <Server size={18} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{svc.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{svc.plan} · {svc.type}</p>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">{svc.ipPort} · exp. {svc.expires}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 flex-shrink-0 ${statusStyle[svc.status].badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyle[svc.status].dot}`} />
                  {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                </span>
              </div>

              {/* Bottom row: resource badges + action button */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: MemoryStick, label: `${svc.ram} RAM`  },
                    { icon: Cpu,         label: `${svc.cpu} CPU`  },
                    { icon: HardDrive,   label: `${svc.disk} Disk`},
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1.5 rounded-lg">
                      <Icon size={12} className="text-blue-400 flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {svc.status === 'active' && (
                    <>
                      <button className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-colors border border-green-500/15" title="Start">
                        <Play size={14} />
                      </button>
                      <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/15" title="Stop">
                        <Square size={14} />
                      </button>
                      <button className="p-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl transition-colors border border-yellow-500/15" title="Restart">
                        <RotateCcw size={14} />
                      </button>
                    </>
                  )}
                  <a
                    href="https://panel.codex.host"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <ExternalLink size={13} /> Manage
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500 border border-white/[0.05] rounded-2xl">
              <Server size={40} className="mx-auto mb-4 opacity-20" />
              <p className="text-base">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Services;
