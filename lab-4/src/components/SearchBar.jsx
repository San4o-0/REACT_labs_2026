export default function SearchBar() {
  return (
    <search className="search-bar">
      <input
        type="search"
        placeholder="Пошук у меню"
        aria-label="Пошук у меню"
      />
      <label>
        <input type="checkbox" /> Лише в наявності
      </label>
    </search>
  )
}
