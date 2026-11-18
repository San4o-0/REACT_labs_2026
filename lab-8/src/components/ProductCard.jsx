import { useState } from 'react'
import Button from './Button.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import GrindPicker from './GrindPicker.jsx'
import { withAnalytics } from '../hoc/withAnalytics.jsx'

const AddToCartButton = withAnalytics(Button, 'add_to_cart')

export default function ProductCard({ product }) {
  const [cartCount, setCartCount] = useState(0)

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
      <div className="cart">
        <AddToCartButton
          analyticsData={{ productId: product.id }}
          onClick={() => setCartCount(cartCount + 1)}
        >
          Додати в кошик
        </AddToCartButton>
        <p className="cart-status" role="status">
          {cartCount > 0 ? `У кошику: ${cartCount}` : ''}
        </p>
      </div>
    </article>
  )
}
