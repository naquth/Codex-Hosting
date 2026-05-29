import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const orders = [
  { id: '#ORD-1042', user: 'john@example.com',  service: 'Discord Bot - Plus Plan',   type: 'Discord Bot', amount: '$0.84',  status: 'active',    date: '2025-06-01' },
  { id: '#ORD-1041', user: 'sarah@example.com', service: 'Minecraft SMP Pro',         type: 'Game Server', amount: '$41.99', status: 'active',    date: '2025-06-01' },
  { id: '#ORD-1040', user: 'mike@example.com',  service: 'VPS NL-INT-16GB',           type: 'VPS',         amount: '$97.99', status: 'pending',   date: '2025-05-28' },
  { id: '#ORD-1039', user: 'lisa@example.com',  service: 'Discord Bot - Elite Plan',  type: 'Discord Bot', amount: '$5.02',  status: 'active',    date: '2025-05-20' },
  { id: '#ORD-1038', user: 'tom@example.com',   service: 'VPS USA-AMD-08GB',          type: 'VPS',         amount: '$42.99', status: 'active',    date: '2025-05-15' },
  { id: '#ORD-1037', user: 'peter@example.com', service: 'Minecraft Survival',        type: 'Game Server', amount: '$88.99', status: 'pending',   date: '2025-05-10' },
  { id: '#ORD-1036', user: 'emma@example.com',  service: 'Minecraft GRASS PLAN',      type: 'Game Server', amount: '$13.99', status: 'active',    date: '2025-05-01' },
  { id: '#ORD-1035', user: 'anna@example.com',  service: 'Discord Bot - Lite Plan',   type: 'Discord Bot', amount: '$0.42',  status: 'cancelled', date: '2025-04-20' },
];

const statusBadge: Record<string, string> = {
  active:    'bg-green-500/10 text-green-400 border border-green-500/20',
  pending:   'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
};

const AdminOrders = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = orders.filter(o =>
    (o.id.toLowerCase().includes(search.toLowerCase()) ||
     o.user.toLowerCase().includes(search.toLowerCase()) ||
     o.service.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || o.status === filter)
  );

  const total = orders.reduce((s, o) => s + parseFloat(o.amount.replace('$', '')), 0);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-7">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Management</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto">
            <Download size={15} /> Export CSV
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders',   value: orders.length,                                             color: 'text-white'      },
            { label: 'Active',         value: orders.filter(o => o.status === 'active').length,          color: 'text-green-400'  },
            { label: 'Pending',        value: orders.filter(o => o.status === 'pending').length,         color: 'text-yellow-400' },
            { label: 'Total Revenue',  value: `$${total.toFixed(2)}`,                                    color: 'text-blue-400'   },
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
            <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/40 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all', 'active', 'pending', 'cancelled'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-red-600 text-white' : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
          {filtered.map((order, i) => (
            <div key={order.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-white/[0.02] transition-colors gap-3 ${
                i < filtered.length - 1 ? 'border-b border-white/[0.05]' : ''
              }`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0">
                  <Package size={15} className="text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{order.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{order.service}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{order.user} · {order.type} · {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto">
                <span className="text-base font-bold text-white">{order.amount}<span className="text-gray-500 text-xs font-normal">/mo</span></span>
                <button className="p-2 text-gray-600 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-600">
              <p className="text-sm">No orders found.</p>
            </div>
          )}
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
