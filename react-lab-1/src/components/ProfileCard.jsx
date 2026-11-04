import { useState } from 'react'
import './ProfileCard.css'

export default function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="profile-card">
      <h1 className="profile-card__name">{name}</h1>
      <p className="profile-card__group">Група: {group}</p>
      <h2 className="profile-card__subtitle">Хочу опанувати</h2>
      <ul className="profile-card__list">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <button
        type="button"
        className="profile-card__like"
        onClick={() => setLikes((count) => count + 1)}
      >
        Подобається · {likes}
      </button>
    </article>
  )
}
