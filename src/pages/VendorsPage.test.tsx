import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import VendorsPage from './VendorsPage.tsx'

describe('VendorsPage', () => {
  it('renders all initial vendors', () => {
    render(
      <MemoryRouter>
        <VendorsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Okta')).toBeInTheDocument()
    expect(screen.getByText('Stripe')).toBeInTheDocument()
    expect(screen.getByText('Retool')).toBeInTheDocument()
  })

  it('shows vendor risk summary stats', () => {
    render(
      <MemoryRouter>
        <VendorsPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Total Vendors')).toBeInTheDocument()
    expect(screen.getByText('Low Risk')).toBeInTheDocument()
    expect(screen.getByText('High Risk')).toBeInTheDocument()
  })

  it('opens add vendor form', () => {
    render(
      <MemoryRouter>
        <VendorsPage />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByText('Add Vendor'))
    expect(screen.getByText('New Vendor')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('e.g., Twilio')).toBeInTheDocument()
  })
})
