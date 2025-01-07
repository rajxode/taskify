
import React from "react";
import HeroSection from "@/app/_landingPage/_components/HeroSection";
import FeatureSection from "@/app/_landingPage/_components/FeaturesSection";
import CTASection from "@/app/_landingPage/_components/CTASection";
import HowItWorks from "@/app/_landingPage/_components/HowItWorks";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage:React.FC = () => {
    return (
        <>
            <Header parent="main" />
            <div className="w-full min-h-screen flex justify-center items-center"
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