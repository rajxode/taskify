import React from "react";
import ActivityStatsBlock from "./ActivityStatsBlock";
import CurrentTaskBlock from "./CurrentTaskBlock";
import { TaskInterface } from "@/types/commonType";

interface PropType {
  isRunning: boolean;
  timer: number;
  tasks: TaskInterface[];
  activeTaskId: string | null;
  handleCancelClick: (taskId:string) => void;
  handleStartStop: (taskId: string) => Promise<void>;
  handlePauseResume: (taskId: string) => void;
}

const TimerBlock: React.FC<PropType> = ({
  isRunning,
  tasks,
  timer,
  activeTaskId,
  handleCancelClick,
  handleStartStop,
  handlePauseResume,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <CurrentTaskBlock
        isRunning={isRunning}
        tasks={tasks}
        timer={timer}
        activeTaskId={activeTaskId}
        handleCancelClick={handleCancelClick}
        handleStartStop={handleStartStop}
        handlePauseResume={handlePauseResume}
      />
      <div className="bg-white dark:bg-[#171717] border shadow rounded-lg p-6 hidden md:block">
        <ActivityStatsBlock 
          isRunning={isRunning}
          activeTaskId={activeTaskId}
        />
      </div>
    </div>
  );
};

export default TimerBlock;
