import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Bot, Server, Globe,
  Info, HelpingHand, FileText, Shield, BarChart,
  Music, LayoutDashboard, UserPlus,
} from 'lucide-react';

const serviceItems = [
  { icon: Bot, name: 'Discord Bot', href: '/discord' },
  { icon: Server, name: 'Minecraft Server', href: '/minecraft' },
  { icon: Globe, name: 'VPS', href: '/vps' },
  { icon: Music, name: 'Lavalink Hosting', href: '#' },
];

const moreItems = [
  { icon: Info, name: 'About Us', href: '/about' },
  { icon: HelpingHand, name: 'Support', href: '/support' },
  { icon: FileText, name: 'TOS', href: '/tos' },
  { icon: Shield, name: 'Privacy Policy', href: '/privacy' },
  { icon: BarChart, name: 'Status Page', href: '/status' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setOpenDropdown(null), 120);
  };
  const toggleMobileDropdown = (menu: string) =>
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080b12]/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/codex.png" alt="CodeX" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav – centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-72 -translate-x-1/4 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-2xl p-2 grid grid-cols-2 gap-1"
                  >
                    {serviceItems.map((item) => (
                      <DropdownItem key={item.name} {...item} onClick={closeAllMenus} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More dropdown */}
            <div
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors">
                More
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === 'more' ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === 'more' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-52 -translate-x-1/4 bg-[#0f1623] border border-white/[0.08] rounded-xl shadow-2xl p-2"
                  >
                    {moreItems.map((item) => (
                      <DropdownItem key={item.name} {...item} onClick={closeAllMenus} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/client/register"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Register
            </Link>
            <Link
              to="/client/login"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <LayoutDashboard size={14} />
              Client Area
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              <Link
                to="/"
                onClick={closeAllMenus}
                className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => toggleMobileDropdown('services')}
                  className="w-full flex justify-between items-center px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Services
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileDropdown === 'services' && (
                  <div className="pl-3 mt-1 space-y-0.5">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeAllMenus}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg transition-colors"
                      >
                        <item.icon size={15} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleMobileDropdown('more')}
                  className="w-full flex justify-between items-center px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  More
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${mobileDropdown === 'more' ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileDropdown === 'more' && (
                  <div className="pl-3 mt-1 space-y-0.5">
                    {moreItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeAllMenus}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg transition-colors"
                      >
                        <item.icon size={15} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <Link
                  to="/client/register"
                  onClick={closeAllMenus}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <UserPlus size={15} /> Register
                </Link>
                <Link
                  to="/client/login"
                  onClick={closeAllMenus}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <LayoutDashboard size={15} /> Client Area
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const DropdownItem = ({
  icon: Icon,
  name,
  href,
  onClick,
}: {
  icon: React.ElementType;
  name: string;
  href: string;
  onClick: () => void;
}) => (
  <Link
    to={href}
    onClick={onClick}
    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/[0.06] transition-colors text-gray-400 hover:text-white group"
  >
    <Icon size={15} className="flex-shrink-0" />
    <span className="text-sm font-medium">{name}</span>
  </Link>
);

export default Navbar;
