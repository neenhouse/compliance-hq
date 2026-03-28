import { useState } from 'react'
import { vendors as initialVendors } from '../lib/mock-data.ts'
import type { Vendor } from '../lib/types.ts'

function calcOverallRisk(security: number, privacy: number, availability: number): Vendor['overallRisk'] {
  const avg = (security + privacy + availability) / 3
  if (avg >= 85) return 'low'
  if (avg >= 70) return 'medium'
  if (avg >= 55) return 'high'
  return 'critical'
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: '',
    category: '',
    securityScore: 70,
    privacyScore: 70,
    availabilityScore: 70,
  })

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.category) return
    const vendor: Vendor = {
      id: `v-${Date.now()}`,
      name: newVendor.name,
      category: newVendor.category,
      securityScore: newVendor.securityScore,
      privacyScore: newVendor.privacyScore,
      availabilityScore: newVendor.availabilityScore,
      overallRisk: calcOverallRisk(
        newVendor.securityScore,
        newVendor.privacyScore,
        newVendor.availabilityScore,
      ),
      lastReviewed: new Date().toISOString().slice(0, 10),
      nextReview: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
    }
    setVendors((prev) => [...prev, vendor])
    setNewVendor({ name: '', category: '', securityScore: 70, privacyScore: 70, availabilityScore: 70 })
    setShowAddForm(false)
  }

  const avgScore = (v: Vendor) =>
    Math.round((v.securityScore + v.privacyScore + v.availabilityScore) / 3)

  const lowCount = vendors.filter((v) => v.overallRisk === 'low').length
  const medCount = vendors.filter((v) => v.overallRisk === 'medium').length
  const highCount = vendors.filter((v) => v.overallRisk === 'high' || v.overallRisk === 'critical').length

  return (
    <div>
      <div className="page-header">
        <h1>Vendor Risk Assessment</h1>
        <p>Assess and monitor third-party vendor compliance risk.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Vendors</div>
          <div className="stat-value stat-value--primary">{vendors.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Risk</div>
          <div className="stat-value stat-value--success">{lowCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Medium Risk</div>
          <div className="stat-value stat-value--warning">{medCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">High Risk</div>
          <div className="stat-value stat-value--danger">{highCount}</div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Vendor'}
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="card-header">
            <h2>New Vendor</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
              <div className="form-group">
                <label className="form-label">Vendor Name</label>
                <input
                  className="form-input"
                  placeholder="e.g., Twilio"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  className="form-input"
                  placeholder="e.g., Communications"
                  value={newVendor.category}
                  onChange={(e) => setNewVendor((p) => ({ ...p, category: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Security Score (0-100)</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  max={100}
                  value={newVendor.securityScore}
                  onChange={(e) => setNewVendor((p) => ({ ...p, securityScore: Number(e.target.value) }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Privacy Score (0-100)</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  max={100}
                  value={newVendor.privacyScore}
                  onChange={(e) => setNewVendor((p) => ({ ...p, privacyScore: Number(e.target.value) }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Availability Score (0-100)</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  max={100}
                  value={newVendor.availabilityScore}
                  onChange={(e) => setNewVendor((p) => ({ ...p, availabilityScore: Number(e.target.value) }))}
                />
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-lg)' }}>
              <button className="btn btn-primary" onClick={handleAddVendor}>
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Category</th>
                <th>Security</th>
                <th>Privacy</th>
                <th>Availability</th>
                <th>Overall Score</th>
                <th>Risk Level</th>
                <th>Last Reviewed</th>
                <th>Next Review</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td style={{ color: 'var(--color-text-strong)', fontWeight: 500 }}>
                    {vendor.name}
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{vendor.category}</td>
                  <td>
                    <div className={`score-circle score-circle--${vendor.securityScore >= 85 ? 'low' : vendor.securityScore >= 70 ? 'medium' : 'high'}`}>
                      {vendor.securityScore}
                    </div>
                  </td>
                  <td>
                    <div className={`score-circle score-circle--${vendor.privacyScore >= 85 ? 'low' : vendor.privacyScore >= 70 ? 'medium' : 'high'}`}>
                      {vendor.privacyScore}
                    </div>
                  </td>
                  <td>
                    <div className={`score-circle score-circle--${vendor.availabilityScore >= 85 ? 'low' : vendor.availabilityScore >= 70 ? 'medium' : 'high'}`}>
                      {vendor.availabilityScore}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text-strong)' }}>
                      {avgScore(vendor)}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge--${vendor.overallRisk}`}>
                      {vendor.overallRisk}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{vendor.lastReviewed}</td>
                  <td style={{ fontSize: '0.8125rem' }}>{vendor.nextReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
