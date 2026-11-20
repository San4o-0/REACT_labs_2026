import { useEffect, useRef } from 'react'
import { describeItem, priceOf } from '../data/menu.js'

const statusTitle = {
  new: 'Нове',
  brewing: 'Готується',
  ready: 'Готове',
  served: 'Видане',
}

/**
 * Панель «Деталі замовлення»: напої замовлення й поле для імені гостя.
 * Без замовлення (order — null чи undefined) не показує нічого.
 */
export default function OrderDetails({ order, dispatch, onClose }) {
  const headingRef = useRef(null)
  const orderId = order?.id

  // Щойно відкрито інше замовлення, фокус переходить на заголовок панелі:
  // так панель видно й на вузькому екрані, а програма зчитування з екрана
  // читає, що відкрилося.
  useEffect(() => {
    if (orderId) headingRef.current.focus()
  }, [orderId])

  if (!order) return null

  const total = order.items.reduce((sum, item) => sum + priceOf(item), 0)

  return (
    <section className="order-details" aria-label="Деталі замовлення">
      <div className="details-head">
        <h2 ref={headingRef} tabIndex={-1}>
          № {order.number} · {order.customer.name}
        </h2>
        <button type="button" onClick={onClose}>
          Закрити
        </button>
      </div>
      <p className="details-status">{statusTitle[order.status]}</p>
      <ul className="details-items">
        {order.items.map((item) => (
          <li key={item.id}>
            {describeItem(item)} — {item.done ? 'готово' : 'ще ні'}
          </li>
        ))}
      </ul>
      <p className="total">Разом: {total} грн</p>
      <RenameForm
        key={`${order.id}:${order.customer.name}`}
        customer={order.customer}
        dispatch={dispatch}
      />
    </section>
  )
}

// key вище створює форму наново, коли змінюється замовлення чи ім'я гостя:
// поле знову починає з поточного імені.
function RenameForm({ customer, dispatch }) {
  function handleSubmit(e) {
    e.preventDefault()
    const name = new FormData(e.currentTarget).get('name').trim()
    if (name === '') return
    dispatch({ type: 'customer_renamed', customerId: customer.id, name })
  }

  return (
    <form className="rename" onSubmit={handleSubmit}>
      <label className="field">
        Ім'я гостя
        <input name="name" defaultValue={customer.name} autoComplete="off" />
      </label>
      <button type="submit">Зберегти</button>
    </form>
  )
}
