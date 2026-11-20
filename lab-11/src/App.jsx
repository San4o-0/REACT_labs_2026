import { useReducer, useState } from 'react'
import OrderBoard from './components/OrderBoard.jsx'
import OrderComposer from './components/OrderComposer.jsx'
import OrderDetails from './components/OrderDetails.jsx'
import { loadOrders } from './data/orders.js'
import { createInitialState, queueReducer } from './model/queueReducer.js'

export default function App() {
  const [queue, dispatch] = useReducer(queueReducer, null, () =>
    createInitialState(loadOrders()),
  )
  // Замовлення, відкрите в «Деталях», або null.
  const [openedOrder, setOpenedOrder] = useState(null)

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
            order={openedOrder}
            dispatch={dispatch}
            onClose={() => setOpenedOrder(null)}
          />
          <OrderBoard
            queue={queue}
            dispatch={dispatch}
            onOpen={(order) => setOpenedOrder(order)}
          />
        </main>
      </div>
    </div>
  )
}
