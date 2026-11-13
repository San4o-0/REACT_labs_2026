import BookingForm from './components/BookingForm.jsx'

export default function App() {
  return (
    <main className="app">
      <h1>Бронювання столика</h1>
      <p className="lead">
        Кав'ярня працює щодня з 8:00 до 21:00. Столики бронюємо з 8:00 до 20:00.
        Заброньований столик чекає на вас 15 хвилин.
      </p>
      <BookingForm />
    </main>
  )
}
