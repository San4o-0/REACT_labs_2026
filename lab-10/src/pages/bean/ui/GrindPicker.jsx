import { grindOptions } from '../config/grindOptions.js'
import { useLocalStorage } from '../../../shared/lib/useLocalStorage.js'

export default function GrindPicker() {
  const [grind, setGrind] = useLocalStorage('grind', 'beans')

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
