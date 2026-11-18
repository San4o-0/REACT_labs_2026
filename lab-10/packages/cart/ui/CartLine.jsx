import { useId } from 'react'
import { useCart } from '../state/useCart.js'

export default function CartLine({ line }) {
  const { setQuantity, remove } = useCart()
  const titleId = useId()

  return (
    <article className="cart-line" aria-labelledby={titleId}>
      <div className="cart-line-name">
        <h2 id={titleId}>{line.name}</h2>
        <p>{line.price} грн за пачку</p>
      </div>
      <div className="quantity">
        <button
          type="button"
          aria-label="Зменшити кількість"
          disabled={line.quantity === 1}
          onClick={() => setQuantity(line.id, line.quantity - 1)}
        >
          −
        </button>
        <span>{line.quantity} шт.</span>
        <button
          type="button"
          aria-label="Збільшити кількість"
          onClick={() => setQuantity(line.id, line.quantity + 1)}
        >
          +
        </button>
      </div>
      <p className="cart-line-sum">{line.price * line.quantity} грн</p>
      <button type="button" className="remove" onClick={() => remove(line.id)}>
        Видалити
      </button>
    </article>
  )
}
