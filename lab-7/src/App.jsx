import ProductCard from './components/ProductCard.jsx'
import BrewGuide from './components/BrewGuide.jsx'
import ReviewList from './components/ReviewList.jsx'
import RelatedProducts from './components/RelatedProducts.jsx'
import { brewMethods, product, related, reviews } from './data.js'

export default function App() {
  return (
    <main className="app">
      <ProductCard product={product} />
      <BrewGuide methods={brewMethods} />
      <ReviewList reviews={reviews} />
      <RelatedProducts products={related} />
    </main>
  )
}
