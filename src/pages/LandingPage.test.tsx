import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage.tsx'

describe('LandingPage', () => {
  it('renders the hero heading', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Compliance on autopilot')).toBeInTheDocument()
  })

  it('renders all four framework cards', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('SOC 2')).toBeInTheDocument()
    expect(screen.getByText('HIPAA')).toBeInTheDocument()
    expect(screen.getByText('GDPR')).toBeInTheDocument()
    expect(screen.getByText('ISO 27001')).toBeInTheDocument()
  })

  it('renders all eight feature cards', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Framework Selector')).toBeInTheDocument()
    expect(screen.getByText('Control Library')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure Mapping')).toBeInTheDocument()
    expect(screen.getByText('Evidence Collection')).toBeInTheDocument()
    expect(screen.getByText('Gap Analysis')).toBeInTheDocument()
    expect(screen.getByText('Policy Generator')).toBeInTheDocument()
    expect(screen.getByText('Continuous Monitoring')).toBeInTheDocument()
    expect(screen.getByText('Vendor Risk Assessment')).toBeInTheDocument()
  })

  it('renders pricing tiers', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
    expect(screen.getByText('$499/mo')).toBeInTheDocument()
    expect(screen.getByText('$1,499/mo')).toBeInTheDocument()
  })

  it('renders the CTA buttons', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('View Demo')).toBeInTheDocument()
  })
})
