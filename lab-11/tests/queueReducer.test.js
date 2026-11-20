import { describe, expect, it } from 'vitest'
import { loadOrders } from '../src/data/orders.js'
import {
  createInitialState,
  queueReducer,
  selectOrder,
} from '../src/model/queueReducer.js'
import { deepFreeze } from './deepFreeze.js'

const placed = {
  type: 'order_placed',
  order: {
    id: 'o-new',
    customer: { id: 'c-new', name: 'Петро' },
    items: [
      { id: 'i-new', drink: 'Лате', size: 'M', milk: 'звичайне', syrups: [] },
    ],
  },
}

// По одній дії кожного типу.
const actions = [
  placed,
  { type: 'item_toggled', orderId: 'o43', itemId: 'i5' },
  { type: 'order_advanced', orderId: 'o44' },
  { type: 'order_cancelled', orderId: 'o44' },
  { type: 'customer_renamed', customerId: 'c1', name: 'Ольга' },
]

const largest = Math.max(...loadOrders().map((order) => order.number))

describe('queueReducer', () => {
  it('не змінює стан, який отримав, за жодної дії', () => {
    for (const action of actions) {
      // Заморожений стан: зміна будь-якого його об'єкта кидає TypeError.
      const state = deepFreeze(createInitialState(loadOrders()))
      expect(() => queueReducer(state, action), action.type).not.toThrow()
    }
  })

  it('той самий стан і та сама дія дають той самий результат', () => {
    for (const action of actions) {
      const state = createInitialState(loadOrders())
      // Копія першого результату: другий виклик не зможе її змінити.
      const first = structuredClone(queueReducer(state, action))
      const second = queueReducer(state, action)
      expect(second, action.type).toEqual(first)
    }
  })

  it('новому замовленню дістається номер, наступний після найбільшого', () => {
    const next = queueReducer(createInitialState(loadOrders()), placed)
    expect(selectOrder(next, 'o-new').number).toBe(largest + 1)
  })

  it('номер скасованого замовлення не дістається новому', () => {
    // № 46 — найбільший номер у черзі.
    let state = createInitialState(loadOrders())
    state = queueReducer(state, { type: 'order_cancelled', orderId: 'o46' })
    state = queueReducer(state, placed)
    expect(selectOrder(state, 'o-new').number).toBe(largest + 1)
  })
})
