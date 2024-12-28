import React from "react";

export default function AuthCardWrapper({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <div
        className="border dark:border-none bg-gradient-to-br from-white to-gray-100 
          dark:to-slate-800/90 
          dark:from-gray-900/90 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#36621f] 
            dark:text-white"
        >
          {heading}
        </h2>
        {children}
      </div>
    </div>
  );
}
