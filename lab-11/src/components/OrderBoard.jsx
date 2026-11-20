import { selectColumn } from '../model/queueReducer.js'
import OrderColumn from './OrderColumn.jsx'

const columns = [
  { status: 'new', title: 'Нові' },
  { status: 'brewing', title: 'Готуються' },
  { status: 'ready', title: 'Готові' },
  { status: 'served', title: 'Видані' },
]

export default function OrderBoard({ queue, dispatch, onOpen }) {
  return (
    <div className="board">
      {columns.map(({ status, title }) => (
        <OrderColumn
          key={status}
          title={title}
          orders={selectColumn(queue, status)}
          dispatch={dispatch}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
