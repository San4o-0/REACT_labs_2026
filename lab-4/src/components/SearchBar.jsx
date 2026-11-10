export default function SearchBar({ filterText, inStockOnly }) {
  return (
    <search className="search-bar">
      <input
        type="search"
        placeholder="Пошук у меню"
        aria-label="Пошук у меню"
        value={filterText}
      />
      <label>
        <input type="checkbox" checked={inStockOnly} /> Лише в наявності
      </label>
    </search>
  )
}
