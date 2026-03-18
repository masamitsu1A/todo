import styles from './TodoFilter.module.css'
import type { FilterType } from '../types'

interface Props {
  current: FilterType
  activeCount: number
  onChangeFilter: (filter: FilterType) => void
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了', value: 'completed' },
]

export function TodoFilter({ current, activeCount, onChangeFilter }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        {activeCount}個のタスク
      </span>
      <div className={styles.buttons}>
        {filters.map(f => (
          <button
            key={f.value}
            className={`${styles.filterButton} ${current === f.value ? styles.active : ''}`}
            onClick={() => onChangeFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
