import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, ChevronRight, ChevronDown, Search,
  Bot, Server, Globe, Zap, Terminal, Shield,
  Settings, LifeBuoy, ArrowRight, ExternalLink,
} from 'lucide-react';

const categories = [
  {
    icon: Zap,
    title: 'Getting Started',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/15',
    description: 'Set up your first server in under 5 minutes.',
    articles: [
      'Creating your account',
      'Ordering a service',
      'Accessing the control panel',
      'Understanding your dashboard',
    ],
  },
  {
    icon: Bot,
    title: 'Discord Bot Hosting',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/15',
    description: 'Everything about hosting your Discord bots.',
    articles: [
      'Uploading your bot files',
      'Setting environment variables',
      'Node.js version management',
      'Auto-restart on crash',
    ],
  },
  {
    icon: Server,
    title: 'Game Servers',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/15',
    description: 'Guides for Minecraft and other game servers.',
    articles: [
      'Installing Minecraft server',
      'Installing plugins & mods',
      'Changing server version',
      'Managing worlds & backups',
    ],
  },
  {
    icon: Globe,
    title: 'VPS Hosting',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/15',
    description: 'Full control over your virtual private server.',
    articles: [
      'Connecting via SSH',
      'Installing software',
      'Managing firewalls',
      'Setting up a domain',
    ],
  },
  {
    icon: Shield,
    title: 'Security',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/15',
    description: 'Keep your services safe and protected.',
    articles: [
      'DDoS protection overview',
      'Enabling two-factor auth',
      'Managing SSH keys',
      'IP whitelisting',
    ],
  },
  {
    icon: Settings,
    title: 'Control Panel',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/15',
    description: 'Master every feature of your panel.',
    articles: [
      'File manager guide',
      'Console & logs',
      'Scheduled tasks',
      'Sub-user permissions',
    ],
  },
  {
    icon: Terminal,
    title: 'API Reference',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/15',
    description: 'Automate and integrate with our REST API.',
    articles: [
      'Authentication',
      'Server endpoints',
      'Billing endpoints',
      'Webhooks',
    ],
  },
  {
    icon: LifeBuoy,
    title: 'Troubleshooting',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/15',
    description: 'Diagnose and fix common issues fast.',
    articles: [
      'Server won\'t start',
      'High CPU or RAM usage',
      'Connection timeouts',
      'Permission errors',
    ],
  },
];

const popularArticles = [
  { title: 'How to upload your bot files',           category: 'Discord Bot Hosting', time: '3 min read' },
  { title: 'Installing plugins on Minecraft server', category: 'Game Servers',        time: '4 min read' },
  { title: 'Connecting to VPS via SSH',              category: 'VPS Hosting',         time: '5 min read' },
  { title: 'Setting environment variables',          category: 'Discord Bot Hosting', time: '2 min read' },
  { title: 'How to create a backup',                 category: 'Game Servers',        time: '3 min read' },
  { title: 'Using the file manager',                 category: 'Control Panel',       time: '4 min read' },
];

const Docs = () => {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.articles.some((a) => a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            How can we help?
          </h1>
          <p className="text-gray-400 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Guides, references, and tutorials to get your services running smoothly.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-500 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-200"
            >
              {/* Card header */}
              <button
                onClick={() => setOpenCategory(openCategory === index ? null : index)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 ${cat.bg}`}>
                    <cat.icon size={18} className={cat.color} />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-600 transition-transform duration-200 mt-0.5 flex-shrink-0 ${
                      openCategory === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-sm font-semibold text-white mt-4">{cat.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cat.description}</p>
              </button>

              {/* Article list */}
              <AnimatePresence>
                {openCategory === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden border-t border-white/[0.06]"
                  >
                    <ul className="p-3 space-y-1">
                      {cat.articles.map((article) => (
                        <li key={article}>
                          <a
                            href="#"
                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors group"
                          >
                            <ChevronRight size={13} className="text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                            {article}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View all articles <ArrowRight size={12} />
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-14 text-gray-600 border border-white/[0.05] rounded-2xl">
              <BookOpen size={36} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">No results for "{search}"</p>
            </div>
          )}
        </div>

        {/* Popular articles */}
        {!search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
                Popular
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">Most read articles.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {popularArticles.map((article, i) => (
                <motion.a
                  key={article.title}
                  href="#"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start justify-between gap-4 p-5 bg-white/[0.02] border border-white/[0.07] rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/15 px-2 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-gray-600">{article.time}</span>
                    </div>
                  </div>
                  <ExternalLink size={15} className="text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 sm:p-10 text-center overflow-hidden"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/15 w-fit mx-auto mb-5">
              <LifeBuoy size={24} className="text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Can't find what you need?
            </h2>
            <p className="text-gray-400 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
              Our support team is available 24/7 to help you with anything not covered in the docs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/support"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto justify-center"
              >
                <LifeBuoy size={16} />
                Contact Support
              </Link>
              <Link
                to="/client/tickets"
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm w-full sm:w-auto justify-center"
              >
                Open a Ticket
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Docs;
