import React from "react";
import Link from "next/link";

interface PropType {
  btnText: string;
  linkSrc: string;
  linkText: string;
}

const CustomFormFooter: React.FC<PropType> = ({ btnText, linkSrc, linkText }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="text-white bg-[#36621f] dark:bg-[#006239] px-6 dark:hover:bg-[#27882c] 
                py-2 rounded-full tracking-wide"
        type="submit"
      >
        {btnText}
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
