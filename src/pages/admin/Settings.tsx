import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Bell, Shield, Save, Mail, DollarSign } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettings = () => {
  const [site, setSite]     = useState({ name: 'CodeX Hosting', url: 'https://codex.host', email: 'support@codex.host', discord: 'https://discord.gg/FnEe7xcYZQ' });
  const [notif, setNotif]   = useState({ newUser: true, newOrder: true, newTicket: true, overdueInvoice: true });
  const [billing, setBilling] = useState({ currency: 'USD', tax: '0', trialDays: '0' });
  const [saved, setSaved]   = useState('');

  const handleSave = (id: string) => { setSaved(id); setTimeout(() => setSaved(''), 2000); };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-500/40 focus:bg-white/[0.06] transition-all";

  const Section = ({ title, icon: Icon, id, children }: { title: string; icon: typeof Globe; id: string; children: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.07]">
        <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/15">
          <Icon size={17} className="text-red-400" />
        </div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      {children}
      <div className="mt-6 pt-4 border-t border-white/[0.07]">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => handleSave(id)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          <Save size={14} />
          {saved === id ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Configuration</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Admin Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your hosting platform settings.</p>
        </motion.div>

        {/* Site Settings */}
        <Section title="Site Settings" icon={Globe} id="site">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
              <input value={site.name} onChange={e => setSite({ ...site, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Site URL</label>
              <input value={site.url} onChange={e => setSite({ ...site, url: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input value={site.email} onChange={e => setSite({ ...site, email: e.target.value })}
                  className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Discord Server URL</label>
              <input value={site.discord} onChange={e => setSite({ ...site, discord: e.target.value })} className={inputClass} />
            </div>
          </div>
        </Section>

        {/* Billing Settings */}
        <Section title="Billing Settings" icon={DollarSign} id="billing">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Default Currency</label>
              <select value={billing.currency} onChange={e => setBilling({ ...billing, currency: e.target.value })}
                className={`${inputClass} appearance-none`}>
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tax Rate (%)</label>
              <input type="number" value={billing.tax} onChange={e => setBilling({ ...billing, tax: e.target.value })}
                placeholder="0" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Free Trial Days</label>
              <input type="number" value={billing.trialDays} onChange={e => setBilling({ ...billing, trialDays: e.target.value })}
                placeholder="0" className={inputClass} />
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Admin Notifications" icon={Bell} id="notifications">
          <div className="space-y-3">
            {(Object.entries(notif) as [keyof typeof notif, boolean][]).map(([key, value]) => {
              const labels: Record<string, { title: string; desc: string }> = {
                newUser:        { title: 'New User Registration',  desc: 'Get notified when a new user signs up'         },
                newOrder:       { title: 'New Order Placed',       desc: 'Get notified when a new order is created'      },
                newTicket:      { title: 'New Support Ticket',     desc: 'Get notified when a new ticket is opened'      },
                overdueInvoice: { title: 'Overdue Invoice',        desc: 'Get notified about overdue invoices'           },
              };
              return (
                <div key={key} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                  <div>
                    <p className="text-sm font-semibold text-white">{labels[key].title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{labels[key].desc}</p>
                  </div>
                  <button onClick={() => setNotif({ ...notif, [key]: !value })}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${value ? 'bg-red-600' : 'bg-gray-700'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.07]">
            <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/15">
              <Shield size={17} className="text-red-400" />
            </div>
            <h2 className="text-base font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <div>
                <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 mt-0.5">Require 2FA for all admin logins</p>
              </div>
              <button className="text-xs bg-red-600/15 hover:bg-red-600/25 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl transition-colors font-semibold flex-shrink-0 ml-4">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <div>
                <p className="text-sm font-semibold text-white">IP Whitelist</p>
                <p className="text-xs text-gray-500 mt-0.5">Restrict admin access to specific IP addresses</p>
              </div>
              <button className="text-xs bg-red-600/15 hover:bg-red-600/25 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl transition-colors font-semibold flex-shrink-0 ml-4">
                Configure
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
