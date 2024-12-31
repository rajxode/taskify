
import React from "react";
import { TaskInterface } from "@/types/commonType";

interface PropType {
    timer: number;
    tasks:TaskInterface[];
    activeTaskId:string | null;
    formatTime:(seconds:number) => string;
}

const TimerBlock:React.FC<PropType> = ({tasks, timer, activeTaskId, formatTime}) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Current Timer
            </h2>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {formatTime(timer)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {
                    activeTaskId
                    ? 
                        `Working on: ${tasks.find((task) => task.id === activeTaskId)?.name}`
                    :
                        "No active task"
                }
            </div>
        </div>
    )
}

export default TimerBlock;