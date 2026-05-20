import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqData = [
  {
    question: 'How do I get started with game server hosting?',
    answer:
      "Simply choose a plan, complete checkout, and your server is deployed instantly. You'll receive an email with login details to get up and running straight away.",
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'We offer 24/7 technical support via tickets and Discord. Our team is always ready to help — from initial setup to troubleshooting complex issues.',
  },
  {
    question: 'Can I modify server settings and configurations?',
    answer:
      'Absolutely. You get full file access and a user-friendly control panel to modify settings, install mods and plugins, and customise your experience.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards (Visa, Mastercard, Amex), PayPal, and various cryptocurrencies for your convenience.',
  },
  {
    question: 'Do you offer DDoS protection?',
    answer:
      'Yes. All plans include enterprise-grade DDoS mitigation to keep your server online and your players unaffected by attacks.',
  },
];

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-5 sm:px-8 section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: heading + illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Frequently<br />asked questions.
            </h2>
            <p className="text-gray-400 text-sm mt-5 max-w-xs leading-relaxed">
              Can't find what you're looking for? Reach us through the support portal anytime.
            </p>

            <div className="hidden lg:block mt-12">
              <img
                src="/question.png"
                alt="Support character"
                className="w-64 h-auto opacity-80"
              />
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-2"
          >
            {faqData.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors duration-200 ${
                    isOpen
                      ? 'border-blue-500/30 bg-blue-500/[0.04]'
                      : 'border-white/[0.07] bg-white/[0.02]'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                  >
                    <span className="text-sm font-medium text-white">{faq.question}</span>
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
                        isOpen
                          ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 rotate-45'
                          : 'border-white/10 text-gray-500'
                      }`}
                    >
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
                        <p className="text-sm text-gray-400 leading-relaxed px-5 pb-5">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Questions;
