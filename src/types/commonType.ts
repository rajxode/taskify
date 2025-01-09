
export interface UserInterface {
    id:string;
    name:string;
    email:string;
    password?:string;
    createdAt:Date;
}

export interface TaskInterface {
    id:string;
    name:string;
    description:string | null;
    userId:string;
    lastTimerDuration:number;
    lastPerformedAt?:Date | null;
    createdAt:Date;
}

export interface TimeEntryInterface {
    id:string;
    taskId:string;
    userId:string;
    startTime:Date;
    endTime:Date|null;
    durationSeconds:number;
}

export interface ActivityStatsInterface {
    totalTime: number | null;
    todayTime: number | null;
    mostActive: string | null;
    lastTask: string | null;
    lastActivity: number | null;
}