
import React from "react";
import { TaskInterface } from "@/types/commonType";
import TaskListCard from "./TaskListCard";

interface PropType {
  timer:number;
  taskList: TaskInterface[];
  handleDeleteTask: (id: string) => Promise<boolean>;
  isRunning: boolean;
  activeTaskId: string | null;
  handleStartStop: (taskId: string) => void;
  handleUpdateTask: (id:string, task:{name:string;description?:string;}) => Promise<boolean>;
}

const TaskList: React.FC<PropType> = ({
  timer,
  taskList,
  handleDeleteTask,
  isRunning,
  activeTaskId,
  handleStartStop,
  handleUpdateTask
}) => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {
        taskList
        ?.map(
          (task) => <TaskListCard
                      timer={timer}
                      key={task.id}
                      task={task}
                      activeTaskId={activeTaskId}
                      handleDeleteTask={handleDeleteTask}
                      handleStartStop={handleStartStop}
                      isRunning={isRunning}
                      handleUpdateTask={handleUpdateTask}
                    />
                  )
      }
    </ul>
  );
};

export default TaskList;
