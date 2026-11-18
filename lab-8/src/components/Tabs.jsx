import { createContext, use, useState } from 'react'

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

  return (
    <TabsContext value={{ selected, setSelected }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function TabList({ children, ...props }) {
  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { selected, setSelected } = useTabs()

  return (
    <button
      type="button"
      className={value === selected ? 'active' : ''}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  )
}

function TabPanel({ value, children }) {
  const { selected } = useTabs()

  return <div hidden={value !== selected}>{children}</div>
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
