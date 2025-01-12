
import React from "react";
import { MostPerformedGraph } from "./MostPerformedGraph";
import { GoToTaskInterface } from "@/types/commonType";
import { MostPerformedSkeleton } from "@/components/skeletons/ActivityStats";

interface PropType {
    mostPerformed:GoToTaskInterface | null;
    totalDuration:number|null;
}

const MostPerformedSection:React.FC<PropType> = async({mostPerformed,totalDuration}) => {
    return (
        <MostPerformedGraph mostPerformed={mostPerformed} totalDuration={totalDuration} />
    )
}

export default MostPerformedSection;