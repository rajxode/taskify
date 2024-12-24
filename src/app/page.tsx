import Link from "next/link";
import { Clock, BarChart2, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-white to-gray-100
        dark:to-[#121212]/80 dark:from-gray-900/80
        ">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Track Your Time, Boost Your Productivity
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
              Effortlessly manage your tasks and track your time with TimeTrack
              Pro. Gain insights into your productivity and optimize your
              workflow.
            </p>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 px-8 text-sm font-medium text-white shadow transition-colors hover:from-gray-800 hover:to-gray-500 dark:hover:from-gray-200 dark:hover:to-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-900"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#121212]/80"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-blue-500" />}
              title="Time Tracking"
              description="Easily track time spent on tasks with our intuitive interface."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-green-500" />}
              title="Detailed Reports"
              description="Generate comprehensive reports to analyze your productivity."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-purple-500" />}
              title="Calendar Integration"
              description="Sync your tasks and time entries with your favorite calendar app."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-[#121212]/80">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Ready to Boost Your Productivity?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-400 md:text-xl">
              Join thousands of professionals who have transformed their work
              habits with TimeTrack Pro.
            </p>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 px-8 text-sm font-medium text-white shadow transition-colors hover:from-gray-800 hover:to-gray-500 dark:hover:from-gray-200 dark:hover:to-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-900"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
