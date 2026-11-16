import { useState } from 'react'

export default function ReviewList({ reviews }) {
  const [count, setCount] = useState(3)
  const visibleReviews = reviews.slice(0, count)
  const hiddenCount = reviews.length - visibleReviews.length

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title">Відгуки ({reviews.length})</h2>
      <ul className="review-list">
        {visibleReviews.map((review) => (
          <li key={review.id}>
            <p className="review-author">
              {review.author}{' '}
              <span aria-label={`Оцінка ${review.rating} з 5`}>
                {'★'.repeat(review.rating)}
              </span>
            </p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          className="show-more"
          onClick={() => setCount(count + 3)}
        >
          Показати ще {Math.min(3, hiddenCount)}
        </button>
      )}
    </section>
  )
}
