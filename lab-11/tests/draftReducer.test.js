import { describe, expect, it } from 'vitest'
import { draftReducer, emptyDraft } from '../src/model/draftReducer.js'
import { deepFreeze } from './deepFreeze.js'

// Заморожена чернетка з двома напоями: Лате (a) і Еспресо з карамеллю (b).
function twoDrinks() {
  return deepFreeze({
    customerName: 'Оля',
    items: [
      { id: 'a', drink: 'Лате', size: 'M', milk: 'звичайне', syrups: [] },
      {
        id: 'b',
        drink: 'Еспресо',
        size: 'M',
        milk: 'без молока',
        syrups: ['карамель'],
      },
    ],
  })
}

describe('draftReducer', () => {
  it('drink_added додає напій розміру M з типовим для нього молоком з меню і без сиропів', () => {
    const latte = draftReducer(emptyDraft, {
      type: 'drink_added',
      id: 'a',
      drink: 'Лате',
    })
    expect(latte.items).toEqual([
      { id: 'a', drink: 'Лате', size: 'M', milk: 'звичайне', syrups: [] },
    ])
    const both = draftReducer(latte, {
      type: 'drink_added',
      id: 'b',
      drink: 'Еспресо',
    })
    expect(both.items).toEqual([
      { id: 'a', drink: 'Лате', size: 'M', milk: 'звичайне', syrups: [] },
      { id: 'b', drink: 'Еспресо', size: 'M', milk: 'без молока', syrups: [] },
    ])
  })

  it('size_chosen і milk_chosen змінюють лише свій напій', () => {
    const sized = draftReducer(twoDrinks(), {
      type: 'size_chosen',
      itemId: 'a',
      size: 'L',
    })
    expect(sized.items.map((item) => item.size)).toEqual(['L', 'M'])
    const milked = draftReducer(sized, {
      type: 'milk_chosen',
      itemId: 'b',
      milk: 'вівсяне',
    })
    expect(milked.items.map((item) => item.milk)).toEqual([
      'звичайне',
      'вівсяне',
    ])
  })

  it('syrup_toggled додає сироп, а повторно — прибирає', () => {
    const toggle = { type: 'syrup_toggled', itemId: 'a', syrup: 'ваніль' }
    const once = draftReducer(twoDrinks(), toggle)
    expect(once.items[0].syrups).toEqual(['ваніль'])
    const twice = draftReducer(once, toggle)
    expect(twice.items[0].syrups).toEqual([])
    expect(twice.items[1].syrups).toEqual(['карамель'])
  })

  it('item_removed прибирає напій', () => {
    const next = draftReducer(twoDrinks(), {
      type: 'item_removed',
      itemId: 'a',
    })
    expect(next.items.map((item) => item.id)).toEqual(['b'])
  })

  it("customer_changed змінює ім'я", () => {
    const next = draftReducer(twoDrinks(), {
      type: 'customer_changed',
      name: 'Ольга',
    })
    expect(next.customerName).toBe('Ольга')
    expect(next.items).toHaveLength(2)
  })

  it('draft_cleared повертає порожню чернетку', () => {
    expect(draftReducer(twoDrinks(), { type: 'draft_cleared' })).toEqual({
      customerName: '',
      items: [],
    })
  })

  it('невідома дія кидає помилку з назвою дії', () => {
    expect(() => draftReducer(twoDrinks(), { type: 'coffee_spilled' })).toThrow(
      'coffee_spilled',
    )
  })

  it('не змінює стан, який отримав', () => {
    // twoDrinks() заморожена: зміна будь-якого її об'єкта кидає TypeError.
    const actions = [
      { type: 'customer_changed', name: 'Ольга' },
      { type: 'drink_added', id: 'c', drink: 'Какао' },
      { type: 'size_chosen', itemId: 'a', size: 'S' },
      { type: 'milk_chosen', itemId: 'a', milk: 'вівсяне' },
      { type: 'syrup_toggled', itemId: 'a', syrup: 'ваніль' },
      { type: 'syrup_toggled', itemId: 'b', syrup: 'карамель' },
      { type: 'item_removed', itemId: 'b' },
      { type: 'draft_cleared' },
    ]
    for (const action of actions) {
      expect(() => draftReducer(twoDrinks(), action), action.type).not.toThrow()
    }
  })

  it("інші напої лишаються тими самими об'єктами", () => {
    const draft = twoDrinks()
    const actions = [
      { type: 'size_chosen', itemId: 'a', size: 'L' },
      { type: 'milk_chosen', itemId: 'a', milk: 'вівсяне' },
      { type: 'syrup_toggled', itemId: 'a', syrup: 'ваніль' },
      { type: 'drink_added', id: 'c', drink: 'Какао' },
    ]
    for (const action of actions) {
      const next = draftReducer(draft, action)
      expect(next.items[1], action.type).toBe(draft.items[1])
    }
    const removed = draftReducer(draft, { type: 'item_removed', itemId: 'a' })
    expect(removed.items[0], 'item_removed').toBe(draft.items[1])
  })
})
