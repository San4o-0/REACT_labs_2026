import { describe, expect, it } from 'vitest'
import { loadOrders } from '../src/data/orders.js'
import {
  createInitialState,
  queueReducer,
  selectColumn,
} from '../src/model/queueReducer.js'
import { deepFreeze } from './deepFreeze.js'

// Тести форми стану читають лише шляхи, задані в §4.5: orders.byId,
// orders.ids, customers.byId, customers.ids і customerId у замовленні.
// Інші ключі стану — ваші.

const orders = loadOrders()
const orderIds = orders.map((order) => order.id)
const largest = Math.max(...orders.map((order) => order.number))

describe('Нормалізований стан черги', () => {
  it('createInitialState кладе замовлення в orders.byId, а їхній порядок — в orders.ids', () => {
    const state = createInitialState(loadOrders())
    expect(state.orders.ids).toEqual(orderIds)
    for (const order of orders) {
      expect(state.orders.byId[order.id], order.id).toMatchObject({
        id: order.id,
        number: order.number,
        status: order.status,
      })
    }
  })

  it('кожен гість є в customers один раз, а замовлення зберігає лише customerId', () => {
    const state = createInitialState(loadOrders())
    expect([...state.customers.ids].sort()).toEqual([
      'c1',
      'c2',
      'c3',
      'c4',
      'c5',
    ])
    expect(state.customers.byId.c1).toEqual({ id: 'c1', name: 'Оля' })
    for (const order of orders) {
      const stored = state.orders.byId[order.id]
      expect(stored.customerId, order.id).toBe(order.customer.id)
      expect(stored, order.id).not.toHaveProperty('customer')
    }
  })

  it('напої лишаються всередині замовлення', () => {
    const state = createInitialState(loadOrders())
    for (const order of orders) {
      expect(state.orders.byId[order.id].items, order.id).toEqual(order.items)
    }
  })

  it("customer_renamed змінює одне місце, а orders лишаються тим самим об'єктом", () => {
    const state = deepFreeze(createInitialState(loadOrders()))
    const next = queueReducer(state, {
      type: 'customer_renamed',
      customerId: 'c1',
      name: 'Ольга',
    })
    expect(next.customers.byId.c1.name).toBe('Ольга')
    expect(next.orders).toBe(state.orders)
  })

  it("item_toggled не створює нових об'єктів для інших замовлень і для гостей", () => {
    const state = deepFreeze(createInitialState(loadOrders()))
    const next = queueReducer(state, {
      type: 'item_toggled',
      orderId: 'o43',
      itemId: 'i5',
    })
    expect(next.orders.byId.o43.items[1].done).toBe(true)
    expect(next.customers).toBe(state.customers)
    for (const id of orderIds.filter((id) => id !== 'o43')) {
      expect(next.orders.byId[id], id).toBe(state.orders.byId[id])
    }
  })

  it('order_cancelled прибирає замовлення з byId і з ids', () => {
    const state = deepFreeze(createInitialState(loadOrders()))
    const next = queueReducer(state, {
      type: 'order_cancelled',
      orderId: 'o44',
    })
    expect(next.orders.ids).toEqual(orderIds.filter((id) => id !== 'o44'))
    expect(next.orders.byId).not.toHaveProperty('o44')
  })

  it('selectColumn повертає замовлення колонки в порядку надходження, разом із гостем', () => {
    let state = createInitialState(loadOrders())
    state = queueReducer(state, {
      type: 'order_placed',
      order: {
        id: 'o-new',
        customer: { id: 'c-new', name: 'Петро' },
        items: [
          {
            id: 'i-new',
            drink: 'Лате',
            size: 'M',
            milk: 'звичайне',
            syrups: [],
          },
        ],
      },
    })
    const newOrders = selectColumn(state, 'new')
    expect(newOrders.map((order) => order.number)).toEqual([
      44,
      45,
      largest + 1,
    ])
    expect(newOrders.map((order) => order.customer.name)).toEqual([
      'Оля',
      'Ірина',
      'Петро',
    ])
  })
})
