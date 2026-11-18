import AppHeader from './components/AppHeader.jsx'
import NotFound from './components/NotFound.jsx'
import { useRoute } from './hooks/useRoute.js'
import BeanPage from './pages/BeanPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'

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
