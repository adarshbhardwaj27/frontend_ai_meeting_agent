import { Link } from 'react-router-dom'
import { Zap, Github, Linkedin, Twitter } from 'lucide-react'

const FOOTER_LINKS = {
  Product:  ['Features', 'How It Works', 'Integrations', 'Changelog'],
  Company:  ['About', 'Blog', 'Careers', 'Press'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Policy'],
  Support:  ['Documentation', 'API Reference', 'Status', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-sky-400 flex items-center justify-center">
                <Zap size={15} className="text-navy-900" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white">MeetMind AI</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 max-w-[200px]">
              Real-time AI meeting intelligence. Joins your call, listens, and speaks up when it matters.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-navy-700 border border-white/8 flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-500/40 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-300 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 MeetMind AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-xs text-gray-600 hover:text-teal-400 transition-colors">
              Admin Portal
            </Link>
            <span className="text-xs text-gray-700">
              Built with GPT-4, Recall.ai, ElevenLabs
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
