// Меню кав'ярні: категорії, у кожній — позиції.
// available: false — позиції зараз немає в наявності.
export const menu = [
  {
    id: 'coffee',
    name: 'Кава',
    items: [
      { id: 1, name: 'Еспресо', price: 55, available: true },
      { id: 2, name: 'Американо', price: 60, available: true },
      { id: 3, name: 'Капучино', price: 75, available: true },
      { id: 4, name: 'Лате', price: 80, available: false },
    ],
  },
  {
    id: 'tea',
    name: 'Чай',
    items: [
      { id: 5, name: 'Чорний чай', price: 45, available: true },
      { id: 6, name: 'Зелений чай', price: 45, available: true },
      { id: 7, name: "Трав'яний чай", price: 50, available: false },
    ],
  },
  {
    id: 'desserts',
    name: 'Десерти',
    items: [
      { id: 8, name: 'Круасан', price: 70, available: true },
      { id: 9, name: 'Чизкейк', price: 120, available: true },
      { id: 10, name: 'Брауні', price: 95, available: false },
    ],
  },
]
