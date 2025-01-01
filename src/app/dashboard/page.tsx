
import { axiosInstance } from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import TimerAndTaskList from "./_components/TimerAndTaskList";
export default async function Dashboard() {
  
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const {data} = await axiosInstance.get("/task",{
    headers:{
      Cookie:`token=${token}`
    }
  });
  const tasks = data.tasks;

  return (
    <div className="w-full max-w-[1200px] h-full space-y-6 mt-[4vh]">
      <TimerAndTaskList tasks={tasks} />
    </div>
  );
}
