import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

export default function StepCard({
  icon,
  title,
  description,
  step,
}: StepProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex items-center justify-center">
        <div className="relative w-fit h-fit">
          <div
            className="p-3 w-fit h-fit rounded-full bg-gradient-to-br from-gray-100 
                to-gray-200 dark:from-gray-700 dark:to-gray-600"
          >
            {icon}
          </div>
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 flex 
                items-center justify-center text-white text-sm font-bold"
          >
            {step}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="mt-4 text-xl font-semibold text-[#36621f] dark:text-[#3ecf8e]">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}
