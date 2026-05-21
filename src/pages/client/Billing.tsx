import { motion } from 'framer-motion';
import { CreditCard, Download, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const invoices = [
  { id: '#1042', service: 'Discord Bot - Starter', amount: '$0.39', date: '2025-06-01', due: '2025-07-01', status: 'paid'    },
  { id: '#1041', service: 'Minecraft SMP - Pro',   amount: '$1.57', date: '2025-06-01', due: '2025-07-01', status: 'unpaid'  },
  { id: '#1040', service: 'VPS NL-01',             amount: '$4.49', date: '2025-05-01', due: '2025-06-01', status: 'overdue' },
  { id: '#1039', service: 'Lavalink Node EU',      amount: '$2.99', date: '2025-05-15', due: '2025-06-15', status: 'paid'    },
  { id: '#1038', service: 'Discord Bot - Starter', amount: '$0.39', date: '2025-05-01', due: '2025-06-01', status: 'paid'    },
];

const paymentMethods = [
  { last4: '4242', brand: 'Visa',       expires: '12/27', default: true  },
  { last4: '5555', brand: 'Mastercard', expires: '08/26', default: false },
];

const statusCfg: Record<string, { badge: string; icon: typeof CheckCircle; label: string }> = {
  paid:    { badge: 'bg-green-400/10 text-green-400 border border-green-400/20',   icon: CheckCircle, label: 'Paid'    },
  unpaid:  { badge: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20', icon: Clock,      label: 'Unpaid'  },
  overdue: { badge: 'bg-red-400/10 text-red-400 border border-red-400/20',         icon: XCircle,    label: 'Overdue' },
};

const totalDue = invoices
  .filter(i => i.status !== 'paid')
  .reduce((s, i) => s + parseFloat(i.amount.replace('$', '')), 0);

const Billing = () => (
  <ClientLayout>
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Finance</span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Billing</h1>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Due',      value: `$${totalDue.toFixed(2)}`, color: 'text-yellow-400', border: 'border-yellow-400/15', bg: 'bg-yellow-400/[0.04]' },
          { label: 'Paid (30d)',     value: '$1.17',    color: 'text-green-400',  border: 'border-green-400/15',  bg: 'bg-green-400/[0.04]'  },
          { label: 'Next Due',       value: 'Jul 1',    color: 'text-blue-400',   border: 'border-blue-400/15',   bg: 'bg-blue-400/[0.04]'   },
        ].map((c, i) => (
          <motion.div key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`border ${c.border} ${c.bg} rounded-xl p-4`}
          >
            <p className="text-[11px] text-gray-500 mb-1">{c.label}</p>
            <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Payment methods */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Payment Methods</h2>
          <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            <Plus size={13} /> Add Card
          </button>
        </div>
        <div className="space-y-2">
          {paymentMethods.map((pm) => (
            <div key={pm.last4}
              className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/15">
                  <CreditCard size={13} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white flex items-center gap-2">
                    {pm.brand} •••• {pm.last4}
                    {pm.default && (
                      <span className="text-[10px] bg-blue-600/15 text-blue-400 border border-blue-500/15 px-1.5 py-0.5 rounded-full">Default</span>
                    )}
                  </p>
                  <p className="text-[11px] text-gray-600">Expires {pm.expires}</p>
                </div>
              </div>
              <button className="text-[11px] text-gray-600 hover:text-red-400 transition-colors">Remove</button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
      >
        <h2 className="text-sm font-semibold text-white mb-4">Invoices</h2>
        <div className="space-y-2">
          {invoices.map((inv, i) => {
            const S = statusCfg[inv.status];
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 + i * 0.04 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05] hover:border-blue-500/20 transition-colors gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-white">{inv.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                      <S.icon size={10} /> {S.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{inv.service}</p>
                  <p className="text-[11px] text-gray-600">Issued: {inv.date} · Due: {inv.due}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm font-bold text-white">{inv.amount}</span>
                  {inv.status !== 'paid' && (
                    <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold">
                      Pay Now
                    </button>
                  )}
                  <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                    <Download size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
  </ClientLayout>
);

export default Billing;
