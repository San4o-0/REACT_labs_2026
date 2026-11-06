import Header from './components/Header.jsx'
import Avatar from './components/Avatar.jsx'
import Profile from './components/Profile.jsx'
import { team } from './data.js'

export default function App() {
  return (
    <>
      <Header title="Команда проєкту" subtitle="ЛР-2: компоненти й пропси" />
      <main>
        <Avatar person={team[0]} size={120} />
        {team.map((person) => (
          <Profile key={person.id} person={person} />
        ))}
      </main>
    </>
  )
}
