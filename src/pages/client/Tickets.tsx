import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TicketIcon, Plus, MessageCircle, Clock, CheckCircle, AlertCircle, ChevronRight, Send, X } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const tickets = [
  { id: '#87', subject: 'Minecraft server keeps crashing on startup', status: 'open',     priority: 'high',   created: '2025-06-15', lastReply: '2 hours ago',  replies: 3 },
  { id: '#82', subject: 'How do I install custom mods?',              status: 'answered', priority: 'low',    created: '2025-06-10', lastReply: '1 day ago',    replies: 5 },
  { id: '#78', subject: 'VPS suspended - need explanation',           status: 'closed',   priority: 'medium', created: '2025-05-28', lastReply: '8 days ago',   replies: 7 },
  { id: '#71', subject: 'Discord bot latency issues',                 status: 'closed',   priority: 'medium', created: '2025-05-10', lastReply: '15 days ago',  replies: 4 },
];

const statusCfg: Record<string, { badge: string; icon: typeof CheckCircle }> = {
  open:     { badge: 'bg-blue-400/10 text-blue-400 border border-blue-400/20',   icon: AlertCircle   },
  answered: { badge: 'bg-green-400/10 text-green-400 border border-green-400/20', icon: MessageCircle },
  closed:   { badge: 'bg-white/[0.06] text-gray-500 border border-white/[0.08]', icon: CheckCircle   },
};

const priorityColor: Record<string, string> = {
  high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400',
};

const Tickets = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ subject: '', department: 'Technical Support', priority: 'medium', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setForm({ subject: '', department: 'Technical Support', priority: 'medium', message: '' });
  };

  const selectClass = "w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-blue-500/40 transition-all";

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Help</span>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Support Tickets</h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={14} /> New Ticket
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Open',     value: tickets.filter(t => t.status === 'open').length,     color: 'text-blue-400'  },
            { label: 'Answered', value: tickets.filter(t => t.status === 'answered').length, color: 'text-green-400' },
            { label: 'Closed',   value: tickets.filter(t => t.status === 'closed').length,   color: 'text-gray-500'  },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-4 text-center"
            >
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Ticket list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
        >
          <div className="space-y-2">
            {tickets.map((t, i) => {
              const S = statusCfg[t.status];
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.05 }}
                  className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-lg border border-white/[0.05] hover:border-blue-500/25 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/15 flex-shrink-0 mt-0.5">
                      <TicketIcon size={13} className="text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] text-gray-600">{t.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                          <S.icon size={10} />
                          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${priorityColor[t.priority]}`}>{t.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-white mt-0.5 truncate">{t.subject}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[11px] text-gray-600 flex items-center gap-1">
                          <Clock size={10} /> {t.lastReply}
                        </span>
                        <span className="text-[11px] text-gray-600 flex items-center gap-1">
                          <MessageCircle size={10} /> {t.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-700 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* New ticket modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-md bg-[#0f1623] border border-white/[0.08] rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Support</span>
                  <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">New Ticket</h2>
                </div>
                <button onClick={() => setShowModal(false)}
                  className="p-1.5 text-gray-600 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Subject</label>
                  <input type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Describe your issue briefly"
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-blue-500/40 transition-all"
                    required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Department</label>
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className={selectClass}>
                      <option>Technical Support</option>
                      <option>Billing</option>
                      <option>Sales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                      className={selectClass}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Message</label>
                  <textarea value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-blue-500/40 transition-all resize-none"
                    required />
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 border border-white/[0.08] text-gray-400 hover:text-white rounded-lg text-sm transition-colors">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                    <Send size={14} /> Submit
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
