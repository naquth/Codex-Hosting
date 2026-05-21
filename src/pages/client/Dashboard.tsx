import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, CreditCard, TicketIcon, TrendingUp, Activity, AlertCircle, CheckCircle, Clock, ArrowRight, Plus } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const stats = [
  { label: 'Active Services',   value: '3',      sub: '+1 this month',   icon: Server,      color: 'blue'   },
  { label: 'Pending Invoices',  value: '$12.47',  sub: 'Due in 5 days',   icon: CreditCard,  color: 'yellow' },
  { label: 'Open Tickets',      value: '1',      sub: 'Awaiting reply',  icon: TicketIcon,  color: 'purple' },
  { label: 'Uptime (30d)',      value: '99.9%',  sub: 'All systems up',  icon: TrendingUp,  color: 'green'  },
];

const services = [
  { name: 'Discord Bot - Starter', type: 'Bot Hosting',  status: 'active',    expires: '2025-07-15', ram: '512MB' },
  { name: 'Minecraft SMP',         type: 'Game Server',  status: 'active',    expires: '2025-08-01', ram: '4GB'   },
  { name: 'VPS NL-01',             type: 'VPS',          status: 'suspended', expires: '2025-06-01', ram: '2GB'   },
];

const activity = [
  { icon: CheckCircle, text: 'Invoice #1042 paid successfully',    time: '2 hours ago',  color: 'text-green-400'  },
  { icon: AlertCircle, text: 'VPS NL-01 has been suspended',       time: '1 day ago',    color: 'text-red-400'    },
  { icon: Activity,    text: 'Minecraft SMP restarted automatically', time: '3 days ago', color: 'text-blue-400'   },
  { icon: Clock,       text: 'Support ticket #87 closed',          time: '5 days ago',   color: 'text-gray-500'   },
];

const statusStyle: Record<string, string> = {
  active:    'bg-green-400/10 text-green-400 border border-green-400/20',
  suspended: 'bg-red-400/10 text-red-400 border border-red-400/20',
  pending:   'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
};

const iconColor: Record<string, string> = {
  blue:   'bg-blue-500/10 border-blue-500/15 text-blue-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/15 text-yellow-400',
  purple: 'bg-purple-500/10 border-purple-500/15 text-purple-400',
  green:  'bg-green-500/10 border-green-500/15 text-green-400',
};

const Dashboard = () => (
  <ClientLayout>
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Overview</span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Dashboard</h1>
          <p className="text-gray-500 text-xs mt-0.5">Welcome back, John.</p>
        </div>
        <Link to="/#pricing"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={14} /> New Service
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-500">{s.label}</p>
              <div className={`p-1.5 rounded-lg border ${iconColor[s.color]}`}>
                <s.icon size={13} />
              </div>
            </div>
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-gray-600 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Services + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="lg:col-span-2 bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">My Services</h2>
            <Link to="/client/services" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {services.map((svc) => (
              <div key={svc.name}
                className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05] hover:border-blue-500/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/15">
                    <Server size={13} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{svc.name}</p>
                    <p className="text-[11px] text-gray-600">{svc.type} · {svc.ram}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${statusStyle[svc.status]}`}>
                  {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
        >
          <h2 className="text-sm font-semibold text-white mb-4">Activity</h2>
          <div className="space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <item.icon size={14} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                <div>
                  <p className="text-xs text-gray-300 leading-snug">{item.text}</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
      >
        <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Order Service', href: '/#pricing',       icon: Plus       },
            { label: 'Pay Invoice',   href: '/client/billing', icon: CreditCard },
            { label: 'Open Ticket',   href: '/client/tickets', icon: TicketIcon },
            { label: 'View Status',   href: '/status',         icon: Activity   },
          ].map((a) => (
            <Link key={a.label} to={a.href}
              className="flex flex-col items-center gap-2 p-3.5 bg-white/[0.03] hover:bg-blue-600/[0.08] border border-white/[0.05] hover:border-blue-500/20 rounded-lg transition-all group">
              <a.icon size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-[11px] font-medium text-gray-500 group-hover:text-white transition-colors text-center">{a.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

    </div>
  </ClientLayout>
);

export default Dashboard;
