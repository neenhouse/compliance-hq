import { useNavigate } from 'react-router-dom'
import { soc2Controls, monitoringEvents, vendors } from '../lib/mock-data.ts'

export default function DashboardPage() {
  const navigate = useNavigate()
  const total = soc2Controls.length
  const compliant = soc2Controls.filter((c) => c.status === 'compliant').length
  const gaps = soc2Controls.filter(
    (c) => c.status === 'non-compliant' || c.status === 'partial',
  ).length
  const evidenceCollected = soc2Controls.filter(
    (c) => c.evidence?.status === 'collected',
  ).length
  const complianceScore = Math.round((compliant / total) * 100)
  const driftCount = monitoringEvents.length
  const highRiskVendors = vendors.filter(
    (v) => v.overallRisk === 'high' || v.overallRisk === 'critical',
  ).length

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>SOC 2 compliance overview for your organization</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Compliance Score</div>
          <div className="stat-value stat-value--success">{complianceScore}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Controls</div>
          <div className="stat-value stat-value--primary">{total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Compliant</div>
          <div className="stat-value stat-value--success">{compliant}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gaps</div>
          <div className="stat-value stat-value--danger">{gaps}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Evidence Collected</div>
          <div className="stat-value stat-value--primary">{evidenceCollected}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Drift Alerts</div>
          <div className="stat-value stat-value--warning">{driftCount}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
        <div className="card">
          <div className="card-header">
            <h2>Compliance by Category</h2>
          </div>
          <div className="card-body">
            {Object.entries(
              soc2Controls.reduce<Record<string, { total: number; compliant: number }>>(
                (acc, c) => {
                  if (!acc[c.category]) acc[c.category] = { total: 0, compliant: 0 }
                  acc[c.category].total++
                  if (c.status === 'compliant') acc[c.category].compliant++
                  return acc
                },
                {},
              ),
            ).map(([cat, data]) => {
              const pct = Math.round((data.compliant / data.total) * 100)
              return (
                <div key={cat} style={{ marginBottom: 'var(--space-md)' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                      fontSize: '0.875rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-strong)' }}>{cat}</span>
                    <span>
                      {data.compliant}/{data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${pct === 100 ? 'progress-fill--success' : pct >= 50 ? 'progress-fill--warning' : 'progress-fill--danger'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Recent Drift Alerts</h2>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate('/app/monitoring')}>
              View All
            </button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Status</th>
                  <th>Detected</th>
                </tr>
              </thead>
              <tbody>
                {monitoringEvents.slice(0, 4).map((evt) => (
                  <tr key={evt.id}>
                    <td style={{ color: 'var(--color-text-strong)' }}>{evt.controlName}</td>
                    <td>
                      <span className={`badge badge--${evt.currentStatus}`}>
                        {evt.currentStatus}
                      </span>
                    </td>
                    <td>{new Date(evt.detectedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-lg)' }}>
        <div className="card">
          <div className="card-header">
            <h2>Vendor Risk Summary</h2>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate('/app/vendors')}>
              Manage Vendors
            </button>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                  Total Vendors
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-strong)' }}>
                  {vendors.length}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>Low Risk</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                  {vendors.filter((v) => v.overallRisk === 'low').length}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>Medium Risk</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)' }}>
                  {vendors.filter((v) => v.overallRisk === 'medium').length}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>High Risk</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-danger)' }}>
                  {highRiskVendors}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
