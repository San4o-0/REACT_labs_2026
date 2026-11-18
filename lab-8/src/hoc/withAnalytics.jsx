import { track } from '../analytics.js'

/**
 * Компонент вищого порядку (HOC): отримує компонент і повертає новий, який
 * рендерить `Component` з тими самими props, а під час кліку ще й надсилає
 * подію `event` в аналітику (`track` з src/analytics.js).
 *
 * Використання:
 *   const AddToCartButton = withAnalytics(Button, 'add_to_cart')
 *
 *   <AddToCartButton analyticsData={{ productId }} onClick={add}>
 *     Додати в кошик
 *   </AddToCartButton>
 *
 * Вимоги — у тестах tests/withAnalytics.test.jsx.
 */
export function withAnalytics(Component, event) {
  function WithAnalytics({ analyticsData, onClick, ...props }) {
    function handleClick(e) {
      track(event, analyticsData)
      onClick?.(e)
    }

    return <Component {...props} onClick={handleClick} />
  }

  const name = Component.displayName || Component.name || 'Component'
  WithAnalytics.displayName = `withAnalytics(${name})`
  return WithAnalytics
}
