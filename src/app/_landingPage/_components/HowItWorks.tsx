
import React from "react";
import { UserPlus, ListTodo, Timer, PieChart } from 'lucide-react';
import { H2Heading } from "@/components/basic-reusable/Headings";
import StepCard from "./StepCard";
import AosWrapper from "@/components/aos-wrapper/AosWrapper";

const HowItWorks:React.FC = () => {
    return (
        <section 
            id="getting-started" 
            className="w-full py-12 md:py-24 lg:py-32"
        >
            <AosWrapper>
                <div  data-aos="fade-up" className="container px-4 md:px-6 mx-auto">
                    <H2Heading heading="Getting Started" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <StepCard
                            icon={<UserPlus className="h-8 w-8 text-blue-500" />}
                            title="Sign Up"
                            description="Create an account in seconds."
                            step={1}
                        />
                        <StepCard
                            icon={<ListTodo className="h-8 w-8 text-green-500" />}
                            title="Add Tasks"
                            description="Organize your tasks with ease."
                            step={2}
                        />
                        <StepCard
                            icon={<Timer className="h-8 w-8 text-yellow-500" />}
                            title="Track Time"
                            description="Stay on top of your schedule."
                            step={3}
                        />
                        <StepCard
                            icon={<PieChart className="h-8 w-8 text-purple-500" />}
                            title="Analyze"
                            description="View detailed reports of your progress."
                            step={4}
                        />
                    </div>
                </div>
            </AosWrapper>
      </section>
    )
}

export default HowItWorks;

