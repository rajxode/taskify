
export const dynamic = 'force-dynamic';

import React from "react";
import TodayActivityGraph from "./_components/TodaysActivityGraph";
import TotalTimeGraph from "./_components/TotalTimeGraph";
import FrequentTaskGraph from "./_components/FrequentTaskGraph";
import { MostPerformedGraph } from "./_components/MostPerformedGraph";
import RecentEntryTable from "./_components/RecentEntryTable";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AxiosError } from "axios";
import PersonalInfoCard from "./_components/PersonalInfoCard";
import { frequentTasks } from "@/server-actions/action";
import { GoToTaskInterface } from "@/types/commonType";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Activity Stats"
}

export default async function ActivityPage() {
    let stats = null;
    let frequentTask:GoToTaskInterface[] = [];
    let totalDuration = 0;
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;
        if(!token) {
            redirect("/signin");
        }
        const {data} = await axiosInstance.get("/users/my-data/complete-stats",{
            headers: {
                Cookie: `token=${token}`
            }
        });
        if(!data.success) {
            throw new Error("Something went wrong");
        }
        stats = data?.stats;
        const result = await frequentTasks(stats.user.id);
        if(result) {
            frequentTask = result;
        }
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.log("axios error in getting complete stats", error?.response?.data);
        } else if(error instanceof Error){
            console.log("Error in getting complete stats", error.message)
        } else {
          console.log("unknown error in getting complete stats", error);  
        }
        notFound();
    }
    return (
        <div className="w-full flex flex-col space-y-6">
            <PersonalInfoCard user={stats?.user} />
            <div className="w-full grid md:grid-cols-3 gap-4">
                <TotalTimeGraph totalTime={stats.totalTime} />
                <TodayActivityGraph todayTime={stats.todayTime} />
            </div>
            <div className="w-full grid md:grid-cols-5 gap-4">
                <MostPerformedGraph
                    taskName={frequentTask[0].taskName} 
                    taskDuration={frequentTask[0].totalDuration} 
                    totalTime={stats.totalTime} 
                    taskFrequency={frequentTask[0].totalEntries}
                />
                <FrequentTaskGraph frequentTask={frequentTask} />
            </div>
            <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6 flex flex-col">
                <div className="w-full mb-2">
                    <h2 className="text-lg font-semibold text-[#36621f] dark:text-white">
                        Recent Task Activities
                    </h2>
                </div>
                <RecentEntryTable recentActivities={stats.recentActivities} />
            </div>
        </div>
    )
}