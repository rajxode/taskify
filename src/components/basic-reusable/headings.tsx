
import React from "react";

export const H1Heading:React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none 
            dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r text-[#1e1e1e]/80
            dark:from-gray-100 dark:to-gray-400"
          >
            {children}
          </h1>
    )
}

export const H2Heading:React.FC<{heading: string}> = ({heading}) => {
    return (
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
          text-center dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r text-[#1e1e1e]/80
        dark:from-gray-100 dark:to-gray-400 mb-12 py-1"
        >
          {heading}
        </h2>
    )
}