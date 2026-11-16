import { useEffect, useState } from 'react'
import { grindOptions } from '../data.js'

export default function GrindPicker() {
  const [grind, setGrind] = useState(
    () => localStorage.getItem('grind') ?? 'beans',
  )

  useEffect(() => {
    localStorage.setItem('grind', grind)
  }, [grind])

  return (
    <fieldset className="grind-picker">
      <legend>Помел</legend>
      {grindOptions.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="grind"
            value={option.value}
            checked={grind === option.value}
            onChange={(e) => setGrind(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}
