import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const invoices = [
  { id: '#INV-1042', user: 'john@example.com',  service: 'Discord Bot - Plus Plan',  amount: '$0.84',  due: '2025-07-01', status: 'paid'    },
  { id: '#INV-1041', user: 'sarah@example.com', service: 'Minecraft SMP Pro',        amount: '$41.99', due: '2025-07-01', status: 'unpaid'  },
  { id: '#INV-1040', user: 'mike@example.com',  service: 'VPS NL-INT-16GB',          amount: '$97.99', due: '2025-06-01', status: 'overdue' },
  { id: '#INV-1039', user: 'lisa@example.com',  service: 'Discord Bot - Elite Plan', amount: '$5.02',  due: '2025-06-15', status: 'paid'    },
  { id: '#INV-1038', user: 'tom@example.com',   service: 'VPS USA-AMD-08GB',         amount: '$42.99', due: '2025-07-05', status: 'paid'    },
  { id: '#INV-1037', user: 'peter@example.com', service: 'Minecraft Survival',       amount: '$88.99', due: '2025-06-20', status: 'unpaid'  },
  { id: '#INV-1036', user: 'emma@example.com',  service: 'Minecraft GRASS PLAN',     amount: '$13.99', due: '2025-07-01', status: 'paid'    },
];

const statusCfg: Record<string, { badge: string; icon: typeof CheckCircle; label: string }> = {
  paid:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',    icon: CheckCircle, label: 'Paid'    },
  unpaid:  { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', icon: Clock,       label: 'Unpaid'  },
  overdue: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',          icon: XCircle,     label: 'Overdue' },
};

const AdminInvoices = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = invoices.filter(inv =>
    (inv.id.toLowerCase().includes(search.toLowerCase()) ||
     inv.user.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || inv.status === filter)
  );

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + parseFloat(i.amount.replace('$', '')), 0);
  const totalDue     = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + parseFloat(i.amount.replace('$', '')), 0);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-7">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Finance</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Invoices</h1>
            <p className="text-gray-500 text-sm mt-1">{invoices.length} total invoices</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto">
            <Download size={15} /> Export
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total',       value: invoices.length,                                           color: 'text-white'      },
            { label: 'Paid',        value: invoices.filter(i => i.status === 'paid').length,          color: 'text-green-400'  },
            { label: 'Outstanding', value: `$${totalDue.toFixed(2)}`,                                 color: 'text-yellow-400' },
            { label: 'Collected',   value: `$${totalRevenue.toFixed(2)}`,                             color: 'text-blue-400'   },
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
            <input type="text" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/40 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all', 'paid', 'unpaid', 'overdue'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-red-600 text-white' : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Invoices list */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
          {filtered.map((inv, i) => {
            const S = statusCfg[inv.status];
            return (
              <div key={inv.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-white/[0.02] transition-colors gap-3 ${
                  i < filtered.length - 1 ? 'border-b border-white/[0.05]' : ''
                }`}>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{inv.id}</span>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${S.badge}`}>
                      <S.icon size={10} /> {S.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{inv.service}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{inv.user} · Due: {inv.due}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto">
                  <span className="text-base font-bold text-white">{inv.amount}</span>
                  {inv.status !== 'paid' && (
                    <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">
                      Mark Paid
                    </button>
                  )}
                  <button className="p-2 text-gray-600 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-600">
              <p className="text-sm">No invoices found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvoices;
