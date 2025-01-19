
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthlySectionGraph from "./MonthlySectionGraph";
import { getMonthlyTaskTimeBreakdown } from "@/server-actions/action";
import { monthArray } from "@/utils/commonFunctions";

interface ChartData {
  date:string;
  totalSeconds:number;
  numberOfEntries:number;
}

export default async function MonthlySection({taskId,userId}:{taskId:string;userId:string}) {
  let chartData : ChartData[] | null = null;
  const now = new Date();
  try {
    const result = await getMonthlyTaskTimeBreakdown(taskId,userId);
    if(result) {
      if(result.length > 0) {
        chartData = result;
      }
    }
  } catch (error) {
    console.log('error in Monthly section on task info page',error);
  }
  return (
    <Card className="bg-white dark:bg-[#171717] w-full">
      <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>
            {monthArray[now.getMonth()] +" "+ now.getFullYear()}
          </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        {
          chartData && chartData.length > 0
          ?
            <MonthlySectionGraph chartData={chartData} />
          :
            "Not enough Data"
        }
      </CardContent>
    </Card>
  )
}
