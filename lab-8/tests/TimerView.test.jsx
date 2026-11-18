import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { track } from '../src/analytics.js'
import { withAnalytics } from '../src/hoc/withAnalytics.jsx'
import BrewTimer from '../src/components/BrewTimer.jsx'

vi.mock('../src/analytics.js')
vi.mock('../src/hoc/withAnalytics.jsx', { spy: true })

// Виклики withAnalytics, зроблені під час імпорту модулів, ще до тестів:
// після кожного тесту setup.js очищає записані виклики.
const callsOnImport = [...withAnalytics.mock.calls]

const v60 = { id: 'v60', name: 'V60', recipe: '15 г', seconds: 180 }

describe('TimerView: перша кнопка з аналітикою', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('«Пауза» не втрачає фокус, поки таймер іде', () => {
    render(<BrewTimer method={v60} />)
    const button = screen.getByRole('button', { name: 'Старт' })
    act(() => button.focus())
    act(() => button.click())
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('button', { name: 'Пауза' })).toBe(button)
    expect(button).toHaveFocus()
  })

  it('«Старт» надсилає timer_control з методом і дією start', () => {
    render(<BrewTimer method={v60} />)
    act(() => screen.getByRole('button', { name: 'Старт' }).click())
    expect(track).toHaveBeenCalledWith('timer_control', {
      method: 'v60',
      action: 'start',
    })
  })

  it('«Пауза» надсилає ту саму подію з дією pause', () => {
    render(<BrewTimer method={v60} />)
    act(() => screen.getByRole('button', { name: 'Старт' }).click())
    act(() => screen.getByRole('button', { name: 'Пауза' }).click())
    expect(track).toHaveBeenLastCalledWith('timer_control', {
      method: 'v60',
      action: 'pause',
    })
  })

  it('подію timer_control надсилає кнопка, обгорнута withAnalytics', () => {
    render(<BrewTimer method={v60} />)
    const calls = [...callsOnImport, ...withAnalytics.mock.calls]
    expect(calls.map(([, event]) => event)).toContain('timer_control')
  })
})
