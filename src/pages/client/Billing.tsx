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

const statusStyle: Record<string, { badge: string; icon: typeof CheckCircle; label: string }> = {
  paid:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',    icon: CheckCircle, label: 'Paid'    },
  unpaid:  { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', icon: Clock,       label: 'Unpaid'  },
  overdue: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',          icon: XCircle,     label: 'Overdue' },
};

const paymentMethods = [
  { last4: '4242', brand: 'Visa',       expires: '12/27', default: true  },
  { last4: '5555', brand: 'Mastercard', expires: '08/26', default: false },
];

const Billing = () => {
  const totalDue = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0);

  return (
    <ClientLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Billing</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your invoices and payment methods.</p>
        </motion.div>

        {/* Summary cards — 1 col on mobile, 3 on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Total Due',     value: `$${totalDue.toFixed(2)}`, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
            { label: 'Paid (30d)',    value: '$1.17',      color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20'   },
            { label: 'Next Due',      value: 'Jul 1',      color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20'     },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`border rounded-2xl p-4 sm:p-5 ${card.bg}`}
            >
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-white">Payment Methods</h2>
            <button className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <Plus size={14} /> Add Card
            </button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div key={pm.last4}
                className="flex items-center justify-between p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0">
                    <CreditCard size={17} className="text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap">
                      {pm.brand} &bull;&bull;&bull;&bull; {pm.last4}
                      {pm.default && (
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Expires {pm.expires}</p>
                  </div>
                </div>
                <button className="text-xs text-gray-500 hover:text-red-400 transition-colors flex-shrink-0">Remove</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Invoices</h2>
          <div className="space-y-3">
            {invoices.map((inv, index) => {
              const S = statusStyle[inv.status];
              return (
                <motion.div key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-blue-500/25 transition-colors"
                >
                  {/* Top: id + status + amount */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{inv.id}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                        <S.icon size={10} /> {S.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-white">{inv.amount}</span>
                      <button className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                  {/* Bottom: service name + dates + pay button */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 truncate">{inv.service}</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">Due: {inv.due}</p>
                    </div>
                    {inv.status !== 'paid' && (
                      <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold flex-shrink-0">
                        Pay Now
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </ClientLayout>
  );
};

export default Billing;
