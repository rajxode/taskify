
import React from "react";
import TotalTimeGraph from "./TotalTimeGraph";
import { totalTimeDistribution } from "@/server-actions/action";
import { TotalSkeleton } from "@/components/skeletons/ActivityStats";

interface TotalTimeInterface {
    taskId:string;
    taskName: string;
    totalDuration: number;
}

const TotalTimeSection = async({userId}:{userId:string}) => {
    let totalTime : TotalTimeInterface[] | null = null;
    try {
        totalTime = await totalTimeDistribution(userId);
    } catch (error) {
        console.log('error in totalTimeSection', error);
    }
    if(!totalTime) {
        return <TotalSkeleton />
    }
    return (
        <TotalTimeGraph totalTime={totalTime} />
    )
}

export default TotalTimeSection;