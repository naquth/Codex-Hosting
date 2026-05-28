import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  CreditCard, Lock, ShieldCheck, ArrowLeft,
  CheckCircle, Eye, EyeOff, ChevronDown, ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ClientLayout from '../../components/ClientLayout';

const billingCycles = [
  { label: 'Monthly',   multiplier: 1,    badge: null,       desc: 'Billed every month'    },
  { label: 'Quarterly', multiplier: 2.85, badge: 'Save 5%',  desc: 'Billed every 3 months' },
  { label: 'Annually',  multiplier: 10.8, badge: 'Save 10%', desc: 'Billed once a year'    },
];

const PAYMENT_METHODS = ['Credit / Debit Card', 'PayPal', 'Cryptocurrency'];

const COUNTRIES = [
  'Indonesia', 'United States', 'United Kingdom', 'Germany',
  'Netherlands', 'India', 'Singapore', 'Australia', 'Malaysia',
  'Philippines',
];

const ClientCheckout = () => {
  const { items, totalUSD, clearCart } = useCart();
  const navigate = useNavigate();

  const [billing, setBilling]         = useState(0);
  const [payMethod, setPayMethod]     = useState(0);
  const [showCVV, setShowCVV]         = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDone, setOrderDone]     = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    cardNumber: '', expiry: '', cvv: '',
    country: 'Indonesia',
  });

  const cycleTotal = (totalUSD * billingCycles[billing].multiplier).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderDone(true);
      clearCart();
    }, 2200);
  };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all";

  /* ── Success screen ── */
  if (orderDone) {
    return (
      <ClientLayout>
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center bg-white/[0.03] border border-white/[0.07] rounded-2xl p-10 mt-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-7"
            >
              <CheckCircle size={36} className="text-green-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-3">Order Confirmed!</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Your service is being deployed and will be ready within a few minutes.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              A confirmation email has been sent to <span className="text-white">{form.email || 'your email'}</span>.
            </p>

            {/* Order recap */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 mb-8 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Order Summary</p>
              {items.length > 0
                ? items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-semibold">${item.priceUSD.toFixed(2)}/mo</span>
                  </div>
                ))
                : <p className="text-sm text-gray-500">Your services will appear in the dashboard shortly.</p>
              }
              <div className="border-t border-white/[0.07] mt-3 pt-3 flex justify-between">
                <span className="text-sm text-gray-400">{billingCycles[billing].label} total</span>
                <span className="text-base font-bold text-white">${cycleTotal}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/client/dashboard"
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors text-center"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/client/services"
                className="flex-1 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] text-white font-semibold py-3 rounded-xl text-sm transition-colors text-center"
              >
                View My Services
              </Link>
            </div>
          </motion.div>
        </div>
      </ClientLayout>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <ClientLayout>
        <div className="max-w-lg mx-auto text-center py-24">
          <p className="text-gray-400 mb-6">Your cart is empty.</p>
          <Link
            to="/client/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Browse Plans <ArrowRight size={15} />
          </Link>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/client/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-5">
            <ArrowLeft size={15} /> Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Checkout</h1>
          <p className="text-gray-400 mt-1 text-sm">Complete your order below.</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT: form panels ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Billing cycle */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
              >
                <h2 className="text-base font-semibold text-white mb-5">Billing Cycle</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {billingCycles.map((cycle, i) => (
                    <button
                      key={cycle.label}
                      type="button"
                      onClick={() => setBilling(i)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        billing === i
                          ? 'border-blue-500/50 bg-blue-600/[0.08]'
                          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14]'
                      }`}
                    >
                      {cycle.badge && (
                        <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full">
                          {cycle.badge}
                        </span>
                      )}
                      <p className={`text-sm font-bold ${billing === i ? 'text-blue-400' : 'text-white'}`}>
                        {cycle.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{cycle.desc}</p>
                      <p className="text-sm font-semibold text-white mt-2">
                        ${(totalUSD * cycle.multiplier).toFixed(2)}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Account info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
              >
                <h2 className="text-base font-semibold text-white mb-5">Account Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange}
                      placeholder="John" className={inputClass} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange}
                      placeholder="Doe" className={inputClass} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com" className={inputClass} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                    <div className="relative">
                      <select name="country" value={form.country} onChange={handleChange}
                        className={`${inputClass} appearance-none pr-10`}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment method */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
              >
                <h2 className="text-base font-semibold text-white mb-5">Payment Method</h2>

                {/* Method tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  {PAYMENT_METHODS.map((m, i) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayMethod(i)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        payMethod === i
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/[0.04] border border-white/[0.09] text-gray-400 hover:text-white hover:border-white/[0.18]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {payMethod === 0 && (
                    <motion.div key="card"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                        <div className="relative">
                          <CreditCard size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input name="cardNumber" value={form.cardNumber} onChange={handleChange}
                            placeholder="1234 5678 9012 3456" maxLength={19}
                            className={`${inputClass} pl-11`} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                          <input name="expiry" value={form.expiry} onChange={handleChange}
                            placeholder="MM / YY" maxLength={7} className={inputClass} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                          <div className="relative">
                            <input type={showCVV ? 'text' : 'password'} name="cvv" value={form.cvv}
                              onChange={handleChange} placeholder="•••" maxLength={4}
                              className={`${inputClass} pr-11`} required />
                            <button type="button" onClick={() => setShowCVV(!showCVV)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                              {showCVV ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {payMethod === 1 && (
                    <motion.div key="paypal"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-center py-10 border border-white/[0.07] rounded-xl bg-white/[0.02]"
                    >
                      <p className="text-gray-400 text-sm">You will be redirected to PayPal to complete payment securely.</p>
                    </motion.div>
                  )}
                  {payMethod === 2 && (
                    <motion.div key="crypto"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-center py-10 border border-white/[0.07] rounded-xl bg-white/[0.02]"
                    >
                      <p className="text-gray-400 text-sm">Supported: Bitcoin, Ethereum, USDT.</p>
                      <p className="text-gray-500 text-xs mt-1">Payment address will be shown after placing your order.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ── RIGHT: sticky summary ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-base font-semibold text-white mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between gap-2 text-sm">
                      <span className="text-gray-400 truncate">{item.name}</span>
                      <span className="text-white font-semibold flex-shrink-0">${item.priceUSD.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.07] pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${totalUSD.toFixed(2)}/mo</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Billing</span>
                    <span className="text-white">{billingCycles[billing].label}</span>
                  </div>
                  {billing > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Discount</span>
                      <span className="text-green-400">{billingCycles[billing].badge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="border-t border-white/[0.07] pt-3 flex justify-between items-baseline">
                    <span className="font-semibold text-white">Total Due</span>
                    <span className="text-2xl font-bold text-white">${cycleTotal}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Lock size={15} /> Place Order &middot; ${cycleTotal}</>
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <ShieldCheck size={13} className="text-blue-500" />
                  <span className="text-xs text-gray-600">256-bit SSL &middot; Secure payment</span>
                </div>
              </motion.div>
            </div>

          </div>
        </form>
      </div>
    </ClientLayout>
  );
};

export default ClientCheckout;
