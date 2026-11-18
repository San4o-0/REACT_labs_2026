import { useEffect, useState } from 'react'

function readStored(key, initialValue) {
  const stored = localStorage.getItem(key)
  if (stored === null) return initialValue
  try {
    return JSON.parse(stored)
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
