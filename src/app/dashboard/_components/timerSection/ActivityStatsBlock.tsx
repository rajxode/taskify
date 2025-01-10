
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ActivityStatsInterface } from "@/types/commonType";
import { axiosInstance } from "@/utils/axiosInstance";
import { firstLetterUpper, formatTime } from "@/utils/commonFunctions";
import { handleAxiosError } from "@/utils/handleAxiosError";

interface PropType {
    isRunning:boolean;
    activeTaskId:string | null;
}

const ActivityStatsBlock:React.FC<PropType> = ({isRunning, activeTaskId}) => {
    const {toast} = useToast();
    const [myStats, setMyStats] = useState<ActivityStatsInterface|null>(null);
    const getStats = async() => {
        try {
            const {data} = await axiosInstance.get("/users/my-data/activity-stats");
            if(data.success) {
                setMyStats(data?.stats);
            }
        } catch (error:unknown) {
            handleAxiosError(error,toast);
        }
    }
    useEffect(() => {
        if(!isRunning && !activeTaskId) {
            getStats();
        }
    },[isRunning, activeTaskId]);
    return (
        <>
            <h2 className="text-xl font-semibold text-[#36621f] dark:text-white mb-4">
                Your Activity Stats
            </h2>
            <div className="w-full h-auto flex flex-col">
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Total Time Spent
                    </div>
                    <div>
                        {formatTime(myStats?.totalTime || 0)}
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Today&apos;s Activity
                    </div>
                    <div>
                    {formatTime(myStats?.todayTime || 0)}
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Most Active Task
                    </div>
                    <div>
                        {
                            myStats?.mostActive
                            ?
                                firstLetterUpper(myStats?.mostActive)
                            :
                                "none"
                        }
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Last Task Performed
                    </div>
                    <div>
                        {
                            myStats?.lastTask
                            ?
                                firstLetterUpper(myStats?.lastTask)
                            :
                                "none"
                        }
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Last Activity
                    </div>
                    <div>
                        {formatTime(myStats?.lastActivity || 0)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityStatsBlock;