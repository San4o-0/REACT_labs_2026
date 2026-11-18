import BeanCard from '../../shared/components/BeanCard.jsx'
import { beans } from '../../shared/data/beans.js'

export default function CatalogPage() {
  return (
    <>
      <h1>Кава в зернах</h1>
      <section className="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Усі сорти ({beans.length})</h2>
        <ul className="bean-grid">
          {beans.map((bean) => (
            <li key={bean.id}>
              <BeanCard bean={bean} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
