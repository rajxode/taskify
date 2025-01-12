
import React from "react";
import { FrequentSkeleton } from "@/components/skeletons/ActivityStats";
import { GoToTaskInterface } from "@/types/commonType";
import FrequentTaskGraph from "./FrequentTaskGraph";

const FrequentTaskSection = async(
    {frequentTask, totalDuration}
    :{frequentTask:GoToTaskInterface[]|null;totalDuration:number|null}
) => {
    if(!frequentTask) {
        return <FrequentSkeleton />
    }
    return (
        <FrequentTaskGraph frequentTask={frequentTask} totalDuration={totalDuration} />
    )
}

export default FrequentTaskSection;