import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import MonitoringPage from './MonitoringPage.tsx'

function renderMonitoring() {
  return render(
    <MemoryRouter>
      <MonitoringPage />
    </MemoryRouter>,
  )
}

describe('MonitoringPage', () => {
  it('renders the page heading', () => {
    renderMonitoring()
    expect(screen.getByText('Continuous Monitoring')).toBeInTheDocument()
  })

  it('shows compliance score stat card', () => {
    renderMonitoring()
    expect(screen.getByText('Compliance Score')).toBeInTheDocument()
  })

  it('shows drift alert stat cards', () => {
    renderMonitoring()
    expect(screen.getByText('Drift Alerts')).toBeInTheDocument()
    expect(screen.getByText('Newly Drifted')).toBeInTheDocument()
    expect(screen.getByText('Controls Passing')).toBeInTheDocument()
  })

  it('renders the drift timeline table', () => {
    renderMonitoring()
    expect(screen.getByText('Drift Timeline')).toBeInTheDocument()
    expect(screen.getByText('Control')).toBeInTheDocument()
    expect(screen.getByText('Previous Status')).toBeInTheDocument()
    expect(screen.getByText('Current Status')).toBeInTheDocument()
  })

  it('renders the compliance score history chart', () => {
    renderMonitoring()
    expect(screen.getByText('Compliance Score History')).toBeInTheDocument()
  })
})
