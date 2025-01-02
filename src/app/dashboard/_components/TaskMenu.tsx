import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const TaskMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none border-none">
        <div className="w-fit h-fit rounded-full hover:bg-gray-500 px-1 py-1 cursor-pointer">
            <EllipsisVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-50 dark:bg-slate-800 md:min-w-[150px] mr-3">
        <DropdownMenuItem>Update</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMenu;
