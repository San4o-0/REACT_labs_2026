import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { track } from '../src/analytics.js'
import { withAnalytics } from '../src/hoc/withAnalytics.jsx'
import Button from '../src/components/Button.jsx'
import ProductCard from '../src/components/ProductCard.jsx'
import { product } from '../src/data.js'

vi.mock('../src/analytics.js')
vi.mock('../src/hoc/withAnalytics.jsx', { spy: true })

// Виклики withAnalytics, зроблені під час імпорту модулів, ще до тестів:
// після кожного тесту setup.js очищає записані виклики.
const callsOnImport = [...withAnalytics.mock.calls]

const TrackedButton = withAnalytics(Button, 'test_event')

function Link(props) {
  return <a {...props} />
}

describe('withAnalytics', () => {
  it('повертає новий компонент з назвою withAnalytics(назва обгорнутого)', () => {
    expect(TrackedButton).not.toBe(Button)
    expect(TrackedButton.displayName).toBe('withAnalytics(Button)')
    expect(withAnalytics(Link, 'test_event').displayName).toBe(
      'withAnalytics(Link)',
    )
  })

  it('під час кліку надсилає подію й викликає onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<TrackedButton onClick={onClick}>Купити</TrackedButton>)
    await user.click(screen.getByRole('button', { name: 'Купити' }))
    expect(track).toHaveBeenCalledTimes(1)
    expect(track.mock.calls[0][0]).toBe('test_event')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('працює й без onClick', async () => {
    const user = userEvent.setup()
    render(<TrackedButton>Купити</TrackedButton>)
    await user.click(screen.getByRole('button', { name: 'Купити' }))
    expect(track).toHaveBeenCalledTimes(1)
  })

  it('analyticsData іде в track, а не в DOM', async () => {
    const user = userEvent.setup()
    const consoleError = vi.spyOn(console, 'error')
    render(
      <TrackedButton analyticsData={{ productId: 'kenya' }}>
        Купити
      </TrackedButton>,
    )
    const button = screen.getByRole('button', { name: 'Купити' })
    await user.click(button)
    expect(track).toHaveBeenCalledWith('test_event', { productId: 'kenya' })
    expect(button).not.toHaveAttribute('analyticsdata')
    expect(consoleError).not.toHaveBeenCalled()
  })

  it('решту props і ref передає обгорнутому компоненту', () => {
    const ref = createRef()
    render(
      <TrackedButton ref={ref} className="wide" aria-pressed="true">
        Купити
      </TrackedButton>,
    )
    const button = screen.getByRole('button', { name: 'Купити' })
    expect(button).toHaveClass('wide')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(ref.current).toBe(button)
  })

  it('«Додати в кошик» надсилає add_to_cart з id товару через withAnalytics', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={product} />)
    await user.click(screen.getByRole('button', { name: 'Додати в кошик' }))
    expect(track).toHaveBeenCalledWith('add_to_cart', {
      productId: product.id,
    })
    expect(screen.getByRole('status')).toHaveTextContent('У кошику: 1')
    const calls = [...callsOnImport, ...withAnalytics.mock.calls]
    expect(calls.map(([, event]) => event)).toContain('add_to_cart')
  })
})
