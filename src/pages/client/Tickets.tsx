import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TicketIcon, Plus, MessageCircle, Clock, CheckCircle,
  AlertCircle, ChevronRight, Send, X,
} from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const tickets = [
  { id: '#87', subject: 'Minecraft server keeps crashing on startup', status: 'open',     priority: 'high',   created: '2025-06-15', lastReply: '2 hours ago',  replies: 3 },
  { id: '#82', subject: 'How do I install custom mods?',              status: 'answered', priority: 'low',    created: '2025-06-10', lastReply: '1 day ago',    replies: 5 },
  { id: '#78', subject: 'VPS suspended - need explanation',           status: 'closed',   priority: 'medium', created: '2025-05-28', lastReply: '8 days ago',   replies: 7 },
  { id: '#71', subject: 'Discord bot latency issues',                 status: 'closed',   priority: 'medium', created: '2025-05-10', lastReply: '15 days ago',  replies: 4 },
];

const statusStyle: Record<string, { badge: string; icon: typeof CheckCircle }> = {
  open:     { badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',    icon: AlertCircle   },
  answered: { badge: 'bg-green-500/10 text-green-400 border border-green-500/20', icon: MessageCircle },
  closed:   { badge: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',    icon: CheckCircle   },
};

const priorityStyle: Record<string, string> = {
  high:   'text-red-400',
  medium: 'text-yellow-400',
  low:    'text-green-400',
};

const Tickets = () => {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', department: 'Technical Support', priority: 'medium', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewTicket(false);
    setNewTicket({ subject: '', department: 'Technical Support', priority: 'medium', message: '' });
  };

  return (
    <ClientLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Support Tickets</h1>
            <p className="text-gray-400 mt-1">Get help from our 24/7 support team.</p>
          </div>
          <button
            onClick={() => setShowNewTicket(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto"
          >
            <Plus size={16} /> New Ticket
          </button>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { label: 'Open',     value: tickets.filter(t => t.status === 'open').length,     color: 'text-blue-400'  },
            { label: 'Answered', value: tickets.filter(t => t.status === 'answered').length, color: 'text-green-400' },
            { label: 'Closed',   value: tickets.filter(t => t.status === 'closed').length,   color: 'text-gray-400'  },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6 text-center"
            >
              <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tickets list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-7"
        >
          <div className="space-y-3">
            {tickets.map((ticket, index) => {
              const S = statusStyle[ticket.status];
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 p-4 sm:p-5 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-blue-500/25 transition-all cursor-pointer group overflow-hidden"
                >
                  {/* Icon */}
                  <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0 hidden sm:flex">
                    <TicketIcon size={18} className="text-blue-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-medium text-gray-400">{ticket.id}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                        <S.icon size={10} />
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span className={`text-[10px] font-bold ${priorityStyle[ticket.priority]}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1 truncate">{ticket.subject}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Clock size={11} /> {ticket.lastReply}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <MessageCircle size={11} /> {ticket.replies}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTicket(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0e1420] border border-white/[0.09] rounded-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-xl font-bold text-white tracking-tight">Open New Ticket</h2>
                <button onClick={() => setShowNewTicket(false)} className="text-gray-400 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Describe your issue briefly"
                    className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                    <select
                      value={newTicket.department}
                      onChange={(e) => setNewTicket({ ...newTicket, department: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.09] text-white rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option>Technical Support</option>
                      <option>Billing</option>
                      <option>Sales</option>
                      <option>Abuse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.09] text-white rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicket(false)}
                    className="flex-1 py-3.5 border border-white/[0.09] text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send size={16} /> Submit Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ClientLayout>
  );
};

export default Tickets;
