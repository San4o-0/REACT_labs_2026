import { useSyncExternalStore } from 'react'

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHash() {
  return window.location.hash
}

// Поточна сторінка за адресою після #: '#/' — каталог, '#/beans/<id>' —
// сторінка сорту, '#/cart' — кошик. Компонент рендериться знову, коли
// адреса змінюється.
export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash)
  const path = hash.slice(1) || '/'

  if (path === '/') return { name: 'catalog' }
  if (path === '/cart') return { name: 'cart' }
  const match = path.match(/^\/beans\/([\w-]+)$/)
  if (match) return { name: 'bean', id: match[1] }
  return { name: 'not-found' }
}
