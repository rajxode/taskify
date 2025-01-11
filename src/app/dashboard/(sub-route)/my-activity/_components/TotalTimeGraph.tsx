
"use client";
import React from "react";
import { 
  Bar,
  BarChart,
  CartesianGrid, 
  LabelList, 
  Line, 
  LineChart, 
  XAxis 
} from "recharts";
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

const chartConfig = {
  totalDuration: {
    label: "Duration",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


interface PropType {
  taskId:string;
  taskName:string;
  totalDuration:number;
}

export default function TotalTimeGraph({totalTime}:{totalTime:PropType[]}) {
  const sumDuration = React.useMemo(() => {
      return totalTime.reduce((acc, curr) => acc + Number(curr.totalDuration), 0)
  }, []);
  return (
    <Card className="bg-white dark:bg-[#171717] h-auto md:col-span-2">
      <CardHeader>
        <CardTitle>Total time spent</CardTitle>
        <CardDescription>{formatTime(sumDuration)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-[250px]">
          <BarChart
            accessibilityLayer
            data={totalTime}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="taskName"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel 
                  formatter={(value, name) => {
                    if (name === "totalDuration") {
                      return ["Time spent: "+formatTime(Number(value))]
                    }
                    return value
                  }}
                />
              }
            />
            <Bar
              dataKey="totalDuration"
              fill="var(--color-totalDuration)"
              radius={8}
            />
            {/* </Bar> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
