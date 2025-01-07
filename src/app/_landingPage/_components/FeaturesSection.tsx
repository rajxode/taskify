
import React from "react";
import FeatureCard from "@/app/_landingPage/_components/FeatureCard";
import { Clock, BarChart2, Brain } from "lucide-react";
import { H2Heading } from "@/components/basic-reusable/Headings";

const FeatureSection:React.FC = () => {
  return (
      <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 "
    >
      <div className="container px-4 md:px-6 mx-auto">
        <H2Heading heading="Key Features" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-blue-500" />}
            title="Track Time Effortlessly"
            heading="Start. Stop. Stay Productive."
            description="Effortless time tracking with one-click control and instant productivity insights."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-purple-500" />}
            title="AI-Powered Timetable"
            heading="Your Day, Optimized with AI"
            description="Let AI create your personalized daily schedule based on your tasks and priorities."
          />
          <FeatureCard
            icon={<BarChart2 className="h-10 w-10 text-green-500" />}
            title="Visualize Your Progress"
            heading="Reports That Work for You"
            description="Analyze your time with interactive reports and customizable charts to achieve your goals."
          />
        </div>
      </div>
    </section>
  )
}

export default FeatureSection;