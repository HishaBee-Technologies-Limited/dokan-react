import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

const Page = () => <h1>Hello world</h1>

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})