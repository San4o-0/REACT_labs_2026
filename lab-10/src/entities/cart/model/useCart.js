import { useSyncExternalStore } from 'react'
import {
  addItem,
  getLines,
  removeItem,
  setQuantity,
  subscribe,
} from './cartStore.js'

export function useCart() {
  const lines = useSyncExternalStore(subscribe, getLines)

  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    add: addItem,
    setQuantity,
    remove: removeItem,
  }
}
