
import React from "react";
import HeroSection from "@/app/_landingPage/_components/HeroSection";
import FeatureSection from "@/app/_landingPage/_components/FeaturesSection";
import CTASection from "@/app/_landingPage/_components/CTASection";
import HowItWorks from "./_components/HowItWorks";
import Header from "@/components/header";
import Footer from "@/components/footer";

const LandingPage:React.FC = () => {
    return (
        <>
            <Header parent="main" />
            <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-gray-100
            dark:to-[#121212]/80 dark:from-gray-900/80 "
            >
                <div className="w-full flex flex-col items-center justify-center max-w-[1200px]">
                    <HeroSection />
                    <FeatureSection />
                    <HowItWorks />
                    <CTASection />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LandingPage;