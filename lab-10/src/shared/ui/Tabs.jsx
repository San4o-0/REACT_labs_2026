import { createContext, use, useId, useState } from 'react'

const TabsContext = createContext(null)

function useTabsContext() {
  const context = use(TabsContext)
  if (!context) {
    throw new Error('Частини Tabs мають бути всередині <Tabs>')
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [selected, setSelected] = useState(defaultValue)
  const baseId = useId()

  return (
    <TabsContext value={{ selected, setSelected, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabsList({ children, ...props }) {
  useTabsContext()

  function handleKeyDown(e) {
    const tabs = [...e.currentTarget.querySelectorAll('[role="tab"]')]
    const index = tabs.indexOf(e.target)
    const next = {
      ArrowRight: tabs[(index + 1) % tabs.length],
      ArrowLeft: tabs[(index - 1 + tabs.length) % tabs.length],
      Home: tabs[0],
      End: tabs.at(-1),
    }[e.key]
    if (!next) return
    e.preventDefault()
    next.focus()
    next.click()
  }

  return (
    <div
      role="tablist"
      className="tab-list"
      {...props}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { selected, setSelected, baseId } = useTabsContext()
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  )
}

function Panel({ value, children }) {
  const { selected, baseId } = useTabsContext()

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      hidden={selected !== value}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = Panel
