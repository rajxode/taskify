import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: {
    default:"Home",
    template:"%s | Taskify"
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="bg-gray-200 dark:bg-[#121212] min-h-screen">
        <Header parent="" />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1200px] h-full space-y-6 my-[4vh]">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
