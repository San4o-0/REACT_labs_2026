/**
 * «Скасувати дію» й «Повторити дію» для черги. Кожна кнопка вимкнена, коли
 * нема чого скасовувати чи повторювати.
 */
export default function HistoryButtons({ canUndo, canRedo, onUndo, onRedo }) {
  return (
    <div className="history" role="group" aria-label="Історія змін">
      <button type="button" onClick={onUndo} disabled={!canUndo}>
        Скасувати дію
      </button>
      <button type="button" onClick={onRedo} disabled={!canRedo}>
        Повторити дію
      </button>
    </div>
  )
}
