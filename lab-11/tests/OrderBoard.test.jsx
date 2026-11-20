import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import { loadOrders } from '../src/data/orders.js'
import { card, cardTitles, placeOrder, renderStrict } from './page.jsx'

const largest = Math.max(...loadOrders().map((order) => order.number))

describe('Черга на сторінці в StrictMode', () => {
  it('відмічений напій лишається відміченим', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    const marko = card('№ 43 · Марко')
    const flatWhite = within(marko).getByRole('checkbox', {
      name: /^Флет вайт/,
    })
    await user.click(flatWhite)
    expect(flatWhite).toBeChecked()
    expect(within(marko).getByRole('button', { name: 'Готово' })).toBeEnabled()
  })

  it('нові замовлення отримують номери підряд', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    await placeOrder(user, 'Петро', 'Лате')
    await placeOrder(user, 'Ганна', 'Какао')
    expect(cardTitles()).toEqual(
      expect.arrayContaining([
        `№ ${largest + 1} · Петро`,
        `№ ${largest + 2} · Ганна`,
      ]),
    )
  })

  it('скасування прибирає лише одне замовлення', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    const before = cardTitles()
    await user.click(
      within(card('№ 44 · Оля')).getByRole('button', {
        name: 'Скасувати замовлення',
      }),
    )
    expect(cardTitles()).toEqual(
      before.filter((title) => title !== '№ 44 · Оля'),
    )
  })
})
