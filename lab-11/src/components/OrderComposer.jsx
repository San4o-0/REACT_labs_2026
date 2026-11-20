import { useId, useState } from 'react'
import { defaultMilk, drinks, priceOf } from '../data/menu.js'
import DraftItem from './DraftItem.jsx'

export default function OrderComposer({ onPlace }) {
  const titleId = useId()
  const [customerName, setCustomerName] = useState('')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  function handleNameChange(e) {
    setCustomerName(e.target.value)
  }

  function handleAddDrink(drink) {
    const item = {
      id: crypto.randomUUID(),
      drink,
      size: 'M',
      milk: defaultMilk(drink),
      syrups: [],
    }
    setItems([...items, item])
    setTotal(total + priceOf(item))
  }

  function handleSizeChange(itemId, size) {
    const item = items.find((i) => i.id === itemId)
    const changed = { ...item, size }
    setItems(items.map((i) => (i.id === itemId ? changed : i)))
    setTotal(total - priceOf(item) + priceOf(changed))
  }

  function handleMilkChange(itemId, milk) {
    const item = items.find((i) => i.id === itemId)
    const changed = { ...item, milk }
    setItems(items.map((i) => (i.id === itemId ? changed : i)))
    setTotal(total - priceOf(item) + priceOf(changed))
  }

  function handleSyrupToggle(itemId, syrup) {
    const item = items.find((i) => i.id === itemId)
    const syrups = item.syrups.includes(syrup)
      ? item.syrups.filter((s) => s !== syrup)
      : [...item.syrups, syrup]
    const changed = { ...item, syrups }
    setItems(items.map((i) => (i.id === itemId ? changed : i)))
    setTotal(total - priceOf(item) + priceOf(changed))
  }

  function handleRemove(itemId) {
    setItems(items.filter((i) => i.id !== itemId))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onPlace({ customerName: customerName.trim(), items })
    setCustomerName('')
    setItems([])
    setTotal(0)
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
          onChange={handleNameChange}
          autoComplete="off"
        />
      </label>
      <div className="drink-buttons" role="group" aria-label="Додати напій">
        {drinks.map((drink) => (
          <button
            key={drink.name}
            type="button"
            onClick={() => handleAddDrink(drink.name)}
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
                onSizeChange={(size) => handleSizeChange(item.id, size)}
                onMilkChange={(milk) => handleMilkChange(item.id, milk)}
                onSyrupToggle={(syrup) => handleSyrupToggle(item.id, syrup)}
                onRemove={() => handleRemove(item.id)}
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
