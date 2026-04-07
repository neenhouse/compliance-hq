import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import PoliciesPage from './PoliciesPage.tsx'

function renderPolicies() {
  return render(
    <MemoryRouter>
      <PoliciesPage />
    </MemoryRouter>,
  )
}

describe('PoliciesPage', () => {
  it('renders the page heading', () => {
    renderPolicies()
    expect(screen.getByText('Policy Generator')).toBeInTheDocument()
  })

  it('renders policy template cards', () => {
    renderPolicies()
    expect(screen.getByText('Access Control Policy')).toBeInTheDocument()
    expect(screen.getByText('Incident Response Policy')).toBeInTheDocument()
  })

  it('opens the variable form when a template card is clicked', () => {
    renderPolicies()
    fireEvent.click(screen.getByText('Access Control Policy'))
    expect(screen.getByText('Fill Template Variables')).toBeInTheDocument()
    expect(screen.getByText('Back to Templates')).toBeInTheDocument()
  })

  it('can navigate back to template list', () => {
    renderPolicies()
    fireEvent.click(screen.getByText('Access Control Policy'))
    fireEvent.click(screen.getByText('Back to Templates'))
    expect(screen.getByText('Access Control Policy')).toBeInTheDocument()
  })

  it('shows preview after filling variables', () => {
    renderPolicies()
    fireEvent.click(screen.getByText('Access Control Policy'))
    fireEvent.click(screen.getByText('Preview Document'))
    expect(screen.getByText('Edit Variables')).toBeInTheDocument()
    expect(screen.getByText('Download Markdown')).toBeInTheDocument()
  })
})
