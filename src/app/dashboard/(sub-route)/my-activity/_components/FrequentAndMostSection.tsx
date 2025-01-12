
import { GoToTaskInterface } from "@/types/commonType";
import React from "react";
import FrequentTaskSection from "./frequentTask/FrequentTaskSection";
import { frequentTasks, totalTimeDistribution } from "@/server-actions/action";
import { FrequentSkeleton, MostPerformedSkeleton } from "@/components/skeletons/ActivityStats";
import MostPerformedSection from "./mostPerformed/MostPerformedSection";

interface TotalTimeInterface {
    taskId:string;
    taskName: string;
    totalDuration: number;
}

const FrequentAndMostSection = async({userId}:{userId:string}) => {
    let frequentTask:GoToTaskInterface[] | null = null;
    let totalDuration:number | null = null;
    try {
        frequentTask = await frequentTasks(userId);
        const totalTime:TotalTimeInterface[] | null = await totalTimeDistribution(userId);
        if(totalTime && totalTime.length > 0) {
            totalDuration = totalTime.reduce((acc,cur) => acc + cur.totalDuration,0);
        }
    } catch (error) {
        console.log('error in frequentAndMostSection', error);
    }
    if(!frequentTask) {
        return (
            <>
                <MostPerformedSkeleton />
                <FrequentSkeleton />
            </>
        )
    }
    return (
        <>
            <MostPerformedSection 
                mostPerformed={frequentTask[0]} 
                totalDuration={totalDuration} 
            />
            <FrequentTaskSection 
                frequentTask={frequentTask}
                totalDuration={totalDuration}
            />
        </>
    )
}

export default FrequentAndMostSection;