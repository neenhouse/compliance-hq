import { useState } from 'react'
import { policyTemplates } from '../lib/mock-data.ts'
import type { PolicyTemplate, PolicyVariable } from '../lib/types.ts'

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyTemplate | null>(null)
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)

  const selectPolicy = (policy: PolicyTemplate) => {
    setSelectedPolicy(policy)
    const vars: Record<string, string> = {}
    policy.variables.forEach((v: PolicyVariable) => {
      vars[v.key] = v.value
    })
    vars['date'] = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    setVariables(vars)
    setShowPreview(false)
  }

  const updateVariable = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }))
  }

  const renderPreview = () => {
    if (!selectedPolicy) return ''
    let content = selectedPolicy.templateContent
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value || `[${key}]`)
    })
    return content
  }

  const handleDownload = () => {
    const content = renderPreview()
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedPolicy?.name.toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="page-header">
        <h1>Policy Generator</h1>
        <p>Generate professional compliance policy documents from templates.</p>
      </div>

      {!selectedPolicy ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
          {policyTemplates.map((policy) => (
            <div key={policy.id} className="card" style={{ cursor: 'pointer' }} onClick={() => selectPolicy(policy)}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                  <span className="badge badge--collected">{policy.category}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-sm)' }}>{policy.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>{policy.description}</p>
                <div style={{ marginTop: 'var(--space-md)', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  {policy.variables.length} variables to fill
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedPolicy(null); setShowPreview(false) }}>
              Back to Templates
            </button>
            <h2 style={{ fontSize: '1.25rem' }}>{selectedPolicy.name}</h2>
          </div>

          {!showPreview ? (
            <div className="card">
              <div className="card-header">
                <h2>Fill Template Variables</h2>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                  {selectedPolicy.variables.map((v: PolicyVariable) => (
                    <div key={v.key} className="form-group">
                      <label className="form-label">{v.label}</label>
                      <input
                        className="form-input"
                        placeholder={v.placeholder}
                        value={variables[v.key] ?? ''}
                        onChange={(e) => updateVariable(v.key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)' }}>
                  <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
                    Preview Document
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowPreview(false)}>
                  Edit Variables
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleDownload}>
                  Download Markdown
                </button>
              </div>
              <div className="card">
                <div className="card-body">
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.8,
                      color: 'var(--color-text-strong)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {renderPreview()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
