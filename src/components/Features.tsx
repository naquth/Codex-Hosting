import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, HeartPulse, Settings, BarChart, Globe } from 'lucide-react';

const featuresData = [
  { icon: Cpu,        title: 'High Performance',   description: 'Latest-gen processors deliver consistent speed under any workload.'                                                  },
  { icon: Zap,        title: 'Low Latency',         description: 'Optimised network routes minimise lag across every region.'                                                         },
  { icon: ShieldCheck,title: 'Advanced Security',   description: 'Multi-layered DDoS mitigation and real-time threat neutralisation keep your service online around the clock.'       },
  { icon: HeartPulse, title: 'Auto Recovery',       description: 'Automatic failover and backup systems restore service in seconds.'                                                  },
  { icon: Settings,   title: 'Full Control',        description: 'Powerful control panel with granular configuration options.'                                                        },
  { icon: BarChart,   title: 'Resource Scaling',    description: 'Dynamic allocation adapts to demand so you never overpay.'                                                          },
  { icon: Globe,      title: 'Global Network',      description: 'Strategically placed nodes worldwide for optimal connectivity.'                                                     },
];

const Features = () => (
  <section id="features" className="py-24 px-5 sm:px-8 section-divider">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
          Features
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Everything you need,<br />nothing you don't.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs md:text-right">
            Professional-grade infrastructure without the enterprise complexity or price tag.
          </p>
        </div>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
        {featuresData.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className={`bg-[#080b12] p-7 group hover:bg-[#0d1220] transition-colors duration-300`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/15">
                <feature.icon size={17} className="text-blue-400" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Features;
