import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { TodoFilter } from './components/TodoFilter'
import { useTodos } from './hooks/useTodos'
import styles from './App.module.css'

export default function App() {
  const { todos, filter, activeCount, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos()

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>TODO</h1>
      <div className={styles.card}>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        <TodoFilter
          current={filter}
          activeCount={activeCount}
          onChangeFilter={setFilter}
        />
      </div>
    </div>
  )
}
