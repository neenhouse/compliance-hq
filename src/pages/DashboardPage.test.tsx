import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DashboardPage from './DashboardPage.tsx'

describe('DashboardPage', () => {
  it('renders dashboard with compliance score', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Compliance Score')).toBeInTheDocument()
  })

  it('shows stat cards for total controls, compliant, and gaps', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Total Controls')).toBeInTheDocument()
    expect(screen.getByText('Compliant')).toBeInTheDocument()
    expect(screen.getByText('Gaps')).toBeInTheDocument()
    expect(screen.getByText('Evidence Collected')).toBeInTheDocument()
    expect(screen.getByText('Drift Alerts')).toBeInTheDocument()
  })

  it('renders compliance by category section', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Compliance by Category')).toBeInTheDocument()
    expect(screen.getByText('Access Control')).toBeInTheDocument()
  })
})
