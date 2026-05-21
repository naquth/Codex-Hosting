import { motion } from 'framer-motion';
import { Users, Zap, Shield, Heart } from 'lucide-react';

const teamMembers = [
  { name: 'John Doe',     role: 'Founder & CEO',        initials: 'JD' },
  { name: 'Jane Smith',   role: 'Head of Operations',   initials: 'JS' },
  { name: 'Peter Jones',  role: 'Lead Developer',       initials: 'PJ' },
  { name: 'Sarah Miller', role: 'Support Manager',      initials: 'SM' },
];

const coreValues = [
  { icon: Zap,    title: 'Performance',       description: 'We are obsessed with speed and low latency to deliver the best experience.' },
  { icon: Shield, title: 'Security',          description: 'Keeping your servers and data secure is our top priority.' },
  { icon: Heart,  title: 'Customer Support',  description: 'Our team is always ready to help you 24/7 with a fast and friendly response.' },
  { icon: Users,  title: 'Community',         description: 'We build more than just a service — we build a community.' },
];

const avatarColors = ['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-orange-500'];

const stats = [
  { value: '10K+',  label: 'Active Servers'   },
  { value: '99.9%', label: 'Uptime SLA'        },
  { value: '24/7',  label: 'Support Available' },
  { value: '3+',    label: 'Global Locations'  },
];

const AboutUs = () => (
  <div className="min-h-screen">
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">About</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight max-w-xl">
          The team behind CodeX.
        </h1>
        <p className="text-gray-400 text-sm mt-4 max-w-lg leading-relaxed">
          Providing high-performance hosting solutions with leading technology for developers, gamers, and businesses worldwide.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05] mb-20"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-[#080b12] py-8 text-center">
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 max-w-3xl"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Mission</span>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-5">Why we exist.</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Our mission is to empower creativity and innovation by providing reliable, fast, and secure server infrastructure.
          We believe that everyone deserves access to high-quality hosting without compromising on performance or security.
          At CodeX, we are committed to being the trusted hosting partner for your every project — from the smallest side project to enterprise scale.
        </p>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Team</span>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-10">The people behind the platform.</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 text-center hover:border-blue-500/30 transition-colors"
            >
              <div className={`w-14 h-14 rounded-full ${avatarColors[i]} flex items-center justify-center text-white text-lg font-bold mx-auto mb-4`}>
                {member.initials}
              </div>
              <h3 className="text-sm font-semibold text-white">{member.name}</h3>
              <p className="text-xs text-blue-400 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Values</span>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-10">What we stand for.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-[#080b12] p-7 hover:bg-[#0d1220] transition-colors"
            >
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/15 w-fit mb-4">
                <v.icon size={17} className="text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  </div>
);

export default AboutUs;
