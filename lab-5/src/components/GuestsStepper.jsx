export default function GuestsStepper() {
  return (
    <fieldset className="stepper">
      <legend>Гості</legend>
      <div className="stepper-controls">
        <button aria-label="Менше гостей">−</button>
        <output>2</output>
        <button aria-label="Більше гостей">+</button>
      </div>
      <input type="hidden" name="guests" value="2" />
    </fieldset>
  )
}
