# ЛР-11. Управління станом: useReducer для роботи зі складними структурами даних

Стартовий проєкт лабораторної роботи № 11 курсу «Розробка вебзастосунків на
React»: сторінка бариста «Черга замовлень». Інструкція:
https://denysmatsevych.github.io/web-development-2026/react/labs/lab-11/

Ліворуч — форма «Нове замовлення»: ім'я гостя й напої з розміром, молоком і
сиропами. Праворуч — черга з чотирьох колонок: «Нові», «Готуються», «Готові»
й «Видані». Сторінка працює, але не всюди правильно. У чотирьох code
challenges ви переведете форму з кількох `useState` на власний ред'юсер,
зробите чистим ред'юсер черги, який написав колега, нормалізуєте стан черги й
додасте «Скасувати дію» та «Повторити дію» через ред'юсер вищого порядку. Що
має вийти, перевіряють готові тести в теці `tests/`.

## Що вже є

- `src/model/queueReducer.js` — ред'юсер черги від колеги, з описом дій і
  стану в коментарі, і два селектори: `selectColumn` і `selectOrder`.
  Компоненти читають чергу лише через них;
- `src/components/OrderComposer.jsx` — форма «Нове замовлення» на кількох
  `useState`; `DraftItem.jsx` — один напій у формі;
- `OrderBoard`, `OrderColumn` і `OrderCard` — дошка, колонка й картка
  замовлення. «Готово» вмикається, коли відмічено всі напої;
- `OrderDetails.jsx` — панель «Деталі замовлення» з полем для імені гостя;
- `HistoryButtons.jsx` — «Скасувати дію» й «Повторити дію». На сторінці їх
  поки немає;
- заготовки з описом API в коментарі: `src/model/draftReducer.js` і
  `src/model/withUndo.js`. Поки що вони кидають помилку `Not implemented`;
- `src/data/menu.js` — напої, розміри, молоко й сиропи з цінами,
  `priceOf(item)` і `defaultMilk(drink)`; `src/data/orders.js` —
  `loadOrders()`: шість замовлень, з якими сторінка відкривається;
- тести Vitest і React Testing Library в `tests/`, по два файли на
  challenge. `page.jsx` рендерить сторінку в `<StrictMode>`, як
  `src/main.jsx`. Файли в `tests/` не змінюйте;
- стилі всієї сторінки в `src/index.css`.

## Команди

`npm install` виконуйте в корені репозиторію `react-labs`, решту — у теці
`lab-11/`:

- `npm run dev`: dev-сервер на http://localhost:5173
- `npm run build && npm run preview`: production-збірка на
  http://localhost:4173
- `npm test`: тести в режимі спостереження, вони перезапускаються після
  кожного збереження файлу; `q` — вихід
- `npm test -- tests/draftReducer tests/OrderComposer`: лише тести цих
  двох файлів
- `npx vitest run`: усі тести один раз
- `npm run lint`: ESLint
- `npm run format:check`: перевірка форматування Prettier
- `npm run build`: production-збірка в `dist/`
