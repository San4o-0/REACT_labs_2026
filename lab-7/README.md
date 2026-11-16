# ЛР-7. Патерни проєктування React. Частина 1

Стартовий проєкт лабораторної роботи № 7 курсу «Розробка вебзастосунків на
React»: сторінка кави в зернах. Інструкція:
https://denysmatsevych.github.io/web-development-2026/react/labs/lab-7/

Сторінка працює, але частина коду в ній дубльована, а таймери заварювання
поводяться дивно. У п'яти code challenges ви винесете логіку у власні хуки,
розділите таймер на розумний і простий компоненти й поділитеся логікою
«Показати ще» двома способами: компонентом із render prop і хуком. Що має
вийти, перевіряють готові тести в теці `tests/`.

## Що вже є

- компоненти сторінки в `src/components/`: картка товару, таймери, відгуки,
  схожі товари. `FavoriteButton` і `GrindPicker` зберігають значення в
  `localStorage` так само, як фільтри в ЛР-4;
- заготовки з описом API в коментарі: `src/hooks/useLocalStorage.js`,
  `useCountdown.js`, `useShowMore.js`, `src/components/TimerView.jsx` і
  `ShowMore.jsx`. Поки що кожна кидає помилку `Not implemented`;
- тести Vitest і React Testing Library в `tests/`, по файлу на хук чи
  компонент, який ви напишете: `useLocalStorage.test.jsx` перевіряє
  `useLocalStorage` і компоненти на ньому. Файли в `tests/` не змінюйте;
- `src/data.js`: товар, варіанти помелу, способи заварювання, 10 відгуків і 7
  схожих товарів; `src/formatTime.js` перетворює секунди на рядок `3:00`;
- стилі всієї сторінки в `src/index.css`, зокрема для повідомлення «Готово!»
  і кнопки в сітці «Схожі товари»;
- Vitest, jsdom і React Testing Library в `devDependencies` у
  `package.json`: `npm install` у корені встановить їх разом з іншими.

## Команди

`npm install` виконуйте в корені репозиторію `react-labs`, решту — у теці
`lab-7/`:

- `npm run dev`: dev-сервер на http://localhost:5173
- `npm test`: тести в режимі спостереження, вони перезапускаються після
  кожного збереження файлу; `q` — вихід
- `npm test -- tests/TimerView`: лише тести одного файлу (тут
  `TimerView.test.jsx`)
- `npx vitest run`: усі тести один раз
- `npm run lint`: ESLint
- `npm run format:check`: перевірка форматування Prettier
- `npm run build`: production-збірка в `dist/`
