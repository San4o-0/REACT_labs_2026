import { useState } from 'react'

export function useShowMore(items, step) {
  const [count, setCount] = useState(step)
  const visibleItems = items.slice(0, count)

  return {
    visibleItems,
    hiddenCount: items.length - visibleItems.length,
    showMore: () => setCount((c) => c + step),
    collapse: () => setCount(step),
  }
}
