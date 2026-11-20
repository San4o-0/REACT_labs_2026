import { useId } from 'react'
import { describeItem } from '../data/menu.js'

// Кнопка наступного кроку в кожній колонці, крім «Видані».
const nextStep = { new: 'Почати', brewing: 'Готово', ready: 'Видати' }

export default function OrderCard({ order, dispatch, onOpen }) {
  const titleId = useId()
  const isBrewing = order.status === 'brewing'
  const allDone = order.items.every((item) => item.done)
  const canCancel = order.status === 'new' || isBrewing

  return (
    <article
      className={`order-card status-${order.status}`}
      aria-labelledby={titleId}
    >
      <h3 id={titleId}>
        № {order.number} · {order.customer.name}
      </h3>
      <ul className="order-items">
        {order.items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.done}
                disabled={!isBrewing}
                onChange={() =>
                  dispatch({
                    type: 'item_toggled',
                    orderId: order.id,
                    itemId: item.id,
                  })
                }
              />
              {describeItem(item)}
            </label>
          </li>
        ))}
      </ul>
      <div className="card-actions">
        {nextStep[order.status] && (
          <button
            type="button"
            className="primary"
            disabled={isBrewing && !allDone}
            onClick={() =>
              dispatch({ type: 'order_advanced', orderId: order.id })
            }
          >
            {nextStep[order.status]}
          </button>
        )}
        {canCancel && (
          <button
            type="button"
            onClick={() =>
              dispatch({ type: 'order_cancelled', orderId: order.id })
            }
          >
            Скасувати замовлення
          </button>
        )}
        <button type="button" onClick={() => onOpen(order)}>
          Деталі
        </button>
      </div>
    </article>
  )
}
