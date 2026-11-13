import { z } from 'zod'

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

// §4.2: опишіть тут правила форми бронювання.
export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Вкажіть ім'я: щонайменше дві літери"),
    phone: z
      .string()
      .trim()
      .regex(/^\+380\d{9}$/, 'Вкажіть телефон у форматі +380XXXXXXXXX'),
    date: z
      .string()
      .min(1, 'Оберіть дату')
      .refine((date) => date >= today(), 'Ця дата вже минула'),
    time: z
      .string()
      .min(1, 'Оберіть час')
      .refine(
        (time) => time >= '08:00' && time <= '20:00',
        'Столик можна забронювати з 8:00 до 20:00',
      ),
    guests: z.coerce
      .number()
      .int()
      .min(1, 'Щонайменше 1 гість')
      .max(8, 'Не більше 8 гостей'),
    comment: z.string().trim().max(200, 'Коментар — до 200 символів'),
  })
  .refine((data) => data.date !== today() || data.time > nowTime(), {
    error: 'Цей час сьогодні вже минув',
    path: ['time'],
  })
