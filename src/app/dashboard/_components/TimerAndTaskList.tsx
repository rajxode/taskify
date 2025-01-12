
"use client";
import React, { useState, useEffect } from "react";
import TimerBlock from "./timerSection/TimerBlock";
import AddTask from "./taskSection/AddTask";
import TaskList from "./taskSection/TaskList";
import { GoToTaskInterface, TaskInterface, TimeEntryInterface } from "@/types/commonType";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/utils/handleAxiosError";
import {Loader} from "@/components/loader/Loader";
import MyGoToTasks from "./taskSection/MyGoToTasks";

interface PropType {
  tasks: TaskInterface[];
  frequentTasks: GoToTaskInterface[];
}

const TimerAndTaskList:React.FC<PropType> = ({tasks, frequentTasks}) => {
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState<TaskInterface[]>(tasks);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [goToList, setGoToList] = useState<GoToTaskInterface[]>(frequentTasks)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timer, activeTaskId]);

  const handlePauseResume = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }

  const handleCancelClick = async(taskId:string) => {
    if(isRunning || activeTaskId === taskId) {
      const entryId = localStorage.getItem("entryId");
      try {
        const {data} = await axiosInstance.delete(`/task/${taskId}/update-entry/${entryId}`);
        if(data?.success) {
          setIsRunning(false);
          setActiveTaskId(null);
          setTimer(0); 
          localStorage.removeItem("entryId");
        }
      } catch (error:unknown) {
        handleAxiosError(error,toast);
      }
    }
  }

  const handleStartStop = async(taskId: string) => {
    setIsLoading(true);
    if (isRunning || activeTaskId === taskId) {
      try {
        const entryId = localStorage.getItem("entryId");
        const {data} = await axiosInstance.put(`/task/${taskId}/update-entry/${entryId}`);
        if(data?.success) {
          toast({
            variant:"success",
            "title":"Session recorded"
          })
          
          const entry:TimeEntryInterface = data?.entry;
          setTaskList(
            (prev) => 
              prev.map(
                (task) => 
                  task.id === activeTaskId 
                  ? 
                    {...task, lastPerformedAt:entry.startTime, lastTimerDuration:entry.durationSeconds } 
                  : 
                  task
                )
          )
          setTimer(0);
          setIsRunning(false);
          setActiveTaskId(null);
          localStorage.removeItem("entryId");
        }
      } catch (error:unknown) {
        handleAxiosError(error, toast);
      }
    } else {
      try {
        const {data} = await axiosInstance.post(`/task/${taskId}/add-time-entry`);
        if(data?.success) {
          const entryId = data?.entryId;
          localStorage.setItem("entryId",entryId);
          setIsRunning(true);
          setActiveTaskId(taskId);
          setTimer(0);
        }
      } catch (error:unknown) {
        handleAxiosError(error, toast);
      }
    }
    setIsLoading(false);
  };

  const handleDeleteTask = async(id: string):Promise<boolean> =>  {
    try {
      const {data} = await axiosInstance.delete(`/task/${id}`);
      if(data.success) {
        setTaskList(tasks.filter((task) => task.id !== id));
        setGoToList(goToList.filter((task) => task.taskId !== id));
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
      <Loader isLoading={isLoading} />
      <TimerBlock
        isRunning={isRunning}
        tasks={taskList} 
        timer={timer}
        activeTaskId={activeTaskId} 
        handleStartStop={handleStartStop}
        handleCancelClick={handleCancelClick}
        handlePauseResume={handlePauseResume}
      />
      {
        goToList.length > 0
        ?
          <MyGoToTasks 
            goToList={goToList} 
            isRunning={isRunning}
            activeTaskId={activeTaskId}
            handleStartStop={handleStartStop}
          />
        :
          null
      }
      <div className="bg-white dark:bg-[#171717] border shadow rounded-lg p-6 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#36621f] dark:text-white">
              All Tasks
            </h2>
          </div>
          <AddTask 
            setTaskList={setTaskList} 
            taskList={taskList}
          />
        </div>
        {
          taskList.length > 0
          ?
            <TaskList
              timer={timer}
              taskList={taskList}
              handleDeleteTask={handleDeleteTask} 
              isRunning={isRunning}
              activeTaskId={activeTaskId}
              handleStartStop={handleStartStop}
              handleUpdateTask={handleUpdateTask}
            />
          :
            <div className="w-full flex items-center justify-center text-gray-400 text-sm dark:text-gray-300 tracking-wide">
              Your journey to productivity begins here—create your first task and make it count!
            </div>
        }
      </div>
    </>
  )
}

export default TimerAndTaskList;