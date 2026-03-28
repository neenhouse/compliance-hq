import { monitoringEvents, soc2Controls } from '../lib/mock-data.ts'

export default function MonitoringPage() {
  const total = soc2Controls.length
  const compliant = soc2Controls.filter((c) => c.status === 'compliant').length
  const complianceScore = Math.round((compliant / total) * 100)
  const driftCount = monitoringEvents.length

  const passingToDrift = monitoringEvents.filter(
    (e) => e.previousStatus === 'compliant' && e.currentStatus !== 'compliant',
  ).length

  return (
    <div>
      <div className="page-header">
        <h1>Continuous Monitoring</h1>
        <p>Track compliance drift and configuration changes in real-time.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Compliance Score</div>
          <div className="stat-value stat-value--success">{complianceScore}%</div>
          <div className="progress-bar" style={{ marginTop: 'var(--space-sm)' }}>
            <div
              className={`progress-fill ${complianceScore >= 80 ? 'progress-fill--success' : complianceScore >= 60 ? 'progress-fill--warning' : 'progress-fill--danger'}`}
              style={{ width: `${complianceScore}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Drift Alerts</div>
          <div className="stat-value stat-value--warning">{driftCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Newly Drifted</div>
          <div className="stat-value stat-value--danger">{passingToDrift}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Controls Passing</div>
          <div className="stat-value stat-value--success">{compliant}/{total}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Drift Timeline</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Control</th>
                <th>Previous Status</th>
                <th>Current Status</th>
                <th>Detected</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {monitoringEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div style={{ color: 'var(--color-text-strong)', fontWeight: 500 }}>
                      {event.controlName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text)' }}>
                      {event.controlId}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge--${event.previousStatus}`}>
                      {event.previousStatus.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge--${event.currentStatus}`}>
                      {event.currentStatus.replace('-', ' ')}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                    {new Date(event.detectedAt).toLocaleDateString()}
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text)' }}>
                      {new Date(event.detectedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8125rem', maxWidth: '400px' }}>
                    {event.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-lg)' }}>
        <div className="card">
          <div className="card-header">
            <h2>Compliance Score History</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'end', gap: '3px', height: '120px' }}>
              {[82, 85, 83, 80, 78, 77, 75, 73, 72, 70, 68, complianceScore].map((score, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${score}%`,
                    background: score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-danger)',
                    borderRadius: '3px 3px 0 0',
                    opacity: i === 11 ? 1 : 0.4 + (i * 0.05),
                    transition: 'height 0.3s ease',
                  }}
                  title={`${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}: ${score}%`}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-sm)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
              <span>Jan</span>
              <span>Mar</span>
              <span>Jun</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
