import FilterableMenuTable from './components/FilterableMenuTable.jsx'
import CafeInfo from './components/CafeInfo.jsx'
import { menu } from './data.js'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <FilterableMenuTable menu={menu} />
      <CafeInfo />
    </main>
  )
}
