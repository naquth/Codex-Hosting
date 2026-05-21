import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Server, Play, Square, RotateCcw, ExternalLink,
  Search, Filter, Plus, Cpu, MemoryStick, HardDrive,
} from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const services = [
  { id: 1, name: 'Discord Bot - Starter', type: 'Bot Hosting',  status: 'active',    plan: 'Starter Plan',     expires: '2025-07-15', ram: '512MB', cpu: '50%',    disk: '5GB',  ipPort: 'panel.codex.host:25565', created: '2025-01-15' },
  { id: 2, name: 'Minecraft SMP',         type: 'Game Server',  status: 'active',    plan: 'Pro Plan',         expires: '2025-08-01', ram: '4GB',   cpu: '200%',   disk: '20GB', ipPort: 'mc.myserver.net:25565',  created: '2025-02-01' },
  { id: 3, name: 'VPS NL-01',             type: 'VPS',          status: 'suspended', plan: 'VPS Basic',        expires: '2025-06-01', ram: '2GB',   cpu: '2 vCores',disk: '40GB', ipPort: '185.123.45.67',         created: '2024-12-10' },
  { id: 4, name: 'Lavalink Node EU',      type: 'Lavalink',     status: 'pending',   plan: 'Lavalink Starter', expires: '2025-07-30', ram: '1GB',   cpu: '100%',   disk: '10GB', ipPort: 'lava.codex.host:2333',   created: '2025-06-01' },
];

const statusStyle: Record<string, { badge: string; dot: string }> = {
  active:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',    dot: 'bg-green-400'  },
  suspended: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',          dot: 'bg-red-400'    },
  pending:   { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', dot: 'bg-yellow-400' },
};

const Services = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">My Services</h1>
            <p className="text-gray-400 mt-1">Manage and monitor all your hosted services.</p>
          </div>
          <Link
            to="/#pricing"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            <Plus size={16} />
            Order New Service
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-500 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            {['all', 'active', 'suspended', 'pending'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white hover:border-white/[0.14]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-4">
          {filtered.map((svc, index) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                {/* Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mt-0.5">
                    <Server size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white">{svc.name}</h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyle[svc.status].badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle[svc.status].dot}`} />
                        {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{svc.plan} · {svc.type}</p>
                    <p className="text-xs text-gray-600 mt-1">IP/Host: {svc.ipPort} · Expires: {svc.expires}</p>
                  </div>
                </div>

                {/* Resource badges */}
                <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                  {[
                    { icon: MemoryStick, label: `${svc.ram} RAM`  },
                    { icon: Cpu,         label: `${svc.cpu} CPU`  },
                    { icon: HardDrive,   label: `${svc.disk} Disk`},
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-gray-400 bg-white/[0.04] border border-white/[0.07] px-3 py-2 rounded-lg">
                      <Icon size={14} className="text-blue-400" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {svc.status === 'active' && (
                    <>
                      <button className="p-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl transition-colors border border-green-500/15" title="Start">
                        <Play size={16} />
                      </button>
                      <button className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/15" title="Stop">
                        <Square size={16} />
                      </button>
                      <button className="p-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl transition-colors border border-yellow-500/15" title="Restart">
                        <RotateCcw size={16} />
                      </button>
                    </>
                  )}
                  <a
                    href="https://panel.codex.host"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} />
                    Manage
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500 border border-white/[0.05] rounded-2xl">
              <Server size={44} className="mx-auto mb-4 opacity-20" />
              <p className="text-base">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Services;
