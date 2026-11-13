import * as yup from 'yup'

const pad = (n) => String(n).padStart(2, '0')

// Сьогоднішня дата й поточний час у місцевому часовому поясі, у форматах
// <input type="date"> («2026-11-14») і <input type="time"> («18:30»).
// Такі рядки можна порівнювати як рядки.
export function today() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function nowTime() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const bookingSchema = yup
  .object({
    name: yup
      .string()
      .required("Вкажіть ім'я: щонайменше дві літери")
      .trim()
      .min(2, "Вкажіть ім'я: щонайменше дві літери"),
    phone: yup
      .string()
      .required('Вкажіть телефон у форматі +380XXXXXXXXX')
      .trim()
      .matches(/^\+380\d{9}$/, 'Вкажіть телефон у форматі +380XXXXXXXXX'),
    date: yup
      .string()
      .required('Оберіть дату')
      .test(
        'not-past',
        'Ця дата вже минула',
        (date) => !date || date >= today(),
      ),
    time: yup
      .string()
      .required('Оберіть час')
      .test(
        'opening-hours',
        'Столик можна забронювати з 8:00 до 20:00',
        (time) => !time || (time >= '08:00' && time <= '20:00'),
      ),
    guests: yup
      .number()
      .typeError('Вкажіть кількість гостей')
      .integer()
      .min(1, 'Щонайменше 1 гість')
      .max(8, 'Не більше 8 гостей'),
    comment: yup.string().trim().max(200, 'Коментар — до 200 символів'),
  })
  .test('time-not-passed', function (data) {
    if (!data.time || data.date !== today() || data.time > nowTime())
      return true
    return this.createError({
      path: 'time',
      message: 'Цей час сьогодні вже минув',
    })
  })
