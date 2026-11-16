import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ShowMore from '../src/components/ShowMore.jsx'
import ReviewList from '../src/components/ReviewList.jsx'
import { reviews } from '../src/data.js'

vi.mock('../src/components/ShowMore.jsx', { spy: true })

const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

function renderNumbers(items = numbers, step = 3) {
  const renderList = vi.fn((visibleItems) => (
    <ul>
      {visibleItems.map((n) => (
        <li key={n}>Пункт {n}</li>
      ))}
    </ul>
  ))
  render(
    <ShowMore items={items} step={step}>
      {renderList}
    </ShowMore>,
  )
  return renderList
}

describe('ShowMore з render prop', () => {
  it('викликає children як функцію з першими step елементами', () => {
    const renderList = renderNumbers()
    expect(renderList).toHaveBeenLastCalledWith([1, 2, 3])
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('кнопка показує, скільки елементів додасться', async () => {
    const user = userEvent.setup()
    renderNumbers()
    const button = screen.getByRole('button', { name: 'Показати ще 3' })
    await user.click(button)
    await user.click(button)
    expect(screen.getAllByRole('listitem')).toHaveLength(9)
    expect(button).toHaveTextContent('Показати ще 1')
  })

  it('коли показано все, кнопка стає «Згорнути» і лишається у фокусі', async () => {
    const user = userEvent.setup()
    renderNumbers()
    const button = screen.getByRole('button', { name: 'Показати ще 3' })
    for (let i = 0; i < 3; i++) await user.click(button)
    expect(screen.getAllByRole('listitem')).toHaveLength(10)
    const collapse = screen.getByRole('button', { name: 'Згорнути' })
    expect(collapse).toHaveFocus()
    await user.click(collapse)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('button', { name: 'Показати ще 3' })).toHaveFocus()
  })

  it('без кнопки, якщо елементів не більше за step', () => {
    renderNumbers([1, 2], 3)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('ReviewList показує відгуки через ShowMore по 3', async () => {
    const user = userEvent.setup()
    render(<ReviewList reviews={reviews} />)
    expect(ShowMore).toHaveBeenCalled()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'Показати ще 3' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(6)
  })
})
