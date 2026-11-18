import { withAnalytics } from '../hoc/withAnalytics.jsx'
import { formatTime } from '../formatTime.js'
import Button from './Button.jsx'

export default function TimerView({
  method,
  secondsLeft,
  status,
  onStart,
  onPause,
  onReset,
}) {
  let primaryLabel = 'Старт'
  let onPrimary = onStart
  let action = 'start'
  if (status === 'running') {
    primaryLabel = 'Пауза'
    onPrimary = onPause
    action = 'pause'
  } else if (status === 'paused') {
    primaryLabel = 'Продовжити'
    action = 'resume'
  } else if (status === 'done') {
    primaryLabel = 'Спочатку'
    onPrimary = onReset
    action = 'restart'
  }
  const PrimaryButton = withAnalytics(Button, `timer_${action}:${method.id}`)

  return (
    <article className="brew-timer" aria-labelledby={`${method.id}-title`}>
      <h3 id={`${method.id}-title`}>{method.name}</h3>
      <p>{method.recipe}</p>
      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <p className="timer-done" role="status">
        {status === 'done' ? 'Готово! Час пити каву.' : ''}
      </p>
      <div className="timer-controls">
        <PrimaryButton onClick={onPrimary}>{primaryLabel}</PrimaryButton>
        {(status === 'running' || status === 'paused') && (
          <Button onClick={onReset}>Скинути</Button>
        )}
      </div>
    </article>
  )
}
