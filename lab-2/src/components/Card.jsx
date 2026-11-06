export default function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </section>
  )
}
