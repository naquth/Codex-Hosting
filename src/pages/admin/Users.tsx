import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, MoreHorizontal, Mail, Server, CreditCard, Ban, CheckCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const users = [
  { id: 1,  name: 'John Doe',      email: 'john@example.com',  services: 3, spent: '$142.80', status: 'active',    joined: '2025-01-15' },
  { id: 2,  name: 'Sarah Chen',    email: 'sarah@example.com', services: 1, spent: '$41.99',  status: 'active',    joined: '2025-02-01' },
  { id: 3,  name: 'Mike Rodriguez',email: 'mike@example.com',  services: 2, spent: '$195.99', status: 'suspended', joined: '2024-12-10' },
  { id: 4,  name: 'Lisa Wang',     email: 'lisa@example.com',  services: 4, spent: '$280.50', status: 'active',    joined: '2024-11-20' },
  { id: 5,  name: 'Tom Harris',    email: 'tom@example.com',   services: 1, spent: '$42.99',  status: 'active',    joined: '2025-03-05' },
  { id: 6,  name: 'Anna Kim',      email: 'anna@example.com',  services: 0, spent: '$0.00',   status: 'inactive',  joined: '2025-04-10' },
  { id: 7,  name: 'Peter Jones',   email: 'peter@example.com', services: 2, spent: '$88.99',  status: 'active',    joined: '2025-02-22' },
  { id: 8,  name: 'Emma Davis',    email: 'emma@example.com',  services: 1, spent: '$13.99',  status: 'active',    joined: '2025-05-01' },
];

const statusBadge: Record<string, string> = {
  active:    'bg-green-500/10 text-green-400 border border-green-500/20',
  suspended: 'bg-red-500/10 text-red-400 border border-red-500/20',
  inactive:  'bg-white/[0.06] text-gray-400 border border-white/[0.08]',
};

const avatarColors = ['bg-blue-600','bg-violet-600','bg-emerald-600','bg-orange-500','bg-pink-600','bg-cyan-600','bg-amber-600','bg-indigo-600'];

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || u.status === filter)
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Management</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Users</h1>
            <p className="text-gray-500 text-sm mt-1">{users.length} total registered users</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto">
            <UserPlus size={15} /> Add User
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users',     value: users.length,                                        color: 'text-white'        },
            { label: 'Active',          value: users.filter(u => u.status === 'active').length,     color: 'text-green-400'    },
            { label: 'Suspended',       value: users.filter(u => u.status === 'suspended').length,  color: 'text-red-400'      },
            { label: 'Total Revenue',   value: '$806.26',                                           color: 'text-yellow-400'   },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 sm:p-5">
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters + Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" placeholder="Search users by name or email..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.07] text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-red-500/40 transition-all" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['all','active','suspended','inactive'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${
                  filter === f ? 'bg-red-600 text-white' : 'bg-white/[0.03] border border-white/[0.07] text-gray-400 hover:text-white'
                }`}>{f}</button>
            ))}
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="space-y-0">
            {filtered.map((user, i) => (
              <div key={user.id}
                className={`flex items-center justify-between p-4 sm:p-5 hover:bg-white/[0.02] transition-colors gap-4 ${
                  i < filtered.length - 1 ? 'border-b border-white/[0.05]' : ''
                }`}>
                {/* User info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Server size={12} className="text-blue-400" /> {user.services} services
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CreditCard size={12} className="text-green-400" /> {user.spent}
                  </div>
                  <span className="text-xs text-gray-600">Joined {user.joined}</span>
                </div>

                {/* Status + actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full hidden sm:inline-flex ${statusBadge[user.status]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  <button className="p-2 text-gray-600 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
                    <Mail size={14} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/[0.07] rounded-lg transition-colors">
                    {user.status === 'active' ? <Ban size={14} /> : <CheckCircle size={14} />}
                  </button>
                  <button className="p-2 text-gray-600 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-14 text-gray-600">
                <p className="text-sm">No users found.</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
