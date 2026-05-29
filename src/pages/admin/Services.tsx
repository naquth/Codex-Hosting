import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Server, Play, Square, RotateCcw, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const services = [
  { id: 1, user: 'john@example.com',  name: 'Discord Bot - Plus Plan',   type: 'Discord Bot', status: 'active',    ram: '1 GB',   cpu: '100%', created: '2025-01-15', expires: '2025-07-15', revenue: '$0.84/mo'  },
  { id: 2, user: 'sarah@example.com', name: 'Minecraft SMP',              type: 'Game Server', status: 'active',    ram: '6 GB',   cpu: '200%', created: '2025-02-01', expires: '2025-08-01', revenue: '$41.99/mo' },
  { id: 3, user: 'mike@example.com',  name: 'VPS NL-INT-16GB',            type: 'VPS',         status: 'suspended', ram: '16 GB',  cpu: '8c',   created: '2024-12-10', expires: '2025-06-01', revenue: '$97.99/mo' },
  { id: 4, user: 'lisa@example.com',  name: 'Discord Bot - Elite Plan',   type: 'Discord Bot', status: 'active',    ram: '6 GB',   cpu: '200%', created: '2024-11-20', expires: '2025-11-20', revenue: '$5.02/mo'  },
  { id: 5, user: 'tom@example.com',   name: 'VPS USA-AMD-08GB',           type: 'VPS',         status: 'active',    ram: '8 GB',   cpu: '8c',   created: '2025-03-05', expires: '2025-09-05', revenue: '$42.99/mo' },
  { id: 6, user: 'peter@example.com', name: 'Minecraft Survival',         type: 'Game Server', status: 'pending',   ram: '12 GB',  cpu: '350%', created: '2025-05-20', expires: '2025-06-20', revenue: '$88.99/mo' },
];

const statusBadge: Record<string, { badge: string; dot: string }> = {
  active:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',    dot: 'bg-green-400'  },
  suspended: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',          dot: 'bg-red-400'    },
  pending:   { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', dot: 'bg-yellow-400' },
};

const AdminServices = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = services.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.user.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || s.status === filter)
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-7">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Management</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Services</h1>
            <p className="text-gray-500 text-sm mt-1">{services.length} total services</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total',     value: services.length,                                           color: 'text-white'      },
            { label: 'Active',    value: services.filter(s => s.status === 'active').length,        color: 'text-green-400'  },
            { label: 'Suspended', value: services.filter(s => s.status === 'suspended').length,     color: 'text-red-400'    },
            { label: 'Pending',   value: services.filter(s => s.status === 'pending').length,       color: 'text-yellow-400' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-5">
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/40 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all','active','suspended','pending'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-red-600 text-white' : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Services list */}
        <div className="space-y-3">
          {filtered.map((svc, i) => {
            const S = statusBadge[svc.status];
            return (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-5 hover:border-red-500/20 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0">
                      <Server size={17} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-white">{svc.name}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                          <span className={`w-1 h-1 rounded-full ${S.dot}`} />
                          {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{svc.type} · {svc.user}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">RAM: {svc.ram} · CPU: {svc.cpu} · Expires: {svc.expires}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-white hidden sm:block">{svc.revenue}</span>
                    {svc.status === 'active' && (
                      <>
                        <button className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl border border-green-500/15 transition-colors" title="Start"><Play size={13} /></button>
                        <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/15 transition-colors" title="Stop"><Square size={13} /></button>
                        <button className="p-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-xl border border-yellow-500/15 transition-colors" title="Restart"><RotateCcw size={13} /></button>
                      </>
                    )}
                    <button className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/15 transition-colors" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-600 border border-white/[0.05] rounded-2xl">
              <p className="text-sm">No services found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
