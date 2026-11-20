import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import { card, cardTitles, renderStrict } from './page.jsx'

const details = () =>
  screen.queryByRole('region', { name: 'Деталі замовлення' })

async function openDetails(user, title) {
  await user.click(within(card(title)).getByRole('button', { name: 'Деталі' }))
  return details()
}

describe('«Деталі» і нормалізований стан', () => {
  it("перейменування гостя в «Деталях» змінює ім'я на всіх його замовленнях", async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    const panel = await openDetails(user, '№ 44 · Оля')
    const name = within(panel).getByLabelText("Ім'я гостя")
    await user.clear(name)
    await user.type(name, 'Ольга')
    await user.click(within(panel).getByRole('button', { name: 'Зберегти' }))

    expect(cardTitles()).toEqual(
      expect.arrayContaining(['№ 41 · Ольга', '№ 44 · Ольга']),
    )
    expect(cardTitles().filter((title) => title.endsWith('Оля'))).toEqual([])
    expect(within(details()).getByRole('heading')).toHaveTextContent(
      '№ 44 · Ольга',
    )
  })

  it('«Деталі» показують зміни, зроблені на дошці', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    const panel = await openDetails(user, '№ 43 · Марко')
    expect(within(panel).getByText(/^Флет вайт/)).toHaveTextContent('ще ні')

    await user.click(
      within(card('№ 43 · Марко')).getByRole('checkbox', {
        name: /^Флет вайт/,
      }),
    )
    expect(within(details()).getByText(/^Флет вайт/)).toHaveTextContent(
      'готово',
    )
    await user.click(
      within(card('№ 43 · Марко')).getByRole('button', { name: 'Готово' }),
    )
    expect(within(details()).getByText('Готове')).toBeInTheDocument()
  })

  it('«Деталі» порожні, коли відкрите замовлення скасовано', async () => {
    const user = userEvent.setup()
    renderStrict(<App />)
    await openDetails(user, '№ 44 · Оля')
    await user.click(
      within(card('№ 44 · Оля')).getByRole('button', {
        name: 'Скасувати замовлення',
      }),
    )
    expect(details()).toBeNull()
  })
})
