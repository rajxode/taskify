
"use client";
import React from "react";
import {motion} from "framer-motion";
import { Hourglass } from "lucide-react";

const LoadingIcon:React.FC= () => {
  return (
    <div 
        className="w-auto h-auto z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
    >
      <motion.div
        style={{
          width: 100,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{ rotate: 180 }} // Rotates the element
        transition={{
          repeat: Infinity, // Loops forever
          duration: 1, // Duration of one complete spin
          ease: "easeIn", // Smooth rotation
        }}
      >
        <div>
            <Hourglass size={45} className="text-[#36621f] dark:text-[#39b380]" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingIcon;