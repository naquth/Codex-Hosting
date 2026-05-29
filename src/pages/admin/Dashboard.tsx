import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Server, CreditCard, TicketIcon, TrendingUp,
  ArrowRight, ArrowUpRight, ArrowDownRight, Activity,
  CheckCircle, AlertCircle, Clock,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const stats = [
  { label: 'Total Users',       value: '1,284',  change: '+12%',  up: true,  icon: Users,      color: 'blue'   },
  { label: 'Active Services',   value: '3,471',  change: '+8%',   up: true,  icon: Server,     color: 'green'  },
  { label: 'Monthly Revenue',   value: '$8,421', change: '+23%',  up: true,  icon: CreditCard, color: 'yellow' },
  { label: 'Open Tickets',      value: '47',     change: '-5%',   up: false, icon: TicketIcon, color: 'purple' },
];

const recentOrders = [
  { id: '#ORD-1042', user: 'john@example.com',  service: 'Discord Bot - Plus Plan', amount: '$0.84', status: 'active',  date: '2 min ago'   },
  { id: '#ORD-1041', user: 'sarah@example.com', service: 'Minecraft - Pro Plan',    amount: '$41.99', status: 'active', date: '15 min ago'  },
  { id: '#ORD-1040', user: 'mike@example.com',  service: 'VPS NL-INT-16GB',         amount: '$97.99', status: 'pending', date: '1 hour ago'  },
  { id: '#ORD-1039', user: 'lisa@example.com',  service: 'Discord Bot - Lite Plan', amount: '$0.42', status: 'active',  date: '2 hours ago' },
  { id: '#ORD-1038', user: 'tom@example.com',   service: 'VPS USA-AMD-08GB',        amount: '$42.99', status: 'suspended', date: '3 hours ago' },
];

const recentTickets = [
  { id: '#87', user: 'john@example.com',  subject: 'Server keeps crashing',      priority: 'high',   status: 'open'     },
  { id: '#86', user: 'anna@example.com',  subject: 'Billing question',           priority: 'low',    status: 'answered' },
  { id: '#85', user: 'peter@example.com', subject: 'VPS SSH access issue',       priority: 'medium', status: 'open'     },
  { id: '#84', user: 'jane@example.com',  subject: 'How to install mods?',       priority: 'low',    status: 'closed'   },
];

const colorMap: Record<string, string> = {
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/15',
  green:  'bg-green-500/10 text-green-400 border-green-500/15',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/15',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/15',
};

const statusBadge: Record<string, string> = {
  active:    'bg-green-500/10 text-green-400 border border-green-500/20',
  pending:   'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  suspended: 'bg-red-500/10 text-red-400 border border-red-500/20',
  open:      'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  answered:  'bg-green-500/10 text-green-400 border border-green-500/20',
  closed:    'bg-white/[0.06] text-gray-400 border border-white/[0.08]',
};

const priorityColor: Record<string, string> = {
  high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400',
};

const AdminDashboard = () => (
  <AdminLayout>
    <div className="max-w-7xl mx-auto space-y-7">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Admin</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Administrator. Here is what is happening.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{s.label}</p>
                <p className="text-2xl font-bold text-white mt-1.5">{s.value}</p>
                <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${s.up ? 'text-green-400' : 'text-red-400'}`}>
                  {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {s.change} this month
                </div>
              </div>
              <div className={`p-2.5 rounded-xl border ${colorMap[s.color]}`}>
                <s.icon size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="lg:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue for 2025</p>
            </div>
            <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              +23% vs last year
            </span>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-2 h-32">
            {[65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 88, 100].map((h, i) => {
              const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-t-lg transition-all ${i === 11 ? 'bg-red-500' : 'bg-white/[0.08]'}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-gray-600">{months[i]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
        >
          <h2 className="text-base font-semibold text-white mb-5">System Status</h2>
          <div className="space-y-4">
            {[
              { label: 'Server Uptime',   value: '99.9%',  icon: Activity,   color: 'text-green-400'  },
              { label: 'Active Nodes',    value: '2 / 2',  icon: Server,     color: 'text-blue-400'   },
              { label: 'Pending Tickets', value: '47',     icon: TicketIcon, color: 'text-yellow-400' },
              { label: 'Pending Invoices',value: '$1,204', icon: CreditCard, color: 'text-purple-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <item.icon size={15} className={item.color} />
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders + Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{order.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{order.user}</p>
                  <p className="text-[11px] text-gray-600 truncate">{order.service}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">{order.amount}</p>
                  <p className="text-[11px] text-gray-600">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Recent Tickets</h2>
            <Link to="/admin/tickets" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white">{ticket.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge[ticket.status]}`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${priorityColor[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white mt-0.5 truncate">{ticket.subject}</p>
                  <p className="text-[11px] text-gray-600 truncate">{ticket.user}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {ticket.status === 'open' ? (
                    <AlertCircle size={15} className="text-yellow-400" />
                  ) : ticket.status === 'answered' ? (
                    <CheckCircle size={15} className="text-green-400" />
                  ) : (
                    <Clock size={15} className="text-gray-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  </AdminLayout>
);

export default AdminDashboard;
