import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import { card, columnOf, composer, renderStrict } from './page.jsx'

const undoButton = () => screen.getByRole('button', { name: 'Скасувати дію' })
const redoButton = () => screen.getByRole('button', { name: 'Повторити дію' })

describe('«Скасувати дію» і «Повторити дію»', () => {
  it('«Скасувати дію» повертає видане замовлення в «Готові», а «Повторити дію» — знову у «Видані»', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    await user.click(
      within(card('№ 41 · Оля')).getByRole('button', { name: 'Видати' }),
    )
    expect(columnOf('№ 41 · Оля')).toBe('Видані')
    await user.click(undoButton())
    expect(columnOf('№ 41 · Оля')).toBe('Готові')
    await user.click(redoButton())
    expect(columnOf('№ 41 · Оля')).toBe('Видані')
  })

  it('кнопки вимкнені, коли нема чого скасовувати чи повторювати', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    expect(undoButton()).toBeDisabled()
    expect(redoButton()).toBeDisabled()

    await user.click(
      within(card('№ 44 · Оля')).getByRole('button', { name: 'Почати' }),
    )
    expect(undoButton()).toBeEnabled()
    expect(redoButton()).toBeDisabled()

    await user.click(undoButton())
    expect(undoButton()).toBeDisabled()
    expect(redoButton()).toBeEnabled()
  })

  it('«Скасувати дію» не чіпає форму нового замовлення', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    await user.click(
      within(card('№ 45 · Ірина')).getByRole('button', { name: 'Почати' }),
    )
    const form = composer()
    await user.type(within(form).getByLabelText("Ім'я гостя"), 'Петро')
    await user.click(within(form).getByRole('button', { name: '+ Лате' }))

    await user.click(undoButton())
    expect(columnOf('№ 45 · Ірина')).toBe('Нові')
    expect(within(form).getByLabelText("Ім'я гостя")).toHaveValue('Петро')
    expect(
      within(form).getByRole('group', { name: 'Лате' }),
    ).toBeInTheDocument()
  })
})
