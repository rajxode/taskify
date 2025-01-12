
export const dynamic = 'force-dynamic';

import React from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AxiosError } from "axios";
import PersonalInfoCard from "./_components/personalInfo/PersonalInfoCard";
import { UserInterface } from "@/types/commonType";
import { Metadata } from "next";
import { ActivityPageSkeleton } from "@/components/skeletons/ActivityStats";
import TotalTimeSection from "./_components/totalTime/TotalTimeSection";
import TodayActivitySection from "./_components/todayActivity/TodayActivitySection";
import FrequentAndMostSection from "./_components/FrequentAndMostSection";
import RecentActivitySection from "./_components/recentActivity/RecentActivitySection";

export const metadata:Metadata = {
    title:"Activity Stats"
}

export default async function ActivityPage() {
    let user:UserInterface | null = null;
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("token")?.value;
        if(!token) {
            redirect("/signin");
        }
        const {data} = await axiosInstance.get("/users/my-data",{
            headers: {
                Cookie: `token=${token}`
            }
        });
        if(!data.success) {
            throw new Error("Something went wrong");
        }
        user = data?.user;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.log("axios error in my-activity page", error?.response?.data);
        } else if(error instanceof Error){
            console.log("Error in my-activity page", error.message)
        } else {
          console.log("unknown error in my-activity page", error);  
        }
        notFound();
    }
    if(!user) {
        return <ActivityPageSkeleton />
    } 
    return (
        <div className="w-full flex flex-col space-y-6">
            <PersonalInfoCard user={user} />
            <div className="w-full grid md:grid-cols-3 gap-4">
                <TotalTimeSection userId={user.id} />
                <TodayActivitySection userId={user.id} />
            </div>
            <div className="w-full grid md:grid-cols-5 gap-4">
                <FrequentAndMostSection userId={user.id} />
            </div>
            <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6 flex flex-col">
                <div className="w-full mb-2">
                    <h2 className="text-lg font-semibold text-[#36621f] dark:text-white">
                        Recent Task Activities
                    </h2>
                </div>
                <RecentActivitySection userId={user.id} />
            </div>
        </div>
    )
}