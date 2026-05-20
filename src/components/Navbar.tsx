import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Bot, Server, Globe, Info, HelpingHand, FileText, Shield, BarChart, Music, LayoutDashboard, UserPlus } from 'lucide-react';

// --- Data untuk dropdown menu dengan link yang benar ---
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
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setOpenDropdown(null), 100);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 z-50">
            <img src="/codex.png" alt="CodeX Logo" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-full px-4 py-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">Home</Link>

              <div onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave} className="relative">
                <button className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">
                  Services <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {openDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-3 w-96 -translate-x-1/4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4"
                    >
                      {serviceItems.map(item => <DropdownItem key={item.name} {...item} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div onMouseEnter={() => handleMouseEnter('more')} onMouseLeave={handleMouseLeave} className="relative">
                <button className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium px-3 py-1 rounded-full">
                  More <ChevronDown size={16} className="ml-1" />
                </button>
                <AnimatePresence>
                  {openDropdown === 'more' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-3 w-56 -translate-x-1/4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2"
                    >
                      {moreItems.map(item => <DropdownItem key={item.name} {...item} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ====== CTA Buttons: Register + Dashboard ====== */}
          <div className="hidden md:flex items-center gap-2 z-50">
            <Link
              to="/client/register"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <UserPlus size={15} />
              Register
            </Link>
            <Link
              to="/client/login"
              className="flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <LayoutDashboard size={15} />
              Client Area
            </Link>
          </div>

          <div className="md:hidden ml-4 z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl md:hidden z-40"
            onClick={closeAllMenus}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute top-24 left-4 right-4 bg-gray-900/80 border border-gray-700 rounded-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-white font-bold text-xl mb-4">Menu</h2>
              <div className="flex flex-col space-y-2">
                <Link to="/" onClick={closeAllMenus} className="text-gray-300 hover:bg-gray-800 p-3 rounded-lg transition-colors">Home</Link>

                <div className="border-t border-b border-gray-700">
                  <button onClick={() => toggleMobileDropdown('services')} className="w-full flex justify-between items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                    <span>Services</span>
                    <ChevronDown size={20} className={`transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdown === 'services' && (
                    <div className="pl-4 pb-2 mt-1 space-y-1">
                      {serviceItems.map(item => <Link key={item.name} to={item.href} onClick={closeAllMenus} className="flex items-center gap-3 py-2 text-gray-400 hover:text-white"><item.icon size={18} />{item.name}</Link>)}
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-700">
                  <button onClick={() => toggleMobileDropdown('more')} className="w-full flex justify-between items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                    <span>More</span>
                    <ChevronDown size={20} className={`transition-transform ${mobileDropdown === 'more' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdown === 'more' && (
                    <div className="pl-4 pb-2 mt-1 space-y-1">
                      {moreItems.map(item => <Link key={item.name} to={item.href} onClick={closeAllMenus} className="flex items-center gap-3 py-2 text-gray-400 hover:text-white"><item.icon size={18} />{item.name}</Link>)}
                    </div>
                  )}
                </div>

                {/* Client Area links di mobile */}
                <div className="pt-2 flex flex-col gap-2">
                  <Link to="/client/register" onClick={closeAllMenus} className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 p-3 rounded-lg transition-colors">
                    <UserPlus size={18} /> Register
                  </Link>
                  <Link to="/client/login" onClick={closeAllMenus} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors font-semibold">
                    <LayoutDashboard size={18} /> Client Area
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const DropdownItem = ({ icon: Icon, name, href }: { icon: React.ElementType, name: string, href: string }) => (
  <Link to={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
    <Icon size={18} />
    <span className="text-sm font-medium">{name}</span>
  </Link>
);

export default Navbar;
