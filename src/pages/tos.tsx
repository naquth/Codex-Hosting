import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const sections = [
  {
    title: '1. Your Account',
    content: 'To use our Services, you must register for an account. You are responsible for safeguarding the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.',
  },
  {
    title: '2. Acceptable Use Policy',
    content: 'You agree not to use the Service for any illegal or unauthorized purpose. Prohibited activities include: running malicious software including malware or phishing scripts; engaging in Denial of Service (DoS) or DDoS attacks; storing or distributing illegal content including copyrighted material without rights; sending unsolicited communications (spam); or any activity that violates applicable local, national, or international law.',
  },
  {
    title: '3. Payment & Billing',
    content: 'All services are billed in advance on a monthly basis. Payments are non-refundable except as expressly stated in our Refund Policy. Failure to pay within the due date may result in service suspension. We reserve the right to modify our pricing with 30 days prior notice to existing customers.',
  },
  {
    title: '4. Service Availability',
    content: 'We aim for 99.9% uptime but do not guarantee uninterrupted access to services. Scheduled and emergency maintenance may cause temporary downtime. We are not liable for any losses resulting from service interruption outside our reasonable control, including force majeure events.',
  },
  {
    title: '5. Termination',
    content: 'We reserve the right to suspend or terminate your account at our sole discretion if you violate these Terms, fail to make payment, or engage in activity that may harm other customers or our infrastructure. Upon termination, you will lose access to all associated data. You may cancel your account at any time through the client panel.',
  },
  {
    title: '6. Limitation of Liability',
    content: 'To the fullest extent permitted by law, CodeX shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability for any claim arising out of these Terms shall not exceed the amount paid by you for the Services in the three months preceding the event giving rise to the claim.',
  },
  {
    title: '7. Changes to Terms',
    content: 'We reserve the right to update these Terms at any time. We will notify you of material changes via email or a prominent notice on our website. Your continued use of the Services after such notice constitutes acceptance of the updated Terms.',
  },
];

const TOS = () => (
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
            <FileText size={20} className="text-blue-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Legal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 text-sm mt-3">Last updated: September 29, 2025</p>
        <p className="text-gray-400 text-sm mt-4 max-w-lg leading-relaxed">
          By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. Please read them carefully.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-colors"
          >
            <h2 className="text-sm font-semibold text-white mb-3">{sec.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{sec.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 p-5 bg-blue-500/[0.05] border border-blue-500/20 rounded-xl"
      >
        <p className="text-xs text-gray-400 leading-relaxed">
          Questions about these Terms? Contact our support team at{' '}
          <a href="mailto:legal@codex.host" className="text-blue-400 hover:text-blue-300 transition-colors">
            legal@codex.host
          </a>{' '}
          or open a ticket in the{' '}
          <a href="/client/tickets" className="text-blue-400 hover:text-blue-300 transition-colors">
            client area
          </a>.
        </p>
      </motion.div>

    </div>
  </div>
);

export default TOS;
