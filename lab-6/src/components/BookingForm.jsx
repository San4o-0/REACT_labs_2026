import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import GuestsStepper from './GuestsStepper.jsx'
import { describeBooking } from '../describeBooking.js'

const defaultValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  comment: '',
}

export default function BookingForm() {
  const [booking, setBooking] = useState(null)
  const { register, control, handleSubmit, reset, setFocus } = useForm({
    defaultValues,
  })
  const comment = useWatch({ control, name: 'comment' })

  function onValid(data) {
    setBooking(data)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    setFocus('name') // до reset(): він прибирає посилання на поля
    reset()
    setBooking(null)
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit(onValid)}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label>
          Ім'я
          <input {...register('name')} autoComplete="name" required />
        </label>
        <p id="name-error" className="field-error"></p>
      </div>
      <div className="field">
        <label>
          Телефон
          <input
            type="tel"
            {...register('phone')}
            autoComplete="tel"
            placeholder="+380671234567"
            required
          />
        </label>
        <p id="phone-error" className="field-error"></p>
      </div>
      <div className="row">
        <div className="field">
          <label>
            Дата
            <input type="date" {...register('date')} required />
          </label>
          <p id="date-error" className="field-error"></p>
        </div>
        <div className="field">
          <label>
            Час
            <input type="time" {...register('time')} required />
          </label>
          <p id="time-error" className="field-error"></p>
        </div>
      </div>
      <Controller
        name="guests"
        control={control}
        render={({ field }) => (
          <GuestsStepper value={field.value} onChange={field.onChange} />
        )}
      />
      <label>
        Коментар
        <textarea
          {...register('comment')}
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        {comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="button" onClick={handleReset}>
          Очистити
        </button>
      </div>
      <p role="status" className="status">
        {booking && describeBooking(booking)}
      </p>
    </form>
  )
}
