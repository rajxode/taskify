"use client";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { firstLetterUpper } from "@/utils/commonFunctions";
import { useEffect, useMemo, useState } from "react";

const chartConfig = {} satisfies ChartConfig;;

interface TotalDuration {
  taskId:string;
  taskName:string;
  totalDuration:number;
}

interface PropType {
  totalTime:TotalDuration[];
  taskDuration:number;
  taskName:string;
  taskFrequency:number;
}

export function MostPerformedGraph({totalTime, taskDuration, taskName, taskFrequency}:PropType) {
  const [chartData, setChartData] = useState<any>([]);
  useEffect(() => {
    setChartData([{taskName, taskFrequency, taskDuration, fill: "hsl(var(--chart-2))"}]);
  },[]);
  const totalDuration = useMemo(() => {
        return totalTime.reduce((acc, curr) => acc + Number(curr.totalDuration), 0)
    }, []);
  return (
    <Card className="bg-white dark:bg-[#171717] flex flex-col md:col-span-2">
      <CardHeader>
        <CardTitle>{firstLetterUpper(taskName)}</CardTitle>
        <CardDescription>Most Performed Task</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(taskDuration * 360)/totalDuration}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="taskFrequency" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].taskFrequency.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          times Performed
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
