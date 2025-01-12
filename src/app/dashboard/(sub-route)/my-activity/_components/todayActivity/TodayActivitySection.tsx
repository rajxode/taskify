
import React from 'react';
import TodayActivityGraph from './TodaysActivityGraph';
import { TodaySkeleton } from '@/components/skeletons/ActivityStats';
import { todayTimeDistribution } from '@/server-actions/action';

interface TodayActivityInterface {
    taskId:string;
    taskName:string;
    totalDurationToday:number;
}

const TodayActivitySection = async({userId}:{userId:string}) => {
    let todayTime : TodayActivityInterface[] | null = null;
    try {
        todayTime = await todayTimeDistribution(userId);
    } catch (error) {
        console.log("error in totalActivitySection", error);
    }
    if(!todayTime) {
        return <TodaySkeleton />
    }
    return (
        <TodayActivityGraph todayTime={todayTime} />
    )
}

export default TodayActivitySection;