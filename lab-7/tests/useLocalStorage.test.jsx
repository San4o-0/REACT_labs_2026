import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from '../src/hooks/useLocalStorage.js'
import FavoriteButton from '../src/components/FavoriteButton.jsx'
import GrindPicker from '../src/components/GrindPicker.jsx'

vi.mock('../src/hooks/useLocalStorage.js', { spy: true })

describe('useLocalStorage', () => {
  it('без збереженого значення повертає початкове', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'beans'))
    expect(result.current[0]).toBe('beans')
  })

  it('читає збережене значення як JSON', () => {
    localStorage.setItem('test', JSON.stringify({ cups: 2 }))
    const { result } = renderHook(() => useLocalStorage('test', null))
    expect(result.current[0]).toEqual({ cups: 2 })
  })

  it('зберігає нове значення як JSON', () => {
    const { result } = renderHook(() => useLocalStorage('test', 1))
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
    expect(localStorage.getItem('test')).toBe('5')
  })

  it('приймає функцію-оновлювач, як сеттер useState', () => {
    const { result } = renderHook(() => useLocalStorage('test', 0))
    act(() => {
      result.current[1]((n) => n + 1)
      result.current[1]((n) => n + 1)
    })
    expect(result.current[0]).toBe(2)
  })

  it('значення, яке не є JSON, замінює початковим, а не падає', () => {
    localStorage.setItem('test', 'filter')
    const { result } = renderHook(() => useLocalStorage('test', 'beans'))
    expect(result.current[0]).toBe('beans')
  })

  it('два компоненти з одним хуком мають кожен свій стан', () => {
    const first = renderHook(() => useLocalStorage('test', 0))
    const second = renderHook(() => useLocalStorage('test', 0))
    act(() => first.result.current[1](7))
    expect(first.result.current[0]).toBe(7)
    expect(second.result.current[0]).toBe(0)
  })
})

describe('компоненти на useLocalStorage', () => {
  it('FavoriteButton бере стан з useLocalStorage', () => {
    render(<FavoriteButton productId="kenya" name="Кенія" />)
    expect(useLocalStorage).toHaveBeenCalled()
  })

  it('GrindPicker бере стан з useLocalStorage', () => {
    render(<GrindPicker />)
    expect(useLocalStorage).toHaveBeenCalled()
  })

  it('♡ лишається натиснутим після перезавантаження', async () => {
    const user = userEvent.setup()
    const { unmount } = render(
      <FavoriteButton productId="kenya" name="Кенія" />,
    )
    await user.click(screen.getByRole('button', { name: 'До обраного: Кенія' }))
    unmount()
    render(<FavoriteButton productId="kenya" name="Кенія" />)
    expect(
      screen.getByRole('button', { name: 'До обраного: Кенія' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('помел зберігається після перезавантаження', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<GrindPicker />)
    await user.click(screen.getByRole('radio', { name: 'Для фільтра' }))
    unmount()
    render(<GrindPicker />)
    expect(screen.getByRole('radio', { name: 'Для фільтра' })).toBeChecked()
  })

  it('помел, збережений старим кодом без JSON, замінюється на «Зерно», а сторінка не падає', () => {
    localStorage.setItem('grind', 'filter')
    render(<GrindPicker />)
    expect(screen.getByRole('radio', { name: 'Зерно' })).toBeChecked()
  })
})
