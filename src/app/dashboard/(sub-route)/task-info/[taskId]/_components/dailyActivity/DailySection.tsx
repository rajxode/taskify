
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DailySectionGraph from "./DailySectionGraph";
import { todayTimeDistribution } from "@/server-actions/action";

export default async function DailySection({taskId, userId}:{taskId:string; userId:string}) {
  let chartData : any = null;
  let totalDuration = 0;
  try {
    const result = await todayTimeDistribution(userId);
    if(result) {
      totalDuration = result?.reduce((acc, curr) => acc + curr.totalDurationToday, 0);
      const todayTask = result?.filter((task) => task.taskId === taskId);
      if( todayTask) {
        chartData = [
          {taskName:todayTask[0].taskName, duration: todayTask[0].totalDurationToday, fill:"hsl(var(--chart-1))"},
        ]
      } else {
        chartData = [{taskName:"none",duration:0,fill:"hsl(var(--chart-1))"}]
      }
    }
  } catch(error) {
    console.log("error in DailySection", error);
  }
  return (
    <Card className="bg-white dark:bg-[#171717] flex flex-col md:col-span-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today&apos;s Activity</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {
          chartData
          ?
            <DailySectionGraph 
              chartData={chartData} 
              totalDuration={totalDuration} 
            />
          :
            "Not enough data"
        }
      </CardContent>
    </Card>
  )
}
