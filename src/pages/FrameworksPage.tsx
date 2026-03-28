import { useState } from 'react'
import { frameworks } from '../lib/mock-data.ts'
import type { FrameworkId } from '../lib/types.ts'
import './FrameworksPage.css'

export default function FrameworksPage() {
  const [selected, setSelected] = useState<Set<FrameworkId>>(new Set(['soc2']))

  const toggle = (id: FrameworkId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const totalControls = frameworks
    .filter((fw) => selected.has(fw.id))
    .reduce((sum, fw) => sum + fw.controlCount, 0)

  return (
    <div>
      <div className="page-header">
        <h1>Framework Selector</h1>
        <p>
          Select the compliance frameworks that apply to your organization. You
          can select one or multiple.
        </p>
      </div>

      <div className="fw-selector-grid">
        {frameworks.map((fw) => {
          const isSelected = selected.has(fw.id)
          return (
            <button
              key={fw.id}
              className={`fw-card ${isSelected ? 'fw-card--selected' : ''}`}
              onClick={() => toggle(fw.id)}
              type="button"
            >
              <div className="fw-card-check">
                {isSelected ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" rx="4" fill="var(--color-primary)" />
                    <path
                      d="M6 10l3 3 5-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="0.5"
                      y="0.5"
                      width="19"
                      height="19"
                      rx="3.5"
                      stroke="var(--color-border)"
                    />
                  </svg>
                )}
              </div>
              <div className="fw-card-name">{fw.name}</div>
              <div className="fw-card-full">{fw.fullName}</div>
              <div className="fw-card-count">{fw.controlCount} controls</div>
              <p className="fw-card-desc">{fw.description}</p>
            </button>
          )
        })}
      </div>

      <div className="fw-summary">
        <div className="fw-summary-stat">
          <span className="fw-summary-label">Selected Frameworks</span>
          <span className="fw-summary-value">{selected.size}</span>
        </div>
        <div className="fw-summary-stat">
          <span className="fw-summary-label">Total Controls</span>
          <span className="fw-summary-value">{totalControls}</span>
        </div>
        <div className="fw-summary-frameworks">
          {frameworks
            .filter((fw) => selected.has(fw.id))
            .map((fw) => (
              <span key={fw.id} className="badge badge--collected">
                {fw.name}
              </span>
            ))}
          {selected.size === 0 && (
            <span style={{ color: 'var(--color-text)', fontSize: '0.875rem' }}>
              No frameworks selected
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
