
import React from "react";
import DailySection from "./_components/dailyActivity/DailySection";
import WeeklySection from "./_components/weeklyActivity/WeeklySection";
import MonthlySection from "./_components/monthlyActivity/MonthlySection";
import RecentSection from "./_components/recentActivity/RecentSection";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { TaskInterface } from "@/types/commonType";
import { notFound, redirect } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import { firstLetterUpper, getDateAndTime } from "@/utils/commonFunctions";

export default async function TaskInfoPage({
    params
}:{
    params: Promise<{ taskId:string}>
}) {
    let loading = true;
    const taskId = (await params).taskId;
    if(!taskId) {
        return notFound();
    }
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if(!token) {
        redirect("/signin");
    }
    let task:TaskInterface | null = null;
    try {
        const {data} = await axiosInstance.get(`/task/${taskId}`,{
            headers:{
              Cookie:`token=${token}`
            }
        });
        if(data.success) {
            task = data.task;
        }
    } catch (error) {
        console.log("error in task info page", error);
    } finally {
        loading = false;
    }
    if(loading) {
        return <div>
            Loading ....
        </div>
    }
    if(!task && !loading) {
        return notFound();
    }
    return (
        <div className="w-full flex flex-col space-y-6">
             <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6">
                <div className="w-full mb-2 flex justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#36621f] dark:text-white">
                            Task Info
                        </h2>
                    </div>
                    <div>
                    <Dialog>
                        <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none border-none">
                            <div className="w-fit h-fit rounded-full hover:bg-gray-300 dark:hover:bg-[#494949] px-1 py-1 cursor-pointer">
                            <EllipsisVertical />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="md:min-w-[150px] mr-3 border">
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer">
                                Update Task
                            </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem className="cursor-pointer">
                            Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </Dialog>
                    </div>
                </div>
                <div className="w-full grid md:grid-cols-3 gap-4">
                    <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-500">Task Name</div>
                        <div>{firstLetterUpper(task?.name!)}</div>
                    </div>
                    <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-500">Description</div>
                        <div>{task?.description}</div>
                    </div>
                    <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-500">Added on</div>
                        <div>{getDateAndTime(task?.createdAt!)}</div>
                    </div>
                </div>
            </div>
            <div className="w-full grid md:grid-cols-5 gap-4">
                <DailySection />
                <WeeklySection />
            </div>
            <div className="border">
                <MonthlySection />
            </div>
            <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6 flex flex-col">
                <div className="w-full mb-2">
                    <h2 className="text-lg font-semibold text-[#36621f] dark:text-white">
                        Recent Task Activities
                    </h2>
                </div>
                <RecentSection />
            </div>
        </div>
    )
} 