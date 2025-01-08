
import Image from "next/image";
import React from "react";
import BannerImage from "../../../../public/assets/save-time.png";
import LinkButton from "@/components/basic-reusable/LinkButton";
import { H1Heading } from "@/components/basic-reusable/Headings";

const HeroSection:React.FC = () => {
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4 py-3">
          <H1Heading
          >
            Track Your <span className="text-[#36621f] dark:text-[#3ecf8e]">Time</span>, 
            Boost Your <span className="text-[#36621f] dark:text-[#3ecf8e]">Productivity</span>
          </H1Heading>
          <p className="mx-auto max-w-[700px] text-[#374151] dark:text-gray-400 tracking-wide">
            Effortlessly manage your tasks and track your time with Taskify. 
            Gain insights into your productivity and optimize your
            workflow.
          </p>
          <div className="w-full flex justify-start items-center">
            <LinkButton
              href="/signup"
              text="Get Started"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center items-center h-[400px]">
          <Image 
            src={BannerImage} 
            alt="banner-image" 
            className="w-full h-auto min-h-[275px] min-w-[275px] max-w-[350px] md:max-w-full" 
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection;