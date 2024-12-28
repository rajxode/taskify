
"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  ;
import { Avatar, AvatarFallback } from "../ui/avatar";
import { UserInterface } from "@/types/userType";
import { useTheme } from "next-themes";
import { axiosInstance } from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utils/handleAxiosError";

const AvatarAndMenu:React.FC<{user:UserInterface}> = ({user}) => {
    const {theme, setTheme} = useTheme();
    const {toast} = useToast();
    const router = useRouter();
    const handleLogoutClick = async() => {
        try {
            const {data} = await axiosInstance.get("/users/logout");
            const {success} = data;
            if(success) {
                toast({
                    variant:"success",
                    title:"Logged out successfully !!"
                })
                router.push("/");
            }
        } catch (error:unknown) {
            handleAxiosError(error,toast);
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-50 dark:bg-slate-800 md:min-w-[150px] mr-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuItem>
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? "Light" : "Dark"}&nbsp;Mode
                </button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogoutClick}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarAndMenu;