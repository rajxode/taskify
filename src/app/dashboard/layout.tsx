import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="bg-gray-200 dark:bg-inherit min-h-screen">
        <Header parent="" />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
