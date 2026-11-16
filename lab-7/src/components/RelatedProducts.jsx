import FavoriteButton from './FavoriteButton.jsx'
import ShowMore from './ShowMore.jsx'

export default function RelatedProducts({ products }) {
  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Схожі товари</h2>
      <ShowMore items={products} step={4}>
        {(visibleProducts) => (
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
        )}
      </ShowMore>
    </section>
  )
}
