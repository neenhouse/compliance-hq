import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'

const navItems = [
  { to: '/app', label: 'Dashboard', end: true },
  { to: '/app/frameworks', label: 'Frameworks' },
  { to: '/app/controls', label: 'Controls' },
  { to: '/app/evidence', label: 'Evidence' },
  { to: '/app/gaps', label: 'Gap Analysis' },
  { to: '/app/policies', label: 'Policies' },
  { to: '/app/monitoring', label: 'Monitoring' },
  { to: '/app/vendors', label: 'Vendors' },
]

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="app-layout">
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {mobileOpen ? (
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          ) : (
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-brand">
          <NavLink to="/" className="sidebar-logo">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
              <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" fill="#3b82f6" opacity="0.2"/>
              <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="#3b82f6" strokeWidth="3" fill="none"/>
              <path d="M16 24l5 5 11-11" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            ComplianceHQ
          </NavLink>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' sidebar-link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
            ComplianceHQ v1.0
          </div>
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
