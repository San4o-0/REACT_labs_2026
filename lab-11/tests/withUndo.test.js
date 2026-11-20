import { describe, expect, it } from 'vitest'
import { createHistory, withUndo } from '../src/model/withUndo.js'
import { deepFreeze } from './deepFreeze.js'

// withUndo працює з будь-яким ред'юсером. Тести беруть найпростіший —
// лічильник.
function counterReducer(state, action) {
  switch (action.type) {
    case 'incremented':
      return state + 1
    case 'nothing_happened':
      return state
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

// Лічильник з історією. withUndo викликається в кожному тесті, а не під час
// імпорту: так кожен тест показує свою помилку, поки withUndo — заготовка.
function undoable(history, action) {
  return withUndo(counterReducer)(history, action)
}

// Застосовує дії з такими type по черзі.
function run(history, ...types) {
  return types.reduce((h, type) => undoable(h, { type }), history)
}

describe('withUndo', () => {
  it('createHistory починає з порожніх past і future', () => {
    expect(createHistory(0)).toEqual({ past: [], present: 0, future: [] })
  })

  it('не змінює історію, яку отримав, ні для дії, ні для undo чи redo', () => {
    for (const type of ['incremented', 'undo', 'redo']) {
      // Заморожена історія з кроками і в past, і в future.
      const history = deepFreeze(
        run(createHistory(0), 'incremented', 'incremented', 'undo'),
      )
      expect(() => undoable(history, { type }), type).not.toThrow()
    }
  })

  it('дія потрапляє в історію, undo повертає попередній стан', () => {
    const history = run(createHistory(0), 'incremented', 'incremented')
    expect(history).toEqual({ past: [0, 1], present: 2, future: [] })
    expect(run(history, 'undo')).toEqual({
      past: [0],
      present: 1,
      future: [2],
    })
  })

  it('redo повторює скасовану дію', () => {
    const history = run(createHistory(0), 'incremented', 'incremented')
    expect(run(history, 'undo', 'undo', 'redo')).toEqual({
      past: [0],
      present: 1,
      future: [2],
    })
  })

  it('нова дія після undo очищає future', () => {
    const history = run(createHistory(0), 'incremented', 'incremented', 'undo')
    expect(run(history, 'incremented')).toEqual({
      past: [0, 1],
      present: 2,
      future: [],
    })
  })

  it('дія, що не змінила стану, не потрапляє в історію', () => {
    const history = run(createHistory(0), 'incremented')
    expect(undoable(history, { type: 'nothing_happened' })).toBe(history)
  })

  it('undo і redo без історії повертають той самий стан', () => {
    const history = createHistory(0)
    expect(undoable(history, { type: 'undo' })).toBe(history)
    expect(undoable(history, { type: 'redo' })).toBe(history)
  })

  it('історія зберігає не більше 20 кроків', () => {
    let history = createHistory(0)
    for (let i = 0; i < 25; i++) history = run(history, 'incremented')
    expect(history.present).toBe(25)
    expect(history.past).toHaveLength(20)
    for (let i = 0; i < 20; i++) history = run(history, 'undo')
    expect(history.present).toBe(5)
    expect(run(history, 'undo')).toBe(history)
  })
})
