import AppHeader from './AppHeader.jsx'
import NotFound from '../shared/components/NotFound.jsx'
import { useRoute } from './useRoute.js'
import BeanPage from '../routes/bean/BeanPage.jsx'
import CartPage from '../routes/cart/CartPage.jsx'
import CatalogPage from '../routes/catalog/CatalogPage.jsx'

function renderPage(route) {
  switch (route.name) {
    case 'catalog':
      return <CatalogPage />
    case 'bean':
      return <BeanPage key={route.id} beanId={route.id} />
    case 'cart':
      return <CartPage />
    default:
      return <NotFound />
  }
}

export default function App() {
  const route = useRoute()

  return (
    <>
      <AppHeader />
      <main className="app">{renderPage(route)}</main>
    </>
  )
}
