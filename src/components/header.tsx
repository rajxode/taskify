"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (window !== undefined) {
      setMounted(true);
      const handleScroll = () => {
        setScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (!mounted) return null;

  return (
    <header
      className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 bg-gradient-to-r from-gray-100/80 to-white/80 
        dark:from-gray-900/90 dark:to-[#121212]/80 
        backdrop-blur-sm transition-shadow duration-300 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold flex items-center text-[#36621f] dark:text-white"
        >
            <Image src={Logo} alt="brand-logo" className="w-6 h-6 mr-2" />
            <h1>Taskify</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#signin"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Sign In
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
