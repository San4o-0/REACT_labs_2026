// Імітація сервісу аналітики: замість надсилання на сервер пише в Console.
export function track(event, data) {
  console.info('[analytics]', event, data ?? {})
}
