
import React from "react";
import { Play, Pause, X, StopCircle } from "lucide-react";
import { TaskInterface } from "@/types/commonType";
import Stopwatch from "./StopWatch";
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent 
} from "@/components/ui/dialog";
import ActivityStatsBlock from "./ActivityStatsBlock";

interface PropType {
    isRunning: boolean;
    timer: number;
    tasks:TaskInterface[];
    activeTaskId:string | null;
}

const CurrentTaskBlock:React.FC<PropType> = ({isRunning, tasks, timer, activeTaskId}) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 col-span-3 md:col-span-2">
            <div className="w-full flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-[#36621f] dark:text-white">
                    Current Timer
                </h2>
                <div className="md:hidden">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="text-[14px] px-2 sm:px-3 py-1 border-[2px] border-[#36621f] 
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
                <Stopwatch 
                    isRunning={isRunning} 
                    elapsedTime={timer} 
                />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex justify-between items-center">
                <div>
                    {
                        activeTaskId
                        ? 
                            `Working on: ${tasks.find((task) => task.id === activeTaskId)?.name}`
                        :
                            "No active task"
                    }
                </div>
                <div className="flex">
                    {
                        activeTaskId
                        &&
                        <>
                            <button className="mr-3 px-4 py-1 border bg-slate-200 dark:text-black rounded-full
                                flex items-center shadow"
                            >
                                <span><Pause size={15} /></span>&nbsp;Pause
                            </button>
                            <button className="mr-3 px-4 py-1 border bg-slate-200 dark:text-black rounded-full
                                flex items-center shadow"
                            >
                                <span><StopCircle size={15} /></span>&nbsp;Stop
                            </button>
                            <button className="px-4 py-1 border bg-slate-200 rounded-full dark:text-black 
                                flex items-center shadow"
                            >
                                <span><X size={15} /></span>&nbsp;Cancel
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrentTaskBlock;