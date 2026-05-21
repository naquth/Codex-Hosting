import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Server, CreditCard, TicketIcon,
  Settings, LogOut, Menu, X, Bell, ChevronDown, User,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        href: '/client/dashboard' },
  { icon: Server,          label: 'My Services',      href: '/client/services'  },
  { icon: CreditCard,      label: 'Billing',          href: '/client/billing'   },
  { icon: TicketIcon,      label: 'Support Tickets',  href: '/client/tickets'   },
  { icon: Settings,        label: 'Settings',         href: '/client/settings'  },
];

interface ClientLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
}

const ClientLayout = ({
  children,
  userName = 'John Doe',
  userEmail = 'john@example.com',
}: ClientLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => navigate('/client/login');

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/codex.png" alt="CodeX" className="h-7 w-auto" />
          <span className="text-xs font-medium text-gray-600 tracking-wide">CLIENT AREA</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-blue-500/[0.12] text-blue-400 border border-blue-500/20'
                  : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User bottom */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-1">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{userName}</p>
            <p className="text-[11px] text-gray-600 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-150"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#080b12]">
      {/* Subtle grid */}
      <div className="fixed inset-0 grid-overlay pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#080b12]/95 backdrop-blur-xl border-r border-white/[0.06] fixed inset-y-0 left-0 z-40">
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
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute left-0 top-0 bottom-0 w-56 bg-[#080b12] border-r border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen relative">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-[#080b12]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-5 sm:px-7 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-white transition-colors p-1"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {/* Bell */}
              <button className="relative p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]">
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
                    {userName.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-xs font-medium text-gray-300">{userName}</span>
                  <ChevronDown size={13} className="text-gray-600" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-2xl p-1.5 z-50"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-white/[0.06]">
                        <p className="text-xs font-semibold text-white">{userName}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{userEmail}</p>
                      </div>
                      <Link
                        to="/client/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                      >
                        <User size={13} /> Account Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/[0.08] rounded-lg transition-colors"
                      >
                        <LogOut size={13} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
