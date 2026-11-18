import { withAnalytics } from '../../../shared/lib/withAnalytics.jsx'
import { useCart } from '../../../entities/cart/index.js'
import Button from '../../../shared/ui/Button.jsx'

const TrackedButton = withAnalytics(Button, 'add_to_cart')

export default function AddToCartButton({ bean }) {
  const { lines, add } = useCart()
  const quantity = lines.find((line) => line.id === bean.id)?.quantity ?? 0

  return (
    <div className="cart">
      <TrackedButton
        analyticsData={{ productId: bean.id }}
        onClick={() => add(bean)}
      >
        Додати в кошик
      </TrackedButton>
      <p className="cart-status" role="status">
        {quantity > 0 ? `У кошику: ${quantity}` : ''}
      </p>
    </div>
  )
}
