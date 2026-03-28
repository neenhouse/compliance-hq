import { Fragment, useState } from 'react'
import { soc2Controls } from '../lib/mock-data.ts'
import type { ControlStatus } from '../lib/types.ts'

const categories = [...new Set(soc2Controls.map((c) => c.category))]
const statuses: ControlStatus[] = ['compliant', 'non-compliant', 'partial', 'not-assessed']

export default function ControlsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ControlStatus | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = soc2Controls.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    if (categoryFilter && c.category !== categoryFilter) return false
    if (statusFilter && c.status !== statusFilter) return false
    return true
  })

  return (
    <div>
      <div className="page-header">
        <h1>Control Library</h1>
        <p>SOC 2 controls mapped to your infrastructure. <span>{soc2Controls.length} total controls.</span></p>
      </div>

      <div className="filter-bar">
        <input
          className="search-input"
          placeholder="Search controls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`filter-pill ${categoryFilter === null ? 'filter-pill--active' : ''}`}
          onClick={() => setCategoryFilter(null)}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${categoryFilter === cat ? 'filter-pill--active' : ''}`}
            onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)', marginRight: '4px' }}>
          Status:
        </span>
        <button
          className={`filter-pill ${statusFilter === null ? 'filter-pill--active' : ''}`}
          onClick={() => setStatusFilter(null)}
        >
          All
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            className={`filter-pill ${statusFilter === s ? 'filter-pill--active' : ''}`}
            onClick={() => setStatusFilter(s === statusFilter ? null : s)}
          >
            {s.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Control</th>
                <th>Category</th>
                <th>Status</th>
                <th>Infrastructure</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((control) => (
                <Fragment key={control.id}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpandedId(expandedId === control.id ? null : control.id)}
                  >
                    <td>
                      <code>{control.id}</code>
                    </td>
                    <td style={{ color: 'var(--color-text-strong)' }}>{control.name}</td>
                    <td>{control.category}</td>
                    <td>
                      <span className={`badge badge--${control.status}`}>
                        {control.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      {control.infrastructureMapping ? (
                        <span style={{ fontSize: '0.8125rem' }}>
                          <strong>{control.infrastructureMapping.tool}</strong> &rarr;{' '}
                          {control.infrastructureMapping.resource}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-text)', fontSize: '0.8125rem' }}>
                          Not mapped
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge--${control.severity}`}>{control.severity}</span>
                    </td>
                  </tr>
                  {expandedId === control.id && (
                    <tr>
                      <td colSpan={6} style={{ background: 'var(--color-bg-elevated)', padding: 'var(--space-lg)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                          <div>
                            <h4 style={{ marginBottom: 'var(--space-sm)' }}>Description</h4>
                            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{control.description}</p>
                          </div>
                          <div>
                            <h4 style={{ marginBottom: 'var(--space-sm)' }}>Infrastructure Mapping</h4>
                            {control.infrastructureMapping ? (
                              <div style={{ fontSize: '0.875rem' }}>
                                <p>
                                  <strong>Tool:</strong> {control.infrastructureMapping.tool}
                                </p>
                                <p>
                                  <strong>Resource:</strong> {control.infrastructureMapping.resource}
                                </p>
                                <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text)' }}>
                                  {control.infrastructureMapping.description}
                                </p>
                              </div>
                            ) : (
                              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>
                                No infrastructure mapping configured. This control requires manual
                                mapping.
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-md)', fontSize: '0.8125rem', color: 'var(--color-text)' }}>
        Showing {filtered.length} of {soc2Controls.length} controls
      </div>
    </div>
  )
}
