import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';
import ClientLayout from '../../components/ClientLayout';

const AccountSettings = () => {
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com', phone: '+1 555 123 4567' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState(false);
  const [notifications, setNotifications] = useState({
    invoices: true,
    services: true,
    promotions: false,
    tickets: true,
  });
  const [saved, setSaved] = useState('');

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 2000);
  };

  const TabSection = ({ title, icon: Icon, children, id }: { title: string; icon: typeof User; children: React.ReactNode; id: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
        <Icon size={18} className="text-blue-400" />
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
      <div className="mt-6 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSave(id)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          <Save size={15} />
          {saved === id ? 'Saved!' : 'Save Changes'}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <ClientLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400 mt-1">Manage your profile and preferences.</p>
        </motion.div>

        {/* Profile Info */}
        <TabSection title="Profile Information" icon={User} id="profile">
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{profile.name}</p>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1">Change avatar</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-gray-900/60 border border-gray-600 text-white rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-gray-900/60 border border-gray-600 text-white rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-gray-900/60 border border-gray-600 text-white rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </TabSection>

        {/* Change Password */}
        <TabSection title="Change Password" icon={Lock} id="password">
          <div className="space-y-4">
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'newPass' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={passwords[key as keyof typeof passwords]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-gray-900/60 border border-gray-600 text-white placeholder-gray-600 rounded-lg py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {key === 'current' && (
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPasswords ? <EyeOff size={15} /> : <Eye size={15} />}
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
                invoices: { title: 'Invoice Notifications', desc: 'Get notified when new invoices are generated' },
                services: { title: 'Service Alerts', desc: 'Status updates and expiry reminders' },
                tickets: { title: 'Ticket Updates', desc: 'Replies and status changes on support tickets' },
                promotions: { title: 'Promotions & News', desc: 'Special offers and product updates' },
              };
              return (
                <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{labels[key].title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{labels[key].desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
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
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
            <Shield size={18} className="text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security</p>
              </div>
              <button className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Active Sessions</p>
                <p className="text-xs text-gray-500 mt-0.5">2 active sessions</p>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
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
