// Замовлення, які вже є в черзі, коли бариста відкриває сторінку. Вони
// вкладені, як їх надіслав би сервер: гість і напої — усередині замовлення.
// Оля зробила два замовлення, тож її дані тут двічі.

/**
 * Повертає нову копію замовлень на кожен виклик. Так кожен запуск
 * застосунку й кожен тест починає з тих самих даних, хоч би що з ними
 * зробили раніше.
 */
export function loadOrders() {
  return [
    {
      id: 'o41',
      number: 41,
      status: 'ready',
      customer: { id: 'c1', name: 'Оля' },
      items: [
        {
          id: 'i1',
          drink: 'Капучино',
          size: 'M',
          milk: 'вівсяне',
          syrups: [],
          done: true,
        },
        {
          id: 'i2',
          drink: 'Еспресо',
          size: 'S',
          milk: 'без молока',
          syrups: [],
          done: true,
        },
      ],
    },
    {
      id: 'o42',
      number: 42,
      status: 'served',
      customer: { id: 'c2', name: 'Тарас' },
      items: [
        {
          id: 'i3',
          drink: 'Американо',
          size: 'L',
          milk: 'без молока',
          syrups: [],
          done: true,
        },
      ],
    },
    {
      id: 'o43',
      number: 43,
      status: 'brewing',
      customer: { id: 'c3', name: 'Марко' },
      items: [
        {
          id: 'i4',
          drink: 'Лате',
          size: 'L',
          milk: 'звичайне',
          syrups: ['ваніль'],
          done: true,
        },
        {
          id: 'i5',
          drink: 'Флет вайт',
          size: 'M',
          milk: 'звичайне',
          syrups: [],
          done: false,
        },
      ],
    },
    {
      id: 'o44',
      number: 44,
      status: 'new',
      customer: { id: 'c1', name: 'Оля' },
      items: [
        {
          id: 'i6',
          drink: 'Какао',
          size: 'M',
          milk: 'вівсяне',
          syrups: ['карамель'],
          done: false,
        },
      ],
    },
    {
      id: 'o45',
      number: 45,
      status: 'new',
      customer: { id: 'c4', name: 'Ірина' },
      items: [
        {
          id: 'i7',
          drink: 'Капучино',
          size: 'L',
          milk: 'звичайне',
          syrups: ['лісовий горіх'],
          done: false,
        },
        {
          id: 'i8',
          drink: 'Еспресо',
          size: 'M',
          milk: 'без молока',
          syrups: [],
          done: false,
        },
      ],
    },
    {
      id: 'o46',
      number: 46,
      status: 'brewing',
      customer: { id: 'c5', name: 'Данило' },
      items: [
        {
          id: 'i9',
          drink: 'Флет вайт',
          size: 'S',
          milk: 'вівсяне',
          syrups: [],
          done: false,
        },
      ],
    },
  ]
}
