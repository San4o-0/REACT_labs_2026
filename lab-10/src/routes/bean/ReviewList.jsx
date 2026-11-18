import ShowMore from './ShowMore.jsx'

export default function ReviewList({ reviews }) {
  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title">Відгуки ({reviews.length})</h2>
      <ShowMore items={reviews} step={3}>
        {(visibleReviews) => (
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
        )}
      </ShowMore>
    </section>
  )
}
