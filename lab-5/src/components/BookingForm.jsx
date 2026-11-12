import GuestsStepper from './GuestsStepper.jsx'

export default function BookingForm() {
  return (
    <form className="booking-form">
      <label>
        Ім'я
        <input name="name" autoComplete="name" required />
      </label>
      <div className="row">
        <label>
          Дата
          <input type="date" name="date" required />
        </label>
        <label>
          Час
          <input type="time" name="time" required />
        </label>
      </div>
      <GuestsStepper />
      <label>
        Коментар
        <textarea
          name="comment"
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        0 / 200
      </p>
      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="reset">Очистити</button>
      </div>
      <p role="status" className="status"></p>
    </form>
  )
}
