import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ControlsPage from './ControlsPage.tsx'

describe('ControlsPage', () => {
  it('renders the control library heading', () => {
    render(
      <MemoryRouter>
        <ControlsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Control Library')).toBeInTheDocument()
  })

  it('filters controls by search', () => {
    render(
      <MemoryRouter>
        <ControlsPage />
      </MemoryRouter>,
    )
    const searchInput = screen.getByPlaceholderText('Search controls...')
    fireEvent.change(searchInput, { target: { value: 'encryption' } })
    // Should show encryption-related controls
    expect(screen.getByText('Encryption at rest')).toBeInTheDocument()
    expect(screen.getByText('Encryption in transit')).toBeInTheDocument()
  })

  it('shows infrastructure mapping for mapped controls', () => {
    render(
      <MemoryRouter>
        <ControlsPage />
      </MemoryRouter>,
    )
    // CC6.1 is mapped to GitHub - text is inside a span with strong element
    expect(screen.getByText((_content, element) => {
      return element?.tagName === 'SPAN' && element?.textContent?.includes('Organization settings') || false
    })).toBeInTheDocument()
  })
})
