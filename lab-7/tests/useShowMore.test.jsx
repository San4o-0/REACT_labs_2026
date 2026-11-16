import { act, render, renderHook, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useShowMore } from '../src/hooks/useShowMore.js'
import ShowMore from '../src/components/ShowMore.jsx'
import RelatedProducts from '../src/components/RelatedProducts.jsx'
import { related } from '../src/data.js'

vi.mock('../src/hooks/useShowMore.js', { spy: true })

const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

describe('useShowMore', () => {
  it('спочатку видно step елементів', () => {
    const { result } = renderHook(() => useShowMore(numbers, 4))
    expect(result.current.visibleItems).toEqual([1, 2, 3, 4])
    expect(result.current.hiddenCount).toBe(6)
  })

  it('showMore() додає ще step, але не більше, ніж є', () => {
    const { result } = renderHook(() => useShowMore(numbers, 4))
    act(() => result.current.showMore())
    expect(result.current.hiddenCount).toBe(2)
    act(() => result.current.showMore())
    expect(result.current.visibleItems).toEqual(numbers)
    expect(result.current.hiddenCount).toBe(0)
  })

  it('collapse() повертає до step елементів', () => {
    const { result } = renderHook(() => useShowMore(numbers, 4))
    act(() => result.current.showMore())
    act(() => result.current.collapse())
    expect(result.current.visibleItems).toEqual([1, 2, 3, 4])
  })

  it('ShowMore тепер побудований на useShowMore', () => {
    render(<ShowMore items={numbers}>{() => null}</ShowMore>)
    expect(useShowMore).toHaveBeenCalled()
  })
})

describe('«Схожі товари» на useShowMore', () => {
  it('RelatedProducts бере логіку з useShowMore', () => {
    render(<RelatedProducts products={related} />)
    expect(useShowMore).toHaveBeenCalledWith(related, 4)
  })

  it('кнопка — остання клітинка сітки, а не рядок під нею', async () => {
    const user = userEvent.setup()
    render(<RelatedProducts products={related} />)
    const list = screen.getByRole('list', { name: 'Схожі товари' })
    const button = within(list).getByRole('button', { name: 'Показати ще 3' })
    expect(within(list).getAllByRole('listitem').at(-1)).toContainElement(
      button,
    )
    await user.click(button)
    expect(within(list).getAllByRole('heading')).toHaveLength(7)
    expect(within(list).getByRole('button', { name: 'Згорнути' })).toHaveFocus()
  })
})
