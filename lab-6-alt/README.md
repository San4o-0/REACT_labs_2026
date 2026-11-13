# ЛР-6. Робота зі складними формами та валідація

Стартовий проєкт лабораторної роботи № 6 курсу «Розробка вебзастосунків на
React»: форма бронювання столика з ЛР-5. Інструкція:
https://denysmatsevych.github.io/web-development-2026/react/labs/lab-6/

Форма працює так, як ви залишили її наприкінці ЛР-5, і перевіряє лише
обов'язкові поля (`required`). Ви опишете правила форми схемою Zod, передасте
значення полів React Hook Form, покажете повідомлення про помилки під полями
й надсилатимете бронювання на сервер через Action React 19.

## Що вже є

- форма з ЛР-5 (`src/components/BookingForm.jsx`) і контрольований
  `GuestsStepper`;
- нове поле «Телефон» і порожні абзаци для повідомлень про помилки під полями
  «Ім'я», «Телефон», «Дата» й «Час»;
- `src/api.js`: імітований сервер кав'ярні, який відповідає за секунду;
- `src/bookingSchema.js`: функції `today()` і `nowTime()` і порожня схема,
  яку ви заповните;
- стилі для повідомлень про помилки, стану очікування й форми підписки в
  `src/index.css`;
- бібліотеки `react-hook-form`, `zod` і `@hookform/resolvers` у
  `package.json`: `npm install` у корені встановить їх разом з іншими.

## Команди

`npm install` виконуйте в корені репозиторію `react-labs`, решту — у теці
`lab-6/`:

- `npm run dev`: dev-сервер на http://localhost:5173
- `npm run lint`: ESLint
- `npm run format:check`: перевірка форматування Prettier
- `npm run build`: production-збірка в `dist/`

## Порівняння з React Hook Form і Zod

Ця тека — та сама форма бронювання з §4.6, зібрана з іншими бібліотеками
(§4.8). Форма підписки (`SubscribeForm`, §4.7) лишилася без змін, тому `zod`
у цій версії теж є: ним перевіряється адреса для новин.

### Бібліотеки та версії

| Версія      | Форма                    | Схема       |
| ----------- | ------------------------ | ----------- |
| `lab-6`     | `react-hook-form` 7.92.0 | `zod` 4.6.7 |
| `lab-6-alt` | `formik` 2.4.9           | `yup` 1.7.1 |

У `lab-6` є ще адаптер `@hookform/resolvers` 7.0.6 (`zodResolver`). Formik
уміє працювати з Yup сам, адаптер йому не потрібен.

### Що замінило API React Hook Form

| React Hook Form                     | Formik + Yup                                                                                                    |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `register('name')`                  | `formik.getFieldProps('name')`: `name`, `value`, `onChange`, `onBlur`                                           |
| `Controller` для `GuestsStepper`    | `value={formik.values.guests}` і `onChange={(value) => formik.setFieldValue('guests', value)}`                  |
| `useWatch({ name: 'comment' })`     | `formik.values.comment`: форма й так рендериться з кожною зміною                                                |
| `handleSubmit(onValid)`             | власний `handleSubmit`: `setTouched`, `validateForm`, фокус на першому неправильному полі, `bookingSchema.cast` |
| `zodResolver(bookingSchema)`        | `validationSchema: bookingSchema`                                                                               |
| `reset()`                           | `formik.resetForm()`                                                                                            |
| `setFocus('name')`                  | `useRef` на полі «Ім'я» і `nameRef.current.focus()`                                                             |
| `mode: 'onTouched'`                 | `validateOnBlur` і `validateOnChange` + повідомлення лише для полів із `formik.touched`                         |
| `trigger('time')` в `onChange` дати | не потрібен: Formik перевіряє всю форму після кожної зміни                                                      |

Що довелося змінити в схемі:

- Formik перед перевіркою замінює порожні рядки на `undefined`, а Yup не
  перевіряє `min()` для `undefined`. Тому обов'язкові поля мають
  `.required()` з тим самим повідомленням, а власні `test` пропускають
  порожнє значення;
- `refine` із Zod у Yup — `test`; правило для двох полів — `test` на всьому
  об'єкті, яке повертає `this.createError({ path: 'time', … })`;
- `z.coerce.number()` не потрібен: `yup.number()` сам перетворює `'3'` на `3`;
- Formik передає в обробник сирі значення, а не результат схеми, тож
  обрізане ім'я й число гостей дає `bookingSchema.cast(...)`, а сервер у
  `api.js` бере дані з `bookingSchema.validate(...)`.

### Розмір збірки

JS-файл, який друкує `npm run build`:

| Версія      | `dist/assets/index-….js` | gzip      |
| ----------- | ------------------------ | --------- |
| `lab-6`     | 353.67 kB                | 109.36 kB |
| `lab-6-alt` | 359.10 kB                | 111.46 kB |

Версія з Formik більша на 5,4 kB (2,1 kB gzip). Частина різниці — `zod`,
який лишився заради форми підписки: у цій версії в збірці дві бібліотеки схем.

### Рендери під час введення імені

Highlight updates when components render у вкладці Components ⚛:

- `lab-6`: поле зареєстроване через `register` і неконтрольоване, значення
  лежить у DOM, тож під час введення нічого не рендериться. `BookingForm`
  рендериться лише тоді, коли з'являється чи зникає повідомлення про помилку;
- `lab-6-alt`: поле контрольоване, значення лежить у стані Formik усередині
  `BookingForm`, тож з кожною літерою рендериться `BookingForm` разом із
  `GuestsStepper`.

### Останні релізи

| Пакет                 | Остання версія | Дата релізу |
| --------------------- | -------------- | ----------- |
| `react-hook-form`     | 7.92.0         | 2026-11-11  |
| `@hookform/resolvers` | 7.0.6          | 2026-11-11  |
| `zod`                 | 4.6.7          | 2026-10-12  |
| `formik`              | 2.4.9          | 2025-11-10  |
| `yup`                 | 1.7.1          | 2025-09-21  |

### Висновок

Для наступного проєкту я взяв би React Hook Form і Zod. Обидві бібліотеки
оновлювалися цього місяця, а Formik не виходив уже рік. Неконтрольовані поля
React Hook Form не рендерять форму з кожною літерою, а Formik рендерить її
повністю. Formik вимагав обхідних рішень: `.required()` через заміну порожніх
рядків на `undefined` і власний код для фокусу на першій помилці. Зручною
стороною Formik виявилася перевірка всієї форми після кожної зміни: правилу
для двох полів не потрібен `trigger`.
