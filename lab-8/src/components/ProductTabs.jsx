import { useState } from 'react'
import BrewGuide from './BrewGuide.jsx'
import ReviewList from './ReviewList.jsx'
import RelatedProducts from './RelatedProducts.jsx'
import { brewMethods, related, reviews } from '../data.js'

export default function ProductTabs() {
  const [tab, setTab] = useState('brew')

  return (
    <div className="tabs">
      <div className="tab-list">
        <button
          type="button"
          className={tab === 'brew' ? 'active' : ''}
          onClick={() => setTab('brew')}
        >
          Заварювання
        </button>
        <button
          type="button"
          className={tab === 'reviews' ? 'active' : ''}
          onClick={() => setTab('reviews')}
        >
          Відгуки ({reviews.length})
        </button>
        <button
          type="button"
          className={tab === 'related' ? 'active' : ''}
          onClick={() => setTab('related')}
        >
          Схожі товари
        </button>
      </div>
      {tab === 'brew' && <BrewGuide methods={brewMethods} />}
      {tab === 'reviews' && <ReviewList reviews={reviews} />}
      {tab === 'related' && <RelatedProducts products={related} />}
    </div>
  )
}
