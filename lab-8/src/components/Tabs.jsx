import { createContext, use, useId, useState } from 'react'

const TabsContext = createContext(null)

function useTabs() {
  const context = use(TabsContext)
  if (!context) {
    throw new Error('Tabs.Tab і Tabs.Panel мають бути всередині <Tabs>')
  }
  return context
}

/**
 * Вкладки — складений компонент (compound component): `Tabs` і його частини
 * `Tabs.List`, `Tabs.Tab` і `Tabs.Panel`. Вміст кожної частини приходить між
 * її тегами як `children`, а яка вкладка обрана, частини дізнаються з
 * контексту, який створює `Tabs`.
 *
 * Використання:
 *   <Tabs defaultValue="brew">
 *     <Tabs.List aria-label="Про каву">
 *       <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
 *       <Tabs.Tab value="reviews">Відгуки</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="brew">…</Tabs.Panel>
 *     <Tabs.Panel value="reviews">…</Tabs.Panel>
 *   </Tabs>
 *
 * Вимоги — у тестах tests/Tabs.children.test.jsx і tests/Tabs.a11y.test.jsx.
 */
export default function Tabs({ defaultValue, children }) {
  const [selected, setSelected] = useState(defaultValue)
  const baseId = useId()

  return (
    <TabsContext value={{ selected, setSelected, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

const keyTargets = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (index, count) => count - 1,
}

function TabList({ children, ...props }) {
  function handleKeyDown(e) {
    const getTarget = keyTargets[e.key]
    if (!getTarget) return
    const tabs = [...e.currentTarget.querySelectorAll('[role="tab"]')]
    const index = tabs.indexOf(e.target)
    if (index === -1) return
    e.preventDefault()
    const next = tabs[getTarget(index, tabs.length)]
    next.focus()
    next.click()
  }

  return (
    <div
      role="tablist"
      className="tab-list"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { selected, setSelected, baseId } = useTabs()
  const isSelected = value === selected

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  )
}

function TabPanel({ value, children }) {
  const { selected, baseId } = useTabs()

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      hidden={value !== selected}
    >
      {children}
    </div>
  )
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
