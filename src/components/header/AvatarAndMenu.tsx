
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
import { UserInterface } from "@/types/commonType";
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
            <DropdownMenuTrigger className="focus:outline-none border-none">
                <Avatar>
                    <AvatarFallback className="bg-gray-300 dark:bg-[#242424]">{user?.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:min-w-[150px] mr-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">My Profile</DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? "Light" : "Dark"}&nbsp;Mode
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogoutClick}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarAndMenu;