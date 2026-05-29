import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Clock, ChevronRight, Send, X, AlertCircle, CheckCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const tickets = [
  { id: '#87', user: 'john@example.com',  subject: 'Minecraft server keeps crashing on startup', status: 'open',     priority: 'high',   dept: 'Technical', replies: 3,  lastReply: '2 hours ago'  },
  { id: '#86', user: 'anna@example.com',  subject: 'Billing question about invoice',             status: 'answered', priority: 'low',    dept: 'Billing',   replies: 5,  lastReply: '1 day ago'    },
  { id: '#85', user: 'peter@example.com', subject: 'VPS SSH access not working',                 status: 'open',     priority: 'medium', dept: 'Technical', replies: 2,  lastReply: '3 hours ago'  },
  { id: '#84', user: 'jane@example.com',  subject: 'How to install mods on server?',             status: 'closed',   priority: 'low',    dept: 'Technical', replies: 7,  lastReply: '8 days ago'   },
  { id: '#83', user: 'mike@example.com',  subject: 'Service suspended unfairly',                 status: 'open',     priority: 'high',   dept: 'Billing',   replies: 1,  lastReply: '5 hours ago'  },
  { id: '#82', user: 'lisa@example.com',  subject: 'Want to upgrade my plan',                    status: 'answered', priority: 'medium', dept: 'Sales',     replies: 4,  lastReply: '2 days ago'   },
];

const statusBadge: Record<string, { badge: string; icon: typeof CheckCircle }> = {
  open:     { badge: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',    icon: AlertCircle   },
  answered: { badge: 'bg-green-500/10 text-green-400 border border-green-500/20', icon: MessageCircle },
  closed:   { badge: 'bg-white/[0.06] text-gray-400 border border-white/[0.08]',  icon: CheckCircle   },
};

const priorityColor: Record<string, string> = {
  high: 'text-red-400', medium: 'text-yellow-400', low: 'text-green-400',
};

const AdminTickets = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = tickets.filter(t =>
    (t.subject.toLowerCase().includes(search.toLowerCase()) ||
     t.user.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || t.status === filter)
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-7">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Support</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Support Tickets</h1>
            <p className="text-gray-500 text-sm mt-1">{tickets.filter(t => t.status === 'open').length} open tickets requiring attention</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Open',     value: tickets.filter(t => t.status === 'open').length,     color: 'text-blue-400'  },
            { label: 'Answered', value: tickets.filter(t => t.status === 'answered').length, color: 'text-green-400' },
            { label: 'Closed',   value: tickets.filter(t => t.status === 'closed').length,   color: 'text-gray-400'  },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/40 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all', 'open', 'answered', 'closed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-red-600 text-white' : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Ticket list */}
        <div className="space-y-3">
          {filtered.map((ticket, i) => {
            const S = statusBadge[ticket.status];
            const isReplying = replyId === ticket.id;
            return (
              <motion.div key={ticket.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-red-500/20 transition-all">
                <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0">
                      <MessageCircle size={15} className="text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-gray-400">{ticket.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                          <S.icon size={10} />
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        <span className={`text-[10px] font-bold uppercase ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
                        <span className="text-[10px] text-gray-600 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">{ticket.dept}</span>
                      </div>
                      <p className="text-sm font-semibold text-white mt-0.5 truncate">{ticket.subject}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-600">{ticket.user}</span>
                        <span className="text-xs text-gray-600 flex items-center gap-1"><Clock size={11} /> {ticket.lastReply}</span>
                        <span className="text-xs text-gray-600 flex items-center gap-1"><MessageCircle size={11} /> {ticket.replies}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setReplyId(isReplying ? null : ticket.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isReplying ? 'bg-white/[0.06] text-gray-400' : 'bg-red-600/15 hover:bg-red-600/25 text-red-400 border border-red-500/20'
                      }`}>
                      {isReplying ? <><X size={12} /> Cancel</> : <><Send size={12} /> Reply</>}
                    </button>
                    <ChevronRight size={16} className="text-gray-600" />
                  </div>
                </div>

                {/* Reply box */}
                {isReplying && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/[0.06] p-4 sm:p-5"
                  >
                    <p className="text-xs font-semibold text-gray-400 mb-3">Reply to {ticket.user}</p>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-500/40 transition-all resize-none mb-3"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setReplyId(null); setReplyText(''); }}
                        className="px-4 py-2.5 border border-white/[0.09] text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
                        Cancel
                      </button>
                      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Send size={14} /> Send Reply
                      </button>
                      <button className="px-4 py-2.5 bg-white/[0.05] border border-white/[0.09] text-gray-300 hover:text-white rounded-xl text-sm transition-colors">
                        Close Ticket
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-14 text-gray-600 border border-white/[0.05] rounded-2xl">
              <p className="text-sm">No tickets found.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminTickets;
