import { useCart } from '../../../entities/cart/index.js'
import { paths } from '../../../shared/config/index.js'
import Link from '../../../shared/ui/Link.jsx'

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
