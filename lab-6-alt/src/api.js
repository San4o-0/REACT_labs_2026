import { bookingSchema } from './bookingSchema.js'
import { describeBooking } from './describeBooking.js'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Імітує сервер кав'ярні: відповідає за секунду, перевіряє дані тією самою
// схемою, що й форма, і відмовляє, якщо на обраний час столиків немає.
export async function sendBooking(booking) {
  console.info('Сервер отримав бронювання:', booking)
  await wait(1000)
  const result = bookingSchema.safeParse(booking)
  if (!result.success) {
    return { ok: false, message: 'Сервер не прийняв дані: перевірте форму.' }
  }
  if (result.data.time === '19:00') {
    return {
      ok: false,
      message: 'На 19:00 вільних столиків немає. Оберіть інший час.',
    }
  }
  return { ok: true, message: describeBooking(result.data) }
}

// Імітує підписку на новини (§4.7): адреси на @example.com уже підписані.
export async function subscribe(email) {
  await wait(1000)
  if (email.endsWith('@example.com')) {
    return { ok: false, message: 'Ця адреса вже підписана.', email }
  }
  return { ok: true, message: `Готово: новини надходитимуть на ${email}.` }
}
