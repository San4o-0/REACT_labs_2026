import { defaultMilk } from '../data/menu.js'

/**
 * Чернетка нового замовлення — стан форми «Нове замовлення»:
 *   { customerName: 'Оля', items: [{ id, drink, size, milk, syrups }] }
 * customerName — текст поля «Ім'я гостя», items — додані напої.
 *
 * Порожня чернетка заморожена (Object.freeze), як і її масив items:
 * ред'юсер не може її змінити, лише повернути нову чернетку.
 */
export const emptyDraft = Object.freeze({
  customerName: '',
  items: Object.freeze([]),
})

/**
 * Ред'юсер форми «Нове замовлення». Отримує чернетку й дію, повертає нову
 * чернетку.
 *
 * Дії — що зробив бариста:
 *   { type: 'customer_changed', name }
 *       змінив текст поля «Ім'я гостя»
 *   { type: 'drink_added', id, drink }
 *       натиснув «+ Лате». Новий напій — розміру 'M', з молоком, типовим
 *       для нього в меню (defaultMilk у src/data/menu.js), без сиропів.
 *       id напою створює обробник події.
 *   { type: 'size_chosen', itemId, size }
 *       обрав розмір напою: 'S', 'M' чи 'L'
 *   { type: 'milk_chosen', itemId, milk }
 *       обрав молоко
 *   { type: 'syrup_toggled', itemId, syrup }
 *       відмітив сироп або зняв позначку
 *   { type: 'item_removed', itemId }
 *       натиснув «Видалити»
 *   { type: 'draft_cleared' }
 *       надіслав замовлення: форма знову порожня
 *
 * Невідома дія — помилка, у тексті якої є назва дії.
 *
 * Поки що кидає помилку. Вимоги — у тестах tests/draftReducer.test.js і
 * tests/OrderComposer.test.jsx.
 */
export function draftReducer(state, action) {
  switch (action.type) {
    case 'customer_changed':
      return { ...state, customerName: action.name }
    case 'drink_added':
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.id,
            drink: action.drink,
            size: 'M',
            milk: defaultMilk(action.drink),
            syrups: [],
          },
        ],
      }
    case 'size_chosen':
      return updateItem(state, action.itemId, (item) => ({
        ...item,
        size: action.size,
      }))
    case 'milk_chosen':
      return updateItem(state, action.itemId, (item) => ({
        ...item,
        milk: action.milk,
      }))
    case 'syrup_toggled':
      return updateItem(state, action.itemId, (item) => ({
        ...item,
        syrups: item.syrups.includes(action.syrup)
          ? item.syrups.filter((syrup) => syrup !== action.syrup)
          : [...item.syrups, action.syrup],
      }))
    case 'item_removed':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.itemId),
      }
    case 'draft_cleared':
      return emptyDraft
    default:
      throw new Error(`Unknown draft action: ${action.type}`)
  }
}

function updateItem(state, itemId, change) {
  return {
    ...state,
    items: state.items.map((item) =>
      item.id === itemId ? change(item) : item,
    ),
  }
}
