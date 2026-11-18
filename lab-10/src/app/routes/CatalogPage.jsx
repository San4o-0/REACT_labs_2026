import BeanCard from '../../features/beans/components/BeanCard.jsx'
import { beans } from '../../features/beans/data/beans.js'
import AddToCartButton from '../../features/cart/components/AddToCartButton.jsx'

export default function CatalogPage() {
  return (
    <>
      <h1>Кава в зернах</h1>
      <section className="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Усі сорти ({beans.length})</h2>
        <ul className="bean-grid">
          {beans.map((bean) => (
            <li key={bean.id}>
              <BeanCard bean={bean}>
                <AddToCartButton bean={bean} />
              </BeanCard>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
