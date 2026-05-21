import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    items: [
      { label: 'Personal Identification', text: 'Name, email address, mailing address, and phone number provided when you create an account or contact us.' },
      { label: 'Payment Information', text: 'Credit card details and billing address, processed securely through our PCI-compliant payment partners. We never store raw card numbers.' },
      { label: 'Technical Information', text: 'IP address, browser type, operating system, and login data collected automatically when you use our services.' },
      { label: 'Usage Data', text: 'Information about how you interact with our website, products, and services to improve your experience.' },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related notices; respond to your comments and questions; send you technical notices and support messages; and comply with legal obligations. We do not sell your personal information to third parties.',
  },
  {
    title: '3. Data Sharing & Third Parties',
    content: 'We may share your information with trusted third-party service providers who assist us in operating our website and services (such as payment processors and cloud infrastructure providers), subject to strict confidentiality agreements. We may also disclose your information when required by law or to protect the rights, property, or safety of CodeX, our customers, or the public.',
  },
  {
    title: '4. Data Retention',
    content: 'We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements. When you close your account, we will delete or anonymise your data within 90 days, except where retention is required by applicable law.',
  },
  {
    title: '5. Security',
    content: 'We implement industry-standard security measures including SSL/TLS encryption, access controls, and regular security audits to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: '6. Your Rights',
    content: 'Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict certain processing; and data portability. To exercise these rights, please contact us at privacy@codex.host. We will respond to all requests within 30 days.',
  },
  {
    title: '7. Cookies',
    content: 'We use cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and understand where our visitors come from. You can control cookies through your browser settings, though disabling them may affect some features of our services.',
  },
  {
    title: '8. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and, where appropriate, via email. Your continued use of our services after such changes constitutes acceptance of the updated policy.',
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen">
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-32 pb-24">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/15">
            <Shield size={20} className="text-blue-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Legal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mt-3">Last updated: September 29, 2025</p>
        <p className="text-gray-400 text-sm mt-4 max-w-lg leading-relaxed">
          We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-colors"
          >
            <h2 className="text-sm font-semibold text-white mb-3">{sec.title}</h2>
            {sec.items ? (
              <div className="space-y-3">
                {sec.items.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-semibold text-blue-400 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 leading-relaxed">{sec.content}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 p-5 bg-blue-500/[0.05] border border-blue-500/20 rounded-xl"
      >
        <p className="text-xs text-gray-400 leading-relaxed">
          Privacy questions or data requests? Email us at{' '}
          <a href="mailto:privacy@codex.host" className="text-blue-400 hover:text-blue-300 transition-colors">
            privacy@codex.host
          </a>.
          We aim to respond within 30 days.
        </p>
      </motion.div>

    </div>
  </div>
);

export default PrivacyPolicy;
