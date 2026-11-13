import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'
import { subscribe } from '../api.js'

const emailSchema = z.email('Вкажіть адресу на кшталт olena@gmail.com')

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Підписуємо…' : 'Підписатися'}
    </button>
  )
}

async function subscribeAction(previousState, formData) {
  const email = formData.get('email')
  const result = emailSchema.safeParse(email)
  if (!result.success) {
    return { ok: false, message: result.error.issues[0].message, email }
  }
  return subscribe(result.data)
}

export default function SubscribeForm() {
  const [state, formAction] = useActionState(subscribeAction, null)

  return (
    <form className="subscribe-form" action={formAction} noValidate>
      <label>
        Email для новин
        <input
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state?.email}
          aria-invalid={state?.ok === false ? 'true' : 'false'}
          aria-describedby="subscribe-status"
        />
      </label>
      <SubmitButton />
      <p
        id="subscribe-status"
        role="status"
        className={state?.ok === false ? 'status error' : 'status'}
      >
        {state?.message}
      </p>
    </form>
  )
}
