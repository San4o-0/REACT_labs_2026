import { useEffect, useState } from 'react'
import { formatTime } from '../formatTime.js'

export default function BrewTimer({ method }) {
  const [secondsLeft, setSecondsLeft] = useState(method.seconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    setInterval(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)
  }, [isRunning])

  return (
    <article className="brew-timer" aria-labelledby={`${method.id}-title`}>
      <h3 id={`${method.id}-title`}>{method.name}</h3>
      <p>{method.recipe}</p>
      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <div className="timer-controls">
        <button type="button" onClick={() => setIsRunning(true)}>
          Старт
        </button>
        <button type="button" onClick={() => setIsRunning(false)}>
          Пауза
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRunning(false)
            setSecondsLeft(method.seconds)
          }}
        >
          Скинути
        </button>
      </div>
    </article>
  )
}
