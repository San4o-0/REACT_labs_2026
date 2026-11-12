import { useState } from 'react'
import GuestsStepper from './GuestsStepper.jsx'
import { describeBooking } from '../describeBooking.js'

export default function BookingForm() {
  const [booking, setBooking] = useState(null)
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setBooking(Object.fromEntries(formData))
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <p id="comment-counter" className="counter">
        {comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="reset">Очистити</button>
      </div>
      <p role="status" className="status">
        {booking && describeBooking(booking)}
      </p>
    </form>
  )
}
