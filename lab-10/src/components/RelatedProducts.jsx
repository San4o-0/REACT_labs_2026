import { useShowMore } from '../hooks/useShowMore.js'
import BeanCard from './BeanCard.jsx'

export default function RelatedProducts({ products }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    products,
    4,
  )

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Схожі товари</h2>
      <ul className="related-list" aria-labelledby="related-title">
        {visibleItems.map((bean) => (
          <li key={bean.id}>
            <BeanCard bean={bean} compact />
          </li>
        ))}
        <li className="related-more">
          <button
            type="button"
            className="show-more"
            onClick={hiddenCount > 0 ? showMore : collapse}
          >
            {hiddenCount > 0
              ? `Показати ще ${Math.min(4, hiddenCount)}`
              : 'Згорнути'}
          </button>
        </li>
      </ul>
    </section>
  )
}
