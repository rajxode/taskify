
import React from "react";
import { TaskInterface } from "@/types/commonType";
import { Play, Pause, X, StopCircle } from "lucide-react";

interface PropType {
    timer: number;
    tasks:TaskInterface[];
    activeTaskId:string | null;
    formatTime:(seconds:number) => string;
}

const TimerBlock:React.FC<PropType> = ({tasks, timer, activeTaskId, formatTime}) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#36621f] dark:text-white mb-4">
                Current Timer
            </h2>
            <div className="text-4xl font-bold text-[#36621f] dark:text-[#3ecf8e] mb-4 text-center">
                {formatTime(timer)}
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
                            <button className="mr-3 px-4 py-1 border bg-slate-200 dark:text-black rounded-full flex items-center shadow">
                                <span><Pause size={15} /></span>&nbsp;Pause
                            </button>
                            <button className="mr-3 px-4 py-1 border bg-slate-200 dark:text-black rounded-full flex items-center shadow">
                                <span><StopCircle size={15} /></span>&nbsp;Stop
                            </button>
                            <button className="px-4 py-1 border bg-slate-200 rounded-full dark:text-black flex items-center shadow">
                                <span><X size={15} /></span>&nbsp;Cancel
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default TimerBlock;