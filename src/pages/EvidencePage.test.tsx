import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import EvidencePage from './EvidencePage.tsx'

function renderEvidence() {
  return render(
    <MemoryRouter>
      <EvidencePage />
    </MemoryRouter>,
  )
}

describe('EvidencePage', () => {
  it('renders the page heading', () => {
    renderEvidence()
    expect(screen.getByText('Evidence Collection')).toBeInTheDocument()
  })

  it('shows coverage stats', () => {
    renderEvidence()
    expect(screen.getByText('Coverage')).toBeInTheDocument()
    // These labels appear multiple times (stat cards, filter buttons, table header)
    expect(screen.getAllByText('Collected').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Missing').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Stale').length).toBeGreaterThanOrEqual(1)
  })

  it('renders filter pills for evidence status', () => {
    renderEvidence()
    expect(screen.getByText('All Controls')).toBeInTheDocument()
    // Filter pills exist alongside stat labels
    expect(screen.getAllByText('Collected').length).toBeGreaterThanOrEqual(2)
  })

  it('filters controls by evidence status', () => {
    renderEvidence()
    // Click the filter pill button (not the stat label)
    const filterPills = screen.getAllByText('Missing')
    const pillButton = filterPills.find((el) => el.tagName === 'BUTTON')
    fireEvent.click(pillButton!)
    // After filtering, only missing controls should show
    const badges = screen.getAllByText('missing')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('shows upload button for each control', () => {
    renderEvidence()
    const uploadButtons = screen.getAllByText('Upload')
    expect(uploadButtons.length).toBeGreaterThan(0)
  })
})
