import { useReducer, useState } from 'react'
import OrderBoard from './components/OrderBoard.jsx'
import OrderComposer from './components/OrderComposer.jsx'
import OrderDetails from './components/OrderDetails.jsx'
import { loadOrders } from './data/orders.js'
import {
  createInitialState,
  queueReducer,
  selectOrder,
} from './model/queueReducer.js'

export default function App() {
  const [queue, dispatch] = useReducer(queueReducer, null, () =>
    createInitialState(loadOrders()),
  )
  // id замовлення, відкритого в «Деталях», або null. Саме замовлення
  // береться з черги, тож «Деталі» завжди показують його таким, як на дошці.
  const [openedOrderId, setOpenedOrderId] = useState(null)

  function handlePlace({ customerName, items }) {
    dispatch({
      type: 'order_placed',
      order: {
        id: crypto.randomUUID(),
        customer: { id: crypto.randomUUID(), name: customerName },
        items,
      },
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Черга замовлень</h1>
        <p className="lead">
          Нове замовлення приймають у формі, а далі воно йде колонками зліва
          направо.
        </p>
      </header>
      <div className="workspace">
        <OrderComposer onPlace={handlePlace} />
        <main className="queue">
          <OrderDetails
            order={selectOrder(queue, openedOrderId)}
            dispatch={dispatch}
            onClose={() => setOpenedOrderId(null)}
          />
          <OrderBoard
            queue={queue}
            dispatch={dispatch}
            onOpen={(order) => setOpenedOrderId(order.id)}
          />
        </main>
      </div>
    </div>
  )
}
