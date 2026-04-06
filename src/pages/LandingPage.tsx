import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const frameworks = [
  { name: 'SOC 2', controls: 30 },
  { name: 'HIPAA', controls: 54 },
  { name: 'GDPR', controls: 42 },
  { name: 'ISO 27001', controls: 93 },
]

const features = [
  {
    title: 'Framework Selector',
    description:
      'Interactive wizard to identify which compliance frameworks apply to your business.',
  },
  {
    title: 'Control Library',
    description:
      'Unified control library with cross-framework mapping across SOC2, HIPAA, GDPR, and ISO27001.',
  },
  {
    title: 'Infrastructure Mapping',
    description:
      'Connect your cloud infrastructure and automatically map controls to existing systems.',
  },
  {
    title: 'Evidence Collection',
    description:
      'Automated evidence gathering from connected integrations with review workflows.',
  },
  {
    title: 'Gap Analysis',
    description:
      'Identify unmet controls with risk-prioritized remediation steps and progress tracking.',
  },
  {
    title: 'Policy Generator',
    description:
      'AI-powered policy document generation tailored to your organization and frameworks.',
  },
  {
    title: 'Continuous Monitoring',
    description:
      'Real-time compliance posture monitoring with drift detection and automated alerts.',
  },
  {
    title: 'Vendor Risk Assessment',
    description:
      'Assess and monitor third-party vendor compliance risk across your supply chain.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="landing-header">
        <nav className="landing-nav">
          <span className="landing-logo">ComplianceHQ</span>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#frameworks">Frameworks</a>
            <a href="#pricing">Pricing</a>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/app')}
            >
              Open Dashboard
            </button>
          </div>
        </nav>
      </header>

      <section id="main-content" className="hero">
        <div className="hero-content">
          <div className="hero-badge">Trusted by 500+ engineering teams</div>
          <h1>Compliance on autopilot</h1>
          <p className="hero-sub">
            SOC 2, HIPAA, GDPR, and ISO 27001 in one platform. Stop wasting
            engineering time on spreadsheets and start shipping with confidence.
          </p>
          <div className="hero-cta">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/app/frameworks')}
            >
              Get Started
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/app')}
            >
              View Demo
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-frame">
            <img src="/hero-og.webp" alt="" fetchPriority="high" />
            <div className="hero-visual-accent" />
          </div>
        </div>
      </section>

      <section id="frameworks" className="frameworks">
        <h2>Supported Frameworks</h2>
        <div className="framework-grid">
          {frameworks.map((fw) => (
            <div key={fw.name} className="framework-card">
              <h3>{fw.name}</h3>
              <p className="framework-controls">{fw.controls} controls</p>
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
