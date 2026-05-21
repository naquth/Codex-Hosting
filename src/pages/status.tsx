import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Wrench, Clock } from 'lucide-react';

type Status = 'Operational' | 'Degraded Performance' | 'Partial Outage' | 'Major Outage' | 'Under Maintenance';

const servicesStatus: { name: string; description: string; status: Status }[] = [
  { name: 'Website & Client Portal', description: 'Main website and client panel access.', status: 'Operational' },
  { name: 'Game Control Panel',      description: 'Management panel for game servers.',    status: 'Operational' },
  { name: 'Service API',             description: 'API endpoints for automation.',         status: 'Degraded Performance' },
  { name: 'Server Node — USA',       description: 'Infrastructure in the United States.',  status: 'Operational' },
  { name: 'Server Node — Netherlands', description: 'Infrastructure in the Netherlands.', status: 'Under Maintenance' },
  { name: 'Database & Storage',      description: 'Main database and storage systems.',    status: 'Operational' },
  { name: 'Support Services',        description: 'Ticketing system and live chat.',       status: 'Partial Outage' },
];

const incidentHistory = [
  {
    date: 'September 28, 2025',
    title: 'API Performance Issues',
    status: 'Investigating',
    updates: [
      { time: '10:45 UTC+7', message: 'We are investigating reports of high latency on some API endpoints and will update shortly.' },
      { time: '10:30 UTC+7', message: 'Issue first detected by our monitoring system.' },
    ],
  },
  {
    date: 'September 27, 2025',
    title: 'Emergency Maintenance — Netherlands Node',
    status: 'Resolved',
    updates: [
      { time: '05:00 UTC+7', message: 'Maintenance completed. All services on the Netherlands node have been fully restored.' },
      { time: '02:00 UTC+7', message: 'Emergency maintenance begun to replace a hardware component on one host.' },
    ],
  },
];

const statusConfig: Record<Status, { color: string; bg: string; border: string; dot: string; icon: typeof CheckCircle2 }> = {
  'Operational':          { color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20',  dot: 'bg-green-400',  icon: CheckCircle2 },
  'Degraded Performance': { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', dot: 'bg-yellow-400', icon: AlertTriangle },
  'Partial Outage':       { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', dot: 'bg-orange-400', icon: AlertTriangle },
  'Major Outage':         { color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20',    dot: 'bg-red-400',    icon: XCircle },
  'Under Maintenance':    { color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20',   dot: 'bg-blue-400',   icon: Wrench },
};

const StatusPage = () => {
  const allOperational = servicesStatus.every(s => s.status === 'Operational');
  const operationalCount = servicesStatus.filter(s => s.status === 'Operational').length;

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Status</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Service Status</h1>
          <p className="text-gray-400 text-sm mt-3">Real-time availability of all CodeX services.</p>
        </motion.div>

        {/* Overall banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`flex items-center gap-3 p-4 rounded-xl border mb-10 ${
            allOperational
              ? 'bg-green-400/[0.05] border-green-400/20'
              : 'bg-yellow-400/[0.05] border-yellow-400/20'
          }`}
        >
          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${allOperational ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
          <div className="flex-1">
            <p className={`text-sm font-semibold ${allOperational ? 'text-green-400' : 'text-yellow-400'}`}>
              {allOperational ? 'All Systems Operational' : 'Some systems are experiencing issues'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {operationalCount}/{servicesStatus.length} services operational · Last updated just now
            </p>
          </div>
          <Clock size={14} className="text-gray-600 flex-shrink-0" />
        </motion.div>

        {/* Services list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden mb-16"
        >
          {servicesStatus.map((svc, i) => {
            const cfg = statusConfig[svc.status];
            return (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`flex items-center justify-between px-5 py-4 ${
                  i < servicesStatus.length - 1 ? 'border-b border-white/[0.05]' : ''
                } hover:bg-white/[0.02] transition-colors`}
              >
                <div>
                  <p className="text-sm font-medium text-white">{svc.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{svc.description}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border flex-shrink-0 ml-4 ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {svc.status}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Incident history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">History</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8">Incident history.</h2>
          <div className="space-y-5">
            {incidentHistory.map((inc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{inc.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{inc.date}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ml-3 ${
                    inc.status === 'Resolved'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {inc.status}
                  </span>
                </div>
                <div className="space-y-4 border-l border-white/[0.07] pl-4 ml-1">
                  {inc.updates.map((upd, j) => (
                    <div key={j} className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-white/20 border border-white/10" />
                      <p className="text-[11px] text-gray-600 font-medium mb-1">{upd.time}</p>
                      <p className="text-xs text-gray-300 leading-relaxed">{upd.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default StatusPage;
