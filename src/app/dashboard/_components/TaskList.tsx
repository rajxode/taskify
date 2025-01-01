
import React from "react";
import { Play, Pause, Edit2, Trash2, StopCircle } from "lucide-react";
import { TaskInterface } from "@/types/commonType";

interface PropType {
    tasks: TaskInterface[];
    handleDeleteTask: (id:string) => Promise<void>;
    formatTime:(seconds:number) => string;
    isRunning: boolean;
    activeTaskId:string | null;
    handleStartStop: (taskId:string) => void;
}   

const TaskList:React.FC<PropType> = ({tasks, handleDeleteTask, isRunning, activeTaskId, formatTime, handleStartStop}) => {
  return (
    <ul className="space-y-3">
      {tasks?.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-3 bg-slate-200 dark:bg-gray-700 rounded-md"
        >
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {task.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatTime(task.lastTimerDuration)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStartStop(task.id)}
              className={`p-2 rounded-full ${
                isRunning && activeTaskId === task.id
                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                  : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
              }`}
            >
              {isRunning && activeTaskId === task.id ? (
                <StopCircle className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button 
              className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-600 
              dark:text-gray-300"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900 
                dark:text-red-300"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList;