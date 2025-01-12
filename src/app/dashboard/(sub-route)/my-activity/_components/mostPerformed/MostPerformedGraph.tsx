"use client";
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
import { useEffect, useState } from "react";
import { GoToTaskInterface } from "@/types/commonType";

const chartConfig = {} satisfies ChartConfig;;

interface PropType {
  mostPerformed:GoToTaskInterface | null;
  totalDuration:number | null;
}

export function MostPerformedGraph({mostPerformed, totalDuration}:PropType) {
  const [chartData, setChartData] = useState<any>([]);
  useEffect(() => {
    setChartData([{...mostPerformed, fill: "hsl(var(--chart-1))"}]);
  },[]);
  return (
    <Card className="bg-white dark:bg-[#171717] flex flex-col md:col-span-2">
      <CardHeader>
        <CardTitle>
          {
            mostPerformed && totalDuration && totalDuration > 0
            ?
            firstLetterUpper(mostPerformed.taskName)
            :
            "None"
          }
        </CardTitle>
        <CardDescription>Most Performed Task</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {
          mostPerformed && totalDuration && totalDuration > 0
          ?
          <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(mostPerformed.totalDuration * 360)/totalDuration}
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
            <RadialBar dataKey="totalEntries" background cornerRadius={10} />
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
                          {chartData[0].totalEntries.toLocaleString()}
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
        :
        "Not enough data"}
      </CardContent>
    </Card>
  )
}
