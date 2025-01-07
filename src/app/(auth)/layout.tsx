export const dynamic = 'force-dynamic';

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100
        dark:to-[#121212]/80 dark:from-gray-900/80"
      >
        <Header parent="" />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center text-sm text-gray-500 
            dark:text-gray-400"
          >
            © 2024 Taskify
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
