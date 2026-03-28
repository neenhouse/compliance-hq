import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import GapsPage from './GapsPage.tsx'

describe('GapsPage', () => {
  it('renders gap analysis with gap count', () => {
    render(
      <MemoryRouter>
        <GapsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Gap Analysis')).toBeInTheDocument()
    // There should be gaps listed
    expect(screen.getByText(/controls require attention/)).toBeInTheDocument()
  })

  it('expands a gap to show remediation steps', () => {
    render(
      <MemoryRouter>
        <GapsPage />
      </MemoryRouter>,
    )
    // Click the first gap card header to expand
    const firstGapHeader = screen.getByText('Privileged access management')
    fireEvent.click(firstGapHeader.closest('.card-header')!)
    expect(screen.getByText('Remediation Steps')).toBeInTheDocument()
    expect(screen.getByText(/Deploy a PAM solution/)).toBeInTheDocument()
  })
})
