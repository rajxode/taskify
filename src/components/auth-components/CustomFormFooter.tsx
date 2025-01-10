import React from "react";
import Link from "next/link";
import { Loader } from "lucide-react";

interface PropType {
  btnText: string;
  linkSrc: string;
  linkText: string;
  isLoading: boolean;
}

const CustomFormFooter: React.FC<PropType> = ({ btnText, linkSrc, linkText, isLoading }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className={`px-6 py-2 rounded-full tracking-wide flex items-center
          ${
            isLoading?
            "bg-[#657a59] dark:bg-[#0b3523] text-gray-300 dark:text-gray-400 cursor-not-allowed"
            :" text-white bg-[#36621f] dark:bg-[#006239] dark:hover:bg-[#27882c]"
          }
        `}
        type="submit"
        disabled={isLoading}
      >
        {
          isLoading
          ?
          <>
            Please wait&nbsp;
            <span>
              <Loader size={17} />
            </span>
          </>
          :
          btnText
        }
      </button>
      <Link
        href={linkSrc}
        className="inline-block align-baseline font-bold text-sm 
                text-[#36621f] dark:text-[#006239] hover:underline underline-offset-2"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default CustomFormFooter;
