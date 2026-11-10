import SearchBar from './components/SearchBar.jsx'
import MenuTable from './components/MenuTable.jsx'
import CafeInfo from './components/CafeInfo.jsx'
import { menu } from './data.js'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <SearchBar />
      <MenuTable menu={menu} />
      <CafeInfo />
    </main>
  )
}
