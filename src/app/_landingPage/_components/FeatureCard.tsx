import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  heading: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, heading, description }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col justify-center">
        <div className="w-fit h-fit p-3 rounded-full bg-gradient-to-br 
          from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
        >
          {icon}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-[#36621f] dark:text-[#3ecf8e]">
          {title}
        </h3>
        <h4 className="mt-2 font-medium text-gray-700 dark:text-gray-300">{heading}</h4>
        <p className="mt-2 text-gray-700 dark:text-gray-400 text-sm tracking-wide">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
