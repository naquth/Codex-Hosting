import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Server, CreditCard,
  TicketIcon, Settings, LogOut, Menu, Bell,
  ChevronDown, ShieldAlert, BarChart3, Package,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    href: '/admin/dashboard' },
  { icon: Users,           label: 'Users',        href: '/admin/users'     },
  { icon: Server,          label: 'Services',     href: '/admin/services'  },
  { icon: Package,         label: 'Orders',       href: '/admin/orders'    },
  { icon: CreditCard,      label: 'Invoices',     href: '/admin/invoices'  },
  { icon: TicketIcon,      label: 'Tickets',      href: '/admin/tickets'   },
  { icon: BarChart3,       label: 'Analytics',    href: '/admin/analytics' },
  { icon: Settings,        label: 'Settings',     href: '/admin/settings'  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + badge */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2.5 mb-3">
          <img src="/codex.png" alt="CodeX" className="h-7 w-auto" />
        </Link>
        <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold px-2.5 py-1 rounded-full">
          <ShieldAlert size={11} /> ADMIN PANEL
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-red-500/[0.10] text-red-400 border border-red-500/20'
                  : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <item.icon size={17} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Admin user */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-1">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Administrator</p>
            <p className="text-[11px] text-gray-600 truncate">admin@codex.host</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/login')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/[0.07] transition-all"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#080b12]">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col bg-[#080b12] border-r border-white/[0.06] fixed inset-y-0 left-0 z-40" style={{ width: '240px' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 bg-[#080b12] border-r border-white/[0.06]"
              style={{ width: '240px' }}
              onClick={e => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#080b12]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-7" style={{ height: '64px' }}>
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-white transition-colors p-1">
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <button className="relative p-2.5 text-gray-500 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                  <span className="hidden sm:block text-sm font-medium text-gray-300">Admin</span>
                  <ChevronDown size={13} className="text-gray-600" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-[#0e1420] border border-white/[0.08] rounded-xl shadow-2xl p-1.5 z-50"
                    >
                      <div className="px-3 py-2.5 mb-1 border-b border-white/[0.07]">
                        <p className="text-xs font-semibold text-white">Administrator</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">admin@codex.host</p>
                      </div>
                      <Link to="/admin/settings" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors">
                        <Settings size={14} /> Settings
                      </Link>
                      <button onClick={() => navigate('/admin/login')}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-colors">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

    </div>
  );
};

export default AdminLayout;
