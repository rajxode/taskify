
import React from "react";
import { GoToTaskInterface } from "@/types/commonType";
import { CirclePlay, CircleStop } from "lucide-react";

interface PropType{
    goToList: GoToTaskInterface[];
    isRunning: boolean;
    activeTaskId: string | null;
    handleStartStop:(taskId:string) => Promise<void>;
}

const MyGoToTasks:React.FC<PropType> = ({goToList, isRunning, activeTaskId, handleStartStop}) => {
    const list = goToList?.length > 3 ? goToList.slice(0,3)  : goToList;
    return (
        <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6">
            <div className="w-full mb-2">
                <h2 className="text-xl font-semibold text-[#36621f] dark:text-white">
                    Your Go To Tasks
                </h2>
            </div>
            <div className="w-full grid sm:grid-cols-3 gap-4">
                {
                    list.map((task) => (
                        <div key={task.taskId} className="bg-gray-100 dark:bg-[#212121] border rounded-lg p-3 flex justify-between items-center">
                            <div>{task.taskName}</div>
                            <div className="flex items-center">
                                <button onClick={() => handleStartStop(task.taskId)}>
                                    {
                                        (isRunning && activeTaskId === task.taskId) || (!isRunning && activeTaskId === task.taskId)
                                        ?
                                            <CircleStop className="text-red-500 dark:text-red-600/80" />
                                        :
                                            <CirclePlay className="text-green-900 dark:text-green-700" />
                                    }
                                </button>
                            </div>
                        </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default MyGoToTasks;