import { render, screen, within } from '@testing-library/react'
import { StrictMode } from 'react'

// Тести рендерять сторінку так само, як src/main.jsx: усередині
// <StrictMode>. У режимі розробки React тоді викликає кожен ред'юсер двічі
// на одну дію, і тести бачать сторінку такою, як у npm run dev.
export function renderStrict(ui) {
  return render(<StrictMode>{ui}</StrictMode>)
}

/** Заголовки всіх карток на дошці: ['№ 41 · Оля', …]. */
export function cardTitles() {
  return screen
    .queryAllByRole('article')
    .map((card) => within(card).getByRole('heading').textContent)
}

/** Картка замовлення за заголовком: card('№ 44 · Оля'). */
export function card(title) {
  return screen.getByRole('article', { name: title })
}

/** Колонка дошки за назвою: column('Нові'). */
export function column(title) {
  return screen.getByRole('region', { name: new RegExp(`^${title} \\(`) })
}

/** Колонка, у якій лежить картка: columnOf('№ 41 · Оля') — 'Готові'. */
export function columnOf(title) {
  const section = card(title).closest('section')
  return within(section)
    .getByRole('heading', { level: 2 })
    .textContent.replace(/ \(\d+\)$/, '')
}

/** Форма «Нове замовлення». */
export function composer() {
  return screen.getByRole('form', { name: 'Нове замовлення' })
}

/** Приймає замовлення через форму: ім'я гостя, один напій, «Надіслати бариста». */
export async function placeOrder(user, customerName, drink) {
  const form = composer()
  await user.type(within(form).getByLabelText("Ім'я гостя"), customerName)
  await user.click(within(form).getByRole('button', { name: `+ ${drink}` }))
  await user.click(
    within(form).getByRole('button', { name: 'Надіслати бариста' }),
  )
}
