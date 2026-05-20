import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Server,
  CreditCard,
  TicketIcon,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const stats = [
  {
    label: 'Active Services',
    value: '3',
    change: '+1 this month',
    icon: Server,
    color: 'blue',
  },
  {
    label: 'Pending Invoices',
    value: '$12.47',
    change: 'Due in 5 days',
    icon: CreditCard,
    color: 'yellow',
  },
  {
    label: 'Open Tickets',
    value: '1',
    change: 'Awaiting reply',
    icon: TicketIcon,
    color: 'purple',
  },
  {
    label: 'Uptime (30d)',
    value: '99.9%',
    change: '↑ 0.1% vs last month',
    icon: TrendingUp,
    color: 'green',
  },
];

const services = [
  {
    name: 'Discord Bot - Starter',
    type: 'Bot Hosting',
    status: 'active',
    expires: '2025-07-15',
    ram: '512MB',
  },
  {
    name: 'Minecraft SMP',
    type: 'Game Server',
    status: 'active',
    expires: '2025-08-01',
    ram: '4GB',
  },
  {
    name: 'VPS NL-01',
    type: 'VPS',
    status: 'suspended',
    expires: '2025-06-01',
    ram: '2GB',
  },
];

const recentActivity = [
  { icon: CheckCircle, text: 'Invoice #1042 paid successfully', time: '2 hours ago', color: 'text-green-400' },
  { icon: AlertCircle, text: 'VPS NL-01 has been suspended', time: '1 day ago', color: 'text-red-400' },
  { icon: Activity, text: 'Minecraft SMP restarted automatically', time: '3 days ago', color: 'text-blue-400' },
  { icon: Clock, text: 'Support ticket #87 closed', time: '5 days ago', color: 'text-gray-400' },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusStyle: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400 border border-green-500/20',
  suspended: 'bg-red-500/10 text-red-400 border border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
};

const Dashboard = () => {
  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, John! Here's your overview.</p>
          </div>
          <Link
            to="/client/services"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            <Plus size={16} />
            New Service
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2.5 rounded-lg border ${colorMap[stat.color]}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">My Services</h2>
              <Link to="/client/services" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {services.map((svc) => (
                <div
                  key={svc.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Server size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{svc.name}</p>
                      <p className="text-xs text-gray-500">{svc.type} · {svc.ram}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[svc.status]}`}>
                      {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 hidden sm:block">exp. {svc.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <item.icon size={16} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                  <div>
                    <p className="text-sm text-gray-300">{item.text}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Order Service', href: '/#pricing', icon: Plus },
              { label: 'Pay Invoice', href: '/client/billing', icon: CreditCard },
              { label: 'Open Ticket', href: '/client/tickets', icon: TicketIcon },
              { label: 'View Status', href: '/status', icon: Activity },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/30 rounded-lg transition-all duration-200 text-center group"
              >
                <action.icon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </ClientLayout>
  );
};

export default Dashboard;
