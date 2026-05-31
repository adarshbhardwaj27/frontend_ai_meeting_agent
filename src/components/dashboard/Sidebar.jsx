import { Link, useNavigate } from 'react-router-dom'
import { Zap, LayoutDashboard, FileText, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { icon: LayoutDashboard, label: 'Meetings',   tab: 'meetings' },
  { icon: FileText,        label: 'Debug Logs', tab: 'logs' },
  { icon: Settings,        label: 'Settings',   tab: 'settings', disabled: true },
]

export default function Sidebar({ activeTab, onTabChange }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-navy-800 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-2.5 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-sky-400 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <Zap size={15} className="text-navy-900" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">MeetMind AI</p>
          <p className="text-[10px] text-gray-500 font-medium">Admin Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-2 mb-2">
          Navigation
        </p>
        {NAV.map(({ icon: Icon, label, tab, disabled }) => {
          const active = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => !disabled && onTabChange(tab)}
              disabled={disabled}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group
                ${active
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                  : disabled
                    ? 'text-gray-700 cursor-not-allowed'
                    : 'text-gray-400 hover:bg-navy-700 hover:text-white'
                }`}
            >
              <Icon size={16} className={active ? 'text-teal-400' : ''} />
              <span className="flex-1">{label}</span>
              {disabled && <span className="text-[9px] font-bold text-gray-700 border border-gray-700/40 px-1.5 py-0.5 rounded">SOON</span>}
              {active && <ChevronRight size={12} className="text-teal-500/60" />}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 border-t border-white/5 pt-3">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-navy-700 transition-all duration-200 mb-1"
        >
          <span className="text-xs">←</span>
          <span>View Landing Page</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
