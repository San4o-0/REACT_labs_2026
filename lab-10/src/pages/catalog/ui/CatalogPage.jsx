import { BeanCard } from '../../../entities/bean/index.js'
import { beans } from '../../../entities/bean/index.js'
import { AddToCartButton } from '../../../features/add-to-cart/index.js'

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
