import { motion } from 'framer-motion';
import { TrendingUp, Users, Server, CreditCard, ArrowUpRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const monthlyRevenue = [
  { month: 'Jan', value: 5420 },
  { month: 'Feb', value: 6100 },
  { month: 'Mar', value: 5800 },
  { month: 'Apr', value: 7200 },
  { month: 'May', value: 6900 },
  { month: 'Jun', value: 8421 },
];

const serviceBreakdown = [
  { name: 'Discord Bot',  count: 842,  revenue: '$1,240', percent: 35, color: 'bg-indigo-500' },
  { name: 'Game Servers', count: 1204, revenue: '$4,120', percent: 50, color: 'bg-green-500'  },
  { name: 'VPS',          count: 368,  revenue: '$2,840', percent: 15, color: 'bg-purple-500' },
];

const topCountries = [
  { country: 'Indonesia',     users: 412, flag: 'ID' },
  { country: 'United States', users: 289, flag: 'US' },
  { country: 'India',         users: 201, flag: 'IN' },
  { country: 'Germany',       users: 134, flag: 'DE' },
  { country: 'Netherlands',   users: 98,  flag: 'NL' },
];

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value));

const AdminAnalytics = () => (
  <AdminLayout>
    <div className="max-w-7xl mx-auto space-y-7">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Insights</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Business performance overview</p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue',   value: '$8,421',  change: '+23%', icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/15' },
          { label: 'New Users (30d)',   value: '142',     change: '+18%', icon: Users,      color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/15'   },
          { label: 'Active Services',   value: '3,471',   change: '+8%',  icon: Server,     color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/15' },
          { label: 'Avg Revenue/User',  value: '$6.56',   change: '+5%',  icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/15' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{s.label}</p>
                <p className="text-2xl font-bold text-white mt-1.5">{s.value}</p>
                <div className="flex items-center gap-1 mt-1.5 text-xs font-medium text-green-400">
                  <ArrowUpRight size={13} /> {s.change} this month
                </div>
              </div>
              <div className={`p-2.5 rounded-xl border ${s.bg}`}>
                <s.icon size={18} className={s.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Revenue chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Revenue Trend</h2>
          <p className="text-xs text-gray-500 mb-6">Last 6 months</p>
          <div className="flex items-end gap-3 h-40">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-gray-500 font-medium">${(m.value / 1000).toFixed(1)}k</span>
                <div className="w-full rounded-t-lg bg-white/[0.06] overflow-hidden" style={{ height: '100px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.value / maxRevenue) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                    className={`w-full rounded-t-lg ${i === monthlyRevenue.length - 1 ? 'bg-red-500' : 'bg-blue-500/60'}`}
                    style={{ marginTop: 'auto' }}
                  />
                </div>
                <span className="text-[11px] text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Service Breakdown</h2>
          <p className="text-xs text-gray-500 mb-6">By active service count</p>
          <div className="space-y-5">
            {serviceBreakdown.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{s.count} services</span>
                    <span className="text-sm font-bold text-white">{s.revenue}</span>
                  </div>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.percent}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                    className={`h-full rounded-full ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top countries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Top Countries</h2>
          <p className="text-xs text-gray-500 mb-6">Users by location</p>
          <div className="space-y-3">
            {topCountries.map((c, i) => (
              <div key={c.country} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                <span className="text-lg w-8 text-center flex-shrink-0">{c.flag === 'ID' ? '🇮🇩' : c.flag === 'US' ? '🇺🇸' : c.flag === 'IN' ? '🇮🇳' : c.flag === 'DE' ? '🇩🇪' : '🇳🇱'}</span>
                <span className="text-sm text-white flex-1">{c.country}</span>
                <span className="text-sm font-bold text-white">{c.users}</span>
                <span className="text-xs text-gray-500">users</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Quick Stats</h2>
          <p className="text-xs text-gray-500 mb-6">Today vs yesterday</p>
          <div className="space-y-3">
            {[
              { label: 'New Signups',      today: 12,   yesterday: 8,   unit: 'users'    },
              { label: 'New Orders',       today: 7,    yesterday: 11,  unit: 'orders'   },
              { label: 'Revenue',          today: 342,  yesterday: 280, unit: '$'        },
              { label: 'Support Tickets',  today: 5,    yesterday: 9,   unit: 'tickets'  },
              { label: 'Services Deployed',today: 7,    yesterday: 5,   unit: 'services' },
            ].map((item) => {
              const up = item.today >= item.yesterday;
              const pct = Math.abs(Math.round(((item.today - item.yesterday) / item.yesterday) * 100));
              return (
                <div key={item.label} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                  <span className="text-sm text-gray-400">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {item.unit === '$' ? `$${item.today}` : `${item.today} ${item.unit}`}
                    </span>
                    <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${up ? 'text-green-400' : 'text-red-400'}`}>
                      <ArrowUpRight size={12} className={up ? '' : 'rotate-180'} />
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  </AdminLayout>
);

export default AdminAnalytics;
