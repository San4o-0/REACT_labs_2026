import { startTransition, useActionState, useRef } from 'react'
import { useFormik } from 'formik'
import GuestsStepper from './GuestsStepper.jsx'
import { bookingSchema } from '../bookingSchema.js'
import { sendBooking } from '../api.js'

const defaultValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  comment: '',
}

const allTouched = Object.fromEntries(
  Object.keys(defaultValues).map((name) => [name, true]),
)

export default function BookingForm() {
  const nameRef = useRef(null)
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: bookingSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {},
  })
  const [result, dispatch, isPending] = useActionState(bookTable, null)

  // Дія для useActionState: null — сигнал «Очистити»; інакше надсилаємо
  // бронювання, після успіху очищаємо форму й повертаємо відповідь.
  async function bookTable(previousResult, booking) {
    if (booking === null) return null
    const response = await sendBooking(booking)
    if (response.ok) startTransition(() => formik.resetForm())
    return response
  }

  // Повідомлення видно, лише коли поле вже залишали або форму надсилали:
  // так само, як mode: 'onTouched' у React Hook Form.
  function errorFor(name) {
    return formik.touched[name] ? formik.errors[name] : undefined
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    formik.setTouched(allTouched, false)
    const errors = await formik.validateForm()
    const firstInvalid = Object.keys(defaultValues).find((name) => errors[name])
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus()
      return
    }
    if (isPending) return
    const booking = bookingSchema.cast(formik.values)
    startTransition(() => dispatch(booking))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    formik.resetForm()
    startTransition(() => dispatch(null))
    nameRef.current.focus()
  }

  return (
    <form
      className="booking-form"
      noValidate
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label>
          Ім'я
          <input
            ref={nameRef}
            {...formik.getFieldProps('name')}
            autoComplete="name"
            required
            aria-invalid={errorFor('name') ? 'true' : 'false'}
            aria-describedby="name-error"
          />
        </label>
        <p id="name-error" className="field-error">
          {errorFor('name')}
        </p>
      </div>
      <div className="field">
        <label>
          Телефон
          <input
            type="tel"
            {...formik.getFieldProps('phone')}
            autoComplete="tel"
            placeholder="+380671234567"
            required
            aria-invalid={errorFor('phone') ? 'true' : 'false'}
            aria-describedby="phone-error"
          />
        </label>
        <p id="phone-error" className="field-error">
          {errorFor('phone')}
        </p>
      </div>
      <div className="row">
        <div className="field">
          <label>
            Дата
            <input
              type="date"
              {...formik.getFieldProps('date')}
              required
              aria-invalid={errorFor('date') ? 'true' : 'false'}
              aria-describedby="date-error"
            />
          </label>
          <p id="date-error" className="field-error">
            {errorFor('date')}
          </p>
        </div>
        <div className="field">
          <label>
            Час
            <input
              type="time"
              {...formik.getFieldProps('time')}
              required
              aria-invalid={errorFor('time') ? 'true' : 'false'}
              aria-describedby="time-error"
            />
          </label>
          <p id="time-error" className="field-error">
            {errorFor('time')}
          </p>
        </div>
      </div>
      <GuestsStepper
        value={formik.values.guests}
        onChange={(value) => formik.setFieldValue('guests', value)}
      />
      <label>
        Коментар
        <textarea
          {...formik.getFieldProps('comment')}
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        {formik.values.comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit" aria-disabled={isPending}>
          {isPending ? 'Надсилаємо…' : 'Забронювати'}
        </button>
        <button type="button" onClick={handleReset}>
          Очистити
        </button>
      </div>
      <p
        role="status"
        className={result?.ok === false ? 'status error' : 'status'}
      >
        {result?.message}
      </p>
    </form>
  )
}
