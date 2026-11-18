import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Tabs from '../src/components/Tabs.jsx'
import * as tabsModule from '../src/components/Tabs.jsx'
import ReviewList from '../src/components/ReviewList.jsx'
import BrewGuide from '../src/components/BrewGuide.jsx'
import App from '../src/App.jsx'

vi.mock('../src/components/ReviewList.jsx', { spy: true })
vi.mock('../src/components/BrewGuide.jsx', { spy: true })

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Лічильник {count}
    </button>
  )
}

function Example() {
  return (
    <Tabs defaultValue="b">
      <Tabs.List aria-label="Розділи">
        <Tabs.Tab value="a">Перша</Tabs.Tab>
        <Tabs.Tab value="b">Друга</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">
        <Counter />
      </Tabs.Panel>
      <Tabs.Panel value="b">
        <p>
          Вміст <strong>B</strong>
        </p>
      </Tabs.Panel>
    </Tabs>
  )
}

// Кнопка вкладки за її текстом: до §4.4 це звичайна кнопка, після — role="tab".
function tabButton(name) {
  return screen
    .getAllByText(name)
    .map((element) => element.closest('button'))
    .find(Boolean)
}

// Видно на сторінці: елемент є в DOM і ні він, ні його батьки не сховані.
function isShown(element) {
  if (!element) return false
  try {
    expect(element).toBeVisible()
    return true
  } catch {
    return false
  }
}

describe('Tabs: вміст через children, стан через контекст', () => {
  it('Tabs.Panel показує будь-який JSX, переданий між тегами', () => {
    render(<Example />)
    const content = screen.getByText('B').closest('p')
    expect(content).toHaveTextContent('Вміст B')
    expect(isShown(content)).toBe(true)
  })

  it('клік по Tabs.Tab показує його панель і ховає іншу', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(screen.getByText('Перша'))
    expect(isShown(screen.queryByText('Лічильник 0'))).toBe(true)
    expect(isShown(screen.queryByText('B'))).toBe(false)
  })

  it('схована панель зберігає свій стан', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(screen.getByText('Перша'))
    await user.click(screen.getByText('Лічильник 0'))
    await user.click(screen.getByText('Друга'))
    await user.click(screen.getByText('Перша'))
    expect(screen.getByText('Лічильник 1')).toBeInTheDocument()
  })

  it('Tabs.Tab і Tabs.Panel поза <Tabs> кидають зрозумілу помилку', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Tabs.Tab value="x">X</Tabs.Tab>)).toThrow(/<Tabs>/)
    expect(() => render(<Tabs.Panel value="x">X</Tabs.Panel>)).toThrow(/<Tabs>/)
  })

  it('з Tabs.jsx експортується лише Tabs', () => {
    expect(Object.keys(tabsModule)).toEqual(['default'])
  })
})

describe('вкладки на сторінці товару', () => {
  it('«Заварювання», «Відгуки (10)» і «Схожі товари» перемикають вміст', async () => {
    const user = userEvent.setup()
    render(<App />)
    const brew = () => screen.queryByText('Пуровер V60')
    const review = () => screen.queryByText('Олена', { exact: false })
    const related = () => screen.queryByText('Кенія Ньєрі')
    expect(isShown(brew())).toBe(true)
    expect(isShown(review())).toBe(false)
    await user.click(tabButton('Відгуки (10)'))
    expect(isShown(review())).toBe(true)
    expect(isShown(brew())).toBe(false)
    await user.click(tabButton('Схожі товари'))
    expect(isShown(related())).toBe(true)
    expect(isShown(review())).toBe(false)
    await user.click(tabButton('Заварювання'))
    expect(isShown(brew())).toBe(true)
    expect(isShown(related())).toBe(false)
  })

  it('запущений таймер не скидається після переходу на іншу вкладку', () => {
    vi.useFakeTimers()
    render(<App />)
    const [start] = screen.getAllByText('Старт')
    act(() => start.click())
    act(() => tabButton('Відгуки (10)').click())
    act(() => vi.advanceTimersByTime(5000))
    act(() => tabButton('Заварювання').click())
    expect(screen.getAllByRole('timer')[0]).toHaveTextContent('2:55')
  })

  it('перемикання вкладок не рендерить вміст панелей знову', () => {
    render(<App />)
    const names = ['Відгуки (10)', 'Схожі товари', 'Заварювання']
    // Перше коло: кожна вкладка показується вперше. Рахуємо з другого кола.
    names.forEach((name) => act(() => tabButton(name).click()))
    const reviewRenders = ReviewList.mock.calls.length
    const brewRenders = BrewGuide.mock.calls.length
    names.forEach((name) => act(() => tabButton(name).click()))
    expect(ReviewList.mock.calls.length).toBe(reviewRenders)
    expect(BrewGuide.mock.calls.length).toBe(brewRenders)
  })
})
