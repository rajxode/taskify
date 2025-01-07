
import React from "react";
import ActivityStatsBlock from "./ActivityStatsBlock";
import CurrentTaskBlock from "./CurrentTaskBlock";
import { TaskInterface } from "@/types/commonType";

interface PropType {
    isRunning: boolean;
    timer: number;
    tasks:TaskInterface[];
    activeTaskId:string | null;
}

const TimerBlock:React.FC<PropType> = ({isRunning, tasks, timer, activeTaskId}) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <CurrentTaskBlock
                isRunning={isRunning}
                tasks={tasks}
                timer={timer}
                activeTaskId={activeTaskId}
            />
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hidden md:block">
                <ActivityStatsBlock />
            </div>
        </div>
    )
}

export default TimerBlock;