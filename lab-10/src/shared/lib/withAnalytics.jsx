import { track } from './analytics.js'

export function withAnalytics(Component, event) {
  function WithAnalytics({ analyticsData, onClick, ...props }) {
    function handleClick(e) {
      track(event, analyticsData)
      onClick?.(e)
    }

    return <Component {...props} onClick={handleClick} />
  }

  WithAnalytics.displayName = `withAnalytics(${Component.displayName ?? Component.name})`
  return WithAnalytics
}
