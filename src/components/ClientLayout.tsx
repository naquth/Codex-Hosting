import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Server,
  CreditCard,
  TicketIcon,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
  User,
  Tag,
  ShoppingCart,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',       href: '/client/dashboard' },
  { icon: Tag,             label: 'Order Service',   href: '/client/pricing'   },
  { icon: Server,          label: 'My Services',     href: '/client/services'  },
  { icon: CreditCard,      label: 'Billing',         href: '/client/billing'   },
  { icon: TicketIcon,      label: 'Support Tickets', href: '/client/tickets'   },
  { icon: Settings,        label: 'Account Settings',href: '/client/settings'  },
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
  const { count: cartCount } = useCart();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-7 py-7 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-3">
          <img src="/codex.png" alt="CodeX" className="h-9 w-auto" />
          <span className="text-sm font-semibold text-gray-500 tracking-wide">Client Area</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info at bottom */}
      <div className="px-4 py-5 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.07] mb-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-200"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#080b12]">
      {/* Radial glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-68 bg-[#080b12] border-r border-white/[0.06] fixed inset-y-0 left-0 z-40" style={{ width: '272px' }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#080b12] border-r border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[272px] flex flex-col min-h-screen relative overflow-x-hidden">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#080b12]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-8" style={{ height: '68px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            >
              <Menu size={22} />
            </button>

            <div className="flex items-center gap-3 ml-auto">
              {/* Cart */}
              <Link
                to="/client/cart"
                className="relative p-2.5 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.06]"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.06]">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {userName.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-300">{userName}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-[#0e1420] border border-white/[0.08] rounded-2xl shadow-2xl p-2 z-50"
                    >
                      <div className="px-4 py-3 mb-1 border-b border-white/[0.07]">
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{userEmail}</p>
                      </div>
                      <Link
                        to="/client/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                      >
                        <User size={16} /> Account Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/[0.08] rounded-xl transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>

    </div>
  );
};

export default ClientLayout;
