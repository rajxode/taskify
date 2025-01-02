import React from "react";
import {
  Play,
  Pause,
  Edit2,
  Trash2,
  StopCircle,
  EllipsisVertical,
} from "lucide-react";
import { TaskInterface } from "@/types/commonType";
import TaskMenu from "./TaskMenu";

interface PropType {
  tasks: TaskInterface[];
  handleDeleteTask: (id: string) => Promise<void>;
  formatTime: (seconds: number) => string;
  isRunning: boolean;
  activeTaskId: string | null;
  handleStartStop: (taskId: string) => void;
}

const TaskList: React.FC<PropType> = ({
  tasks,
  handleDeleteTask,
  isRunning,
  activeTaskId,
  formatTime,
  handleStartStop,
}) => {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks?.map((task) => (
        <li
          key={task.id}
          className="flex flex-col items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md h-[200px]"
        >
          <div className="w-full flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                {task.name}
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Created At: {new Date(task.createdAt).toDateString()}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                {task.description ? `Description: ${task.description}` : null}
              </p>
            </div>
            <TaskMenu />
          </div>

          <div className="w-full flex flex-col text-sm">
            <div>
              {
                task.lastPerformAt
                ?
                  "Last Activity: " + (new Date(task.lastPerformAt).toDateString()) 
                :
                  "This task hasn't been performed yet."
              }
            </div>
            <div className="flex w-full justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                {
                  task.id === activeTaskId
                  ?
                    "Current: " + formatTime(task.lastTimerDuration)
                  :
                    null
                }
              </p>
            </div>
            <div>
              <button
                onClick={() => handleStartStop(task.id)}
                className={`p-2 rounded-full ${
                  isRunning && activeTaskId === task.id
                    ? "bg-red-100 text-red-700 dark:bg-red-600/80 dark:text-white"
                    : "bg-green-100 text-green-900 dark:bg-green-700/90 shadow dark:text-white"
                }`}
              >
                {isRunning && activeTaskId === task.id ? (
                  <span className="flex px-2 items-center">
                    Stop&nbsp;
                    <StopCircle className="h-5 w-5" />
                  </span>
                ) : (
                  <span className="flex px-2 items-center">
                    Start&nbsp;
                    <Play className="h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
