// Заморожує об'єкт разом з усіма вкладеними об'єктами й масивами. Код у
// модулі ES завжди працює в строгому режимі, тож спроба змінити заморожений
// об'єкт кидає TypeError з назвою властивості, а не минає непомітно.
export function deepFreeze(value) {
  if (value !== null && typeof value === 'object') {
    Object.freeze(value)
    Object.values(value).forEach(deepFreeze)
  }
  return value
}
