import { useCart } from '../hooks/useCart.js'
import { paths } from '../utils/paths.js'
import Link from './Link.jsx'

export default function AppHeader() {
  const { count } = useCart()

  return (
    <header className="app-header">
      <Link to={paths.catalog()} className="brand">
        Кавова крамниця
      </Link>
      <nav aria-label="Основна навігація">
        <Link to={paths.cart()} className="cart-link">
          Кошик ({count})
        </Link>
      </nav>
    </header>
  )
}
