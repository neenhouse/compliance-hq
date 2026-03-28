import { useState } from 'react'
import { gapItems } from '../lib/mock-data.ts'
import type { Severity } from '../lib/types.ts'

const severities: Severity[] = ['critical', 'high', 'medium', 'low']

export default function GapsPage() {
  const [severityFilter, setSeverityFilter] = useState<Severity | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = severityFilter
    ? gapItems.filter((g) => g.severity === severityFilter)
    : gapItems

  const bySeverity = (s: Severity) => gapItems.filter((g) => g.severity === s).length

  return (
    <div>
      <div className="page-header">
        <h1>Gap Analysis</h1>
        <p>
          {gapItems.length} controls require attention. Review gaps and follow
          remediation steps.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Gaps</div>
          <div className="stat-value stat-value--danger">{gapItems.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Critical</div>
          <div className="stat-value" style={{ color: 'var(--color-danger)' }}>
            {bySeverity('critical')}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">High</div>
          <div className="stat-value" style={{ color: '#f97316' }}>
            {bySeverity('high')}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Medium</div>
          <div className="stat-value stat-value--warning">{bySeverity('medium')}</div>
        </div>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-pill ${severityFilter === null ? 'filter-pill--active' : ''}`}
          onClick={() => setSeverityFilter(null)}
        >
          All Gaps
        </button>
        {severities.map((s) => (
          <button
            key={s}
            className={`filter-pill ${severityFilter === s ? 'filter-pill--active' : ''}`}
            onClick={() => setSeverityFilter(s === severityFilter ? null : s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({bySeverity(s)})
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {filtered.map((gap) => {
          const isExpanded = expandedId === gap.controlId
          return (
            <div key={gap.controlId} className="card">
              <div
                className="card-header"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedId(isExpanded ? null : gap.controlId)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span className={`badge badge--${gap.severity}`}>{gap.severity}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-strong)' }}>
                      <code style={{ marginRight: '8px' }}>{gap.controlId}</code>
                      {gap.controlName}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      {gap.category} &mdash; {gap.reason}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Est. {gap.estimatedEffort}
                  </span>
                  <span style={{ color: 'var(--color-text)', fontSize: '1.25rem' }}>
                    {isExpanded ? '\u25B2' : '\u25BC'}
                  </span>
                </div>
              </div>
              {isExpanded && (
                <div className="card-body">
                  <h4 style={{ marginBottom: 'var(--space-md)' }}>Remediation Steps</h4>
                  <ol
                    style={{
                      paddingLeft: 'var(--space-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-sm)',
                    }}
                  >
                    {gap.remediationSteps.map((step, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--color-text-strong)',
                          lineHeight: 1.6,
                        }}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div
                    style={{
                      marginTop: 'var(--space-lg)',
                      display: 'flex',
                      gap: 'var(--space-md)',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      Estimated Effort: <strong>{gap.estimatedEffort}</strong>
                    </span>
                    <button className="btn btn-sm btn-primary">Mark as In Progress</button>
                    <button className="btn btn-sm btn-secondary">Assign</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
