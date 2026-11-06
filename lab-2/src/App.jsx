import Header from './components/Header.jsx'
import Avatar from './components/Avatar.jsx'
import { team } from './data.js'

export default function App() {
  return (
    <>
      <Header title="Команда проєкту" subtitle="ЛР-2: компоненти й пропси" />
      <main>
        <Avatar person={team[0]} size={120} />
        <Avatar person={team[1]} />
      </main>
    </>
  )
}
