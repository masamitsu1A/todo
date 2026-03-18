import styles from './TodoFilter.module.css'
import type { FilterType } from '../types'

interface Props {
  current: FilterType
  activeCount: number
  onChangeFilter: (filter: FilterType) => void
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export function TodoFilter({ current, activeCount, onChangeFilter }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
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
