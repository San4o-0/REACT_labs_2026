import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '#app'

function renderAt(hash) {
  window.location.hash = hash
  return render(<App />)
}

// Додає сорти з каталогу й переходить у кошик посиланням у шапці.
async function fillCart(user, items) {
  renderAt('#/')
  let count = 0
  for (const [name, times] of items) {
    const card = screen.getByRole('article', { name })
    for (let i = 0; i < times; i++) {
      await user.click(
        within(card).getByRole('button', { name: 'Додати в кошик' }),
      )
      count++
    }
  }
  await user.click(screen.getByRole('link', { name: `Кошик (${count})` }))
  await screen.findByRole('heading', { level: 1, name: 'Кошик' })
}

describe('Кошик', () => {
  test('порожній кошик каже, що він порожній, і веде до каталогу', async () => {
    const user = userEvent.setup()
    renderAt('#/cart')

    expect(screen.getByText('Кошик порожній.')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'До каталогу' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Кава в зернах' }),
    ).toBeInTheDocument()
  })

  test('кошик показує додані сорти, кількість і суму', async () => {
    const user = userEvent.setup()
    await fillCart(user, [
      ['Ефіопія Іргачеф', 2],
      ['Кенія Ньєрі', 1],
    ])

    expect(screen.getAllByRole('article')).toHaveLength(2)
    const ethiopia = screen.getByRole('article', { name: 'Ефіопія Іргачеф' })
    expect(within(ethiopia).getByText('2 шт.')).toBeInTheDocument()
    expect(within(ethiopia).getByText('840 грн')).toBeInTheDocument()
    const kenya = screen.getByRole('article', { name: 'Кенія Ньєрі' })
    expect(within(kenya).getByText('1 шт.')).toBeInTheDocument()
    expect(within(kenya).getByText('450 грн')).toBeInTheDocument()
    expect(screen.getByText('Разом: 1290 грн')).toBeInTheDocument()
  })

  test('«+» і «−» змінюють кількість і суму', async () => {
    const user = userEvent.setup()
    await fillCart(user, [['Ефіопія Іргачеф', 1]])
    const line = screen.getByRole('article', { name: 'Ефіопія Іргачеф' })

    await user.click(
      within(line).getByRole('button', { name: 'Збільшити кількість' }),
    )
    expect(within(line).getByText('2 шт.')).toBeInTheDocument()
    expect(screen.getByText('Разом: 840 грн')).toBeInTheDocument()

    await user.click(
      within(line).getByRole('button', { name: 'Зменшити кількість' }),
    )
    expect(within(line).getByText('1 шт.')).toBeInTheDocument()
    expect(screen.getByText('Разом: 420 грн')).toBeInTheDocument()
  })

  test('«Видалити» прибирає рядок, і лічильник у шапці зменшується', async () => {
    const user = userEvent.setup()
    await fillCart(user, [
      ['Ефіопія Іргачеф', 2],
      ['Кенія Ньєрі', 1],
    ])

    const kenya = screen.getByRole('article', { name: 'Кенія Ньєрі' })
    await user.click(within(kenya).getByRole('button', { name: 'Видалити' }))

    expect(
      screen.queryByRole('article', { name: 'Кенія Ньєрі' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Кошик (2)' })).toBeInTheDocument()
    expect(screen.getByText('Разом: 840 грн')).toBeInTheDocument()
  })
})
