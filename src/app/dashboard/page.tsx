'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Plus, Edit2, Trash2 } from 'lucide-react'

interface Task {
  id: number
  title: string
  duration: number
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design new landing page', duration: 0 },
    { id: 2, title: 'Implement user authentication', duration: 3600 },
    { id: 3, title: 'Write API documentation', duration: 1800 },
  ])
  const [newTask, setNewTask] = useState('')
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
        if (activeTaskId) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === activeTaskId ? { ...task, duration: task.duration + 1 } : task
            )
          )
        }
      }, 1000)
    } else if (!isRunning && timer !== 0) {
      if (interval) clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timer, activeTaskId])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStartStop = (taskId: number) => {
    if (isRunning && activeTaskId === taskId) {
      setIsRunning(false)
      setActiveTaskId(null)
    } else {
      setIsRunning(true)
      setActiveTaskId(taskId)
      setTimer(tasks.find((task) => task.id === taskId)?.duration || 0)
    }
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, duration: 0 }])
      setNewTask('')
    }
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
    if (activeTaskId === id) {
      setIsRunning(false)
      setActiveTaskId(null)
      setTimer(0)
    }
  }

  return (
    <div className="w-full max-w-[1200px] space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Timer</h2>
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {formatTime(timer)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {activeTaskId
            ? `Working on: ${tasks.find((task) => task.id === activeTaskId)?.title}`
            : 'No active task'}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tasks</h2>
        <form onSubmit={handleAddTask} className="mb-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
            >
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatTime(task.duration)}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStartStop(task.id)}
                  className={`p-2 rounded-full ${
                    isRunning && activeTaskId === task.id
                      ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                      : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                  }`}
                >
                  {isRunning && activeTaskId === task.id ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

