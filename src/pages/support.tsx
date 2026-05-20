import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BookOpen, Plus, ArrowRight } from 'lucide-react';
import DiscordLogo from '@/icons/DiscordLogo';

const faqData = [
  { question: 'How do I order a service?', answer: 'Choose a plan on our pricing page, click "Order Now", and follow the checkout steps. Your server is deployed instantly after payment.' },
  { question: 'What payment methods are accepted?', answer: 'We accept major credit/debit cards, bank transfers, PayPal, and popular e-wallets for your convenience.' },
  { question: 'How long does server activation take?', answer: 'Your server is activated instantly after payment confirmation — usually within a few minutes.' },
  { question: 'Can I upgrade my plan later?', answer: 'Yes. You can upgrade your hosting plan at any time through the client panel without any downtime.' },
  { question: 'Do you offer refunds?', answer: 'We offer a 24-hour money-back guarantee on new orders if you are not satisfied with our services.' },
];

const contactOptions = [
  {
    icon: MessageSquare,
    title: 'Open a Ticket',
    description: 'Get personalised help from our expert team. Average response time under 1 hour.',
    href: '/client/tickets',
    badge: '< 1h response',
  },
  {
    icon: DiscordLogo,
    title: 'Join Discord',
    description: 'Connect with the community and get real-time help from our staff and users.',
    href: 'https://discord.gg/FnEe7xcYZQ',
    badge: 'Live chat',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Browse comprehensive guides, tutorials, and documentation at your own pace.',
    href: '#',
    badge: 'Self-service',
  },
];

const Support = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 grid-overlay pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Support</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">We are here to help.</h1>
          <p className="text-gray-400 text-sm mt-3 max-w-md leading-relaxed">
            Find answers in our knowledge base or reach our support team directly. We respond fast.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
          {contactOptions.map((opt, i) => (
            <motion.a
              key={opt.title}
              href={opt.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.07] hover:border-blue-500/30 rounded-2xl p-6 group transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/15">
                  <opt.icon size={17} className="text-blue-400" />
                </div>
                <span className="text-[10px] font-semibold text-gray-500 bg-white/[0.04] border border-white/[0.07] px-2 py-1 rounded-full">
                  {opt.badge}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5">
                {opt.title}
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{opt.description}</p>
            </motion.a>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">FAQ</span>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Common questions.</h2>
          <div className="space-y-2">
            {faqData.map((faq, i) => {
              const isOpen = activeIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-colors ${isOpen ? 'border-blue-500/30 bg-blue-500/[0.04]' : 'border-white/[0.07] bg-white/[0.02]'}`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                  >
                    <span className="text-sm font-medium text-white">{faq.question}</span>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isOpen ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 rotate-45' : 'border-white/10 text-gray-500'
                    }`}>
                      <Plus size={13} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-400 leading-relaxed px-5 pb-5">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Support;
