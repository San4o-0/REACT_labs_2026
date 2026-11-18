import BrewTimer from './BrewTimer.jsx'

export default function BrewGuide({ methods }) {
  return (
    <section className="brew-guide" aria-labelledby="brew-title">
      <h2 id="brew-title">Як заварити</h2>
      <div className="brew-methods">
        {methods.map((method) => (
          <BrewTimer key={method.id} method={method} />
        ))}
      </div>
    </section>
  )
}
