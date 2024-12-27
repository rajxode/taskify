"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      console.log('signup formData', formData);
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-white to-gray-100 dark:to-slate-900/90 dark:from-gray-900 
        shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#36621f] dark:text-white">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline 
                dark:bg-gray-700 dark:border-gray-600"
              id="name"
              type="text"
              placeholder="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline 
                dark:bg-gray-700 dark:border-gray-600"
              id="email"
              type="email"
              placeholder="your@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                  dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline 
                  dark:bg-gray-700 dark:border-gray-600"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 -top-2 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-white bg-[#36621f] dark:bg-[#006239] px-6 dark:hover:bg-[#27882c] 
                py-2 rounded-full tracking-wide"
              type="submit"
            >
              Sign Up
            </button>
            <Link
              href="/signin"
              className="inline-block align-baseline font-bold text-sm 
                text-[#36621f] dark:text-[#006239] hover:underline underline-offset-2"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
