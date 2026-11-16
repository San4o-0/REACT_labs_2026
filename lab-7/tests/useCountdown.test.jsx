import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCountdown } from '../src/hooks/useCountdown.js'
import BrewTimer from '../src/components/BrewTimer.jsx'

vi.mock('../src/hooks/useCountdown.js', { spy: true })

const v60 = { id: 'v60', name: 'V60', recipe: '15 г', seconds: 180 }
const press = { id: 'press', name: 'Френч-прес', recipe: '30 г', seconds: 240 }

function tick(seconds) {
  act(() => vi.advanceTimersByTime(seconds * 1000))
}

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('спочатку стоїть на повному часі', () => {
    const { result } = renderHook(() => useCountdown(5))
    expect(result.current.secondsLeft).toBe(5)
    expect(result.current.isRunning).toBe(false)
  })

  it('після start() щосекунди зменшує час на 1', () => {
    const { result } = renderHook(() => useCountdown(5))
    act(() => result.current.start())
    expect(result.current.isRunning).toBe(true)
    tick(3)
    expect(result.current.secondsLeft).toBe(2)
  })

  it('pause() зупиняє відлік', () => {
    const { result } = renderHook(() => useCountdown(10))
    act(() => result.current.start())
    tick(2)
    act(() => result.current.pause())
    tick(5)
    expect(result.current.secondsLeft).toBe(8)
    expect(result.current.isRunning).toBe(false)
  })

  it('повторний start() після паузи не прискорює відлік', () => {
    const { result } = renderHook(() => useCountdown(10))
    act(() => result.current.start())
    tick(1)
    act(() => result.current.pause())
    act(() => result.current.start())
    tick(2)
    expect(result.current.secondsLeft).toBe(7)
  })

  it('на нулі зупиняється, а не йде в мінус', () => {
    const { result } = renderHook(() => useCountdown(3))
    act(() => result.current.start())
    tick(10)
    expect(result.current.secondsLeft).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('reset() повертає повний час і зупиняє відлік', () => {
    const { result } = renderHook(() => useCountdown(10))
    act(() => result.current.start())
    tick(4)
    act(() => result.current.reset())
    tick(3)
    expect(result.current.secondsLeft).toBe(10)
    expect(result.current.isRunning).toBe(false)
  })

  it('після демонтажу компонента не лишає таймерів', () => {
    const { result, unmount } = renderHook(() => useCountdown(10))
    act(() => result.current.start())
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})

describe('BrewTimer на useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('BrewTimer бере відлік з useCountdown', () => {
    render(<BrewTimer method={v60} />)
    expect(useCountdown).toHaveBeenCalledWith(180)
  })

  it('два таймери на сторінці незалежні', () => {
    render(
      <>
        <BrewTimer method={v60} />
        <BrewTimer method={press} />
      </>,
    )
    const [first] = screen.getAllByRole('button', { name: 'Старт' })
    fireEvent.click(first)
    tick(5)
    const [firstTime, secondTime] = screen.getAllByRole('timer')
    expect(firstTime).toHaveTextContent('2:55')
    expect(secondTime).toHaveTextContent('4:00')
  })

  it('коли час вийшов, BrewTimer показує «Готово!» і «Спочатку»', () => {
    render(<BrewTimer method={{ ...v60, seconds: 3 }} />)
    fireEvent.click(screen.getByRole('button', { name: 'Старт' }))
    tick(3)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Готово! Час пити каву.',
    )
    expect(screen.getByRole('button', { name: 'Спочатку' })).toBeInTheDocument()
  })
})
