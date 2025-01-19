
"use client";
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { formatTime } from '@/utils/commonFunctions';

const chartConfig = {} satisfies ChartConfig;

interface ChartData {
    date:string;
    totalSeconds:number;
    numberOfEntries:number;
}

interface PropType{
    chartData: ChartData[];
}

const MonthlySectionGraph:React.FC<PropType> = ({chartData}) => {
    return (
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value) => ("Time spent: " + formatTime(Number(value)))}
                />
              }
            />
            <Bar dataKey="totalSeconds" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ChartContainer>
    )
}

export default MonthlySectionGraph;