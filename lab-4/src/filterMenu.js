// Повертає меню лише з тими позиціями, що відповідають тексту пошуку й
// прапорцю «Лише в наявності». Категорії без таких позицій не потрапляють
// у результат. Функція нічого не змінює: вона створює нові масиви.
export function filterMenu(menu, filterText, inStockOnly) {
  const query = filterText.trim().toLowerCase()

  return menu
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) &&
          (item.available || !inStockOnly),
      ),
    }))
    .filter((category) => category.items.length > 0)
}
