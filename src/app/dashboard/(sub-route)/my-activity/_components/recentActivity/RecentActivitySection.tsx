
import React from "react";
import RecentEntryTable from "./RecentEntryTable";
import { RecentSkeleton } from "@/components/skeletons/ActivityStats";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentActivities } from "@/server-actions/action";

interface ActivityInterface {
    id: string;
    taskId: string;
    startTime: Date;
    endTime: Date | null;
    durationSeconds: number;
    taskName: string | null;
}

const RecentActivitySection = async({userId}:{userId:string}) => {
    let recentActivities:ActivityInterface[] | null = null;
    try {
        const result = await getRecentActivities(userId);
        if(result) {
            if(result.length > 10) {
                recentActivities = result.slice(0,10);
            } else {
                recentActivities = result;
            }
        }
    } catch (error) {
        console.log('error in recentActivitySection', error);
    }
    if(!recentActivities) {
        <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6 space-y-4">
            <div className="w-full mb-2">
                <Skeleton className="h-5 max-w-[250px]" />
            </div>
            <RecentSkeleton />
        </div>
    }
    return (
        <RecentEntryTable recentActivities={recentActivities} />
    )
}

export default RecentActivitySection;