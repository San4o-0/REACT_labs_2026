import CartLine from '../components/CartLine.jsx'
import Link from '../components/Link.jsx'
import { useCart } from '../hooks/useCart.js'
import { paths } from '../utils/paths.js'

export default function CartPage() {
  const { lines, total } = useCart()

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <h1 id="cart-title">Кошик</h1>
      {lines.length === 0 ? (
        <p className="cart-empty">
          Кошик порожній. <Link to={paths.catalog()}>До каталогу</Link>
        </p>
      ) : (
        <>
          <ul className="cart-lines">
            {lines.map((line) => (
              <li key={line.id}>
                <CartLine line={line} />
              </li>
            ))}
          </ul>
          <p className="cart-total">Разом: {total} грн</p>
        </>
      )}
    </section>
  )
}
