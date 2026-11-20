// Меню кав'ярні: напої, розміри, молоко й сиропи з цінами в гривнях. Ціна
// напою в замовленні — його ціна в меню плюс доплати за розмір, молоко й
// кожен сироп.

export const drinks = [
  { name: 'Еспресо', price: 45, milk: 'без молока' },
  { name: 'Американо', price: 50, milk: 'без молока' },
  { name: 'Капучино', price: 65, milk: 'звичайне' },
  { name: 'Лате', price: 70, milk: 'звичайне' },
  { name: 'Флет вайт', price: 75, milk: 'звичайне' },
  { name: 'Какао', price: 60, milk: 'звичайне' },
]

export const sizes = [
  { name: 'S', extra: -10 },
  { name: 'M', extra: 0 },
  { name: 'L', extra: 15 },
]

export const milks = [
  { name: 'звичайне', extra: 0 },
  { name: 'вівсяне', extra: 15 },
  { name: 'без молока', extra: 0 },
]

export const syrups = [
  { name: 'ваніль', extra: 10 },
  { name: 'карамель', extra: 10 },
  { name: 'лісовий горіх', extra: 12 },
]

function find(list, name) {
  return list.find((entry) => entry.name === name)
}

/** Молоко, з яким напій додають до замовлення: defaultMilk('Еспресо') — 'без молока'. */
export function defaultMilk(drink) {
  return find(drinks, drink).milk
}

/** Ціна одного напою { drink, size, milk, syrups } у гривнях. */
export function priceOf(item) {
  const syrupsPrice = item.syrups.reduce(
    (sum, syrup) => sum + find(syrups, syrup).extra,
    0,
  )
  return (
    find(drinks, item.drink).price +
    find(sizes, item.size).extra +
    find(milks, item.milk).extra +
    syrupsPrice
  )
}

/** Опис напою для картки: «Лате L · вівсяне молоко · ваніль». */
export function describeItem(item) {
  const milk = item.milk === 'без молока' ? item.milk : `${item.milk} молоко`
  return [`${item.drink} ${item.size}`, milk, ...item.syrups].join(' · ')
}
