import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '#app'

const beans = [
  ['Ефіопія Іргачеф', '420 грн'],
  ['Кенія Ньєрі', '450 грн'],
  ['Колумбія Уїла', '380 грн'],
  ['Бразилія Серрадо', '340 грн'],
  ['Гватемала Антигуа', '400 грн'],
  ['Руанда Ньямашеке', '430 грн'],
  ['Коста-Рика Тарасу', '410 грн'],
  ['Перу Кахамарка', '370 грн'],
]

function renderAt(hash) {
  window.location.hash = hash
  return render(<App />)
}

describe('Каталог', () => {
  test('каталог показує всі 8 сортів з цінами', () => {
    renderAt('#/')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Кава в зернах' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(8)
    for (const [name, price] of beans) {
      const card = screen.getByRole('article', { name })
      expect(within(card).getByText(price)).toBeInTheDocument()
    }
  })

  test('♡ у картці лишається натиснутим після перезавантаження', async () => {
    const user = userEvent.setup()
    const { unmount } = renderAt('#/')

    await user.click(
      screen.getByRole('button', { name: 'До обраного: Кенія Ньєрі' }),
    )
    unmount()
    render(<App />)

    expect(
      screen.getByRole('button', { name: 'До обраного: Кенія Ньєрі' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: 'До обраного: Ефіопія Іргачеф' }),
    ).toHaveAttribute('aria-pressed', 'false')
  })

  test('«Додати в кошик» збільшує лічильник у шапці', async () => {
    const user = userEvent.setup()
    renderAt('#/')
    expect(screen.getByRole('link', { name: 'Кошик (0)' })).toBeInTheDocument()

    const card = screen.getByRole('article', { name: 'Кенія Ньєрі' })
    const button = within(card).getByRole('button', { name: 'Додати в кошик' })
    await user.click(button)
    await user.click(button)

    expect(screen.getByRole('link', { name: 'Кошик (2)' })).toBeInTheDocument()
    expect(within(card).getByRole('status')).toHaveTextContent('У кошику: 2')
  })

  test('назва сорту веде на його сторінку', async () => {
    const user = userEvent.setup()
    renderAt('#/')

    await user.click(screen.getByRole('link', { name: 'Кенія Ньєрі' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Кенія Ньєрі' }),
    ).toBeInTheDocument()
    expect(window.location.hash).toBe('#/beans/kenya-nyeri')
  })
})
