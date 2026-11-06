import Avatar from './Avatar.jsx'

export default function Profile({ person }) {
  return (
    <article className="profile">
      <Avatar person={person} />
      <h3>{person.name}</h3>
      <p>{person.role}</p>
    </article>
  )
}
