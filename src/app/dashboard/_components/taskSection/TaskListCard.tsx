
import React, { useState } from "react";
import { TaskInterface } from "@/types/commonType";
import {
    Play,
    StopCircle,
  } from "lucide-react";
import TaskMenu from "./TaskMenu";
import { formatTime } from "@/utils/commonFunctions";
import AlertDialog from "@/components/alert-dialog/AlertDialog";

interface PropType {
  task: TaskInterface;
  handleDeleteTask: (id: string) => Promise<boolean>;
  isRunning: boolean;
  activeTaskId: string | null;
  handleStartStop: (taskId: string) => void;
  handleUpdateTask: (id:string, task:{name:string; description?:string;}) => Promise<boolean>;
}

const TaskListCard:React.FC<PropType> = ({
  task,
  handleDeleteTask,
  isRunning,
  activeTaskId,
  handleStartStop,
  handleUpdateTask
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleStartClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(isRunning && activeTaskId !== task?.id) {
      setIsOpen(true);
      return;
    }
    handleStartStop(task?.id);
  }
  return (
    <>
      <li
        className="flex flex-col items-center justify-between p-3 bg-gray-100 
        dark:bg-[#212121] border rounded-lg h-[200px]"
      >
        <div className="w-full flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
              {task.name.slice(0,1).toUpperCase() + task.name.slice(1)}
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Created At: {new Date(task.createdAt).toDateString()}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              {task.description ? `Description: ${task.description}` : null}
            </p>
          </div>
          <TaskMenu 
              handleDeleteTask={handleDeleteTask} 
              task={task} 
              handleUpdateTask={handleUpdateTask}
          />
        </div>

        <div className="w-full flex flex-col text-xs md:text-sm">
          <div className="mb-2">
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
              onClick={handleStartClick}
              className={`px-2 py-1 rounded-full border-[2px] dark:shadow ${
                (isRunning && activeTaskId === task.id) || (!isRunning && activeTaskId === task.id)
                  ? "border-red-500 bg-red-600/20 hover:bg-red-600/30 text-red-700 dark:border-red-600/80 dark:bg-red-600/30 dark:hover:bg-red-600/40 dark:text-red-100"
                  : "border-green-900 bg-green-600/20 hover:bg-green-700/40 text-green-900 dark:border-green-700 dark:bg-green-400/20 dark:hover:bg-green-400/30 dark:text-green-200"
              }`}
            >
              {
                (isRunning && activeTaskId === task.id) || (!isRunning && activeTaskId === task.id)
                ? 
                  (
                    <span className="flex px-2 items-center">
                      Stop&nbsp;
                      <StopCircle size={15} />
                    </span>
                  ) 
                : 
                  (
                    <span className="flex px-2 items-center">
                      Start&nbsp;
                      <Play size={15} />
                    </span>
                  )
              }
            </button>
          </div>
          </div>
        </div>
      </li>
      {
        isOpen
        &&
        <AlertDialog
          type="alert"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          content="You already have a task in progress. Please stop the current task before starting a new one."
          clickHandler={() => setIsOpen(false)}
        />
      }
    </>
  )
}

export default TaskListCard;