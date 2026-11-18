# ЛР-8. Патерни проєктування React. Частина 2

Стартовий проєкт лабораторної роботи № 8 курсу «Розробка вебзастосунків на
React»: сторінка кави в зернах з ЛР-7. Інструкція:
https://denysmatsevych.github.io/web-development-2026/react/labs/lab-8/

Розділи «Як заварити», «Відгуки» і «Схожі товари» тепер сховані за
вкладками, а в картці товару з'явилася кнопка «Додати в кошик». У чотирьох
code challenges ви зробите вкладки складеним компонентом, який отримує вміст
через `children`, а свій стан передає частинам через контекст, додасте
вкладкам ролі й клавіатуру за ARIA APG, напишете компонент вищого порядку
(HOC) для аналітики й виправите помилку, яку цей HOC проявить. Що має вийти,
перевіряють готові тести в теці `tests/`.

## Що вже є

- код ЛР-7, уже готовий: хуки `useLocalStorage`, `useCountdown` і
  `useShowMore` у `src/hooks/`, компоненти `TimerView` і `ShowMore`;
- `src/components/ProductTabs.jsx` — перша спроба вкладок: сам імпортує три
  розділи й показує обраний через `&&`;
- `src/components/Button.jsx` — `<button type="button">`, який передає всі
  props далі. Ним користуються `ProductCard` і `TimerView`;
- `src/analytics.js` — `track(event, data)`, імітація сервісу аналітики:
  замість надсилання на сервер пише рядок `[analytics] …` у Console;
- у `ProductCard` — кнопка «Додати в кошик» і рядок «У кошику: N»; у
  `TimerView` перша кнопка таймера проходить через `withAnalytics`;
- заготовки з описом API в коментарі: `src/components/Tabs.jsx` кидає
  помилку `Not implemented`, а `src/hoc/withAnalytics.jsx` поки повертає
  компонент без змін;
- тести Vitest і React Testing Library в `tests/`, по файлу на challenge:
  `withAnalytics.test.jsx` перевіряє `withAnalytics` і кнопку «Додати в
  кошик». Тестів ЛР-7 тут немає. Файли в `tests/` не змінюйте;
- `npm run lint` показує одну помилку. Її ви виправите в останньому
  challenge;
- стилі всієї сторінки в `src/index.css`, зокрема для вкладок.

## Команди

`npm install` виконуйте в корені репозиторію `react-labs`, решту — у теці
`lab-8/`:

- `npm run dev`: dev-сервер на http://localhost:5173
- `npm test`: тести в режимі спостереження, вони перезапускаються після
  кожного збереження файлу; `q` — вихід
- `npm test -- tests/withAnalytics`: лише тести одного файлу (тут
  `withAnalytics.test.jsx`)
- `npx vitest run`: усі тести один раз
- `npm run lint`: ESLint
- `npm run format:check`: перевірка форматування Prettier
- `npm run build`: production-збірка в `dist/`
