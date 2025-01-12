"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

const chartConfig = {
  totalEntries: {
    label: "Frequency",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface PropType {
  taskId:string;
  taskName:string;
  totalDuration:number;
  totalEntries:number;
}

export default function FrequentTaskGraph({frequentTask, totalDuration}:{frequentTask:PropType[]; totalDuration:number|null}) {
  console.log("frequent task", frequentTask);
  return (
    <Card className="w-full bg-white dark:bg-[#171717] md:col-span-3">
      <CardHeader>
        <CardTitle>Frequent Tasks</CardTitle>
        <CardDescription>Your Go To List</CardDescription>
      </CardHeader>
      <CardContent>
        {
          frequentTask && frequentTask.length > 0 && totalDuration && totalDuration > 0
          ?
          <ChartContainer config={chartConfig} className="w-full max-h-[250px]">
            <BarChart
              accessibilityLayer
              data={frequentTask}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="taskName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar 
                dataKey="totalEntries" 
                fill="var(--color-totalEntries)" 
                radius={8} 
              />
            </BarChart>
          </ChartContainer>
          :
          "Not enough data"
        }
      </CardContent>
    </Card>
  )
}
