import ProfileCard from './components/ProfileCard.jsx'

const technologies = ['React', 'TypeScript', 'Next.js']

function App() {
  return (
    <main className="app">
      <ProfileCard
        name="Олександр Ткач"
        group="КН-311"
        technologies={technologies}
      />
    </main>
  )
}

export default App
