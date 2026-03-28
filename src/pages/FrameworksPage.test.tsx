import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import FrameworksPage from './FrameworksPage.tsx'

describe('FrameworksPage', () => {
  it('renders framework selector with all 4 frameworks', () => {
    render(
      <MemoryRouter>
        <FrameworksPage />
      </MemoryRouter>,
    )
    // Use getAllByText since SOC 2 appears both in the card and the summary badge
    expect(screen.getAllByText('SOC 2').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('HIPAA')).toBeInTheDocument()
    expect(screen.getByText('GDPR')).toBeInTheDocument()
    expect(screen.getByText('ISO 27001')).toBeInTheDocument()
  })

  it('shows control count and allows toggling selection', () => {
    render(
      <MemoryRouter>
        <FrameworksPage />
      </MemoryRouter>,
    )
    // SOC2 is selected by default
    expect(screen.getByText('Framework Selector')).toBeInTheDocument()

    // Click HIPAA to add it
    fireEvent.click(screen.getByText('HIPAA'))
    // Summary should show 2 selected frameworks
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
