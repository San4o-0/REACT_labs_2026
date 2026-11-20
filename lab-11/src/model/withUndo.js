/**
 * Ред'юсер вищого порядку: отримує ред'юсер і повертає новий, який веде
 * історію змін. Стан нового ред'юсера — історія:
 *
 *   { past: [...], present, future: [...] }
 *
 * present — стан, з яким працює reducer; past — попередні стани, від
 * найстарішого до останнього; future — скасовані стани, які можна
 * повторити, від найближчого.
 *
 * Дії:
 *   { type: 'undo' }  повертає попередній стан
 *   { type: 'redo' }  повторює скасовану дію
 *   будь-яка інша дія йде в reducer разом із present. Якщо reducer
 *   повернув той самий стан, історія не змінюється.
 *
 * Історія зберігає не більше limit кроків. Як і будь-який ред'юсер, новий
 * ред'юсер не змінює історію, яку отримав.
 *
 * Використання на прикладі лічильника:
 *   const undoableCounter = withUndo(counterReducer)
 *   undoableCounter(createHistory(0), { type: 'incremented' })
 *   // { past: [0], present: 1, future: [] }
 *
 * Вимоги — у тестах tests/withUndo.test.js і tests/HistoryButtons.test.jsx.
 */
export function withUndo(reducer, limit = 20) {
  return function undoableReducer(history, action) {
    const { past, present, future } = history
    switch (action.type) {
      case 'undo':
        if (past.length === 0) return history
        return {
          past: past.slice(0, -1),
          present: past.at(-1),
          future: [present, ...future],
        }
      case 'redo':
        if (future.length === 0) return history
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        }
      default: {
        const next = reducer(present, action)
        if (next === present) return history
        return {
          past: [...past, present].slice(-limit),
          present: next,
          future: [],
        }
      }
    }
  }
}

/** Історія, з якої починають: present і порожні past та future. */
export function createHistory(present) {
  return { past: [], present, future: [] }
}
