"use client"

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatTime } from "@/utils/commonFunctions";

const colorArray = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {} satisfies ChartConfig;

interface PropType {
  taskId:string;
  taskName:string;
  totalDurationToday:number;
}

interface DataInterface extends PropType {
  fill:string;
}

export default function TodayActivityGraph({todayTime} :{todayTime:PropType[]}) {
  const [chartData, setChartData] = React.useState<DataInterface[]>([]);
  const totalDuration = React.useMemo(() => {
    return todayTime.reduce((acc, curr) => acc + curr.totalDurationToday, 0)
  }, []);

  React.useEffect(() => {
    let data:DataInterface[] = [];
    if(todayTime) {
      todayTime.map((task,i) => data.push({...task, fill:colorArray[i%5]}));
    }
    setChartData(data);
  },[]);

  return (
    <Card className="bg-white dark:bg-[#171717] flex flex-col">
      <CardHeader>
        <CardTitle>Today&apos;s Activity</CardTitle>
        <CardDescription>{(new Date).toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {
          todayTime && todayTime.length > 0
          ?
          <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                      return [name+": "+formatTime(Number(value))]
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="totalDurationToday"
              nameKey="taskName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg font-bold"
                        >
                          {formatTime(totalDuration)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          time spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        :
        "Not enough data"
        }
      </CardContent>
    </Card>
  )
}