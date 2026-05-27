import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, PackageOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, totalUSD } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Order
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-3">
            {items.length === 0 ? 'Your cart is empty.' : `${items.length} item${items.length > 1 ? 's' : ''} ready to checkout.`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 border border-white/[0.07] rounded-2xl bg-white/[0.02]"
          >
            <PackageOpen size={48} className="mx-auto mb-5 text-gray-700" />
            <p className="text-gray-400 font-medium mb-2">Nothing here yet</p>
            <p className="text-gray-600 text-sm mb-8">Browse our services and add a plan to get started.</p>
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              View Plans <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {/* Item list */}
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-blue-500/25 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Service badge + name */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/15 px-2.5 py-1 rounded-full">
                          {item.service}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{item.name}</h3>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.specs.map(s => (
                          <span key={s.label} className="text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-lg">
                            {s.label}: <span className="text-white font-medium">{s.value}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <p className="text-xl font-bold text-white">${item.priceUSD.toFixed(2)}<span className="text-gray-500 text-sm font-normal">/mo</span></p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="text-base font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-white font-medium">${item.priceUSD.toFixed(2)}/mo</span>
                  </div>
                ))}
                <div className="border-t border-white/[0.07] pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-xl font-bold text-white">${totalUSD.toFixed(2)}<span className="text-gray-500 text-sm font-normal">/mo</span></span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                Proceed to Checkout <ArrowRight size={17} />
              </motion.button>

              <Link
                to="/#pricing"
                className="block text-center text-sm text-gray-500 hover:text-white transition-colors mt-4"
              >
                Continue shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
