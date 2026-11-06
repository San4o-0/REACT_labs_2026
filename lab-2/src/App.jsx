import Header from './components/Header.jsx'
import Avatar from './components/Avatar.jsx'
import Profile from './components/Profile.jsx'
import Card from './components/Card.jsx'
import { team } from './data.js'

export default function App() {
  const lead = team[0]

  return (
    <>
      <Header title="Команда проєкту" subtitle="ЛР-2: компоненти й пропси" />
      <main>
        <Card title="Тімлід">
          <Avatar person={lead} size={120} />
          <p>{lead.name}</p>
        </Card>
        <Card title="Команда">
          {team.map((person) => (
            <Profile key={person.id} person={person} />
          ))}
        </Card>
      </main>
    </>
  )
}
