import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import Sidebar     from '../components/dashboard/Sidebar'
import MeetingsTab from '../components/dashboard/MeetingsTab'
import LogViewer   from '../components/dashboard/LogViewer'

const TABS = {
  meetings: MeetingsTab,
  logs:     LogViewer,
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('meetings')
  const TabComponent = TABS[activeTab] ?? MeetingsTab

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen bg-navy-900 overflow-hidden"
    >
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main area */}
      <div className="flex-1 ml-60 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 px-8 bg-navy-800/60 border-b border-white/5 flex items-center justify-between shrink-0 backdrop-blur-sm">
          <div>
            <h1 className="text-base font-bold text-white">
              {activeTab === 'meetings' ? 'Meeting Control' : 'Debug Logs'}
            </h1>
            <p className="text-xs text-gray-500">
              {activeTab === 'meetings'
                ? 'Deploy, monitor, and control your AI bots'
                : 'Real-time bot events and diagnostics'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full">
            <Activity size={12} className="animate-pulse" />
            System Online
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto ${activeTab === 'logs' ? 'p-6' : 'p-6'}`}>
          <TabComponent />
        </div>
      </div>
    </motion.div>
  )
}
