import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import Sidebar       from '../components/dashboard/Sidebar'
import MeetingsTab   from '../components/dashboard/MeetingsTab'
import LogViewer     from '../components/dashboard/LogViewer'
import MicrosoftTab  from '../components/dashboard/MicrosoftTab'

const TABS = {
  meetings:  MeetingsTab,
  logs:      LogViewer,
  microsoft: MicrosoftTab,
}

const TAB_TITLES = {
  meetings:  { title: 'Meeting Control',   sub: 'Deploy, monitor, and control your AI bots' },
  logs:      { title: 'Debug Logs',        sub: 'Real-time bot events and diagnostics' },
  microsoft: { title: 'Microsoft 365',     sub: 'Auto-join calendar meetings and configure join rules' },
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('meetings')
  const [searchParams, setSearchParams] = useSearchParams()

  // Handle OAuth callback redirects (?m365=connected / ?m365=error)
  const m365Param = searchParams.get('m365')
  const flashConnected = m365Param === 'connected'
  useEffect(() => {
    if (m365Param) {
      setActiveTab('microsoft')
      setSearchParams({}, { replace: true })  // clean the URL
    }
  }, [m365Param]) // eslint-disable-line

  const TabComponent = TABS[activeTab] ?? MeetingsTab
  const { title, sub } = TAB_TITLES[activeTab] ?? TAB_TITLES.meetings

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
            <h1 className="text-base font-bold text-white">{title}</h1>
            <p className="text-xs text-gray-500">{sub}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full">
            <Activity size={12} className="animate-pulse" />
            System Online
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <TabComponent flashConnected={flashConnected} />
        </div>
      </div>
    </motion.div>
  )
}
