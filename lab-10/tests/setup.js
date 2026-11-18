import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// Тести імпортують застосунок лише як '#app' і не імпортують нічого з src/:
// файли в src/ переїжджають у кожному завданні. Тому стан між тестами
// скидається ззовні: порожній localStorage — це порожній кошик і жодного ♡,
// порожня адреса після # — каталог.

beforeEach(() => {
  // track() з analytics пише рядок [analytics] у Console. У виводі тестів
  // ці рядки лише заважають, тому під час тестів console.info мовчить.
  vi.spyOn(console, 'info').mockImplementation(() => {})
  // Link прокручує сторінку на початок, а jsdom прокручувати не вміє й
  // пише про це в Console.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  window.location.hash = ''
  vi.restoreAllMocks()
})
