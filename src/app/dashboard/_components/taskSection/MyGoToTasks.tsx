
import React, { useState } from "react";
import { GoToTaskInterface } from "@/types/commonType";
import { CirclePlay, CircleStop } from "lucide-react";
import AlertDialog from "@/components/alert-dialog/AlertDialog";

interface PropType{
    goToList: GoToTaskInterface[];
    isRunning: boolean;
    activeTaskId: string | null;
    handleStartStop:(taskId:string) => Promise<void>;
}

const MyGoToTasks:React.FC<PropType> = ({goToList, isRunning, activeTaskId, handleStartStop}) => {
    const list = goToList?.length > 3 ? goToList.slice(0,3)  : goToList;
    const [isOpen, setIsOpen] = useState(false);
    const handleStartClick = (e:React.MouseEvent<HTMLButtonElement>,taskId:string) => {
        if((isRunning && activeTaskId === taskId) || (!isRunning && activeTaskId === taskId) || !activeTaskId) {
            handleStartStop(taskId);
            return;
        }
        setIsOpen(true);
        return;
    }
    return (
        <>
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
                                    <button onClick={(e) => handleStartClick(e,task.taskId)}>
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
            {
                isOpen
                &&
                <AlertDialog
                    type="alert"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    content="You already have a task in progress. Please stop the current task before starting a new one."
                    clickHandler={() => setIsOpen(false)}
                />
            }
        </>
    )
}

export default MyGoToTasks;