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
        className="border bg-white dark:bg-[#171717]
          shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
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
