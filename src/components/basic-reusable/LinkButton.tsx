
import React from "react";
import Link from "next/link";

interface PropsType {
    href:string;
    text:string;
}

const LinkButton:React.FC<PropsType> = ({href, text}) => {
    return  (
        <Link
            href={href}
            className="text-white bg-[#36621f] dark:bg-[#006239] px-6 dark:hover:bg-[#27882c] py-2 rounded-full tracking-wide"
        >
            {text}
        </Link>
    )
}

export default LinkButton;