import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Tabs from '../src/components/Tabs.jsx'
import App from '../src/App.jsx'

function Example({ label = 'Розділи' }) {
  return (
    <>
      <Tabs defaultValue="a">
        <Tabs.List aria-label={label}>
          <Tabs.Tab value="a">Перша</Tabs.Tab>
          <Tabs.Tab value="b">Друга</Tabs.Tab>
          <Tabs.Tab value="c">
            Третя <span className="badge">3</span>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">Вміст A</Tabs.Panel>
        <Tabs.Panel value="b">Вміст B</Tabs.Panel>
        <Tabs.Panel value="c">Вміст C</Tabs.Panel>
      </Tabs>
      <button type="button">Після вкладок</button>
    </>
  )
}

function tab(name) {
  return screen.getByRole('tab', { name })
}

async function focusFirstTab(user) {
  await user.tab()
  expect(tab('Перша')).toHaveFocus()
}

describe('Tabs: ролі й атрибути за ARIA APG', () => {
  it('має ролі tablist, tab і tabpanel; видно одну панель', () => {
    render(<Example />)
    expect(screen.getByRole('tablist', { name: 'Розділи' })).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Вміст A')
  })

  it('aria-selected позначає лише обрану вкладку', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(tab('Третя 3'))
    expect(tab('Третя 3')).toHaveAttribute('aria-selected', 'true')
    expect(tab('Перша')).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Вміст C')
  })

  it('вкладка й панель посилаються одна на одну через id', () => {
    render(<Example />)
    const panel = screen.getByRole('tabpanel')
    expect(tab('Перша')).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveAttribute('aria-labelledby', tab('Перша').id)
  })

  it('два Tabs на сторінці не мають однакових id', () => {
    render(
      <>
        <Example label="Перший" />
        <Example label="Другий" />
      </>,
    )
    const ids = screen.getAllByRole('tab').map((t) => t.id)
    expect(new Set(ids).size).toBe(6)
  })

  it('на сторінці товару список вкладок має назву «Про каву»', () => {
    render(<App />)
    const list = screen.getByRole('tablist', { name: 'Про каву' })
    expect(list).toBeInTheDocument()
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual([
      'Заварювання',
      'Відгуки (10)',
      'Схожі товари',
    ])
  })
})

describe('Tabs: клавіатура за ARIA APG', () => {
  it('у порядку Tab лише обрана вкладка, а далі — панель', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await focusFirstTab(user)
    await user.tab()
    expect(screen.getByRole('tabpanel')).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Після вкладок' })).toHaveFocus()
  })

  it('→ переводить фокус на наступну вкладку й обирає її', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await focusFirstTab(user)
    await user.keyboard('{ArrowRight}')
    expect(tab('Друга')).toHaveFocus()
    expect(tab('Друга')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Вміст B')
  })

  it('→ на останній вкладці переходить на першу, ← на першій — на останню', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await focusFirstTab(user)
    await user.keyboard('{ArrowLeft}')
    expect(tab('Третя 3')).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(tab('Перша')).toHaveFocus()
  })

  it('Home і End обирають першу й останню вкладки й не прокручують сторінку', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await focusFirstTab(user)
    await user.keyboard('{End}')
    expect(tab('Третя 3')).toHaveFocus()
    expect(tab('Третя 3')).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Home}')
    expect(tab('Перша')).toHaveFocus()
    expect(tab('Перша')).toHaveAttribute('aria-selected', 'true')
    // fireEvent повертає false, якщо обробник скасував дію браузера за
    // замовчуванням: для Home і End це прокручування сторінки.
    const end = { key: 'End', code: 'End' }
    const home = { key: 'Home', code: 'Home' }
    expect(
      fireEvent.keyDown(tab('Перша'), end),
      'End прокрутив би сторінку донизу',
    ).toBe(false)
    expect(
      fireEvent.keyDown(tab('Третя 3'), home),
      'Home прокрутив би сторінку догори',
    ).toBe(false)
  })

  it('після вибору стрілкою Tab веде до панелі нової вкладки', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await focusFirstTab(user)
    await user.keyboard('{ArrowRight}')
    await user.tab()
    expect(screen.getByRole('tabpanel')).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Вміст B')
  })
})
