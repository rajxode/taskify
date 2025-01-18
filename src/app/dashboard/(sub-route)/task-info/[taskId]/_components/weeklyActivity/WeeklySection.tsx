
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WeeklySectionGraph from "./WeeklySectionGraph";
import { getWeeklyTaskTimeBreakdown } from "@/server-actions/action";


export default async function WeeklySection({taskId, userId}:{taskId:string; userId:string}) {
  let chartData = null;
  try {
    const result = await getWeeklyTaskTimeBreakdown(taskId, userId);
    if(result) {
      chartData = result;
    }
  } catch (error) {
    console.log('error in weeklySection task-info', error);
  }
  return (
    <Card className="bg-white dark:bg-[#171717] md:col-span-3">
      <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>
            {
              chartData && chartData.length > 0
              ?
                new Date(chartData[0].date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }) 
                + " -  " +
                new Date(chartData[6].date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              :
                null
            }
          </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <WeeklySectionGraph chartData={chartData} />
      </CardContent>
    </Card>
  )
}
