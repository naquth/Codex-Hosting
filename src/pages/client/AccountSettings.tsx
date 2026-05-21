import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const AccountSettings = () => {
  const [profile, setProfile]         = useState({ name: 'John Doe', email: 'john@example.com', phone: '+1 555 123 4567' });
  const [passwords, setPasswords]     = useState({ current: '', newPass: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState(false);
  const [notifications, setNotifications] = useState({ invoices: true, services: true, promotions: false, tickets: true });
  const [saved, setSaved]             = useState('');

  const handleSave = (id: string) => { setSaved(id); setTimeout(() => setSaved(''), 2000); };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2";

  const Section = ({ title, icon: Icon, id, children }: { title: string; icon: typeof User; id: string; children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
    >
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.06]">
        <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/15">
          <Icon size={14} className="text-blue-400" />
        </div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSave(id)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
        >
          <Save size={13} />
          {saved === id ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Account</span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Settings</h1>
        </motion.div>

        {/* Profile */}
        <Section title="Profile Information" icon={User} id="profile">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors mt-0.5">Change avatar</button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="text" value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className={`${inputClass} pl-9`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="email" value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className={`${inputClass} pl-9`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className={inputClass} />
            </div>
          </div>
        </Section>

        {/* Password */}
        <Section title="Change Password" icon={Lock} id="password">
          <div className="space-y-4">
            {[
              { label: 'Current Password', key: 'current'  },
              { label: 'New Password',     key: 'newPass'  },
              { label: 'Confirm New',      key: 'confirm'  },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={passwords[key as keyof typeof passwords]}
                    onChange={e => setPasswords({ ...passwords, [key]: e.target.value })}
                    placeholder="••••••••"
                    className={`${inputClass} pl-9 pr-10`}
                  />
                  {key === 'current' && (
                    <button type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                      {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Email Notifications" icon={Bell} id="notifications">
          <div className="space-y-2">
            {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, value]) => {
              const labels: Record<string, { title: string; desc: string }> = {
                invoices:   { title: 'Invoice Notifications', desc: 'New invoices and payment confirmations'   },
                services:   { title: 'Service Alerts',        desc: 'Status updates and expiry reminders'     },
                tickets:    { title: 'Ticket Updates',        desc: 'Replies and status changes on tickets'   },
                promotions: { title: 'Promotions & News',     desc: 'Special offers and product updates'      },
              };
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                  <div>
                    <p className="text-xs font-semibold text-white">{labels[key].title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{labels[key].desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ml-4 ${value ? 'bg-blue-600' : 'bg-white/[0.08]'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-5"
        >
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.06]">
            <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/15">
              <Shield size={14} className="text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
              <div>
                <p className="text-xs font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
              </div>
              <button className="text-xs bg-blue-600/[0.12] hover:bg-blue-600/[0.20] text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg transition-colors font-semibold flex-shrink-0 ml-4">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
              <div>
                <p className="text-xs font-semibold text-white">Active Sessions</p>
                <p className="text-[11px] text-gray-500 mt-0.5">2 active sessions on 2 devices</p>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-4">
                Revoke all
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </ClientLayout>
  );
};

export default AccountSettings;
