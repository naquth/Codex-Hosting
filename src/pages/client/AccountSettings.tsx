import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const AccountSettings = () => {
  const [profile, setProfile]             = useState({ name: 'John Doe', email: 'john@example.com', phone: '+1 555 123 4567' });
  const [passwords, setPasswords]         = useState({ current: '', newPass: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState(false);
  const [notifications, setNotifications] = useState({ invoices: true, services: true, promotions: false, tickets: true });
  const [saved, setSaved]                 = useState('');

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 2000);
  };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.09] text-white placeholder-gray-600 rounded-xl py-3 sm:py-3.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all";

  const TabSection = ({ title, icon: Icon, children, id }: {
    title: string; icon: typeof User; children: React.ReactNode; id: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.07]">
        <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/15 flex-shrink-0">
          <Icon size={18} className="text-blue-400" />
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
      <div className="mt-5 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSave(id)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Save size={15} />
          {saved === id ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Account Settings</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your profile and preferences.</p>
        </motion.div>

        {/* Profile */}
        <TabSection title="Profile Information" icon={User} id="profile">
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                {profile.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{profile.name}</p>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-1">Change avatar</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input type="tel" value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className={inputClass} />
            </div>
          </div>
        </TabSection>

        {/* Password */}
        <TabSection title="Change Password" icon={Lock} id="password">
          <div className="space-y-4">
            {[
              { label: 'Current Password',    key: 'current' },
              { label: 'New Password',         key: 'newPass' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={passwords[key as keyof typeof passwords]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    placeholder="••••••••"
                    className={`${inputClass} pl-10 pr-11`}
                  />
                  {key === 'current' && (
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabSection>

        {/* Notifications */}
        <TabSection title="Email Notifications" icon={Bell} id="notifications">
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => {
              const labels: Record<string, { title: string; desc: string }> = {
                invoices:   { title: 'Invoice Notifications', desc: 'Get notified when new invoices are generated'   },
                services:   { title: 'Service Alerts',        desc: 'Status updates and expiry reminders'           },
                tickets:    { title: 'Ticket Updates',        desc: 'Replies and status changes on support tickets' },
                promotions: { title: 'Promotions & News',     desc: 'Special offers and product updates'            },
              };
              return (
                <div key={key}
                  className="flex items-center justify-between p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{labels[key].title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{labels[key].desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </TabSection>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.07]">
            <div className="p-2 sm:p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/15">
              <Shield size={18} className="text-blue-400" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security</p>
              </div>
              <button className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-xl transition-colors font-medium flex-shrink-0">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Active Sessions</p>
                <p className="text-xs text-gray-500 mt-0.5">2 active sessions</p>
              </div>
              <button className="text-sm text-red-400 hover:text-red-300 transition-colors flex-shrink-0">
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
