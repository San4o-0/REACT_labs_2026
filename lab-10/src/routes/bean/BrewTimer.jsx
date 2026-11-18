import { useCountdown } from './useCountdown.js'
import TimerView from './TimerView.jsx'

function getStatus(secondsLeft, isRunning, totalSeconds) {
  if (secondsLeft === 0) return 'done'
  if (isRunning) return 'running'
  if (secondsLeft === totalSeconds) return 'idle'
  return 'paused'
}

export default function BrewTimer({ method }) {
  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    method.seconds,
  )

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={getStatus(secondsLeft, isRunning, method.seconds)}
      onStart={start}
      onPause={pause}
      onReset={reset}
    />
  )
}
