export const product = {
  id: 'ethiopia-yirgacheffe',
  name: 'Ефіопія Іргачеф',
  origin: 'Ефіопія, регіон Іргачеф',
  roast: 'світле обсмаження',
  notes: ['бергамот', 'жасмин', 'лимон'],
  weight: '250 г',
  price: 420,
}

export const grindOptions = [
  { value: 'beans', label: 'Зерно' },
  { value: 'espresso', label: 'Для еспресо' },
  { value: 'filter', label: 'Для фільтра' },
  { value: 'french-press', label: 'Для френч-преса' },
]

export const brewMethods = [
  {
    id: 'v60',
    name: 'Пуровер V60',
    recipe: '15 г кави, 250 мл води 93 °C',
    seconds: 180,
  },
  {
    id: 'french-press',
    name: 'Френч-прес',
    recipe: '30 г кави, 500 мл води 95 °C',
    seconds: 240,
  },
]

export const reviews = [
  {
    id: 1,
    author: 'Олена',
    rating: 5,
    text: 'Яскрава кислинка й чайний смак.',
  },
  {
    id: 2,
    author: 'Андрій',
    rating: 4,
    text: 'У V60 дуже добре, в еспресо кисло.',
  },
  {
    id: 3,
    author: 'Ірина',
    rating: 5,
    text: 'Справді чути жасмин.',
  },
  {
    id: 4,
    author: 'Максим',
    rating: 5,
    text: 'Свіжа обсмажка, пачка з клапаном.',
  },
  {
    id: 5,
    author: 'Софія',
    rating: 3,
    text: 'Для мене легкувата.',
  },
  {
    id: 6,
    author: 'Тарас',
    rating: 5,
    text: 'Беру вже третю пачку.',
  },
  {
    id: 7,
    author: 'Наталія',
    rating: 4,
    text: 'Смачно з холодним заварюванням.',
  },
  {
    id: 8,
    author: 'Богдан',
    rating: 5,
    text: 'Лимон і бергамот, як написано.',
  },
  {
    id: 9,
    author: 'Дарина',
    rating: 4,
    text: 'Хороша кава на щодень.',
  },
  {
    id: 10,
    author: 'Юрій',
    rating: 5,
    text: 'Найкраща Ефіопія, яку пробував.',
  },
]

export const related = [
  {
    id: 'kenya-nyeri',
    name: 'Кенія Ньєрі',
    notes: 'смородина, грейпфрут',
    price: 450,
  },
  {
    id: 'colombia-huila',
    name: 'Колумбія Уїла',
    notes: 'карамель, яблуко',
    price: 380,
  },
  {
    id: 'brazil-cerrado',
    name: 'Бразилія Серрадо',
    notes: 'горіх, шоколад',
    price: 340,
  },
  {
    id: 'guatemala-antigua',
    name: 'Гватемала Антигуа',
    notes: 'какао, спеції',
    price: 400,
  },
  {
    id: 'rwanda-nyamasheke',
    name: 'Руанда Ньямашеке',
    notes: 'вишня, мед',
    price: 430,
  },
  {
    id: 'costa-rica-tarrazu',
    name: 'Коста-Рика Тарасу',
    notes: 'мандарин, тростинний цукор',
    price: 410,
  },
  {
    id: 'peru-cajamarca',
    name: 'Перу Кахамарка',
    notes: 'молочний шоколад, слива',
    price: 370,
  },
]
