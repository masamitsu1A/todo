import { useState, useCallback, useMemo, useEffect } from 'react'
import type { Todo, FilterType } from '../types'

const STORAGE_KEY = 'todo-app-data'

function loadTodos(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  )

  return {
    todos: filteredTodos,
    filter,
    activeCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
