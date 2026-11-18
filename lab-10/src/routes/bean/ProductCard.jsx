import AddToCartButton from '../../shared/components/AddToCartButton.jsx'
import FavoriteButton from '../../shared/components/FavoriteButton.jsx'
import GrindPicker from './GrindPicker.jsx'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-title">
        <h1>{product.name}</h1>
        <FavoriteButton productId={product.id} name={product.name} />
      </div>
      <p className="lead">
        {product.origin}, {product.roast}. Ноти: {product.notes.join(', ')}.
      </p>
      <GrindPicker />
      <p className="price">
        {product.price} грн <span>за {product.weight}</span>
      </p>
      <AddToCartButton bean={product} />
    </article>
  )
}
