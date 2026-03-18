import { useState } from 'react'
import styles from './TodoInput.module.css'

interface Props {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    onAdd(text)
    setText('')
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Add
      </button>
    </div>
  )
}
