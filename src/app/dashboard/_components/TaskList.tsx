
import React from "react";
import { TaskInterface } from "@/types/commonType";
import TaskListCard from "./TaskListCard";

interface PropType {
  taskList: TaskInterface[];
  handleDeleteTask: (id: string) => Promise<boolean>;
  formatTime: (seconds: number) => string;
  isRunning: boolean;
  activeTaskId: string | null;
  handleStartStop: (taskId: string) => void;
  handleUpdateTask: (id:string, task:{name:string;description?:string;}) => Promise<boolean>;
}

const TaskList: React.FC<PropType> = ({
  taskList,
  handleDeleteTask,
  isRunning,
  activeTaskId,
  formatTime,
  handleStartStop,
  handleUpdateTask
}) => {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {taskList?.map((task) => <TaskListCard 
                                  key={task.id}
                                  task={task}
                                  activeTaskId={activeTaskId}
                                  formatTime={formatTime}
                                  handleDeleteTask={handleDeleteTask}
                                  handleStartStop={handleStartStop}
                                  isRunning={isRunning}
                                  handleUpdateTask={handleUpdateTask}
                                />)}
    </ul>
  );
};

export default TaskList;
