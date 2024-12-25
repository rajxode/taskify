
import React from "react";
import LinkButton from "@/components/basic-reusable/link-button";
import { H2Heading } from "@/components/basic-reusable/headings";

const CTASection:React.FC = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-3 text-center">
            <H2Heading heading="Ready to Boost Your Productivity?" />
            <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
            Become part of a community of professionals transforming their work with Taskify.
            </p>
            <div className="w-full flex items-center justify-center">
              <LinkButton
                href="/signup"
                text="Start Using"
              />
            </div>
          </div>
        </div>
      </section>
    )
}

export default CTASection;