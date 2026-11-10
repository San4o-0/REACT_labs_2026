import MenuCategory from './MenuCategory.jsx'
import { filterMenu } from '../filterMenu.js'

export default function MenuTable({ menu, filterText, inStockOnly }) {
  const visibleMenu = filterMenu(menu, filterText, inStockOnly)

  return (
    <table className="menu-table">
      <thead>
        <tr>
          <th scope="col">Позиція</th>
          <th scope="col">Ціна</th>
        </tr>
      </thead>
      {visibleMenu.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
    </table>
  )
}
