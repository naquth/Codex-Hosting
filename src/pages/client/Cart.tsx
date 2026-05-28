import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Trash2, ArrowRight, PackageOpen,
  MemoryStick, Cpu, HardDrive, Server,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ClientLayout from '../../components/ClientLayout';

const serviceColor: Record<string, string> = {
  'Discord Bot Hosting': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Minecraft Hosting':   'text-green-400 bg-green-500/10 border-green-500/20',
  'VPS Hosting':         'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Lavalink Hosting':    'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const ClientCart = () => {
  const { items, removeItem, totalUSD } = useCart();
  const navigate = useNavigate();

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Your Cart</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {items.length === 0
              ? 'Your cart is empty.'
              : `${items.length} item${items.length > 1 ? 's' : ''} ready to checkout.`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center py-24 border border-white/[0.07] rounded-2xl bg-white/[0.02] text-center"
          >
            <div className="p-5 bg-white/[0.04] rounded-2xl border border-white/[0.07] mb-6">
              <PackageOpen size={40} className="text-gray-600" />
            </div>
            <p className="text-white font-semibold text-lg mb-2">Nothing here yet</p>
            <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
              Browse our plans and add a service to get started.
            </p>
            <Link
              to="/client/pricing"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <ShoppingCart size={16} /> Browse Plans
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Item list — takes 2 cols */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 sm:p-6 hover:border-blue-500/25 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 flex-shrink-0">
                        <Server size={20} className="text-blue-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            {/* Service type badge */}
                            <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border mb-2 ${
                              serviceColor[item.service] ?? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                            }`}>
                              {item.service}
                            </span>
                            <h3 className="text-base font-bold text-white">{item.name}</h3>
                          </div>
                          {/* Price + remove */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <p className="text-xl font-bold text-white">
                              ${item.priceUSD.toFixed(2)}
                              <span className="text-gray-500 text-xs font-normal">/mo</span>
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-colors"
                              title="Remove"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.specs.map((s) => (
                            <span
                              key={s.label}
                              className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1.5 rounded-lg"
                            >
                              {s.label === 'RAM' && <MemoryStick size={11} className="text-blue-400" />}
                              {s.label === 'CPU' && <Cpu size={11} className="text-blue-400" />}
                              {(s.label === 'Storage' || s.label === 'SSD') && <HardDrive size={11} className="text-blue-400" />}
                              <span className="text-gray-500">{s.label}:</span>
                              <span className="text-white font-medium">{s.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <Link
                to="/client/pricing"
                className="block text-center text-sm text-gray-500 hover:text-blue-400 transition-colors py-2"
              >
                + Add another service
              </Link>
            </div>

            {/* Order summary — sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-base font-semibold text-white mb-5">Order Summary</h2>

                {/* Line items */}
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-400 truncate">{item.name}</span>
                      <span className="text-white font-semibold flex-shrink-0">${item.priceUSD.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-white/[0.07] pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-400">Total / month</span>
                    <span className="text-2xl font-bold text-white">${totalUSD.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Billed monthly · cancel anytime</p>
                </div>

                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/client/checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </motion.button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="text-[11px] text-gray-600">256-bit SSL</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-[11px] text-gray-600">Secure payment</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-[11px] text-gray-600">Cancel anytime</span>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientCart;
