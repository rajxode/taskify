
export const dynamic = 'force-dynamic';

import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import TimerAndTaskList from "./_components/TimerAndTaskList";
import { notFound, redirect } from "next/navigation";
import { TaskInterface } from "@/types/commonType";
import { AxiosError } from "axios";

export default async function Dashboard() {
  let tasks : TaskInterface[] = [];
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if(!token) {
      redirect("/signin");
    }
    const {data} = await axiosInstance.get("/task",{
      headers:{
        Cookie:`token=${token}`
      }
    });
    if(!data?.success) {
      throw new Error("Something went wrong");
    } 
    tasks = data?.tasks;
  } catch (error:unknown) {
    if(error instanceof Error) {
      console.log('error in getting tasks', error.message); 
    } else if (error instanceof AxiosError) {
      console.log("axios error in getting tasks", error.response?.data);
    } else {
      console.log('unknown error', error);
    }
    notFound();
  }
  return (
    <div className="w-full max-w-[1200px] h-full space-y-6 my-[4vh]">
      <TimerAndTaskList tasks={tasks} />
    </div>
  );
}
