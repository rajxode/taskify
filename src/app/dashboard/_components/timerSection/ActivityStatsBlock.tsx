
import React from "react";

const ActivityStatsBlock = () => {
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
                        04:56:00
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Today&apos;s Activity
                    </div>
                    <div>
                        00:36:00
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Most Active Task
                    </div>
                    <div>
                        Running
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Last Task Performed
                    </div>
                    <div>
                        Reading
                    </div>
                </div>
                <div className="w-full p-2 px-3 mb-3 text-sm bg-gray-100 dark:bg-[#212121] border rounded-md shadow flex justify-between items-center">
                    <div className="text-xs">
                        Last Activity
                    </div>
                    <div>
                        00:15:50
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityStatsBlock;