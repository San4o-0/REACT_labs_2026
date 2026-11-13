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
export const bookingSchema = z.object({})
