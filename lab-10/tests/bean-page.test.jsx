import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from '#app'

function renderAt(hash) {
  window.location.hash = hash
  return render(<App />)
}

describe('Сторінка сорту', () => {
  test('сторінка сорту показує назву, помел і ціну', () => {
    renderAt('#/beans/ethiopia-yirgacheffe')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Ефіопія Іргачеф' }),
    ).toBeInTheDocument()
    const grind = screen.getByRole('group', { name: 'Помел' })
    expect(within(grind).getByRole('radio', { name: 'Зерно' })).toBeChecked()
    expect(screen.getByText('420 грн')).toBeInTheDocument()
  })

  test('вкладки «Заварювання», «Відгуки (N)» і «Схожі товари» перемикають вміст', async () => {
    const user = userEvent.setup()
    renderAt('#/beans/ethiopia-yirgacheffe')
    const brew = screen.getByRole('heading', { name: 'Як заварити' })
    expect(brew).toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Відгуки (10)' }))
    expect(screen.getByRole('heading', { name: 'Відгуки (10)' })).toBeVisible()
    expect(brew).not.toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Схожі товари' }))
    expect(screen.getByRole('heading', { name: 'Схожі товари' })).toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Заварювання' }))
    expect(screen.getByRole('heading', { name: 'Як заварити' })).toBeVisible()
  })

  test('«Схожі товари» не показують поточний сорт', async () => {
    const user = userEvent.setup()
    renderAt('#/beans/kenya-nyeri')

    await user.click(screen.getByRole('tab', { name: 'Схожі товари' }))
    const related = screen.getByRole('region', { name: 'Схожі товари' })
    await user.click(
      within(related).getByRole('button', { name: 'Показати ще 3' }),
    )

    expect(within(related).getAllByRole('article')).toHaveLength(7)
    expect(
      within(related).getByRole('link', { name: 'Ефіопія Іргачеф' }),
    ).toBeInTheDocument()
    expect(
      within(related).queryByRole('link', { name: 'Кенія Ньєрі' }),
    ).not.toBeInTheDocument()
  })

  test('таймер після «Старт» показує «Пауза»', async () => {
    const user = userEvent.setup()
    renderAt('#/beans/ethiopia-yirgacheffe')
    const timer = screen.getByRole('article', { name: 'Пуровер V60' })

    await user.click(within(timer).getByRole('button', { name: 'Старт' }))

    expect(
      within(timer).getByRole('button', { name: 'Пауза' }),
    ).toBeInTheDocument()
  })
})
