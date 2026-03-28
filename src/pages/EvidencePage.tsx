import { useState } from 'react'
import { soc2Controls } from '../lib/mock-data.ts'
import type { EvidenceStatus } from '../lib/types.ts'

const evidenceStatuses: (EvidenceStatus | 'all')[] = ['all', 'collected', 'missing', 'stale']

export default function EvidencePage() {
  const [filter, setFilter] = useState<EvidenceStatus | 'all'>('all')
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)

  const controlsWithEvidence = soc2Controls.map((c) => ({
    ...c,
    evidenceStatus: c.evidence?.status ?? ('missing' as EvidenceStatus),
  }))

  const filtered =
    filter === 'all'
      ? controlsWithEvidence
      : controlsWithEvidence.filter((c) => c.evidenceStatus === filter)

  const collected = controlsWithEvidence.filter((c) => c.evidenceStatus === 'collected').length
  const missing = controlsWithEvidence.filter((c) => c.evidenceStatus === 'missing').length
  const stale = controlsWithEvidence.filter((c) => c.evidenceStatus === 'stale').length
  const coverage = Math.round((collected / controlsWithEvidence.length) * 100)

  return (
    <div>
      <div className="page-header">
        <h1>Evidence Collection</h1>
        <p>Track and manage compliance evidence for each control.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Coverage</div>
          <div className="stat-value stat-value--primary">{coverage}%</div>
          <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
            <div
              className="progress-fill progress-fill--primary"
              style={{ width: `${coverage}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Collected</div>
          <div className="stat-value stat-value--success">{collected}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Missing</div>
          <div className="stat-value stat-value--danger">{missing}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Stale</div>
          <div className="stat-value stat-value--warning">{stale}</div>
        </div>
      </div>

      <div className="filter-bar">
        {evidenceStatuses.map((s) => (
          <button
            key={s}
            className={`filter-pill ${filter === s ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? 'All Controls' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Control</th>
                <th>Category</th>
                <th>Evidence Status</th>
                <th>Type</th>
                <th>Source</th>
                <th>Collected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ color: 'var(--color-text-strong)', fontWeight: 500 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text)' }}>{c.id}</div>
                  </td>
                  <td>{c.category}</td>
                  <td>
                    <span className={`badge badge--${c.evidenceStatus}`}>
                      {c.evidenceStatus}
                    </span>
                  </td>
                  <td>
                    {c.evidence ? (
                      <span className={`badge badge--${c.evidence.type}`}>{c.evidence.type}</span>
                    ) : (
                      <span style={{ color: 'var(--color-text)', fontSize: '0.8125rem' }}>--</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>
                    {c.evidence?.source ?? '--'}
                    {c.evidence?.fileName && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text)' }}>
                        {c.evidence.fileName}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>
                    {c.evidence
                      ? new Date(c.evidence.collectedAt).toLocaleDateString()
                      : '--'}
                  </td>
                  <td>
                    {uploadingFor === c.id ? (
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
                        <input
                          type="file"
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text)',
                            width: '140px',
                          }}
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setUploadingFor(null)}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setUploadingFor(c.id)}
                      >
                        Upload
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
