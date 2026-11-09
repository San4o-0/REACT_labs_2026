export default function MenuItemRow({ item }) {
  return (
    <tr className={item.available ? 'item' : 'item unavailable'}>
      <th scope="row">
        {item.name}
        {!item.available && ' — немає'}
      </th>
      <td>{item.price} грн</td>
    </tr>
  )
}
