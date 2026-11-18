import ProductCard from './components/ProductCard.jsx'
import ProductTabs from './components/ProductTabs.jsx'
import { product } from './data.js'

export default function App() {
  return (
    <main className="app">
      <ProductCard product={product} />
      <ProductTabs />
    </main>
  )
}
