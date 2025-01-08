import React, { useState } from "react";
import { Play, Pause, X, StopCircle } from "lucide-react";
import { TaskInterface } from "@/types/commonType";
import Stopwatch from "./StopWatch";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ActivityStatsBlock from "./ActivityStatsBlock";
import AlertDialog from "@/components/alert-dialog/AlertDialog";

interface PropType {
  isRunning: boolean;
  timer: number;
  tasks: TaskInterface[];
  activeTaskId: string | null;
  handleCancelClick: () => void;
  handleStartStop: (taskId: string) => Promise<void>;
  handlePauseResume: (taskId: string) => void;
}

const CurrentTaskBlock: React.FC<PropType> = ({
  isRunning,
  tasks,
  timer,
  activeTaskId,
  handleCancelClick,
  handleStartStop,
  handlePauseResume,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handlePauseClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPaused(!isPaused);
    handlePauseResume(activeTaskId!);
  }
  const cancelClickHandler = () => {
    setIsPaused(false);
    handleCancelClick();
  }
  const stopClickHandler = () => {
    setIsPaused(false);
    handleStartStop(activeTaskId!);
  }
  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 col-span-3 md:col-span-2">
        <div className="w-full flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-[#36621f] dark:text-white">
            Current Timer
          </h2>
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-[14px] px-2 sm:px-3 py-1 border-[2px] border-[#36621f] 
                                dark:border-[#3ecf8e] text-[#36621F] font-semibold dark:text-[#3ecf8e] 
                                bg-inherit hover:bg-[#36621f]/30 dark:hover:bg-[#3ecf8e]/20 rounded-lg"
                >
                  Activity Stats
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ActivityStatsBlock />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="text-4xl font-bold text-[#36621f] dark:text-[#3ecf8e] mb-4 text-center">
          <Stopwatch isRunning={isRunning} elapsedTime={timer} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between items-center">
          <div>
            {activeTaskId
              ? `Active Task: ${
                  tasks.find((task) => task.id === activeTaskId)?.name
                }`
              : "No active task"}
          </div>
          <div className="flex">
            {activeTaskId && (
              <>
                <button
                  className="mr-3 px-4 py-1 border-[2px] border-[#e0b126] dark:border-[#FFC107] text-[#93751c] rounded-full
                                flex items-center dark:shadow hover:bg-yellow-500/20 dark:hover:bg-yellow-400/10 dark:text-yellow-600"
                  onClick={handlePauseClick}
                >
                  {!isPaused ? (
                    <>
                      <span>
                        <Pause size={15} />
                      </span>
                      &nbsp;Pause
                    </>
                  ) : (
                    <>
                      <span>
                        <Play size={15} />
                      </span>
                      &nbsp;Resume
                    </>
                  )}
                </button>
                <button
                    className="mr-3 px-4 py-1 border-[2px] border-[#DC3545] text-[#DC3545] rounded-full
                        flex items-center dark:shadow hover:bg-[#DC3545]/20"
                    onClick={stopClickHandler}
                >
                  <span>
                    <StopCircle size={15} />
                  </span>
                  &nbsp;Stop
                </button>
                <button
                  className="px-4 py-1 border-[2px] border-[#6C757D] text-[#50585e] dark:text-slate-400 rounded-full 
                                    flex items-center dark:shadow hover:bg-slate-500/20"
                  onClick={() => setIsOpen(true)}
                >
                  <span>
                    <X size={15} />
                  </span>
                  &nbsp;Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <AlertDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          content="Are you sure you want to close the timer? No time entry will be saved for this session."
          clickHandler={cancelClickHandler}
        />
      )}
    </>
  );
};

export default CurrentTaskBlock;
