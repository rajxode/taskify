
"use client";
import React from "react";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { formatTime } from "@/utils/commonFunctions";

const chartConfig = {} satisfies ChartConfig

const WeeklySectionGraph = ({chartData}:{chartData:any}) => {
    return (
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 30,
              right: 30,
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
                //   nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value) => ( "Dur: " + formatTime(Number(value)))}
                />
              }
            />
            <Line
              dataKey="totalSeconds"
              type="monotone"
              stroke={`hsl(var(--chart-1))`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
    )
}

export default WeeklySectionGraph;