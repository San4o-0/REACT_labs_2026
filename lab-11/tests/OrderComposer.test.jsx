import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useReducer } from 'react'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import OrderComposer from '../src/components/OrderComposer.jsx'
import { draftReducer } from '../src/model/draftReducer.js'
import { column, composer, renderStrict } from './page.jsx'

// Шпигуни: функції працюють як завжди, а тест бачить їхні виклики.
vi.mock('react', { spy: true })
vi.mock('../src/model/draftReducer.js', { spy: true })

describe('OrderComposer', () => {
  it('OrderComposer бере стан з useReducer і draftReducer', async () => {
    const user = userEvent.setup()
    renderStrict(<OrderComposer onPlace={() => {}} />)
    const reducers = useReducer.mock.calls.map(([reducer]) => reducer)
    expect(reducers, 'useReducer(draftReducer, …) в OrderComposer').toContain(
      draftReducer,
    )
    await user.click(screen.getByRole('button', { name: '+ Лате' }))
    expect(draftReducer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'drink_added', drink: 'Лате' }),
    )
  })

  it('«Разом» правильне після будь-яких змін', async () => {
    const user = userEvent.setup()
    renderStrict(<OrderComposer onPlace={() => {}} />)
    const total = () => screen.getByText(/^Разом:/)

    await user.click(screen.getByRole('button', { name: '+ Лате' }))
    expect(total()).toHaveTextContent('Разом: 70 грн')
    const latte = screen.getByRole('group', { name: 'Лате' })
    await user.click(within(latte).getByRole('radio', { name: 'L' }))
    expect(total()).toHaveTextContent('Разом: 85 грн')
    await user.selectOptions(
      within(latte).getByRole('combobox', { name: 'Молоко' }),
      'вівсяне',
    )
    expect(total()).toHaveTextContent('Разом: 100 грн')
    await user.click(within(latte).getByRole('checkbox', { name: 'ваніль' }))
    expect(total()).toHaveTextContent('Разом: 110 грн')
    await user.click(screen.getByRole('button', { name: '+ Еспресо' }))
    expect(total()).toHaveTextContent('Разом: 155 грн')
    await user.click(within(latte).getByRole('button', { name: 'Видалити' }))
    expect(total()).toHaveTextContent('Разом: 45 грн')
  })

  it('«Надіслати бариста» додає замовлення в «Нові» й очищає форму', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    const form = composer()
    await user.type(within(form).getByLabelText("Ім'я гостя"), 'Петро')
    await user.click(within(form).getByRole('button', { name: '+ Капучино' }))
    await user.click(
      within(form).getByRole('button', { name: 'Надіслати бариста' }),
    )

    expect(
      within(column('Нові')).getByRole('article', { name: /Петро$/ }),
    ).toBeInTheDocument()
    expect(within(form).getByLabelText("Ім'я гостя")).toHaveValue('')
    expect(within(form).queryByRole('group', { name: 'Капучино' })).toBeNull()
    expect(within(form).getByText(/^Разом:/)).toHaveTextContent('Разом: 0 грн')
    expect(
      within(form).getByRole('button', { name: 'Надіслати бариста' }),
    ).toBeDisabled()
  })
})
