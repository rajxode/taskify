
"use client";
import React, { ReactNode, useEffect } from "react";
import AOS from 'aos';

interface PropType {
    children: React.ReactNode;
}

const AosWrapper: React.FC<PropType> = ({ children }) => {
    useEffect(() => {
        AOS.init({});
    },[]);
    return <>{children}</>;
}

export default AosWrapper;