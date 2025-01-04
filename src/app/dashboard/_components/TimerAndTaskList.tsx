
"use client";
import React, { useState, useEffect } from "react";
import TimerBlock from "./TimerBlock";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TaskInterface } from "@/types/commonType";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { boolean } from "drizzle-orm/mysql-core";

const TimerAndTaskList:React.FC<{tasks: TaskInterface[]}> = ({tasks}) => {
  const {toast} = useToast();
  const [taskList, setTaskList] = useState<TaskInterface[]>(tasks);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (activeTaskId) {
          setTaskList((prevTasks) =>
            prevTasks.map((task) =>
              task.id === activeTaskId
                ? { ...task, lastTimerDuration: task.lastTimerDuration + 1 }
                : task
            )
          );
        }
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer, activeTaskId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePauseResume = (taskId:string) => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      // setTimer(tasks.find((task) => task.id === taskId)?.lastTimerDuration || 0);
    }
  }

  const handleStartStop = (taskId: string) => {
    if (isRunning && activeTaskId === taskId) {
      setIsRunning(false);
      setActiveTaskId(null);
    } else {
      setIsRunning(true);
      setActiveTaskId(taskId);
      setTimer(tasks.find((task) => task.id === taskId)?.lastTimerDuration || 0);
    }
  };

  const handleDeleteTask = async(id: string):Promise<boolean> =>  {
    try {
      const {data} = await axiosInstance.delete(`/task/${id}`);
      if(data.success) {
        setTaskList(tasks.filter((task) => task.id !== id));
        if (activeTaskId === id) {
          setIsRunning(false);
          setActiveTaskId(null);
          setTimer(0);
        }
      }
      return data.success;
    } catch (error:unknown) {
      handleAxiosError(error, toast);
      return false;
    }
  };

  const handleUpdateTask = async(id:string, task:{name:string; description?:string;}):Promise<boolean> => {
    try {
      const {data} = await axiosInstance.put(`/task/${id}`,{
        name:task.name, description: task.description
      });
      if(data.success) {
        const updatedTask = data.updatedTask;
        const indexOfTask = taskList.findIndex((task) => task.id === id);
        if(indexOfTask !== -1) {
          taskList[indexOfTask] = updatedTask;
        }
      }
      return data.success;
    } catch (error:unknown) {
      handleAxiosError(error, toast);
      return false;
    }
  }
  return (
    <>
      <TimerBlock
        tasks={taskList} 
        timer={timer}
        activeTaskId={activeTaskId} 
        formatTime={formatTime} 
      />
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#36621f] dark:text-white">
              Tasks
            </h2>
          </div>
          <AddTask 
            setTaskList={setTaskList} 
            taskList={taskList}
          />
        </div>
        <TaskList
          taskList={taskList}
          handleDeleteTask={handleDeleteTask} 
          isRunning={isRunning}
          formatTime={formatTime}
          activeTaskId={activeTaskId}
          handleStartStop={handleStartStop}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
    </>
  )
}

export default TimerAndTaskList;