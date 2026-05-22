import { Link } from 'react-router-dom';
import { Twitter, Instagram } from 'lucide-react';
import DiscordLogo from '../icons/DiscordLogo';

const linkSections = [
  {
    title: 'Products',
    links: [
      { name: 'Bot Hosting',  href: '/discord',   external: false },
      { name: 'Game Servers', href: '/minecraft',  external: false },
      { name: 'VPS Hosting',  href: '/vps',        external: false },
      { name: 'Pricing',      href: '/#pricing',   external: true  },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about',      external: false },
      { name: 'Features', href: '/#features',  external: true  },
      { name: 'Contact',  href: '/support',    external: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs',    external: false },
      { name: 'Support Center', href: '/support', external: false },
      { name: 'FAQ',            href: '/#faq',   external: true  },
      { name: 'Status',         href: '/status', external: false },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/tos',     external: false },
      { name: 'Privacy Policy',   href: '/privacy', external: false },
    ],
  },
];

const Footer = () => (
  <footer className="pt-16 pb-10 px-5 sm:px-8 border-t border-white/[0.05]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10">

        {/* Brand column */}
        <div className="col-span-2">
          <Link to="/">
            <img src="/codex.png" alt="CodeX" className="h-7 w-auto mb-5" />
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
            High-performance hosting for developers, gamers, and communities.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="https://discord.gg/FnEe7xcYZQ" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors">
              <DiscordLogo className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {linkSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} CodeX. All rights reserved.
        </p>
        <p className="text-xs text-gray-600">
          Crafted with care for developers worldwide.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
