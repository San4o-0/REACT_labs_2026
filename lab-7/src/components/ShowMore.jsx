import { useShowMore } from '../hooks/useShowMore.js'

/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
export default function ShowMore({ items, step = 3, children }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step,
  )

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button
          type="button"
          className="show-more"
          onClick={hiddenCount > 0 ? showMore : collapse}
        >
          {hiddenCount > 0
            ? `Показати ще ${Math.min(step, hiddenCount)}`
            : 'Згорнути'}
        </button>
      )}
    </>
  )
}
