import { useEffect, useState } from 'react'

function readValue(key, initialValue) {
  try {
    const saved = localStorage.getItem(key)
    return saved === null ? initialValue : JSON.parse(saved)
  } catch {
    return initialValue
  }
}

/**
 * Стан, що зберігається в localStorage під ключем `key` у форматі JSON.
 *
 * Використання, як у useState:
 *   const [value, setValue] = useLocalStorage('grind', 'beans')
 *
 * Вимоги — у тестах tests/useLocalStorage.test.jsx.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
