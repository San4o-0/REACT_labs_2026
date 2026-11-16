import { useCountdown } from '../hooks/useCountdown.js'
import TimerView from './TimerView.jsx'

export default function BrewTimer({ method }) {
  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    method.seconds,
  )

  let status = 'idle'
  if (secondsLeft === 0) status = 'done'
  else if (isRunning) status = 'running'
  else if (secondsLeft < method.seconds) status = 'paused'

  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={start}
      onPause={pause}
      onReset={reset}
    />
  )
}
