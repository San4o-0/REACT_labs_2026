const guestWords = { one: 'особу', few: 'особи', many: 'осіб', other: 'особи' }
const pluralRules = new Intl.PluralRules('uk')
const dateFormat = new Intl.DateTimeFormat('uk', {
  day: 'numeric',
  month: 'long',
})

// Повертає текст підтвердження для даних форми бронювання. Значення з
// FormData — рядки, тож кількість гостей перетворюється на число, а дата
// читається як місцева, щоб день не зсунувся через часовий пояс.
export function describeBooking({ name, date, time, guests, comment }) {
  const count = Number(guests)
  const words = guestWords[pluralRules.select(count)]
  const day = dateFormat.format(new Date(`${date}T00:00`))
  const text = `Столик на ${count} ${words} заброньовано на ім'я ${name}: ${day} о ${time}.`
  return comment ? `${text} Коментар: «${comment}».` : text
}
