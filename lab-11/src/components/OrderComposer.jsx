import { useId, useReducer } from 'react'
import { drinks, priceOf } from '../data/menu.js'
import { draftReducer, emptyDraft } from '../model/draftReducer.js'
import DraftItem from './DraftItem.jsx'

export default function OrderComposer({ onPlace }) {
  const titleId = useId()
  const [draft, dispatch] = useReducer(draftReducer, emptyDraft)
  const { customerName, items } = draft
  const total = items.reduce((sum, item) => sum + priceOf(item), 0)

  function handleSubmit(e) {
    e.preventDefault()
    onPlace({ customerName: customerName.trim(), items })
    dispatch({ type: 'draft_cleared' })
  }

  const canPlace = customerName.trim() !== '' && items.length > 0

  return (
    <form
      className="composer"
      aria-labelledby={titleId}
      onSubmit={handleSubmit}
    >
      <h2 id={titleId}>Нове замовлення</h2>
      <label className="field">
        Ім'я гостя
        <input
          value={customerName}
          onChange={(e) =>
            dispatch({ type: 'customer_changed', name: e.target.value })
          }
          autoComplete="off"
        />
      </label>
      <div className="drink-buttons" role="group" aria-label="Додати напій">
        {drinks.map((drink) => (
          <button
            key={drink.name}
            type="button"
            onClick={() =>
              dispatch({
                type: 'drink_added',
                id: crypto.randomUUID(),
                drink: drink.name,
              })
            }
          >
            + {drink.name}
          </button>
        ))}
      </div>
      {items.length > 0 && (
        <ul className="draft-items">
          {items.map((item) => (
            <li key={item.id}>
              <DraftItem
                item={item}
                onSizeChange={(size) =>
                  dispatch({ type: 'size_chosen', itemId: item.id, size })
                }
                onMilkChange={(milk) =>
                  dispatch({ type: 'milk_chosen', itemId: item.id, milk })
                }
                onSyrupToggle={(syrup) =>
                  dispatch({ type: 'syrup_toggled', itemId: item.id, syrup })
                }
                onRemove={() =>
                  dispatch({ type: 'item_removed', itemId: item.id })
                }
              />
            </li>
          ))}
        </ul>
      )}
      <p className="total">Разом: {total} грн</p>
      <button type="submit" className="primary" disabled={!canPlace}>
        Надіслати бариста
      </button>
    </form>
  )
}
