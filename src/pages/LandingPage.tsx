import './LandingPage.css'

const frameworks = [
  { name: 'SOC2', description: 'Service Organization Control 2' },
  { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
  { name: 'GDPR', description: 'General Data Protection Regulation' },
  { name: 'ISO27001', description: 'Information Security Management System' },
]

const features = [
  {
    title: 'Framework Selector',
    description: 'Interactive wizard to identify which compliance frameworks apply to your business.',
  },
  {
    title: 'Control Library',
    description: 'Unified control library with cross-framework mapping across SOC2, HIPAA, GDPR, and ISO27001.',
  },
  {
    title: 'Infrastructure Mapping',
    description: 'Connect your cloud infrastructure and automatically map controls to existing systems.',
  },
  {
    title: 'Evidence Collection',
    description: 'Automated evidence gathering from connected integrations with review workflows.',
  },
  {
    title: 'Gap Analysis',
    description: 'Identify unmet controls with risk-prioritized remediation steps and progress tracking.',
  },
  {
    title: 'Policy Generator',
    description: 'AI-powered policy document generation tailored to your organization and frameworks.',
  },
  {
    title: 'Continuous Monitoring',
    description: 'Real-time compliance posture monitoring with drift detection and automated alerts.',
  },
  {
    title: 'Vendor Risk Assessment',
    description: 'Assess and monitor third-party vendor compliance risk across your supply chain.',
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landing-header">
        <nav className="landing-nav">
          <span className="landing-logo">ComplianceHQ</span>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#frameworks">Frameworks</a>
            <a href="#pricing">Pricing</a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>Automated Compliance for Software Teams</h1>
        <p className="hero-sub">
          SOC2, HIPAA, GDPR, and ISO27001 in one platform. Stop wasting engineering
          time on spreadsheets and start shipping with confidence.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">View Demo</button>
        </div>
      </section>

      <section id="frameworks" className="frameworks">
        <h2>Supported Frameworks</h2>
        <div className="framework-grid">
          {frameworks.map((fw) => (
            <div key={fw.name} className="framework-card">
              <h3>{fw.name}</h3>
              <p>{fw.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="features">
        <h2>Everything You Need for Compliance</h2>
        <div className="feature-grid">
          {features.map((feat) => (
            <div key={feat.title} className="feature-card">
              <h4>{feat.title}</h4>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricing">
        <h2>Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">$499/mo</p>
            <ul>
              <li>1 framework</li>
              <li>Up to 50 controls</li>
              <li>2 integrations</li>
              <li>Basic evidence collection</li>
            </ul>
          </div>
          <div className="pricing-card pricing-card--featured">
            <h3>Pro</h3>
            <p className="price">$1,499/mo</p>
            <ul>
              <li>All 4 frameworks</li>
              <li>Unlimited controls</li>
              <li>10 integrations</li>
              <li>Policy generator</li>
              <li>Gap analysis</li>
              <li>Continuous monitoring</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Custom</p>
            <ul>
              <li>Everything in Pro</li>
              <li>Unlimited integrations</li>
              <li>Vendor risk assessment</li>
              <li>Dedicated support</li>
              <li>Custom SLA</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 ComplianceHQ. All rights reserved.</p>
      </footer>
    </div>
  )
}
