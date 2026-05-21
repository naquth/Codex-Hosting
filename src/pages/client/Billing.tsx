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
  paid:    { badge: 'bg-green-500/10 text-green-400 border border-green-500/20',   icon: CheckCircle, label: 'Paid'    },
  unpaid:  { badge: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20', icon: Clock,      label: 'Unpaid'  },
  overdue: { badge: 'bg-red-500/10 text-red-400 border border-red-500/20',         icon: XCircle,    label: 'Overdue' },
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Billing</h1>
          <p className="text-gray-400 mt-1">Manage your invoices and payment methods.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Due',     value: `$${totalDue.toFixed(2)}`, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
            { label: 'Paid (30d)',    value: '$1.17',    color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20'   },
            { label: 'Next Due Date', value: '2025-07-01', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20'     },
          ].map((card, i) => (
            <motion.div key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`border rounded-xl p-5 ${card.bg}`}>
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
            <button className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <Plus size={15} /> Add Card
            </button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div key={pm.last4}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <CreditCard size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {pm.brand} &bull;&bull;&bull;&bull; {pm.last4}
                      {pm.default && (
                        <span className="ml-2 text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">Expires {pm.expires}</p>
                  </div>
                </div>
                <button className="text-xs text-gray-500 hover:text-red-400 transition-colors">Remove</button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5">Invoices</h2>
          <div className="space-y-3">
            {invoices.map((inv, index) => {
              const S = statusStyle[inv.status];
              return (
                <motion.div key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/20 transition-colors gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{inv.id}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${S.badge}`}>
                        <S.icon size={11} /> {S.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{inv.service}</p>
                    <p className="text-xs text-gray-600">Issued: {inv.date} &middot; Due: {inv.due}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{inv.amount}</span>
                    {inv.status !== 'paid' && (
                      <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
                        Pay Now
                      </button>
                    )}
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                      <Download size={15} />
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
};

export default Billing;
