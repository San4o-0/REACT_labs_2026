import { useEffect, useState } from 'react'

export function useCountdown(totalSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [isStarted, setIsStarted] = useState(false)
  const isRunning = isStarted && secondsLeft > 0

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  return {
    secondsLeft,
    isRunning,
    start: () => setIsStarted(true),
    pause: () => setIsStarted(false),
    reset: () => {
      setIsStarted(false)
      setSecondsLeft(totalSeconds)
    },
  }
}
