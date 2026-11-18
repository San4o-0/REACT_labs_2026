import ProductCard from './components/ProductCard.jsx'
import Tabs from './components/Tabs.jsx'
import BrewGuide from './components/BrewGuide.jsx'
import ReviewList from './components/ReviewList.jsx'
import RelatedProducts from './components/RelatedProducts.jsx'
import { brewMethods, product, related, reviews } from './data.js'

export default function App() {
  return (
    <main className="app">
      <ProductCard product={product} />
      <Tabs defaultValue="brew">
        <Tabs.List aria-label="Про каву">
          <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
          <Tabs.Tab value="reviews">Відгуки ({reviews.length})</Tabs.Tab>
          <Tabs.Tab value="related">Схожі товари</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="brew">
          <BrewGuide methods={brewMethods} />
        </Tabs.Panel>
        <Tabs.Panel value="reviews">
          <ReviewList reviews={reviews} />
        </Tabs.Panel>
        <Tabs.Panel value="related">
          <RelatedProducts products={related} />
        </Tabs.Panel>
      </Tabs>
    </main>
  )
}
