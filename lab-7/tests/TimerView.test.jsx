import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TimerView from '../src/components/TimerView.jsx'
import BrewTimer from '../src/components/BrewTimer.jsx'

vi.mock('../src/components/TimerView.jsx', { spy: true })

const v60 = { id: 'v60', name: 'V60', recipe: '15 г', seconds: 180 }

function view(status, secondsLeft = 100) {
  const handlers = { onStart: vi.fn(), onPause: vi.fn(), onReset: vi.fn() }
  return {
    props: { method: v60, secondsLeft, status, ...handlers },
    ...handlers,
  }
}

function buttonNames() {
  return screen.getAllByRole('button').map((button) => button.textContent)
}

describe('TimerView: простий компонент', () => {
  it('не має власного стану й ефектів: це функція від props', () => {
    expect(() => TimerView(view('idle', 180).props)).not.toThrow()
  })

  it('idle: повний час і лише «Старт»', () => {
    const { props, onStart } = view('idle', 180)
    render(<TimerView {...props} />)
    expect(screen.getByRole('timer')).toHaveTextContent('3:00')
    expect(buttonNames()).toEqual(['Старт'])
    fireEvent.click(screen.getByRole('button', { name: 'Старт' }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('running: «Пауза» і «Скинути»', () => {
    const { props, onPause, onReset } = view('running', 175)
    render(<TimerView {...props} />)
    expect(screen.getByRole('timer')).toHaveTextContent('2:55')
    expect(buttonNames()).toEqual(['Пауза', 'Скинути'])
    fireEvent.click(screen.getByRole('button', { name: 'Пауза' }))
    fireEvent.click(screen.getByRole('button', { name: 'Скинути' }))
    expect(onPause).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('paused: «Продовжити» запускає відлік далі', () => {
    const { props, onStart } = view('paused', 120)
    render(<TimerView {...props} />)
    expect(buttonNames()).toEqual(['Продовжити', 'Скинути'])
    fireEvent.click(screen.getByRole('button', { name: 'Продовжити' }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('done: 0:00, повідомлення «Готово!» і «Спочатку»', () => {
    const { props, onReset } = view('done', 0)
    render(<TimerView {...props} />)
    expect(screen.getByRole('timer')).toHaveTextContent('0:00')
    expect(screen.getByRole('status')).toHaveTextContent(
      'Готово! Час пити каву.',
    )
    expect(buttonNames()).toEqual(['Спочатку'])
    fireEvent.click(screen.getByRole('button', { name: 'Спочатку' }))
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('область role="status" є від початку, а повідомлення — лише в done', () => {
    const { rerender } = render(<TimerView {...view('idle', 180).props} />)
    const region = screen.getByRole('status')
    expect(region).toHaveTextContent('')
    for (const status of ['running', 'paused']) {
      rerender(<TimerView {...view(status).props} />)
      expect(screen.getByRole('status')).toBe(region)
      expect(region).toHaveTextContent('')
    }
  })

  it('перша кнопка не втрачає фокус, коли змінюється статус', () => {
    const { rerender } = render(<TimerView {...view('idle', 180).props} />)
    const first = screen.getByRole('button', { name: 'Старт' })
    act(() => first.focus())
    for (const status of ['running', 'paused', 'done', 'idle']) {
      rerender(<TimerView {...view(status).props} />)
      expect(first).toHaveFocus()
    }
  })
})

describe('BrewTimer: розумний компонент', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('рендерить TimerView зі статусом idle і повним часом', () => {
    render(<BrewTimer method={v60} />)
    expect(TimerView).toHaveBeenCalled()
    const props = TimerView.mock.lastCall[0]
    expect(props.status).toBe('idle')
    expect(props.secondsLeft).toBe(180)
    expect(props.method).toBe(v60)
  })

  it('після «Старт» передає статус running', () => {
    render(<BrewTimer method={v60} />)
    fireEvent.click(screen.getByRole('button', { name: 'Старт' }))
    expect(TimerView).toHaveBeenCalled()
    expect(TimerView.mock.lastCall[0].status).toBe('running')
  })
})
