import { useState } from 'react'
import FavoriteButton from './FavoriteButton.jsx'

export default function RelatedProducts({ products }) {
  const [count, setCount] = useState(4)
  const visibleProducts = products.slice(0, count)
  const hiddenCount = products.length - visibleProducts.length

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Схожі товари</h2>
      <ul className="related-list" aria-labelledby="related-title">
        {visibleProducts.map((item) => (
          <li key={item.id} className="related-card">
            <h3>{item.name}</h3>
            <p>{item.notes}</p>
            <p className="price">{item.price} грн</p>
            <FavoriteButton productId={item.id} name={item.name} />
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          className="show-more"
          onClick={() => setCount(count + 4)}
        >
          Показати ще {Math.min(4, hiddenCount)}
        </button>
      )}
    </section>
  )
}
